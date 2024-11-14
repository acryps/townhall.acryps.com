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

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log("connected to database!");

	const app = new ManagedServer();
	ws(app.app);

	const db = new DbContext(new RunContext());

	const base = '/Users/levvij/Documents/pilegron news';

	for (let file of readdirSync(base).filter(s => s.endsWith('.txt'))) {
		const date = file.replace('.txt', '');
		console.group(new Date(date));

		const articles = readFileSync(join(base, file)).toString().replaceAll('<span class="Apple-converted-space"> </span>', ' ').split(/<p class="p[0-3]"><b>/).slice(2);

		for (let source of articles) {
			const title = source.split('</b>')[0].trim();

			if (title) {
				let content = source.split('</b></p>').slice(1).join('</b></p>');

				// images
				content = content.replace(/<img src="file\:\/\/\/IMG_[0-9]+.jpeg" alt="IMG_[0-9]+.jpeg"><\/p>/g, '\n\n');

				// tags
				content = content.replace(/<\/?[a-z]+(\s+[a-z]+\=\"(.*)\")*>/g, '\n\n');

				while (content.match(/ [ \n]+/)) {
					content = content.replace(/ [ \n]+/, ' ');
				}

				while (content.includes('\n\n\n')) {
					content = content.replace('\n\n\n', '\n\n');
				}

				content = content.trim();

				console.group(title);
				console.log(content)
				console.groupEnd();

				const article = new Article();
				article.title = title;
				article.body = content;
				article.published = new Date(date);

				await article.create();

				if (existsSync(join(base, date))) {
					const files = existsSync(join(base, date, 'images')) ? readdirSync(join(base, date, 'images')).map(i => join(join(base, date, 'images'), i)) : [join(base, date, readdirSync(join(base, date))[0])];

					for (let file of files) {
						const content = readFileSync(file);

						const image = new ArticleImage();
						image.data = content;
						image.article = article;

						await image.create();
					}
				}
			}
		}

		if (existsSync(join(base, date))) {

		}

		console.groupEnd();
	}


	console.log('DONE');
	while (1) { }














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
