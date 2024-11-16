import { DbContext } from "../../managed/database";
import { ManagedServer } from "../../managed/server";

export class ArticleImageInterface {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		const cache = new Map<string, Buffer>();

		app.app.get('/article/image/:id', async (request, response) => {
			const id = request.params.id;

			if (cache.has(id)) {
				return response.end(cache.get(id));
			}

			const image = await database.articleImage.find(id);

			if (!image) {
				return response.status(404).end('image not found');
			}

			cache.set(id, image.data);
			response.end(image.data);
		});
	}
}
