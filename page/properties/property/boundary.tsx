import { Component } from "@acryps/page";
import { PackedPointArray, Point } from "../../../interface/point";
import { Shape } from "../../../interface/shape";

export class BoundaryComponent extends Component {
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
		canvas.width = bounds.width + 1;
		canvas.height = bounds.height + 1;

		const context = canvas.getContext('2d');

		Shape.render({
			bounds: this.shape,
			stroke: '#000',
			fill: '#ff0'
		}, new Point(bounds.x.min, bounds.y.min), context);

		return canvas;
	}
}
