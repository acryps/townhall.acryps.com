import { DbContext } from "../../managed/database";
import { ManagedServer } from "../../managed/server";

export class PlayerHeadImageInterface {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		const cache = new Map<string, Buffer>();

		app.app.get('/player/head/:id', async (request, response) => {
			const id = request.params.id;

			if (cache.has(id)) {
				return response.end(cache.get(id));
			}

			try {
				const image = await database.player.find(id);

				if (!image) {
					return response.status(404).end('image not found');
				}

				cache.set(id, image.head);
				response.end(image.head);
			} catch {
				response.status(404).end();
			}
		});
	}
}
