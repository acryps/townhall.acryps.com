import { Canvas, loadImage } from "skia-canvas";
import { getTiles, mapBaseTileSize } from "../../interface/tile";
import { DbContext, MapType } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { Point } from "../../interface/point";

export class WallpaperInterface {
	static superScale = 4;

	constructor(
		app: ManagedServer,
		private database: DbContext
	) {
		app.app.get('/wallpaper/:city/1080', this.size(1920, 1080, 2));
		app.app.get('/wallpaper/:city/4k', this.size(3360, 1890, 5));
		app.app.get('/wallpaper/:city/large', this.size(3360, 1890, 2));
		app.app.get('/wallpaper/:city/mobile', this.size(1000, 2400, 4));
	}

	size(width: number, height: number, scale: number) {
		width /= scale;
		height /= scale;

		const cache = new Map<string, Buffer>();

		return async (request, response) => {
			const city = await this.database.city.first(city => city.tag == request.params.city);

			if (!city) {
				response.status(404);
				response.end('city not found');

				return;
			}

			if (cache.get(city.id)) {
				response.contentType('image/png');
				response.end(cache);

				return;
			}

			const canvas = new Canvas(width * scale, height * scale);

			const context = canvas.getContext('2d');
			context.imageSmoothingEnabled = false;

			const center = new Point(city.centerX, city.centerY);
			const left = Math.floor(center.x - width / 2);
			const top = Math.floor(center.y - height / 2);

			const tiles = getTiles(center, width, height, mapBaseTileSize);

			for (let region of tiles) {
				const latest = await this.database.mapTile
					.where(tile => tile.regionX == region.x && tile.regionY == region.y)
					.where(tile => tile.type == MapType.night)
					.where(tile => tile.complete == true)
					.orderByDescending(tile => tile.captured)
					.first();

				if (latest) {
					const x = region.x * mapBaseTileSize;
					const y = region.y * mapBaseTileSize;

					context.drawImage(
						await loadImage(latest.image),
						(x - left) * scale,
						(y - top) * scale,
						mapBaseTileSize * scale,
						mapBaseTileSize * scale
					);
				}
			}

			const image = await canvas.toBuffer('png');

			// keep in cache for 1 hour
			cache.set(city.id, image);
			setTimeout(() => cache.delete(city.id), 1000 * 60 * 60);

			response.contentType('image/png');
			response.end(image);
		};
	}
}
