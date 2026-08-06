import { DbContext } from "../../managed/database";
import { ManagedServer } from "../../managed/server";

export class CommodityIconImageInterface {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		const cache = new Map<string, Buffer>();

		app.app.get('/commodity/icon/:id', async (request, response) => {
			const id = request.params.id;

			if (cache.has(id)) {
				return response.end(cache.get(id));
			}

			try {
				const image = await database.commodityIcon.find(id);

				if (!image) {
					return response.status(404).end('image not found');
				}

				cache.set(id, image.icon);
				response.end(image.icon);
			} catch {
				response.status(404).end();
			}
		});
	}
}
