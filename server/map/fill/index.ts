import { calcualteDanwinstonLine, calculateDanwinstonShapePath, drawDanwinstonLine } from "../../../interface/line";
import { PackedPoint, Point } from "../../../interface/point";
import { Logger } from "../../log";

export abstract class Filler<SourceType> {
	cached = new Map<PackedPoint, SourceType>;

	// removes anything filled by parents
	after: { active: Filler<any> }[] = [];

	abstract fetch(): Promise<SourceType[]>;
	abstract obstacles(): Promise<Point[][]>;
	abstract rank(a: SourceType, b: SourceType): number;
	abstract fill(source: SourceType): Promise<PackedPoint[]>;

	schedule() {
		const logger = new Logger(this.constructor.name);

		const next = async () => {
			logger.log('fill');
			this.cached = await this.update();

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

		// resolve parents
		for (let parent of this.after) {
			const blocked = await parent.active.update();

			for (let point of blocked.keys()) {
				map.set(point, true);
			}
		}

		// add items
		for (let item of source) {
			const points = await this.fill(item);

			for (let point of points) {
				if (!map.has(point)) {
					map.set(point, item);
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
