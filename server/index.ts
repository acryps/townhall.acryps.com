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

	/*for (let resident of await db.resident.where(resident => resident.figure == null).toArray()) {
		console.log(resident.givenName)

		await life.assignFigure(resident);
	}*/

	new BaseTileServer(app, db);
	new PropertyRegisterTileServer(app, db);

	// life.tick();

	// fill all homes with people
	(async () => {
		const oldestPersonBirthday = +new Date('2021-06-01');
		const youngestParentBirthday = +new Date('2024-01-01');
		const now = +new Date();

		console.log('oldestPersonBirthday', toSimulatedAge(new Date(oldestPersonBirthday)));
		console.log('youngestParentBirthday', toSimulatedAge(new Date(youngestParentBirthday)));
		console.log('now', toSimulatedAge(new Date(now)));

		for (let property of await db.property.include(property => property.borough).include(property => property.dwellings).toArray()) {
			const dwellings = await property.dwellings.toArray();
			const borough = await property.borough.fetch();
			const standing = Math.random();

			for (let dwelling of dwellings) {
				if (await dwelling.tenants.count() == 0) {
					if (Math.random() > 0.2) {
						const fatherBirthday = new Date(oldestPersonBirthday + Math.random() * (youngestParentBirthday - oldestPersonBirthday));
						const motherBirthday = new Date(
							+fatherBirthday + ((Math.random() * 15 - 2) / 20) * 365 * 24 * 60 * 60 * 1000
						);

						console.log('father', toSimulatedAge(fatherBirthday), 'mother', toSimulatedAge(motherBirthday));

						console.log('FATHER')
						const father = await life.spawn(borough, standing, fatherBirthday, male);

						console.log('MOTHER')
						const mother = await life.spawn(borough, standing, motherBirthday, female);
						const familyName = Math.random() > 0.8 ? mother.familyName : father.familyName;

						const relationship = new ResidentRelationship();
						relationship.initiator = father;
						relationship.peer = mother;
						relationship.purpose = 'Romantic'

						const family = [father, mother];

						const youngestParent = Math.max(+fatherBirthday, +motherBirthday);

						let birthday = new Date(
							youngestParent + ((Math.random() * 20 + 17) / 20) * 365 * 24 * 60 * 60 * 1000
						);

						relationship.connection = 'Family';
						relationship.bonded = +birthday > now ? new Date(now) : birthday;

						await relationship.create();

						while (Math.random() > 0.45 && +birthday < now) {
							const child = await life.merge(father, mother, familyName, birthday, borough);
							birthday = new Date(+birthday + ((Math.random() * 3 + 0.9) / 20) * 365 * 24 * 60 * 60 * 1000);

							console.log('next birthday', toSimulatedAge(birthday));

							family.push(child);
						}

						const moveIn = new Date(+now - ((Math.random() * 100) / 20) * 365 * 24 * 60 * 60 * 1000);

						for (let peer of family) {
							const tenancy = new Tenancy();
							tenancy.inhabitant = peer;
							tenancy.dwelling = dwelling;
							tenancy.start = new Date(Math.max(+peer.birthday, +moveIn));

							await tenancy.create();

							peer.mainTenancyId = tenancy.id;
							await peer.update();
						}
					} else {
						const birthday = new Date(oldestPersonBirthday + Math.random() * (youngestParentBirthday - oldestPersonBirthday));
						const person = await life.spawn(borough, standing, birthday);

						const tenancy = new Tenancy();
						tenancy.inhabitant = person;
						tenancy.dwelling = dwelling;
						tenancy.start = birthday;

						await tenancy.create();

						person.mainTenancyId = tenancy.id;
						await person.update();
					}
				}
			}
		}

		console.log('DONE');
	})();

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
