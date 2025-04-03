import { Point } from "../../../../interface/point";

export class Label {
	rendered: HTMLElement;

	constructor(
		public position: Point,
		public name: string
	) {}

	visible(center: Point, width: number, height: number) {
		// safety margin
		width *= 1.5;
		height *= 1.5;

		const left = center.x - width / 2;
		const top = center.y - height / 2;

		if (this.position.x < left || this.position.x > left + width) {
			return false;
		}

		if (this.position.y < top || this.position.y > top + height) {
			return false;
		}

		return true;
	}
}
