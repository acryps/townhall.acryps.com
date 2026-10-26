import { ViewModel } from "vlserver";
import { DbContext, Metric, MetricValue } from "../../../managed/database";
import { hostname } from "os";
import { WorkerDispatch, WorkerHandle } from "../../../worker";
import { Task } from "../../../scheduler";

export abstract class MetricTracker {
	static tracked: MetricTracker[] = [];

	static async track(tracker: MetricTracker, metrics: Metric[], recentValues?: Map<string, MetricValue>) {
		this.tracked.push(tracker);

		const tag = tracker.tag.join('-');

		let metric = metrics.find(metric => metric.tag == tag);

		if (!metric) {
			metric = new Metric();
			metric.tag = tag;

			await metric.create();
		}

		if (metric.name != tracker.name || metric.description != tracker.description) {
			metric.name = tracker.name;
			metric.description = tracker.description;

			await metric.update();
		}

		tracker.metric = metric;

		const cachedLast = recentValues?.get(metric.id);

		if (cachedLast) {
			tracker.last = cachedLast;
		} else {
			await tracker.updateLast();
		}
	}

	tag: string[];
	metric: Metric;

	name: string;
	description: string;

	last: MetricValue;

	constructor(
		protected database: DbContext
	) {}

	// loads the last value
	async updateLast() {
		this.last = await this.metric.values
			.orderByDescending(value => value.updated)
			.include(value => value.metric)
			.first();
	}

	// updates the metric on a worker thread - queued and awaited one at a time by `MetricDispatchTask`
	async dispatchUpdate(handle: typeof WorkerHandle) {
		console.log(`[metric] updating ${this.metric.tag}`);

		await WorkerDispatch.dispatch(handle, this.metric.tag);

		// load back
		await this.updateLast();

		console.log(`[metric] updated ${this.metric.tag} in ${this.last.elapsed}`);
	}

	// may take very long, use `dispatchUpdate` on the main thread.
	async update() {
		const start = +new Date();
		const fetched = await this.fetch();
		const elapsed = +new Date() - start;

		if (!this.last || this.last.value != fetched) {
			const value = new MetricValue();
			value.value = fetched
			value.formatted = this.format(fetched);
			value.elapsed = elapsed;
			value.updated = new Date();
			value.metric = this.metric;
			value.host = hostname();

			await value.create();

			this.last = value;
		} else {
			this.last.updated = new Date();
			this.last.elapsed = elapsed;
			this.last.host = hostname();

			await this.last.update();
		}

		return elapsed;
	}

	abstract fetch(): Promise<number>;

	format(value: number) {
		return value.toString();
	}
}

// queues all due metrics and dispatches them to a worker thread one after another - see `MetricTrackerWorkerHandle` in `metrics.ts`
export class MetricDispatchTask extends Task {
	usesWorker = true;

	constructor(
		private handle: typeof WorkerHandle
	) {
		super();
	}

	async run() {
		const due = MetricTracker.tracked
			.filter(tracker => !tracker.last || +tracker.last.updated + tracker.last.elapsed * 100 + 1000 * 60 * 5 <= Date.now())
			.sort((a, b) => +(a.last?.updated ?? 0) - +(b.last?.updated ?? 0))[0];

		if (due) {
			await due.dispatchUpdate(this.handle);

			return 1000 * 5;
		}

		return 1000 * 10;
	}
}
