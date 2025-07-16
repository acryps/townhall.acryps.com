import { Service } from "vlserver";
import { DbContext, MapType } from "../../managed/database";
import { Point } from "../../../interface/point";
import { Canvas, loadImage } from "skia-canvas";
import { createHash, Hash } from "node:crypto";
import { ChangeFrame, ChangeFrameViewModel } from "./frame";
import { mapBaseTileSize } from "../../../interface/tile";

export class ChangeService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getChanges(minX: number, minY: number, maxX: number, maxY: number) {
		const tileSize = mapBaseTileSize;

		const minRegion = new Point(
			Math.floor(minX / tileSize),
			Math.floor(minY / tileSize)
		);

		const maxRegion = new Point(
			Math.ceil(maxX / tileSize),
			Math.ceil(maxY / tileSize)
		);

		let lastChange;
		const changes: ChangeFrame[] = [];
		const count = 50;
		let fetched = 0;

		const canvas = new Canvas(maxX - minX, maxY - minY);
		const context = canvas.getContext('2d');
		context.translate(-minX, -minY);

		do {
			const tiles = await this.database.mapTile
				.where(tile => tile.type == MapType.overworld)
				.where(tile => tile.complete == true)
				.where(tile => tile.regionX >= minRegion.x && tile.regionX <= maxRegion.x)
				.where(tile => tile.regionY >= minRegion.y && tile.regionY <= maxRegion.y)
				.orderByDescending(tile => tile.captured)
				.skip(fetched)
				.limit(count * 2)
				.toArray();

			for (let tile of tiles) {
				const image = await loadImage(tile.image);
				context.drawImage(image, tile.regionX * tileSize, tile.regionY * tileSize);

				const change = new ChangeFrame(await canvas.toBuffer('png'), tile.captured);

				if (change.hash != lastChange?.hash) {
					changes.push(change);

					lastChange = change;
				}
			};

			fetched += tiles.length;

			console.log(tiles.length, fetched)

			if (fetched > count * 3) {
				break;
			}

			if (tiles.length < count) {
				break;
			}
		} while (changes.length < count);

		return ChangeFrameViewModel.from(changes);
	}
}
