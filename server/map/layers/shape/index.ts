import { Canvas, CanvasRenderingContext2D } from "skia-canvas";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { Point } from "../../../../interface/point";
import { drawDanwinstonLine } from "../../../../interface/line";

type Shape = {
	id: string,
	fill: string,
	stroke: string,
	bounds: Point[]
};

export class ShapeTileServer {
	constructor(
		app: ManagedServer,
		route: string,

		fetch: () => Promise<Shape[]>,
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
				this.render(context, offset, shape);
			}

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});

		app.app.get(`/pick/${route}/:x/:y`, async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const offset = new Point(x, y);
			const shapes = await fetch();

			const canvas = new Canvas(1, 1);
			const context = canvas.getContext('2d');

			for (let shape of shapes) {
				this.render(context, offset, shape);

				const intensity = context.getImageData(0, 0, 1, 1).data[3];

				if (intensity) {
					return response.json(shape.id);
				}
			}

			response.json(null);
		});
	}

	private render(context: CanvasRenderingContext2D, offset: Point, shape: Shape) {
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
}
