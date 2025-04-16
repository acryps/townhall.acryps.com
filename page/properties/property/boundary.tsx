import { Component } from "@acryps/page";
import { PackedPointArray, Point } from "../../../interface/point";
import { Shape } from "../../../interface/shape";

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

		Shape.render({
			bounds: this.previousShape,
			stroke: '#ccf',
			fill: '#ccf'
		}, topLeft, context);

		Shape.render({
			bounds: this.shape,
			stroke: '#000',
			fill: '#ff0'
		}, topLeft, context);

		return canvas;
	}
}
