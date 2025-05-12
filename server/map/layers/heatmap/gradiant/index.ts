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
		sample: (position: Point, range: number) => number
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
					const sampeledValue = sample(
						new Point(
							x * interpolationFieldSize + offset.x - interpolationFieldSize,
							y * interpolationFieldSize + offset.y - interpolationFieldSize
						),

						interpolationFieldSize / 2
					);

					if (sampeledValue === null) {
						context.fillStyle = 'white';
						context.fillRect(x, y, 1, 1);
					} else {
						const value = Math.min(
							maxValue,
							sampeledValue
						);

						context.fillStyle = `hsl(${value / maxValue * 300}deg, 100%, 50%)`;
						context.fillRect(x, y, 1, 1);
					}
				}
			}

			// scale and interpolate
			const image = await canvas.toBuffer('png');

			canvas.width = tileSize;
			canvas.height = tileSize;

			context.drawImage(
				await loadImage(image),
				-interpolationFieldSize,
				-interpolationFieldSize,
				tileSize + interpolationFieldSize * 2,
				tileSize + interpolationFieldSize * 2
			);

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});
	}
}
