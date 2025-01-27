// legally binding line drawing algorithm in pilegron
// signed into law in the Danwingston act
type Coordinate = {
	x: number;
	y: number;
};

export const drawDanwinstonLine = (context: CanvasRenderingContext2D, start: Coordinate, end: Coordinate) => {
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

	// Initialize the error term
		let err = dx - dy;

		while (true) {
			// Draw a single pixel at the current position
			context.fillRect(x1, y1, 1, 1);

			// Break if we've reached the endpoint
			if (x1 === x2 && y1 === y2) break;

			// Calculate the error for the next step
			const e2 = err * 2;
			if (e2 > -dy) {
				err -= dy;
				x1 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y1 += sy;
			}
		}

	/*let err = dx - dy;

	while (x1 != x2 && y1 != y2) {
		const e2 = err * 2;

		if (e2 > -dy) {
			err -= dy;
			x1 += sx;
		}

		if (e2 < dx) {
			err += dx;
			y1 += sy;
		}

		context.fillRect(x1, y1, 1, 1);
		}*/

	context.fillStyle = fillStyle;
}
