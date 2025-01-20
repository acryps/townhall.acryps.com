import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { Article, ArticleImage, Bridge, DbContext, MapType, Movement, Resident, ResidentFigure, ResidentRelationship, Tenancy, TenancyQueryProxy } from "./managed/database";
import ws from 'express-ws';
import { join } from "path";
import { Proxy } from "./proxy";
import { GameBridge } from "./bridge";
import { Message } from "../interface";
import { ArticleImageInterface } from "./areas/publication/image";
import { Life } from "./life";
import { ResidentImageInterface } from "./areas/resident/interface";
import { tilecomplete, tileimport } from "./IMPORT_TILE";
import { BaseTileServer } from "./map/base";
import { PropertyRegisterTileServer } from "./map/property";
import { MapImporter } from "./map/import";
import { female, male } from "./life/gender";
import { toRealTime, toSimulatedAge, toSimulatedTime } from "../interface/time";
import { LawHouse } from "./life/law-house";
import { Language } from "./life/language";
import { FillLife } from "./life/fill/fill";

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log("connected to database!");

	const app = new ManagedServer();
	ws(app.app);

	const db = new DbContext(new RunContext());
	// tilecomplete(db);
	// tileimport(db);

	// MapImporter.schedule(MapType.overworld, db);
	// MapImporter.schedule(MapType.night, db);

	const life = new Life(db);
	await life.load();

	const lawHouse = new LawHouse(db, new Language(), life);
	lawHouse.session();

	setInterval(() => {
		lawHouse.session();
	}, 4 * 60 * 60 * 1000);

	life.vote();

	/*for (let resident of await db.resident.where(resident => resident.figure == null).toArray()) {
		console.log(resident.givenName)

		await life.assignFigure(resident);
	}*/

	new BaseTileServer(app, db);
	new PropertyRegisterTileServer(app, db);

	// life.tick();

	new FillLife(life, db).fillEmptyDwellings();

	ViewModel.globalFetchingContext = db;

	const connections = [];

	(app.app as any).ws('/game', socket => connections.push(socket));

	// new Proxy(app);

	new GameBridge(app, db, message => {
		for (let connection of connections) {
			try {
				connection.send(Message.encode(message));
			} catch {}
		}
	});

	new ArticleImageInterface(app, db);
	new ResidentImageInterface(app, db, life);

	app.createInjector = context => new Inject({
		Context: context,
		DbContext: db,
		Life: life,
		LawHouse: lawHouse
	});

	app.prepareRoutes();
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));
	app.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

	// const movementHeatmap = new MovementHeatmap(db);
	// movementHeatmap.render();

	app.start(+process.env.PORT || 7420);
});
