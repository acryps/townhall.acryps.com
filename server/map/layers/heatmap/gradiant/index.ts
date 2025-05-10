import { Canvas, ImageData, loadImage } from "skia-canvas";
import { Point } from "../../../../../interface/point";
import { ManagedServer } from "../../../../managed/server";

export class GradiantHeatmapTileServer {
	baseTransparency = 0xaf;

	constructor(
		app: ManagedServer,
		route: string,

		tileSize: number,
		interpolationFieldSize: number,

		maxValue: number,
		sample: (position: Point) => number
	) {
		if (tileSize % interpolationFieldSize) {
			throw 'Interpolation field must be even fraction of tile size';
		}

		app.app.get(`/tile/${route}/:x/:y`, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * tileSize, regionY * tileSize);

			// oversample in all directions to ensure smooth edges
			const sampleSize = tileSize / interpolationFieldSize + 2;

			const canvas = new Canvas(sampleSize, sampleSize);
			const context = canvas.getContext('2d');

			for (let x = 0; x < sampleSize; x++) {
				for (let y = 0; y < sampleSize; y++) {
					const value = sample(new Point(
						x * interpolationFieldSize + offset.x - interpolationFieldSize,
						y * interpolationFieldSize + offset.y - interpolationFieldSize
					));

					context.fillStyle = `hsla(${value / maxValue * 120}deg, 100%, 50%, 80%)`;
					context.fillRect(x, y, 1, 1);
				}
			}

			// scale and interpolate
			const image = await canvas.toBuffer('png');

			canvas.width = tileSize;
			canvas.height = tileSize;

			context.drawImage(await loadImage(image), -interpolationFieldSize, -interpolationFieldSize, tileSize + interpolationFieldSize, tileSize + interpolationFieldSize);

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});
	}
}
