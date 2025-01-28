import { Canvas } from "skia-canvas";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { Point } from "../../../../interface/point";
import { drawDanwinstonLine } from "../../../../interface/line";

export class ShapeTileServer {
	constructor(
		app: ManagedServer,
		route: string,

		fetch: () => Promise<{ id: string, fill: string, stroke: string, bounds: Point[] }[]>,
	) {
		const size = 500;

		app.app.get(`/tile/${route}/:x/:y`, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			const shapes = await fetch();

			const canvas = new Canvas(size, size);
			const context = canvas.getContext('2d');

			for (let shape of shapes) {
				// use normal algorithm for fill
				if (shape.fill) {
					context.beginPath();

					for (let index = 0; index < shape.bounds.length; index++) {
						const point = shape.bounds[index].subtract(offset).add(new Point(0.5, 0.5));

						if (index) {
							context.lineTo(point.x, point.y);
						} else {
							context.moveTo(point.x, point.y);
						}
					}

					context.closePath();

					context.fillStyle = shape.fill;
					context.fill();
				}

				// use legally binding algorithm for strokes
				if (shape.stroke) {
					context.strokeStyle = shape.stroke;

					for (let index = 0; index < shape.bounds.length; index++) {
						const start = shape.bounds[index].subtract(offset);
						const end = shape.bounds[(index + 1) % shape.bounds.length].subtract(offset);

						drawDanwinstonLine(context, start, end);
					}
				}
			}

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});

		app.app.get(`/pick/${route}/:x/:y`, async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const canvas = new Canvas(size, size);
			const context = canvas.getContext('2d');

			const shapes = await fetch();

			for (let shape of shapes) {
				const bounds = Point.bounds(shape.bounds);

				canvas.width = bounds.width;
				canvas.height = bounds.height;

				context.beginPath();

				for (let index = 0; index < shape.bounds.length; index++) {
					const point = shape.bounds[index].add(new Point(0.5, 0.5));

					if (index) {
						context.lineTo(point.x - bounds.x.min, point.y - bounds.y.min);
					} else {
						context.moveTo(point.x - bounds.x.min, point.y - bounds.y.min);
					}
				}

				context.fill();

				const intensity = context.getImageData(x - bounds.x.min, y - bounds.y.min, 1, 1).data[3];

				if (intensity == 0xff) {
					return response.json(shape.id);
				}
			}

			response.json(null);
		});
	}
}
