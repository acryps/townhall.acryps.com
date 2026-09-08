import { createHash } from "crypto";
import { DbContext, MapTile, MapType } from "../managed/database";
import { Canvas, CanvasRenderingContext2D, loadImage } from "skia-canvas";
import { PackedPoint, Point } from "../../interface/point";
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

	// re-imports entire map
	async reimport() {
		const regions = await this.database.mapTile.includeTree({ id: 1, regionX: 1, regionY: 1 }).toArray();

		const imported: string[] = [];

		const station = new Point(-1, -1);
		await this.update(station);
		imported.push(station.toString());

		for (let region of regions) {
			const point = new Point(region.regionX, region.regionY);

			if (!imported.includes(point.toString())) {
				console.log(point.x, point.y);

				await this.update(point);

				imported.push(point.toString());
			}
		}
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

				if (entry.complete) {
					const last = await this.database.mapTile
						.where(tile => tile.regionX == entry.regionX)
						.where(tile => tile.regionY == entry.regionY)
						.where(tile => tile.type == type)
						.where(tile => tile.captured.isBefore(entry.captured))
						.where(tile => tile.complete == true)
						.orderByDescending(tile => tile.captured)
						.first();

					if (last) {
						const changes = await this.findChangedBlocks(last, entry);
						logger.log(`changed ${changes.length} blocks from ${last.id} to ${entry.id}`);

						entry.changedBlocks = Point.pack(changes);
						await entry.update();
					}
				}

				logger.finish(`changed, ${entry.complete ? 'complete' : 'has holes'}`);
			}
		}
	}

	async findChangedBlocks(old: MapTile, updated: MapTile) {
		const canvas = new Canvas(mapBaseTileSize, mapBaseTileSize);
		const context = canvas.getContext('2d');

		context.drawImage(await loadImage(old.image), 0, 0);
		const oldPixels = [...context.getImageData(0, 0, mapBaseTileSize, mapBaseTileSize).data];

		context.clearRect(0, 0, mapBaseTileSize, mapBaseTileSize);
		context.drawImage(await loadImage(updated.image), 0, 0);
		const updatedPixels = [...context.getImageData(0, 0, mapBaseTileSize, mapBaseTileSize).data];

		const changes: Point[] = [];

		for (let x = 0; x < mapBaseTileSize; x++) {
			for (let y = 0; y < mapBaseTileSize; y++) {
				const offset = ((y * mapBaseTileSize) + x) * 4;

				if (
					(oldPixels[offset] != updatedPixels[offset]) ||
					(oldPixels[offset + 1] != updatedPixels[offset + 1]) ||
					(oldPixels[offset + 2] != updatedPixels[offset + 2])
				) {
					changes.push(new Point(x + old.regionX * mapBaseTileSize, y + old.regionY * mapBaseTileSize));
				}
			}
		}

		return changes;
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
