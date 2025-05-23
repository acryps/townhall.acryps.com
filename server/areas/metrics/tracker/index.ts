import { ViewModel } from "vlserver";
import { DbContext, Metric, MetricValue } from "../../../managed/database";
import { hostname } from "os";
import { updateMetrics } from "../../..";

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

		if (updateMetrics) {
			tracker.update();
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

	// updates the metric, automatically adjusting the update frequency based on effort
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

		setTimeout(() => this.update(), this.last.elapsed * 100 + 1000 * 60 * 5);
	}

	abstract fetch(): Promise<number>;

	format(value: number) {
		return value.toString();
	}
}
