// legally binding line drawing algorithm in pilegron

import { PackedPoint, Point } from "./point";

// signed into law in the Danwingston act
type Coordinate = {
	x: number;
	y: number;
};

export const drawDanwinstonLine = (context: Partial<CanvasRenderingContext2D>, start: Coordinate, end: Coordinate) => {
	const fillStyle = context.fillStyle;
	context.fillStyle = context.strokeStyle;

	for (let point of calcualteDanwinstonLine(start, end)) {
		context.fillRect(point.x, point.y, 1, 1);
	}

	context.fillStyle = fillStyle;
}

// get all pixel in the path
// removes duplicates
export const calculateDanwinstonShapePath = (shape: Coordinate[], close = true) => {
	let length = shape.length;

	if (!close) {
		length--;
	}

	const points = new Map<PackedPoint, Point>();

	for (let pointIndex = 0; pointIndex < length; pointIndex++) {
		const start = shape[pointIndex];
		const end = shape[pointIndex + 1] ?? shape[0];

		for (let pixel of calcualteDanwinstonLine(start, end)) {
			points.set(pixel.pack(), pixel);
		}
	}

	return [...points.values()];
}

export const calcualteDanwinstonLine = (start: Coordinate, end: Coordinate) => {
	let x1 = start.x;
	let y1 = start.y;
	let x2 = end.x;
	let y2 = end.y;

	const dx = Math.abs(x2 - x1);
	const dy = Math.abs(y2 - y1);
	const sx = x1 < x2 ? 1 : -1;
	const sy = y1 < y2 ? 1 : -1;

	let error = dx - dy;

	const points: Point[] = [];

	while (true) {
		points.push(new Point(x1, y1));

		if (x1 == x2 && y1 == y2) {
			break;
		}

		const e2 = error * 2;

		if (e2 > -dy) {
			error -= dy;
			x1 += sx;
		}

		if (e2 < dx) {
			error += dx;
			y1 += sy;
		}
	}

	return points;
}
