import { Canvas, ImageData } from "skia-canvas";
import { Point } from "../../../../interface/point";
import { ManagedServer } from "../../../managed/server";

export class HeatmapTileServer {
	constructor(
		app: ManagedServer,
		route: string,

		size: number,
		scale: number,

		fetch: (minX: number, minY: number, maxX: number, maxY: number) => Promise<{ x: number, y: number }[]>
	) {
		app.app.get(`/tile/${route}/:x/:y`, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			const canvas = new Canvas(size, size);
			const context = canvas.getContext('2d');

			const image = new ImageData(size, size);

			const points = await fetch(offset.x, offset.y, offset.x + size, offset.y + size);
			const matrix = new Array(size * size).fill(0);

			for (let point of points) {
				const x = Math.round(point.x - offset.x);
				const y = Math.round(point.y - offset.y);

				if (x >= 0 && y >= 0 && x < size && y < size) {
					const base = x + size * y;

					matrix[base] = (matrix[base] ?? 0) + 1;
				}
			}

			for (let offset = 0; offset < matrix.length; offset++) {
				const intensity = matrix[offset] / scale;
				const color = this.intensityToColor(intensity);
				const transparency = Math.min(intensity * 4, 1);

				image.data[offset * 4 + 0] += color.red * transparency;
				image.data[offset * 4 + 1] += color.green * transparency;
				image.data[offset * 4 + 2] += color.blue * transparency;
				image.data[offset * 4 + 3] += transparency * 0x8f + 0x8f;
			}

			context.putImageData(image, 0, 0);

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});
	}

	intensityToColor(value: number) {
		const hue = (1 - value) * 120;

		const chroma = 1;
		const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
		let red = 0, green = 0, blue = 0;

		if (hue < 60) {
			red = chroma;
			green = x;
			blue = 0;
		} else {
			red = x;
			green = chroma;
			blue = 0;
		}

		red = Math.floor(red * 0xff);
		green = Math.floor(green * 0xff);
		blue = Math.floor(blue * 0xff);

		return { red, green, blue };
	}
}
