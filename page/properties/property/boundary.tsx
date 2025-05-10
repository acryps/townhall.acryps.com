import { Component } from "@acryps/page";
import { PackedPointArray, Point } from "../../../interface/point";
import { Shape } from "../../../interface/shape";
import { ColorValue, Hex } from "@acryps/style";
import { negativeColor, neutralColor, pageTextColor, positiveColor } from "../../index.style";

export class BoundaryComponent extends Component {
	points: Point[];
	previousPoints: Point[];

	constructor(
		private shape: PackedPointArray,
		private previousShape?: PackedPointArray
	) {
		super();

		this.points = Point.unpack(shape);
		this.previousPoints = previousShape ? Point.unpack(previousShape) : [];
	}

	render() {
		const canvas = document.createElement('canvas');

		const bounds = Point.bounds([...this.points, ...this.previousPoints]);
		const topLeft = new Point(bounds.x.min, bounds.y.min);

		canvas.width = bounds.width + 1;
		canvas.height = bounds.height + 1;

		const context = canvas.getContext('2d');

		requestAnimationFrame(async () => {
			if (this.previousShape) {
				const base = await this.renderShape(context, this.shape, topLeft, neutralColor);
				const added = await this.renderShape(context, this.shape, topLeft, positiveColor);
				const removed = await this.renderShape(context, this.previousShape, topLeft, negativeColor);

				context.drawImage(removed, 0, 0);

				context.globalCompositeOperation = 'source-atop';
				context.drawImage(base, 0, 0);

				context.globalCompositeOperation = 'destination-over';
				// context.drawImage(removed, 0, 0);
				context.drawImage(added, 0, 0);
			} else {
				await this.renderShape(context, this.shape, topLeft, positiveColor);
			}
		});

		return canvas;
	}

	private renderShape(context: CanvasRenderingContext2D, shape: string, topLeft: Point, color: Hex) {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		Shape.render({
			bounds: shape,
			stroke: color.toValueString(),
			fill: color.toValueString()
		}, topLeft, context);

		const image = new Image();

		return new Promise<HTMLImageElement>(async done => {
			image.onload = () => done(image);

			image.src = context.canvas.toDataURL();
		});
	}
}
