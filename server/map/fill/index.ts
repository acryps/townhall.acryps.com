import { calcualteDanwinstonLine } from "../../../interface/line";
import { PackedPoint, Point } from "../../../interface/point";

export abstract class Filler<SourceType> {
	cached = new Map<SourceType, Point[]>;

	abstract fetch(): Promise<SourceType[]>;
	abstract obstacles(): Promise<Point[][]>;
	abstract rank(a: SourceType, b: SourceType): number;

	abstract route(source: SourceType): Promise<{
		route: Point[],
		radius: number
	}>;

	schedule() {
		const next = async () => {
			console.log(`filling ${this.constructor.name}...`);
			await this.update();
			console.log(`filled ${this.constructor.name}`);

			setTimeout(() => next(), 1000 * 60 * 5);
		};

		next();

		return this;
	}

	async update() {
		const source = await this.fetch();
		source.sort((a, b) => this.rank(a, b));

		const obstacles = new Set<PackedPoint>();

		for (let obstacle of await this.obstacles()) {
			for (let packed of Point.fill(obstacle).keys()) {
				obstacles.add(packed);
			}
		}

		const filledShapes = new Map<SourceType, Point[]>();

		for (let item of source) {
			const shape = await this.route(item);
			const searchField = Point.searchMap(shape.radius);
			const filled = new Map<PackedPoint, Point>();

			// find free pixels
			for (let segmentIndex = 1; segmentIndex < shape.route.length; segmentIndex++) {
				const start = shape.route[segmentIndex - 1];
				const end = shape.route[segmentIndex];

				const points = calcualteDanwinstonLine(start, end);

				for (let point of points) {
					for (let offset of searchField) {
						const target = point.add(offset);
						const packed = target.pack();

						if (!obstacles.has(packed)) {
							if (!filled.has(packed)) {
								filled.set(packed, target);
							}
						}
					}
				}
			}

			// create shapes
			const shapes = Point.groupShapes(filled);

			for (let shape of shapes) {
				const boundary = Point.bounds([...shape.values()]);

				if (boundary.width > 1 && boundary.height > 1) {
					const outline = Point.outline(shape);

					filledShapes.set(item, outline);
				}
			}

			// mark filled items as occupied
			for (let point of filled.keys()) {
				obstacles.add(point);
			}
		}

		this.cached = filledShapes;

		return filledShapes;
	}
}
