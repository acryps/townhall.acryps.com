import { Logger } from "@acryps/log";
import { calcualteDanwinstonLine, calculateDanwinstonShapePath, drawDanwinstonLine } from "../../../interface/line";
import { PackedPoint, Point } from "../../../interface/point";
import { WorkerDispatch, WorkerHandle } from "../../worker";
import { Task } from "../../scheduler";

export abstract class Filler<SourceType> extends Task {
	private logger = new Logger(this.constructor.name);

	cached: {
		filled: Map<PackedPoint, SourceType>,
		boundaries: PackedPoint[]
	} = {
		filled: new Map<PackedPoint, SourceType>,
		boundaries: []
	};

	// removes anything filled by parents
	after: { active: Filler<any> }[] = [];

	usesWorker = true;

	// the worker handle that computes this filler's shapes - see the `WorkerHandle` subclasses in the concrete fillers
	abstract workerHandle: typeof WorkerHandle;

	abstract fetch(): Promise<SourceType[]>;
	abstract obstacles(): Promise<Point[][]>;
	abstract rank(a: SourceType, b: SourceType): number;
	abstract fill(source: SourceType): Promise<PackedPoint[]>;

	async run() {
		this.logger.log('fill');
		this.cached = await dispatchFill(this.workerHandle);

		return 1000 * 60 * 5;
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

			for (let point of blocked.filled.keys()) {
				map.set(point, true);
			}
		}

		// add items
		const boundaries = [];

		for (let item of source) {
			const points = await this.fill(item);

			for (let point of points) {
				boundaries.push(point);

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

		return {
			filled: map as Map<PackedPoint, SourceType>,
			boundaries
		};
	}
}

// `Map`s can't cross the worker boundary (WorkerDispatch.serialize can't walk them), so `WorkerHandle`s return this shape instead
export type SerializedFillResult<SourceType> = {
	filled: [PackedPoint, SourceType][],
	boundaries: PackedPoint[]
};

export async function dispatchFill<SourceType>(handle: typeof WorkerHandle) {
	const result = await WorkerDispatch.dispatch<SerializedFillResult<SourceType>>(handle);

	return {
		filled: new Map(result.filled),
		boundaries: result.boundaries
	};
}
