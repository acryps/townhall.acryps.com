import { createHash } from "crypto";
import { DbContext, MapTile, MapType } from "../managed/database";
import { Canvas, CanvasRenderingContext2D, loadImage } from "skia-canvas";
import { Point } from "../../interface/point";
import { mapBaseTileSize } from "../../interface/tile";
import { Logger } from "@acryps/log";

export class MapImporter {
	static readonly tile = mapBaseTileSize;

	static readonly debounce = 1000 * 30;

	// the server saves every 600 ticks (30s), but it might take longer
	// this makes sure that all tiles are saved at some point
	static readonly sureSaved = 1000 * 60 * 5;

	private static instance: MapImporter;

	private logger = new Logger('map-import');

	changedRegions: Point[] = [];

	constructor(
		private database: DbContext
	) {
		if (MapImporter.instance) {
			throw new Error('Multiple MapImporters running.');
		}

		MapImporter.instance = this;
	}

	// call when a change is suspected at the location
	static poke(point: Point) {
		const region = new Point(point.x / MapImporter.tile, point.y / MapImporter.tile).floor();

		if (!MapImporter.instance.changedRegions.find(peer => peer.x == region.x && peer.y == region.y)) {
			MapImporter.instance.changedRegions.push(region);

			setTimeout(async () => {
				await MapImporter.instance.update(region);

				MapImporter.instance.changedRegions.splice(MapImporter.instance.changedRegions.indexOf(region), 1);
			}, MapImporter.debounce);

			setTimeout(() => MapImporter.instance.update(region), MapImporter.sureSaved);
		}
	}

	async update(region: Point) {
		const logger = this.logger.task(`update region ${region.x} ${region.y}`);

		for (let type of [MapType.overworld, MapType.night]) {
			logger.log(`fetch ${type}`);

			const source = Buffer.from(
				await fetch(`http://minecraft.acryps.com:9994/${type == MapType.overworld ? 'day' : 'night'}/${region.x}/${region.y}`)
					.then(response => response.arrayBuffer())
			);

			logger.log(`fetch ${type}`);
			const tile = await loadImage(source);

			const canvas = new Canvas(MapImporter.tile, MapImporter.tile);
			const context = canvas.getContext('2d');
			context.drawImage(tile, 0, 0);

			const image = await canvas.toBuffer('png');
			const hash = createHash('sha1').update(image).digest('base64');

			logger.log(`hashed ${hash}`);

			if (await this.database.mapTile.where(tile => tile.hash.valueOf() == hash).count() == 0) {
				const entry = new MapTile();
				entry.image = image;
				entry.regionX = region.x;
				entry.regionY = region.y;
				entry.captured = new Date();
				entry.hash = hash;
				entry.complete = !this.hasHoles(context);
				entry.type = type;

				await entry.create();

				logger.finish(`changed, ${entry.complete ? 'complete' : 'has holes'}`);
			}
		}
	}

	private hasHoles(context: CanvasRenderingContext2D) {
		const imageData = context.getImageData(0, 0, MapImporter.tile, MapImporter.tile);

		for (let index = 0; index < imageData.data.length; index += 4 * 64) {
			if (imageData.data[index + 3] == 0) {
				return true;
			}
		}

		return false;
	}
}
