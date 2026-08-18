import { DbContext, Impression } from "../../managed/database";
import { ManagedServer } from "../../managed/server";

export class ImpressionImageInterface {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		const impressionCache = new Map<string, Impression>();

		app.app.get('/impression/image/:id', async (request, response) => {
			const id = request.params.id;

			let impression = impressionCache.get(id);

			if (!impression) {
				impression = await database.impression.find(id);

				if (!impression) {
					return response.status(404).end('image not found');
				}

				impressionCache.set(id, impression);
			}

			response.setHeader('cache-control', 'public, max-age=31536000, immutable');

			response.contentType(impression.mimeType);
			response.end(impression.image);
		});
	}
}
