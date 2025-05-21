import { Service } from "vlserver";
import { MetricTracker } from "./tracker";
import { MetricValueViewModel, MetricViewModel } from "./view";
import { DbContext } from "../../managed/database";

export class MetricService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	list() {
		return MetricViewModel.from(MetricTracker.tracked.map(metric => metric.metric));
	}

	plot(id: string) {
		return MetricValueViewModel.from(
			this.database.metricValue
				.where(value => value.metric == id)
				.orderByDescending(value => value.updated)
				.limit(20)
		);
	}
}
