import { Canvas, loadImage } from "skia-canvas";
import { DbContext, MapType } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { MapImporter } from "./import";

export class BaseTileServer {
	constructor(
		private app: ManagedServer,
		private database: DbContext
	) {
		app.app.get('/tile/base/:type/:x/:y', async (request, response) => {
			const type = request.params.type == 'day' ? MapType.overworld : MapType.night;

			const x = +request.params.x;
			const y = +request.params.y;

			const newest = await database.mapTile
				.where(tile => tile.regionX == x)
				.where(tile => tile.regionY == y)
				.where(tile => tile.type == type)
				.where(tile => tile.complete == true)
				.orderByDescending(tile => tile.captured)
				.first();

			if (newest) {
				response.contentType('image/png');
				response.end(newest.image);
			}
		});

		app.app.get('/map/area/:minX/:minY/:maxX/:maxY', async (request, response) => {
			const minX = +request.params.minX;
			const minY = +request.params.minY;
			const maxX = +request.params.maxX;
			const maxY = +request.params.maxY;

			const width = maxX - minX;
			const height = maxY - minY;

			if (width <= 0 || width > 1000 || height <= 0 || height > 1000) {
				response.status(500);
				response.send(`area too big / too small / inverted (max dimension 1000)`);
			}

			const canvas = new Canvas(width, height);
			const context = canvas.getContext('2d');

			const offset = {
				x: minX % MapImporter.tile,
				y: minY % MapImporter.tile,
			}

			for (let x = Math.floor(minX / MapImporter.tile); x < Math.ceil(maxX / MapImporter.tile); x++) {
				for (let y = Math.floor(minY / MapImporter.tile); x < Math.ceil(maxY / MapImporter.tile); y++) {
					const tile = await database.mapTile
						.where(tile => tile.regionX == x)
						.where(tile => tile.regionY == y)
						.where(tile => tile.type == MapType.overworld)
						.where(tile => tile.complete == true)
						.orderByDescending(tile => tile.captured)
						.first();

					if (tile) {
						const image = await loadImage(tile.image);

						context.drawImage(
							image,
							x * MapImporter.tile - offset.x,
							y * MapImporter.tile - offset.y
						);
					}
				}
			}

			response.contentType('image/png');
			response.end(await canvas.toBuffer('png'));
		});
	}
}
