import { Canvas, ImageData } from "skia-canvas";
import { Point } from "../../../../interface/point";
import { ManagedServer } from "../../../managed/server";

export class HeatmapTileServer {
	baseTransparency = 0xaf;

	constructor(
		app: ManagedServer,
		route: string,

		size: number,
		dimensionScales: [number, number, number],

		fetch: (minX: number, minY: number, maxX: number, maxY: number) => Promise<{ x: number, y: number, dimension: (0 | 1 | 2) }[]>
	) {
		app.app.get(`/tile/${route}/:x/:y`, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			const canvas = new Canvas(size, size);
			const context = canvas.getContext('2d');

			const image = new ImageData(size, size);

			for (let offset = 0; offset < size * size * 4;) {
				image.data[offset++] = 0xff;
				image.data[offset++] = 0xff;
				image.data[offset++] = 0xff;

				image.data[offset++] = this.baseTransparency;
			}

			const points = await fetch(offset.x, offset.y, offset.x + size, offset.y + size);

			for (let point of points) {
				const x = Math.floor(point.x - offset.x);
				const y = Math.floor(point.y - offset.y);

				if (x >= 0 && y >= 0 && x < size && y < size) {
					const index = (x + size * y) * 4;
					const scale = dimensionScales[point.dimension];

					for (let dimension = 0; dimension < 3; dimension++) {
						if (dimension != point.dimension) {
							image.data[index + dimension] -= 0xff / scale;
						}
					}

					image.data[index + 3] += (0xff - this.baseTransparency) / scale;
				}
			}

			context.putImageData(image, 0, 0);

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});
	}
}
