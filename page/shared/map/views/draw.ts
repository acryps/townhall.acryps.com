import { Observable } from "@acryps/page-observable";
import { MapView } from ".";
import { Point } from "../../../../interface/point";
import { calcualteDanwinstonLine, drawDanwinstonLine } from "../../../../interface/line";
import { negativeColor, positiveColor } from "../../../index.style";

export class MapDrawView extends MapView {
	readonly targetPixelSize = 5;

	shape: Point[] = [];
	closeable = new Observable(false);

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
		this.closeable.emit(false);

		return shape;
	}

	render(offset: Point) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.shape.length) {
			const firstPoint = this.shape[0];

			this.closeable.emit(this.map.cursor.x == firstPoint.x && this.map.cursor.y == firstPoint.y);
		}

		// draw existing
		this.context.fillStyle = '#000';

		for (let pointIndex = 1; pointIndex < this.shape.length; pointIndex++) {
			this.drawCheckeredLine(this.shape[pointIndex - 1], this.shape[pointIndex], offset);
		}

		// draw current line
		const last = this.shape[this.shape.length - 1];
		const cursor = this.map.cursor;

		if (last) {
			// draw current line
			this.context.fillStyle = '#0008';
			this.drawCheckeredLine(last, cursor, offset);

			// alignment
			if (last.x == cursor.x || last.y == cursor.y || Math.abs(last.x - cursor.x) == Math.abs(last.y - cursor.y)) {
				this.context.strokeStyle = positiveColor.toValueString();
			} else {
				this.context.strokeStyle = negativeColor.toValueString();
			}

			this.context.strokeRect(
				(cursor.x - offset.x) * this.superscale - 0.5,
				(cursor.y - offset.y) * this.superscale - 0.5,
				this.superscale + 1,
				this.superscale + 1
			);
		}

		// draw cursor
		this.context.fillStyle = '#000';
		this.drawCheckeredPixel(cursor, offset);
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

		const pattern = (position.x + position.y) % 2;

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
