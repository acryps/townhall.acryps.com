import { Canvas, CanvasRenderingContext2D } from "skia-canvas";
import { ManagedServer } from "../../../managed/server";
import { Point } from "../../../../interface/point";
import { Shape } from "../../../../interface/shape";

export class ShapeTileServer {
	constructor(
		app: ManagedServer,
		route: string,

		fetch: (parameters: Record<string, string>) => Promise<Shape[]>,
	) {
		const size = 500;

		app.app.get(`/tile/${route}/:x/:y`, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			const shapes = await fetch(request.params);

			response.json(shapes
				.filter(shape => Point.touches(offset, size, Point.unpack(shape.bounds)))
			);
		});

		app.app.get(`/pick/${route}/:x/:y`, async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const shapes = await fetch(request.params);

			const canvas = new Canvas(1, 1);
			const context = canvas.getContext('2d');

			const offset = new Point(x, y);

			for (let shape of shapes) {
				if (shape.id) {
					Shape.render(shape, offset, context as any);

					const intensity = context.getImageData(0, 0, 1, 1).data[3];

					if (intensity) {
						return response.json(shape.id);
					}
				}
			}

			response.json(null);
		});
	}
}
