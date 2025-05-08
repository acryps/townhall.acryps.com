import { Observable } from "@acryps/page-observable";
import { MapView } from ".";
import { Point } from "../../../../interface/point";
import { drawDanwinstonLine } from "../../../../interface/line";

export class MapDrawView extends MapView {
	shape: Point[] = [];
	closeable = new Observable(false);

	push() {
		this.shape.push(this.map.cursor.copy());
	}

	complete() {
		const shape = [...this.shape];
		delete this.map.drawer;

		this.map.render();
		this.closeable.emit(false);

		return shape;
	}

	render(offset: Point) {
		this.context.clearRect(0, 0, this.map.width, this.map.height);

		if (this.shape.length) {
			const firstPoint = this.shape[0];

			this.closeable.emit(this.map.cursor.x == firstPoint.x && this.map.cursor.y == firstPoint.y);
		}

		// draw existing
		this.context.strokeStyle = '#000';

		for (let pointIndex = 1; pointIndex < this.shape.length; pointIndex++) {
			const point = this.shape[pointIndex];

			drawDanwinstonLine(
				this.context,
				this.shape[pointIndex - 1].subtract(offset),
				this.shape[pointIndex].subtract(offset)
			);
		}

		// draw current line
		const last = this.shape[this.shape.length - 1];
		const cursor = this.map.cursor;

		if (last) {
			// draw current line
			this.context.strokeStyle = '#0008';

			drawDanwinstonLine(
				this.context,
				last.subtract(offset),
				cursor.subtract(offset)
			);

			let cursorColor = '#fff8';

			// draw cursor aligned line indicator
			if (last.x == cursor.x || last.y == cursor.y || Math.abs(last.x - cursor.x) == Math.abs(last.y - cursor.y)) {
				cursorColor = '#0f08';
			}

			this.context.fillStyle = cursorColor;
			this.context.fillRect(cursor.x - offset.x - 1, cursor.y - offset.y - 1, 3, 3);
		}

		// draw cursor
		this.context.fillStyle = '#000';
		this.context.fillRect(cursor.x - offset.x, cursor.y - offset.y, 1, 1);
	}
}
