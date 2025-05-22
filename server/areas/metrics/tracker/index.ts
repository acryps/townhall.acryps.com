import { ViewModel } from "vlserver";
import { DbContext, Metric, MetricValue } from "../../../managed/database";
import { hostname } from "os";

export abstract class MetricTracker {
	static tracked: MetricTracker[] = [];

	static async track(tracker: MetricTracker) {
		this.tracked.push(tracker);

		const tag = tracker.tag.join('-');

		let metric = await tracker.database.metric.first(metric => metric.tag.valueOf() == tag);

		if (!metric) {
			metric = new Metric();
			metric.tag = tag;

			await metric.create();
		}

		metric.name = tracker.name;
		metric.description = tracker.description;

		await metric.update();

		tracker.metric = metric;

		tracker.last = await tracker.metric.values
			.orderByDescending(value => value.updated)
			.first();

		tracker.update();
	}

	tag: string[];
	metric: Metric;

	name: string;
	description: string;

	last: MetricValue;

	constructor(
		protected database: DbContext
	) {}

	// updates the metric, automatically adjusting the update frequency based on effort
	async update() {
		const start = +new Date();

		const value = new MetricValue();
		value.value = await this.fetch();
		value.formatted = this.format(value.value);
		value.elapsed = +new Date() - start;
		value.updated = new Date();
		value.metric = this.metric;
		value.host = hostname();

		if (!this.last || this.last.value != value.value) {
			await value.create();
		}

		this.last = value;

		setTimeout(() => this.update(), value.elapsed * 100 + 1000 * 60 * 5);
	}

	abstract fetch(): Promise<number>;

	format(value: number) {
		return value.toString();
	}
}
