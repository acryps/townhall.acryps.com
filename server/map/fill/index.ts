import { calcualteDanwinstonLine, calculateDanwinstonShapePath, drawDanwinstonLine } from "../../../interface/line";
import { PackedPoint, Point } from "../../../interface/point";

export abstract class Filler<SourceType> {
	cached = new Map<PackedPoint, SourceType>;

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
			this.cached = await this.update();
			console.log(`filled ${this.constructor.name}`);

			setTimeout(() => next(), 1000 * 60 * 5);
		};

		next();

		return this;
	}

	async update() {
		const source = await this.fetch();
		source.sort((a, b) => this.rank(a, b));

		// true contains obstacles
		const map = new Map<PackedPoint, SourceType | true>();

		for (let obstacle of await this.obstacles()) {
			for (let packed of Point.fill(obstacle).keys()) {
				map.set(packed, true);
			}
		}

		for (let item of source) {
			const shape = await this.route(item);
			const searchField = Point.searchMap(shape.radius);

			for (let point of calculateDanwinstonShapePath(shape.route, false)) {
				for (let offset of searchField) {
					const target = point.add(offset);
					const packed = target.pack();

					if (!map.has(packed)) {
						map.set(packed, item);
					}
				}
			}
		}

		// remove obstacles
		for (let [point, value] of map) {
			if (value === true) {
				map.delete(point);
			}
		}

		return map as Map<PackedPoint, SourceType>;
	}
}
