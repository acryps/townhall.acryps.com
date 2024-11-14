import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { Bridge, DbContext, MapType, Movement } from "./managed/database";
import ws from 'express-ws';
import { join } from "path";
import { Proxy } from "./proxy";
import { GameBridge } from "./bridge";
import { Message } from "../interface";
import { MovementHeatmap } from "./movement-heatmap";

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(() => {
	console.log("connected to database!");

	const app = new ManagedServer();
	ws(app.app);

	const db = new DbContext(new RunContext());

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

	app.createInjector = context => new Inject({
		Context: context,
		DbContext: db
	});

	app.prepareRoutes();
	app.use(new StaticFileRoute('/assets/', join(process.cwd(), '..', 'page', 'assets')));
	app.use(new StaticFileRoute('/bundle/', join(process.cwd(), '..', 'page', '.built')));
	app.app.use('*', (request, response) => response.sendFile(join(process.cwd(), '..', 'page', 'assets', 'index.html')));

	const movementHeatmap = new MovementHeatmap(db);
	movementHeatmap.render();


	/*db.player.toArray().then(players => {
		for (let player of players) {
			let x = 0;
			let y = 0;

			let direction = 0;
			let speed = 1;

			setInterval(() => {
				x += Math.sin(direction) * speed;
				y += Math.cos(direction) * speed;

				speed += (Math.random() - 0.5) / 100;

				if (speed < 0) {
					speed = 0;
				} else if (speed > 3) {
					speed = 3;
				}

				direction += (Math.random() - 0.5) / 10;

				const movement = new Movement();
				movement.x = x;
				movement.y = y;

				movement.time = new Date();
				movement.player = player;

				movement.create();
			}, 10);
		}
		});*/


	app.start(+process.env.PORT || 7420);
});
