import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { Article, ArticleImage, Bridge, DbContext, MapType, Movement, Resident, ResidentFigure, ResidentRelationship, Tenancy, TenancyQueryProxy } from "./managed/database";
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
import { FillLife } from "./life/fill/fill";
import { GoInterface } from "./go";
import { PropertyTileServer } from "./map/layers/shape/property";
import { BoroughTileServer } from "./map/layers/shape/borough";
import { MovementTileServer } from "./map/layers/heatmap/movement";
import { PropertyUsageTileServer } from "./map/layers/shape/usage";
import { ImpressionImageInterface } from "./areas/impressions/interface";
import { StreetTileServer } from "./map/layers/shape/street";
import { updateWorkOffers } from "./life/work/offers";
import { adjustRoleList } from "./life/work/list";

const runLife = process.env.RUN_LIFE == 'YES';

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log('connected to database!');

	const app = new ManagedServer();
	ws(app.app);

	const database = new DbContext(new RunContext());
	new MapImporter(database);

	const life = new Life(database);
	await life.load();

	const lawHouse = new LawHouse(database, new Language('smart'), life);

	if (runLife) {
		lawHouse.schedule();
		life.vote();

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

	new BaseTileServer(app, database);
	new PropertyTileServer(app, database);
	new StreetTileServer(app, database); // temporarely only!
	new BoroughTileServer(app, database);
	new PropertyUsageTileServer(app, database);
	// new MovementTileServer(app, database);

	// life.tick();
	/// new FillLife(life, db).fillEmptyDwellings();

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
