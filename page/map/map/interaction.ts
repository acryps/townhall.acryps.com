import { MapComponent } from ".";
import { Point } from "../point";

export const registerInteration = (
	map: MapComponent,
	onMoveEnd: (destination: Point) => void,
	onScaleEnd: (scale: number) => void
) => {
	const element = map.rootNode;

	let movement: {
		pointers: Point[],
		map: Point
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

		if (!event.buttons) {
			return;
		}

		return new Point(event.clientX, event.clientY);
	};

	const getPointers = (event: TouchEvent | MouseEvent) => {
		if (event instanceof TouchEvent) {
			const points = [];

			for (let index = 0; index < event.touches.length; index++) {
				points.push(getPointer(event, index));
			}

			return points;
		}

		const pointer = getPointer(event);

		if (!pointer) {
			return [];
		}

		return [pointer];
	}

	const startMovement = (pointers: Point[]) => {
		movement = {
			pointers,
			map: map.center.copy()
		};
	}

	element.onmousedown = element.ontouchstart = (event: TouchEvent | MouseEvent) => {
		const second = getPointer(event, 1);

		if (second) {
			const first = getPointer(event);

			scale = {
				pointer: first,
				distance: first.distance(second),
				scale: map.scale
			}
		} else {
			if (movement) {
				return;
			}

			const pointers = getPointers(event);

			if (!pointers.length) {
				return;
			}

			startMovement(pointers);
		}
	};

	element.onmousemove = element.ontouchmove = (event: TouchEvent | MouseEvent) => {
		event.preventDefault();

		if (scale) {
			const second = getPointer(event, 1);

			if (second) {
				const first = getPointer(event);
				const distance = first.distance(second);

				map.zoom(scale.scale / (distance / scale.distance));
				onScaleEnd(map.scale);
			} else {
				scale = null;
			}
		}

		if (!movement) {
			return;
		}

		const pointers = getPointers(event);

		// not pressed, after exiting and reentering map
		if (!pointers.length) {
			movement = null;

			return;
		}

		// reset movement when touch count changes
		if (pointers.length != movement.pointers.length) {
			startMovement(pointers);

			return;
		}

		const delta = Point.average(movement.pointers).subtract(Point.average(pointers)).scale(map.scale);
		map.move(new Point(movement.map.x + delta.x, movement.map.y + delta.y));
	};

	element.onmouseup = element.ontouchend = (event: TouchEvent | MouseEvent) => {
		const pointers = getPointers(event);

		if (!pointers.length) {
			movement = null;
			scale = null;
		}

		onMoveEnd(map.center);
	};

	element.onmouseout = element.ontouchcancel = (event: TouchEvent | MouseEvent) => {
		const pointers = getPointers(event);

		if (!pointers.length) {
			movement = null;
			scale = null;
		}

		onMoveEnd(map.center);
	};

	let zoomEndDebounce = setTimeout(() => { });

	element.onwheel = event => {
		event.preventDefault();

		map.zoom(map.scale * (event.deltaY * 0.01 + 1));

		clearTimeout(zoomEndDebounce);

		zoomEndDebounce = setTimeout(() => {
			onScaleEnd(map.scale);
		}, 100);
	}
};
