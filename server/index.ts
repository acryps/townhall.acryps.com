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
import { StationTileServer } from "./map/layers/shape/train/stations";
import { MinimapGenerator } from "./map/minimap";
import { Logger } from "./log";
import { WaterBodyTileServer } from "./map/layers/filled/water";
import { WaterBodyFiller } from "./map/fill/water";
import { TradingEntity } from "./market/entity";
import { MarketTracker } from "./market/tracker";
import { MarketIterationGenerator } from "./market/iterate";
import { advanceMarket } from "./market/iterate/cycle";

export const runLife = process.env.RUN_LIFE == 'YES';
export const updateMetrics = process.env.UPDATE_METRICS == 'YES';
export const updatePreloadedPages = process.env.PRELOAD_UPDATE_PAGES == 'YES';
export const composeItemContexts = process.env.ITEM_CONTEXT_COMPOSE == 'YES';
export const writeItemContexts = process.env.ITEM_CONTEXT_WRITE == 'YES';

export const port = +process.env.PORT || 7420;

const logger = new Logger('server');

logger.log('connect database');
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	logger.log('connected');

	const app = new ManagedServer();
	ws(app.app);

	const database = new DbContext(new RunContext());

	ScheduledEpoch.import(await database.epoch.toArray());

	// market experiments

	const marketTracker = new MarketTracker(database);
	await marketTracker.update();

	marketTracker.dump();

	/*
	// while (1) {
		// await advanceMarket(database, marketTracker);
		//}

	let entities: string[] = [];

	for (let trade of await database.trade.toArray()) {
		entities.push(trade.buyerId);
	}

	for (let ask of await database.tradeAsk.toArray()) {
		entities.push(ask.askerId);
	}

	for (let bid of await database.tradeBid.toArray()) {
		entities.push(bid.bidderId);
	}

	for (let production of await database.production.toArray()) {
		entities.push(production.producerId);
	}

	entities = [...new Set(entities)];

	const commodities = await database.commodity.toArray();

	for (let entityId of entities) {
		const entity = await database.legalEntity.find(entityId);
		const trader = await TradingEntity.from(entity, database);

		const income = await trader.getIncome();
		const expenses = await trader.getExpenses();

		if (income || expenses) {
			console.group(trader.name);

			console.log(`income = ${income}`)
			console.log(`expenses = ${expenses}`)

			for (let [asset, amount] of await trader.getStock()) {
				console.log(`asset '${asset.name}' = ${amount} ${asset.unit}`);
			}

			for (let bid of await entity.bids.toArray()) {
				const commodity = commodities.find(commodity => commodity.id == bid.commodityId);

				console.log(`bid ${commodity.name}: ${bid.price} * ${bid.quantity} ${commodity.unit} = ${bid.price * bid.quantity}`);
			}

			for (let ask of await entity.asks.toArray()) {
				const commodity = commodities.find(commodity => commodity.id == ask.commodityId);

				console.group(`ask ${commodity.name}: ${ask.price} * ${ask.quantity} ${commodity.unit} = ${ask.price * ask.quantity}`);

				for (let trade of await ask.trades.toArray()) {
					console.log(`trade ${trade.tag} = ${trade.booked?.toLocaleDateString()} ${trade.price} * ${trade.quantity} ${commodity.unit} = ${trade.price * trade.quantity}`)
				}

				console.groupEnd();
			}

			console.groupEnd();
		}
	}

	*/

	await registerMetrics(database);
	await MetricTracker.executeTask();

	new MinimapGenerator(database, app).schedule();

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

		// lawHouse.schedule();
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
	WaterBodyFiller.active = new WaterBodyFiller(database).schedule();

	new BaseTileServer(app, database);
	new TimeMachineTileServer(app, database);
	new PropertyTileServer(app, database);
	new StreetTileServer(app);
	new WaterBodyTileServer(app);
	new BoroughTileServer(app, database);
	new PropertyUsageTileServer(app, database);
	new PropertyValueTileServer(app, database);
	new PropertyOwnershipTileServer(app, database);
	new TrainRouteTileServer(app, database);
	new TrainRoutesTileServer(app, database);
	new StationTileServer(app, database);
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
		LawHouse: lawHouse,
		MarketTracker: marketTracker
	});

	new GoInterface(app, database);

	app.prepareRoutes();
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));

	preload.apply(app.app, join(process.cwd(), '..', 'page', 'assets', 'index.html'), 'Townhall');

	app.start(port);
});
