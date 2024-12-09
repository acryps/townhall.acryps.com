import { MapComponent } from ".";
import { Point } from "../point";

export const registerInteration = (map: MapComponent, onMoveEnd: (destination: Point) => void) => {
	const element = map.rootNode;

	let movement: {
		pointer: Point,
		map: Point,
		changes: number
	};

	let scale: {
		pointer: Point,
		distance: number,
		scale: number
	};

	const getPointer = (event: TouchEvent | MouseEvent, index = 0) => {
		if (event instanceof TouchEvent) {
			if (!event.touches[index]) {
				return;
			}

			return new Point(event.touches[index].clientX, event.touches[index].clientY);
		}

		if (index) {
			return;
		}

		return new Point(event.clientX, event.clientY);
	};

	element.onmousedown = element.ontouchstart = (event: TouchEvent | MouseEvent) => {
		const first = getPointer(event);
		const second = getPointer(event, 1);

		if (second) {
			scale = {
				pointer: first,
				distance: first.distance(second),
				scale: map.scale
			}
		} else {
			if (movement) {
				return;
			}

			movement = {
				pointer: first,
				map: map.center.copy(),
				changes: 1
			};
		}
	};

	element.onmousemove = element.ontouchmove = (event: TouchEvent | MouseEvent) => {
		const first = getPointer(event);
		event.preventDefault();

		if (scale) {
			const second = getPointer(event, 1);

			if (second) {
				const distance = first.distance(second);

				map.zoom(scale.scale / (distance / scale.distance));
			} else {
				scale = null;
			}
		}

		if (!movement) {
			return;
		}

		movement.changes++;

		const x = (movement.pointer.x - first.x) * map.scale;
		const y = (movement.pointer.y - first.y) * map.scale;

		map.move(new Point(movement.map.x + x, movement.map.y + y));
	};

	element.onmouseup = element.ontouchend = (event: TouchEvent | MouseEvent) => {
		movement = null;

		if (!getPointer(event)) {
			scale = null;
		}

		onMoveEnd(map.center);
	};

	element.onmouseout = element.ontouchcancel = (event: TouchEvent | MouseEvent) => {
		movement = null;

		if (!getPointer(event)) {
			scale = null;
		}

		onMoveEnd(map.center);
	};

	element.onwheel = event => {
		event.preventDefault();

		map.zoom(map.scale * (event.deltaY * 0.01 + 1));
	}
};
