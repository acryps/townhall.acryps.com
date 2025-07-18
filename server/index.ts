import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { DbContext } from "./managed/database";
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
import { PropertyUsageTileServer } from "./map/layers/shape/usage";
import { ImpressionImageInterface } from "./areas/impressions/interface";
import { StreetTileServer } from "./map/layers/filled/street";
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
import { MetricTracker } from "./areas/metrics/tracker";
import { TrainRouteTileServer } from "./map/layers/shape/train/route";
import { TrainRoutesTileServer } from "./map/layers/shape/train/routes";
import { registerMetrics } from "./areas/metrics/metrics";
import { TimeMachineTileServer } from "./map/layers/time-machine";
import { PlanTileServer } from "./map/layers/shape/plan";
import { ChangeFrame } from "./areas/change/frame";
import { Oracle } from "./areas/oracle/generator";
import { ArticleOpinionGenerator } from "./areas/publication/opinion";
import { Preload } from "./preload";
import { registerPreload } from "./preload/routes";
import { ScheduledEpoch } from "../interface/time/epoch";
import { Time } from "../interface/time";
import { PoliticalCompassRater } from "./life/political-compass";
import { WallpaperInterface } from "./map/wallpaper";
import { ItemContextTracker } from "./context";

export const runLife = process.env.RUN_LIFE == 'YES';
export const updateMetrics = process.env.UPDATE_METRICS == 'YES';
export const updatePreloadedPages = process.env.PRELOAD_UPDATE_PAGES == 'YES';
export const composeItemContexts = process.env.UPDATE_ITEM_COMPOSE == 'YES';
export const writeItemContexts = process.env.UPDATE_ITEM_WRITE == 'YES';

export const port = +process.env.PORT || 7420;

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log('connected to database!');

	const app = new ManagedServer();
	ws(app.app);

	const database = new DbContext(new RunContext());

	ScheduledEpoch.import(await database.epoch.toArray());

	await registerMetrics(database);
	await MetricTracker.executeTask();

	const preload = new Preload(database);
	registerPreload(preload, database);

	await preload.executeTask();

	new MapImporter(database);

	const annotator = new Annotator(database);
	await annotator.load();

	ItemContextTracker.instance = new ItemContextTracker(database);

	new LegalEntityReferenceCounter(database).schedule();

	const life = new Life(database);
	life.load().then(() => {
		if (runLife) {
			const nextTick = async () => {
				await life.tick();

				setTimeout(() => nextTick(), 1000 * 30);
			}

			setTimeout(() => nextTick(), 1000 * 30);
		}
	});

	const lawHouse = new LawHouse(database, new Language('smart'), life);

	if (runLife) {
		new Oracle(database, new LegalEntityManager(database)).schedule();
		new ArticleOpinionGenerator(database).schedule();
		new PoliticalCompassRater(database).next();

		lawHouse.schedule();
		life.vote();

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
	new StreetTileServer(app);
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
	new WallpaperInterface(app, database);

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

	preload.apply(app.app, join(process.cwd(), '..', 'page', 'assets', 'index.html'), 'Townhall');

	app.start(port);
});
