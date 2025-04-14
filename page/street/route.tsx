import { Component } from "@acryps/page";
import { Point, PackedPointArray } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { drawDanwinstonLine } from "../../interface/line";

export class RouteComponent extends Component {
	points: Point[];
	previousPoints: Point[];

	constructor(
		private shape: PackedPointArray,
		private previousShape: PackedPointArray
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
		context.strokeStyle = '#ccf';

		for (let segmentIndex = 1; segmentIndex < this.previousPoints.length; segmentIndex++) {
			const start = this.previousPoints[segmentIndex - 1];
			const end = this.previousPoints[segmentIndex];

			drawDanwinstonLine(context, start.subtract(topLeft), end.subtract(topLeft));
		}

		context.strokeStyle = '#000';

		for (let segmentIndex = 1; segmentIndex < this.points.length; segmentIndex++) {
			const start = this.points[segmentIndex - 1];
			const end = this.points[segmentIndex];

			drawDanwinstonLine(context, start.subtract(topLeft), end.subtract(topLeft));
		}

		return canvas;
	}
}
