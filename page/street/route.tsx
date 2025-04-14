import { Component } from "@acryps/page";
import { Point, PackedPointArray } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { drawDanwinstonLine } from "../../interface/line";

export class RouteComponent extends Component {
	points: Point[];

	constructor(
		private shape: PackedPointArray
	) {
		super();

		this.points = Point.unpack(shape);
	}

	render() {
		const canvas = document.createElement('canvas');

		const bounds = Point.bounds(this.points);
		const topLeft = new Point(bounds.x.min, bounds.y.min);

		canvas.width = bounds.width + 1;
		canvas.height = bounds.height + 1;

		const context = canvas.getContext('2d');

		const path = Point.unpack(this.shape);

		for (let segmentIndex = 1; segmentIndex < path.length; segmentIndex++) {
			const start = path[segmentIndex - 1];
			const end = path[segmentIndex];

			drawDanwinstonLine(context, start.subtract(topLeft), end.subtract(topLeft));
		}

		return canvas;
	}
}
