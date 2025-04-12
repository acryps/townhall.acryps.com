import { calcualteDanwinstonLine } from "./line";

export type PackedPoint = string;
export type PackedPointArray = string;

export class Point {
	constructor(
		public x,
		public y
	) {}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	copy(x = 0, y = 0) {
		return new Point(this.x + x, this.y + y);
	}

	floor() {
		return new Point(
			Math.floor(this.x),
			Math.floor(this.y)
		);
	}

	distance(peer: Point) {
		return Math.hypot(this.x - peer.x, this.y - peer.y);
	}

	pack(): PackedPoint {
		return `${this.x},${this.y}`;
	}

	add(peer: Point) {
		return new Point(this.x + peer.x, this.y + peer.y);
	}

	subtract(peer: Point) {
		return new Point(this.x - peer.x, this.y - peer.y);
	}

	scale(factor: number) {
		return new Point(this.x * factor, this.y * factor);
	}

	static unpack(source: PackedPointArray) {
		return source.split(";").map(source => new Point(+source.split(",")[0], +source.split(",")[1]))
	}

	static unpackSingle(source: PackedPoint) {
		return this.unpack(source)[0];
	}

	static pack(points: Point[]): PackedPointArray {
		return points.map(point => point.pack()).join(";");
	}

	static sum(points: Point[]) {
		const sum = new Point(0, 0);

		for (let point of points) {
			sum.x += point.x;
			sum.y += point.y;
		}

		return sum;
	}

	static average(points: Point[]) {
		return this.sum(points).scale(1 / points.length);
	}

	static bounding(points: Point[], offset = 0) {
		const box = this.bounds(points, offset);

		return [
			new Point(box.x.min, box.y.min),
			new Point(box.x.max, box.y.min),
			new Point(box.x.max, box.y.max),
			new Point(box.x.min, box.y.max)
		];
	}

	static bounds(points: Point[], offset = 0) {
		const minX = Math.min(...points.map(point => point.x)) - offset;
		const maxX = Math.max(...points.map(point => point.x)) + offset;

		const minY = Math.min(...points.map(point => point.y)) - offset;
		const maxY = Math.max(...points.map(point => point.y)) + offset;

		return {
			x: { min: minX, max: maxX },
			y: { min: minY, max: maxY },

			width: maxX - minX,
			height: maxY - minY
		};
	}

	static size(points: Point[]) {
		return {
			width: Math.max(...points.map(point => point.x)) - Math.min(...points.map(point => point.x)),
			height: Math.max(...points.map(point => point.y)) - Math.min(...points.map(point => point.y)),

			get max() {
				return Math.max(this.width, this.height);
			}
		}
	}

	static area(points: Point[]) {
		const length = points.length;

		if (length < 3) {
			return 0;
		}

		let area = 0;

		for (let index = 0; index < length; index++) {
			const nextIndex = (index + 1) % length;
			area += points[index].x * points[nextIndex].y;
			area -= points[index].y * points[nextIndex].x;
		}

		return Math.abs(area) / 2.0;
	}

	static center(points: Point[]) {
		const minX = Math.min(...points.map(point => point.x));
		const maxX = Math.max(...points.map(point => point.x));

		const minY = Math.min(...points.map(point => point.y));
		const maxY = Math.max(...points.map(point => point.y));

		return new Point(minX + (maxX - minX) * 0.5, minY + (maxY - minY) * 0.5);
	}

	static topLeft(points: Point[]) {
		return [...points].sort((a, b) => (a.x + a.y) - (b.x + b.y))[0];
	}

	static bottomRight(points: Point[]) {
		return [...points].sort((a, b) => (a.x + a.y) - (b.x + b.y)).pop();
	}

	static touches(topLeft: Point, size: number, shape: Point[]) {
		const bounds = this.bounds(shape);

		if (bounds.x.min >= topLeft.x || bounds.y.min >= topLeft.y) {
			return true;
		}

		if (bounds.x.max <= topLeft.x + size || bounds.y.max <= topLeft.y + size) {
			return true;
		}

		return false;
	}

	static midsect(points: Point[], close: boolean) {
		if (points.length < 2) {
			return [];
		}

		const midsection = [];

		const minX = Math.min(...points.map(point => point.x));
		const maxX = Math.max(...points.map(point => point.x));

		const minY = Math.min(...points.map(point => point.y));
		const maxY = Math.max(...points.map(point => point.y));

		const width = maxX - minX + 1;
		const height = maxY - minY + 1;

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		ctx.moveTo(points[0].x - minX + 0.5, points[0].y - minY + 0.5);

		for (let point of points.slice(1)) {
			ctx.lineTo(point.x - minX + 0.5, point.y - minY + 0.5);
		}

		if (close) {
			ctx.closePath();
		}

		ctx.stroke();

		const data = ctx.getImageData(0, 0, width, height).data;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				if (data[(x + y * width) * 4 + 3] > 0x2f) {
					midsection.push(new Point(minX + x, minY + y));
				}
			}
		}

		return midsection;
	}

	static subtract(target: Point[], ...clips: Point[][]) {
		const pool = this.fill(target);

		for (let clip of clips) {
			for (let [packed, point] of this.fill(clip)) {
				pool.delete(packed);
			}
		}

		return this.outline(pool);
	}

	static plot(points: Point[], highlight?: Point) {
		const bounds = this.bounds(points);
		console.group('PLOT');

		for (let y = bounds.y.min; y <= bounds.y.max; y++) {
			let line = '';

			for (let x = bounds.x.min; x <= bounds.x.max; x++) {
				if (x == highlight?.x && y == highlight?.y) {
					line += '!';
				} else if (points.some(point => point.x == x && point.y == y)) {
					line += '#';
				} else {
					line += '.';
				}
			}

			console.log(line);
		}

		console.groupEnd();
	}

	static nextEdgePoint(point: Point, matrix: Map<string, Point>, visited: string[]) {
		let inside = false;

		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				if (x != point.x && y != point.y) {
					const cursor = new Point(point.x + x, point.y + y);
					const packed = cursor.pack();

					if (matrix.get(packed)) {
						inside = true;
					} else {
						if (inside && !visited.includes(packed)) {
							return cursor;
						}
					}
				}
			}
		}
	}

	static outline(filled: Map<string, Point>) {
		const visited = new Set<string>();

		const directions = [
			new Point(0, -1), new Point(1, -1), new Point(1, 0), new Point(1, 1), new Point(0, 1), new Point(-1, 1), new Point(-1, 0), new Point(-1, -1)
		];

		const isBulkPixel = (cursor: Point): boolean => {
			let count = 0;

			for (const offset of directions) {
				if (filled.has(cursor.add(offset).pack())) {
					count++;
				}
			}

			return count >= 3;
		};

		const isEdgePixel = (cursor: Point): boolean => {
			for (let offset of directions) {
				if (!filled.has(cursor.add(offset).pack())) {
					return true;
				}
			}
		};

		const start = filled.values().find(point => isEdgePixel(point));

		this.plot(filled.values().toArray(), start);

		if (!start) {
			return [];
		}

		const outline: Point[] = [];
		let cursor = start.copy();
		let direction = 0;

		do {
			outline.push(cursor.copy());
			visited.add(cursor.pack());

			let found = false;

			for (let nextDirectonOffset = 0; nextDirectonOffset <= directions.length; nextDirectonOffset++) {
				const index = (direction + nextDirectonOffset) % directions.length;
				const offset = directions[index];

				const after = cursor.add(offset);

				if (filled.has(after.pack()) && !visited.has(after.pack()) && isEdgePixel(after) && isBulkPixel(after)) {
					cursor = after;
					direction = (index + 6) % 8;
					found = true;

					break;
				}
			}

			if (!found) break;
		} while (cursor.pack() != start.pack());

		return outline;
	}

	static fill(shape: Point[]) {
		const pixels = new Map<PackedPoint, Point>();

		if (shape.length < 3) {
			return pixels;
		}

		const bounds = Point.bounds(shape);

		for (let y = bounds.y.min; y <= bounds.y.max; y++) {
			const intersections: number[] = [];

			for (let i = 0; i < shape.length; i++) {
				const curr = shape[i];
				const next = shape[(i + 1) % shape.length];

				if (curr.y === next.y) continue; // Ignore horizontal edges

				const [top, bottom] = curr.y < next.y ? [curr, next] : [next, curr];
				if (y < top.y || y >= bottom.y) continue;

				const dx = next.x - curr.x;
				const dy = next.y - curr.y;
				const t = (y - curr.y) / dy;
				const x = curr.x + t * dx;

				intersections.push(x);
			}

			intersections.sort((a, b) => a - b);

			for (let i = 0; i < intersections.length; i += 2) {
				const xStart = Math.ceil(intersections[i]);
				const xEnd = Math.floor(intersections[i + 1]);

				for (let x = xStart; x <= xEnd; x++) {
					const point = new Point(x, y);

					pixels.set(point.pack(), point);
				}
			}
		}

		return pixels;
	}
}
