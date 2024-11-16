import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { Article, ArticleImage, ArticleMedia, Bridge, DbContext, MapType, Movement } from "./managed/database";
import ws from 'express-ws';
import { join } from "path";
import { Proxy } from "./proxy";
import { GameBridge } from "./bridge";
import { Message } from "../interface";
import { MovementHeatmap } from "./movement-heatmap";
import { existsSync, readdirSync, readFileSync } from "fs";
import { ArticleImageInterface } from "./areas/publication/image";
import { Life } from "./life";

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log("connected to database!");

	const app = new ManagedServer();
	ws(app.app);

	const db = new DbContext(new RunContext());

	const life = new Life(db);
	await life.load();

	life.tick();

	/*for (let borough of await db.borough.toArray()) {
		await life.spawn(borough, 0.7, new Date('2021-03-19'));
		}*/

	ViewModel.globalFetchingContext = db;

	const connections = [];

	(app.app as any).ws('/game', socket => connections.push(socket));

	new Proxy(app);
	new GameBridge(app, db, message => {
		for (let connection of connections) {
			try {
				connection.send(Message.encode(message));
			} catch {}
		}
	});

	new ArticleImageInterface(app, db);

	app.createInjector = context => new Inject({
		Context: context,
		DbContext: db,
		Life: life
	});

	app.prepareRoutes();
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));
	app.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

	// const movementHeatmap = new MovementHeatmap(db);
	// movementHeatmap.render();

	app.start(+process.env.PORT || 7420);
});
