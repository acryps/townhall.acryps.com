import { Service } from "vlserver";
import { MetricTracker } from "./tracker";
import { MetricListValueViewModel, MetricValueViewModel, MetricViewModel } from "./view";
import { DbContext } from "../../managed/database";
import { BoroughMetricTracker } from "./tracker/borough";

export class MetricService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	list() {
		return MetricViewModel.from(
			MetricTracker.tracked
				.filter(tracker => !(tracker instanceof BoroughMetricTracker))
				.map(metric => metric.metric)
		);
	}

	listBoroughMetrics() {
		return MetricListValueViewModel.from(MetricTracker.tracked
			.filter(tracker => tracker instanceof BoroughMetricTracker)
			.map(tracker => tracker.last)
		);
	}

	async plot(id: string, start: Date) {
		const metric = await this.database.metric.find(id);
		const afterCount = await metric.values.where(value => value.updated.isAfter(start)).count();

		return MetricValueViewModel.from(
			metric.values
				.orderByDescending(value => value.updated)
				.limit(afterCount + 2)
		);
	}
}
