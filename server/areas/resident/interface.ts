import { readFileSync } from "fs";
import { Life } from "../../life";
import { DbContext } from "../../managed/database";
import { ManagedServer } from "../../managed/server";
import { join } from "path";
import { Time } from "../../../interface/time";

export class ResidentImageInterface {
	constructor(
		app: ManagedServer,
		database: DbContext,
		life: Life
	) {
		const residentImageCache = new Map<string, Buffer>();
		const figureCache = new Map<string, Buffer>();

		const defaultAdult = readFileSync(join('..', 'page', 'assets', 'resident', 'adult.webp'));
		const child = readFileSync(join('..', 'page', 'assets', 'resident', 'child.webp'));

		app.app.get('/resident/image/:tag', async (request, response) => {
			const tag = request.params.tag;

			if (residentImageCache.has(tag)) {
				return response.end(residentImageCache.get(tag));
			}

			const resident = await database.resident.first(resident => resident.tag.valueOf() == tag);

			if (!resident) {
				return response.status(404).end('image not found');
			}

			let image: Buffer;

			if (new Time(resident.birthday).age() < 18) {
				image = child;
			} else if (resident.figureId) {
				if (figureCache.has(resident.figureId)) {
					image = figureCache.get(resident.figureId);
				} else {
					const figure = await resident.figure.fetch();
					figureCache.set(resident.figureId, figure.image);

					image = figure.image;
				}

				residentImageCache.set(tag, image);
			} else {
				image = defaultAdult;
			}

			response.end(image);
		});
	}
}
