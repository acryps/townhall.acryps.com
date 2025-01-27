import { createHash } from "crypto";
import { DbContext, MapTile, MapType } from "../managed/database";
import { Canvas, CanvasRenderingContext2D, loadImage } from "skia-canvas";

export class MapImporter {
	static readonly tile = 250;
	readonly size = 8000;

	readonly regions = this.size / MapImporter.tile;

	private lastMapHash: string;

	constructor(
		private type: MapType,
		private database: DbContext
	) {}

	static schedule(type: MapType, database: DbContext) {
		const importer = new MapImporter(type, database);

		const next = () => importer.update()
			.then(() => setTimeout(() => next(), 1000 * 60 * 5))
			.catch(error => {
				console.warn('map import failed', error);

				setTimeout(() => next(), 1000 * 60 * 1);
			});

		next();
	}

	async update() {
		console.log(new Date().toISOString(), 'updating map...');

		const source = Buffer.from(
			await fetch(`http://minecraft.acryps.com:9941/${this.type == MapType.overworld ? 'map' : 'night'}.png`)
				.then(response => response.arrayBuffer())
		);

		// skip re-importing the same map
		const mapHash = createHash('sha1').update(source).digest('base64');

		if (mapHash == this.lastMapHash) {
			return;
		}

		console.log(`new map: ${mapHash}`);

		this.lastMapHash = mapHash;

		const map = await loadImage(source);

		const canvas = new Canvas(MapImporter.tile, MapImporter.tile);
		const context = canvas.getContext('2d');

		const date = new Date();

		for (let x = 0; x < this.regions; x++) {
			for (let y = 0; y < this.regions; y++) {
				context.clearRect(0, 0, MapImporter.tile, MapImporter.tile);
				context.drawImage(map, -x * MapImporter.tile, -y * MapImporter.tile);

				const image = await canvas.toBuffer('png');

				const hash = createHash('sha1').update(image).digest('base64');

				if (await this.database.mapTile.where(tile => tile.hash.valueOf() == hash).count() == 0) {
					const entry = new MapTile();
					entry.image = image;
					entry.regionX = x - this.regions / 2;
					entry.regionY = y - this.regions / 2;
					entry.captured = date;
					entry.hash = hash;
					entry.complete = !this.hasHoles(context);
					entry.type = this.type;

					await entry.create();

					console.log('+tile', x, y);
				}
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
