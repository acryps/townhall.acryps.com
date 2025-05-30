import { PackedPointArray, Point } from "./point";
import { drawDanwinstonLine } from './line';

export type RenderableShape = {
	fill?: string;
	stroke?: string;
	bounds: PackedPointArray;
	open?: boolean;
}

export class Shape {
	id: string;
	fill?: string;
	stroke?: string;
	bounds: PackedPointArray;
	name?: string;
	open?: boolean;

	static render(shape: RenderableShape, offset: Point, context: CanvasRenderingContext2D) {
		if (!shape) {
			return;
		}

		const bounds = Point.unpack(shape.bounds);

		if (bounds.length < 3) {
			return;
		}

		// use normal algorithm for fill
		if (shape.fill) {
			context.beginPath();

			for (let index = 0; index < bounds.length; index++) {
				const point = bounds[index].subtract(offset).add(new Point(0.5, 0.5));

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

			for (let index = 0; index < bounds.length - (shape.open ? 1 : 0); index++) {
				const start = bounds[index].subtract(offset);
				const end = bounds[(index + 1) % bounds.length].subtract(offset);

				drawDanwinstonLine(context, start, end);
			}
		}
	}
}
