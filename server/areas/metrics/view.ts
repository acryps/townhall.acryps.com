import { ViewModel } from "vlserver";
import { Metric, MetricValue } from "../../managed/database";

export class MetricTagViewModel extends ViewModel<Metric> {
	id;
	tag;
}

export class MetricViewModel extends MetricTagViewModel {
	name;
	description;
}

export class MetricValueViewModel extends ViewModel<MetricValue> {
	id;

	value;
	formatted;

	updated;
	elapsed;
}

export class MetricListValueViewModel extends MetricValueViewModel {
	metric: MetricTagViewModel;
}
