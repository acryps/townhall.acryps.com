import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { Article, ArticleImage, Bridge, CompanyType, DbContext, MapType, Metric, Movement, PropertyOwner, Resident, ResidentFigure, ResidentRelationship, Tenancy, TenancyQueryProxy } from "./managed/database";
import ws from 'express-ws';
import { join } from "path";
import { GameBridge } from "./bridge";
import { Message } from "../interface";
import { ArticleImageInterface } from "./areas/publication/image";
import { Life } from "./life";
import { ResidentImageInterface } from "./areas/resident/interface";
import { BaseTileServer } from "./map/base";
import { MapImporter } from "./map/import";
import { LawHouse } from "./life/law-house";
import { Language } from "./life/language";
import { GoInterface } from "./go";
import { PropertyTileServer } from "./map/layers/shape/property";
import { BoroughTileServer } from "./map/layers/shape/borough";
import { MovementTileServer } from "./map/layers/heatmap/density/movement";
import { PropertyUsageTileServer } from "./map/layers/shape/usage";
import { ImpressionImageInterface } from "./areas/impressions/interface";
import { StreetTileServer } from "./map/layers/shape/street";
import { updateWorkOffers } from "./life/work/offers";
import { Annotator } from "./annotate";
import { PlotterInterface } from "./plot/interface";
import { StreetFiller } from "./map/fill/street";
import { LegalEntityReferenceCounter } from "./areas/legal-entity/reference-counter";
import { PropertyValueTileServer } from "./map/layers/heatmap/gradiant/property-value";
import { PropertyOwnershipTileServer } from "./map/layers/shape/propety-ownership";
import { PropertyValueator } from "./areas/trade/valuation/property";
import { LegalEntityManager } from "./areas/legal-entity/manager";
import { FillLife } from "./life/fill/fill";
import { createWriteStream } from "fs";
import { MetricTracker } from "./areas/metrics/tracker";
import { PopulationSizeMetric } from "./areas/metrics/tracker/population-size";
import { PropertyCountMetric } from "./areas/metrics/tracker/property-count";
import { AllocatedAreaMetric } from "./areas/metrics/tracker/allocated-area";
import { PopulationAgeAverageMetric } from "./areas/metrics/tracker/average-age";
import { WorkUnemploymentMetric } from "./areas/metrics/tracker/unemployment";
import { TotalPropertyValueMetric } from "./areas/metrics/tracker/total-property-value";
import { DwellingCountMetric } from "./areas/metrics/tracker/dwelling-count";
import { PlayerTraveledBlocksMetric } from "./areas/metrics/tracker/player-traveled-blocks";
import { RelationDistanceMetric } from "./areas/metrics/tracker/relation-distance";
import { OpenWorkOfferMetric } from "./areas/metrics/tracker/open-work-offer";
import { WorkOfferTotalMetric } from "./areas/metrics/tracker/work-offers";
import { CompanyCountMetric } from "./areas/metrics/tracker/company-count";
import { CompanyAssetTotalMetric } from "./areas/metrics/tracker/company-asset-total";
import { EmptyDwellingCountMetric } from "./areas/metrics/tracker/empty-dwellings";
import { TrainRouteTileServer } from "./map/layers/shape/train/route";
import { TrainRoutesTileServer } from "./map/layers/shape/train/routes";
import { registerMetrics } from "./areas/metrics/metrics";
import { TimeMachineTileServer } from "./map/layers/time-machine";
import { PlanTileServer } from "./map/layers/shape/plan";
import { ChangeFrame } from "./areas/change/frame";
import { Oracle } from "./areas/oracle/generator";
import { ArticleOpinionGenerator } from "./areas/publication/opinion";

export const runLife = process.env.RUN_LIFE == 'YES';
export const updateMetrics = process.env.UPDATE_METRICS == 'YES';

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log('connected to database!');

	const app = new ManagedServer();
	ws(app.app);

	const database = new DbContext(new RunContext());

	await registerMetrics(database);
	await MetricTracker.executeTask();

	new MapImporter(database);

	const annotator = new Annotator(database);
	annotator.load();

	new LegalEntityReferenceCounter(database).schedule();

	const life = new Life(database);
	life.load();

	const lawHouse = new LawHouse(database, new Language('smart'), life);

	if (runLife) {
		new Oracle(database, new LegalEntityManager(database)).schedule();
		new ArticleOpinionGenerator(database).schedule();

		lawHouse.schedule();
		life.vote();

		const nextTick = async () => {
			await life.tick();

			setTimeout(() => nextTick(), 1000 * 30);
		}

		setTimeout(() => nextTick(), 1000 * 30);

		new FillLife(life, database).fillEmptyDwellings();

		(async () => {
			const properties = await database.property
				.where(property => property.deactivated == null)
				.where(property => property.typeId != null)
				.where(property => property.boroughId != null)
				.toArray()

			for (let property of properties) {
				const owner = await property.owners.orderByDescending(owner => owner.aquired).first();

				if (owner && !owner.aquiredValuationId) {
					const borough = await new LegalEntityManager(database).findBorough(property.boroughId);

					console.log(`valueing property ${property.id}`);
					const valueation = await new PropertyValueator(borough).valueate(property);

					owner.aquiredValuation = valueation;
					await owner.update();
				}
			}
		})();

		(async () => {
			for (let company of await database.company.toArray()) {
				console.log(company.name);

				for (let office of await company.offices.toArray()) {
					await updateWorkOffers(office);
				}
			}
		})();
	}

	// add missing figures
	/* for (let resident of await database.resident.where(resident => resident.figure == null).toArray()) {
		console.log(resident.givenName)

		await life.assignFigure(resident);
	} */

	StreetFiller.active = new StreetFiller(database).schedule();

	new BaseTileServer(app, database);
	new TimeMachineTileServer(app, database);
	new PropertyTileServer(app, database);
	new StreetTileServer(app, database); // temporarely only!
	new BoroughTileServer(app, database);
	new PropertyUsageTileServer(app, database);
	new PropertyValueTileServer(app, database);
	new PropertyOwnershipTileServer(app, database);
	new TrainRouteTileServer(app, database);
	new TrainRoutesTileServer(app, database);
	new PlanTileServer(app, database);
	// new MovementTileServer(app, database);
	//
	ChangeFrame.registerInterface(app);

	ViewModel.globalFetchingContext = database;

	const connections = [];

	(app.app as any).ws('/game', socket => connections.push(socket));

	new GameBridge(app, database, message => {
		for (let connection of connections) {
			try {
				connection.send(Message.encode(message));
			} catch {}
		}
	});

	new ArticleImageInterface(app, database);
	new ResidentImageInterface(app, database, life);
	new ImpressionImageInterface(app, database);
	new PlotterInterface(app, database);

	app.createInjector = context => new Inject({
		Context: context,
		DbContext: database,
		Life: life,
		LawHouse: lawHouse
	});

	new GoInterface(app, database);

	app.prepareRoutes();
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));
	app.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

	app.start(+process.env.PORT || 7420);
});
