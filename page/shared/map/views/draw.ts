import { MapView } from ".";
import { Point } from "../../../../interface/point";
import { calcualteDanwinstonLine, drawDanwinstonLine } from "../../../../interface/line";
import { negativeColor, positiveColor } from "../../../index.style";
import { MapComponent } from "..";

export class MapDrawView extends MapView {
	readonly targetPixelSize = 5;

	// index of the point currently focused for editing - always valid, as a shape always has at least
	// one point. panning the map (the same precise controls used everywhere else) moves this point
	focusIndex = 0;

	constructor(
		map: MapComponent,
		public shape: Point[],

		// whether the shape loops back to its first point - a dim preview of that closing edge is shown
		// once there's enough points to form one, and finishing requires at least a triangle
		public closed: boolean
	) {
		super(map);

		if (!this.shape.length) {
			this.shape.push(map.cursor.copy());
		}

		this.snapCursorToFocus();
	}

	selectPrevious() {
		this.focusIndex = (this.focusIndex - 1 + this.shape.length) % this.shape.length;
		this.snapCursorToFocus();
	}

	selectNext() {
		this.focusIndex = (this.focusIndex + 1) % this.shape.length;
		this.snapCursorToFocus();
	}

	// inserts a copy of the focused point right before it - the copy becomes focused, the original
	// point it was copied from is left untouched, just shifted one position later
	insertBefore() {
		this.shape.splice(this.focusIndex, 0, this.shape[this.focusIndex].copy());
	}

	// inserts a copy of the focused point right after it, and focuses that new point
	insertAfter() {
		this.shape.splice(this.focusIndex + 1, 0, this.shape[this.focusIndex].copy());
		this.focusIndex++;
	}

	// removes the focused point - a shape always keeps at least one point
	deleteFocused() {
		if (this.shape.length <= 1) {
			return;
		}

		this.shape.splice(this.focusIndex, 1);
		this.focusIndex = Math.min(this.focusIndex, this.shape.length - 1);
		this.snapCursorToFocus();
	}

	flip() {
		this.shape.reverse();

		this.focusIndex = this.shape.length - 1 - this.focusIndex;
	}

	get area() {
		return Point.area(this.shape);
	}

	// aligns the map cursor with the focused point, so panning continues from where it visually is
	private snapCursorToFocus() {
		const point = this.shape[this.focusIndex];

		this.map.move(point.floor().copy(0.5, 0.5));
	}

	resize() {
		// must be an odd number to keep the pattern clean
		// especially superscale 2 looks bad
		this.superscale = Math.floor(this.map.pixelSize / this.targetPixelSize / 2) * 2 + 1;

		super.resize();
	}

	complete() {
		const shape = [...this.shape];
		delete this.map.drawer;

		this.map.render();

		return shape;
	}

	render(offset: Point) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// the focused point follows the cursor - panning moves it directly, using the same precise
		// controls used everywhere else on the map, instead of an imprecise direct drag
		this.shape[this.focusIndex] = this.map.cursor.copy();

		// draw edges - green when straight (axis-aligned or at a clean 45 degrees), red otherwise.
		// this is live, so edges being reshaped by moving or adding a point update immediately
		for (let pointIndex = 1; pointIndex < this.shape.length; pointIndex++) {
			this.drawAlignedLine(this.shape[pointIndex - 1], this.shape[pointIndex], offset);
		}

		// once there's enough points to form a shape, preview the closing edge faintly
		if (this.closed && this.shape.length >= 3) {
			this.context.globalAlpha = 0.5;
			this.drawAlignedLine(this.shape[this.shape.length - 1], this.shape[0], offset);
			this.context.globalAlpha = 1;
		}

		// draw vertices
		if (this.superscale > 1) {
			this.context.strokeStyle = '#00f';

			for (let point of this.shape) {
				this.context.strokeRect(
					(point.x - offset.x) * this.superscale - 0.5,
					(point.y - offset.y) * this.superscale - 0.5,
					this.superscale + 1,
					this.superscale + 1
				);
			}
		} else {
			this.context.fillStyle = '#00f';

			for (let point of this.shape) {
				this.context.fillRect(point.x - offset.x, point.y - offset.y, 1, 1);
			}
		}

		// draw cursor
		this.context.fillStyle = '#000';
		this.drawCheckeredPixel(this.map.cursor, offset);
	}

	// draws a line, colored by whether it's a clean edge - axis-aligned or a 45 degree diagonal - or not
	private drawAlignedLine(start: Point, end: Point, offset: Point) {
		const aligned = start.x == end.x || start.y == end.y || Math.abs(start.x - end.x) == Math.abs(start.y - end.y);

		this.context.fillStyle = (aligned ? positiveColor : negativeColor).toValueString();
		this.drawCheckeredLine(start, end, offset);
	}

	private drawCheckeredLine(start: Point, end: Point, offset: Point) {
		for (let pixel of calcualteDanwinstonLine(start, end)) {
			this.drawCheckeredPixel(pixel, offset);
		}
	}

	private drawCheckeredPixel(position: Point, offset: Point) {
		// prevent odd pixels from not being rendered
		// & faster
		if (this.superscale == 1) {
			this.context.fillRect(position.x - offset.x, position.y - offset.y, 1, 1);

			return;
		}

		const pattern = Math.abs(position.x + position.y) % 2;

		for (let x = 0; x < this.superscale; x++) {
			for (let y = 0; y < this.superscale; y++) {
				if ((x + y) % 2 == pattern) {
					this.context.fillRect(
						(position.x - offset.x) * this.superscale + x,
						(position.y - offset.y) * this.superscale + y,
						1, 1
					);
				}
			}
		}
	}
}
