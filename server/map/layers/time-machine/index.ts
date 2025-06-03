import { Canvas } from "skia-canvas";
import { DbContext, MapType } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class TimeMachineTileServer {
	constructor(
		private app: ManagedServer,
		private database: DbContext
	) {
		const canvas = new Canvas(250, 250);
		const context = canvas.getContext('2d');
		const imageData = context.createImageData(canvas.width, canvas.height);

		for (let pixelOffset = 0; pixelOffset < imageData.data.length; pixelOffset += 4) {
			imageData.data[pixelOffset + (pixelOffset / 4) % 3] = 0xff;
			imageData.data[pixelOffset + 3] = 0x8f;
		}

		context.putImageData(imageData, 0, 0);

		const noImage = canvas.toBufferSync('png');

		app.app.get('/tile/time-machine/:x/:y/:cutoff', async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;
			const cutoff = new Date(+request.params.cutoff);

			const newest = await database.mapTile
				.where(tile => tile.regionX == x)
				.where(tile => tile.regionY == y)
				.where(tile => tile.type == MapType.overworld)
				.where(tile => tile.complete == true)
				.where(tile => tile.captured.isBefore(cutoff))
				.orderByDescending(tile => tile.captured)
				.first();

			if (newest) {
				response.contentType('image/png');
				response.end(newest.image);
			} else {
				response.contentType('image/png');
				response.end(noImage);
			}
		});
	}
}
