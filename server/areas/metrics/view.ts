import { ViewModel } from "vlserver";
import { Metric, MetricValue } from "../../managed/database";

export class MetricViewModel extends ViewModel<Metric> {
	id;

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
