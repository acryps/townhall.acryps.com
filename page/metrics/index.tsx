import { Component } from "@acryps/page";
import { MetricService, MetricViewModel } from "../managed/services";
import { MetricComponent } from "./metric";

export class MetricsPage extends Component {
	metrics: MetricViewModel[];

	async onload() {
		this.metrics = await new MetricService().list();
	}

	render() {
		return <ui-metrics>
			{this.metrics.map(metric => new MetricComponent(metric))}
		</ui-metrics>
	}
}
