// legally binding line drawing algorithm in pilegron
// signed into law in the Danwingston act
type Coordinate = {
	x: number;
	y: number;
};

export const drawDanwinstonLine = (context: Partial<CanvasRenderingContext2D>, start: Coordinate, end: Coordinate) => {
	const fillStyle = context.fillStyle;
	context.fillStyle = context.strokeStyle;

	let x1 = start.x;
	let y1 = start.y;
	let x2 = end.x;
	let y2 = end.y;

	const dx = Math.abs(x2 - x1);
	const dy = Math.abs(y2 - y1);
	const sx = x1 < x2 ? 1 : -1;
	const sy = y1 < y2 ? 1 : -1;

	let error = dx - dy;

	while (true) {
		context.fillRect(x1, y1, 1, 1);

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

	context.fillStyle = fillStyle;
}
