import { ViewModel } from "vlserver";
import { DbContext, Metric, MetricValue } from "../../../managed/database";
import { hostname } from "os";
import { updateMetrics } from "../../..";
import { Worker } from "worker_threads";

export abstract class MetricTracker {
	static executeWorkerKey = 'EXECUTE_METRIC_WORKER';
	static tracked: MetricTracker[] = [];

	static async executeTask() {
		const metric = this.tracked.find(tracker => tracker.metric.tag == process.env[this.executeWorkerKey]);

		if (metric) {
			await metric.update();

			process.exit();
		}
	}

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
		await tracker.updateLast();

		if (updateMetrics) {
			tracker.dispatchNextUpdate();
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
			.first();
	}

	// updates the metric in background thread, automatically adjusting the update frequency based on effort
	async dispatchNextUpdate() {
		console.log(`[metric] updating ${this.metric.tag} using ${process.argv[1]}`);

		await new Promise<void>(done => {
			const environment = {};

			for (let key in process.env) {
				environment[key] = process.env[key];
			}

			environment[MetricTracker.executeWorkerKey] = this.metric.tag;

			const worker = new Worker(process.argv[1], {
				env: environment
			});

			worker.on('error', error => {
				console.log(`metric updater ${this.metric.tag} failed`, error);

				done();
			});

			worker.on('exit', () => {
				done();
			});
		});

		// load back
		await this.updateLast();

		console.log(`[metric] updated ${this.metric.tag} in ${this.last.elapsed}`);
		setTimeout(() => this.dispatchNextUpdate(), this.last.elapsed * 100 + 1000 * 60 * 5);
	}

	// may take very long, use `requestUpdate` on main thread.
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
