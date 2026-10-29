import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { CommodityIcon, DbContext } from "./managed/database";
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
import { Annotator } from "./annotate";
import { PlotterInterface } from "./plot/interface";
import { StreetFiller } from "./map/fill/street";
import { LegalEntityReferenceCounter } from "./areas/legal-entity/reference-counter";
import { PropertyValueTileServer, PropertyValueIndexTask } from "./map/layers/heatmap/gradiant/property-value";
import { PropertyOwnershipTileServer } from "./map/layers/shape/propety-ownership";
import { RelocateTenancyTileServer } from "./map/layers/shape/relocate-tenancy";
import { RelocateOfficeTileServer } from "./map/layers/shape/relocate-office";
import { ValuationBackfillTask } from "./areas/trade/valuation/backfill";
import { WorkOfferBackfillTask } from "./life/work/backfill";
import { LegalEntityManager } from "./areas/legal-entity/manager";
import { FillLife } from "./life/fill/fill";
import { MetricDispatchTask } from "./areas/metrics/tracker";
import { TrainRouteTileServer } from "./map/layers/shape/train/route";
import { TrainRoutesTileServer } from "./map/layers/shape/train/routes";
import { MetricTrackerWorkerHandle, registerMetrics } from "./areas/metrics/metrics";
import { TimeMachineTileServer } from "./map/layers/time-machine";
import { PlanTileServer } from "./map/layers/shape/plan";
import { ChangeFrame } from "./areas/change/frame";
import { Oracle } from "./areas/oracle/generator";
import { ArticleOpinionGenerator } from "./areas/publication/opinion";
import { ArticleDraftWorker } from "./areas/publication/draft-worker";
import { Preload, PreloadUpdateTask } from "./preload";
import { registerPreload } from "./preload/routes";
import { ScheduledEpoch } from "../interface/time/epoch";
import { Time } from "../interface/time";
import { PoliticalCompassRater } from "./life/political-compass";
import { WallpaperInterface } from "./map/wallpaper";
import { ItemContextTracker } from "./context";
import { StationTileServer } from "./map/layers/shape/train/stations";
import { TrafficTileServer } from "./map/layers/shape/train/traffic";
import { Shape } from "../interface/shape";
import { MinimapGenerator } from "./map/minimap";
import { WaterBodyTileServer } from "./map/layers/filled/water";
import { WaterBodyFiller } from "./map/fill/water";
import { SquareFiller } from "./map/fill/square";
import { MarketTracker } from "./market/tracker";
import { Logger } from "@acryps/log";
import { ResidentAssessor } from "./life/assess";
import { CompanyAssessor } from "./life/assess-company";
import { BoroughAssessor } from "./life/assess-borough";
import { CourtCaseSession } from "./legal/court";
import { readdirSync, readFileSync } from "fs";
import { CommodityIconImageInterface } from "./areas/market/icon";
import { MarketCycleGenerator } from "./market/cycle";
import { WorkerDispatch } from "./worker";
import { TrafficAnalysisTask } from "./traffic";
import { PlanningMapGenerator } from "./map/planning";
import { BlockTouchesTileServer } from "./map/layers/heatmap/gradiant/block-touches";
import { PlayerHeadImageInterface } from "./areas/game/head";
import { MarketFeedInterface } from "./market/feed";
import { Scheduler } from "./scheduler";
import { ResidentFigureAssignmentTask } from "./life/figure-assignment";

export const runLife = process.env.RUN_LIFE == 'YES';
export const runMarket = process.env.RUN_MARKET == 'YES';
export const updateMetrics = process.env.UPDATE_METRICS == 'YES';
export const updatePreloadedPages = process.env.PRELOAD_UPDATE_PAGES == 'YES';
export const composeItemContexts = process.env.ITEM_CONTEXT_COMPOSE == 'YES';
export const writeItemContexts = process.env.ITEM_CONTEXT_WRITE == 'YES';
export const runLawHouse = process.env.RUN_LAW_HOUSE == 'YES';
export const assignMissingFigures = process.env.ASSIGN_MISSING_FIGURES == 'YES';

export const port = +process.env.PORT || 7420;

const logger = new Logger('server');

logger.log('connect database');
DbClient.connectedClient = new DbClient({ max: 8 });

DbClient.connectedClient.connect().then(async () => {
	logger.log('connected');

	const database = new DbContext(new RunContext());

	// environment context
	ScheduledEpoch.import(await database.epoch.toArray());

	if (WorkerDispatch.main(database)) {
		return;
	}

	const app = new ManagedServer();
	ws(app.app);

	// market experiments
	const marketLogger = new Logger('market');

	const marketTracker = new MarketTracker(new Logger('tracker', marketLogger), database);
	await marketTracker.load();

	if (runMarket) {
		const marketScheduler = new Scheduler();
		marketScheduler.register(new MarketCycleGenerator(database, marketTracker));
		marketScheduler.start();

		return;
	}

	const scheduler = new Scheduler();

	await registerMetrics(database);

	scheduler.register(new MetricDispatchTask(MetricTrackerWorkerHandle), updateMetrics);
	scheduler.register(new TrafficAnalysisTask());

	scheduler.register(new MinimapGenerator(database, app));
	new PlanningMapGenerator(database, app);

	const preload = new Preload(database);
	registerPreload(preload, database);

	scheduler.register(new PreloadUpdateTask(preload), updatePreloadedPages);

	const mapImporter = new MapImporter(database);
	scheduler.register(mapImporter);

	const annotator = new Annotator(database);
	await annotator.load();
	annotator.nextRunAt = Date.now() + 1000 * 60 * 5;
	scheduler.register(annotator);

	ItemContextTracker.instance = new ItemContextTracker(database);

	scheduler.register(new LegalEntityReferenceCounter(database));
	scheduler.register(new ArticleDraftWorker(database));

	const life = new Life(database);

	// `tick()` depends on `load()` having populated `residents`/`residentAnchors` - don't let the
	// scheduler run it until that's done, but (as before) don't block the rest of startup on it either
	life.nextRunAt = Infinity;
	life.load().then(() => {
		life.nextRunAt = 0;
		scheduler.notify();
	});

	scheduler.register(life, runLife);

	const lawHouse = new LawHouse(database, new Language('smart'), life);
	scheduler.register(lawHouse, runLawHouse);

	if (runLife) {
		scheduler.register(new Oracle(database, new LegalEntityManager(database)));
		scheduler.register(new ArticleOpinionGenerator(database));

		scheduler.register(new PoliticalCompassRater(database));
		scheduler.register(new ResidentAssessor(database));
		scheduler.register(new CompanyAssessor(database));
		scheduler.register(new BoroughAssessor(database));

		life.vote();

		scheduler.register(new FillLife(life, database));
		scheduler.register(new ValuationBackfillTask(database));
		scheduler.register(new WorkOfferBackfillTask(database));
	}

	scheduler.register(new ResidentFigureAssignmentTask(database, life), assignMissingFigures);

	SquareFiller.active = scheduler.register(new SquareFiller(database));
	StreetFiller.active = scheduler.register(new StreetFiller(database));
	WaterBodyFiller.active = scheduler.register(new WaterBodyFiller(database));

	scheduler.register(new PropertyValueIndexTask(new PropertyValueTileServer(app)));

	new BaseTileServer(app, database);
	new TimeMachineTileServer(app, database);
	new PropertyTileServer(app, database);
	new StreetTileServer(app);
	new WaterBodyTileServer(app);
	new BoroughTileServer(app, database);
	new PropertyUsageTileServer(app, database);
	new PropertyOwnershipTileServer(app, database);
	new RelocateTenancyTileServer(app, database);
	new RelocateOfficeTileServer(app, database);
	new TrainRouteTileServer(app, database);
	new TrainRoutesTileServer(app, database);
	new StationTileServer(app, database);
	new TrafficTileServer(app);
	new PlanTileServer(app, database);
	new BlockTouchesTileServer(app, database);

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
	new CommodityIconImageInterface(app, database);
	new PlayerHeadImageInterface(app, database);

	app.createInjector = context => new Inject({
		Context: context,
		DbContext: database,
		Life: life,
		LawHouse: lawHouse,
		MarketTracker: marketTracker,
		Scheduler: scheduler
	});

	new GoInterface(app, database);
	new MarketFeedInterface(app, database);

	app.prepareRoutes();
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));

	preload.apply(app.app, join(process.cwd(), '..', 'page', 'assets', 'index.html'), 'Townhall');

	app.start(port);
	scheduler.start();
});
