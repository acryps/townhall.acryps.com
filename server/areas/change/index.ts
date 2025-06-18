import { Service } from "vlserver";
import { DbContext, MapType } from "../../managed/database";
import { Point } from "../../../interface/point";
import { Canvas, loadImage } from "skia-canvas";
import { createHash, Hash } from "node:crypto";
import { ChangeFrame, ChangeFrameViewModel } from "./frame";

export class ChangeService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getChanges(minX: number, minY: number, maxX: number, maxY: number) {
		const tileSize = 250;

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

		const canvas = new Canvas(maxX - minX, maxY - minY);
		const context = canvas.getContext('2d');
		context.translate(-minX, -minY);

		const tiles = await this.database.mapTile
			.where(tile => tile.type == MapType.overworld)
			.where(tile => tile.complete == true)
			.where(tile => tile.regionX >= minRegion.x && tile.regionX <= maxRegion.x)
			.where(tile => tile.regionY >= minRegion.y && tile.regionY <= maxRegion.y)
			.orderByDescending(tile => tile.captured)
			.skip(changes.length)
			.limit(500)
			.toArray();

		for (let tile of tiles) {
			const image = await loadImage(tile.image);
			context.drawImage(image, tile.regionX * tileSize, tile.regionY * tileSize);

			const change = new ChangeFrame(canvas.toBufferSync('png'), tile.captured);

			if (change.hash != lastChange?.hash) {
				changes.push(change);

				lastChange = change;
			}
		};

		return ChangeFrameViewModel.from(changes);
	}
}
