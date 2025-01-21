import { DbSet, Entity } from "vlquery";
import { DbContext } from "./managed/database";
import { ManagedServer } from "./managed/server";

export class GoInterface {
	cache = new Map<string, string>();

	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		app.app.get('/go/:id', async (request, response) => {
			const id = request.params.id;

			if (this.cache.has(id)) {
				return response.redirect(this.cache.get(id));
			}

			const route = await new Promise<string>(done => {
				const tasks = [
					this.find(id, database.article, (id, item) => `/news/article/${id}`),
					this.find(id, database.bill, (id, item) => `/vote/bill/${item.tag}`),
					this.find(id, database.borough, (id, item) => `/borough/${item.tag}`),
					this.find(id, database.property, (id, item) => `/property/${id}`),
					this.find(id, database.resident, (id, item) => `/resident/${item.tag}`),

					// recurse
					this.find(id, database.vote, (id, item) => `/go/${item.residentId}`),
					this.find(id, database.residentRelationship, (id, item) => `/go/${item.initiatorId}`),
				];

				let failed = 0;

				for (let task of tasks) {
					task.then(route => {
						if (route) {
							return done(route);
						}

						failed++;

						if (failed == tasks.length) {
							return done(null);
						}
					})
				}
			});

			if (!route) {
				return response.status(404).end('item not found');
			}

			this.cache.set(id, route);
			response.redirect(route);
		});
	}

	async find<ItemType extends Entity<any>>(id: string, table: DbSet<ItemType, any>, route: (id: string, item: ItemType) => string) {
		const item = await table.find(id);

		if (!item) {
			return;
		}

		return route(id, item);
	}
}
