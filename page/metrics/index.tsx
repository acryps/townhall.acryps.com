import { Component } from "@acryps/page";
import { MetricService, MetricViewModel } from "../managed/services";
import { MetricComponent } from "./metric";

export class MetricsPage extends Component {
	metrics: MetricViewModel[];

	timeRanges = [
		{ name: 'Last Hour', start: +new Date() - 1000 * 60 * 60 },
		{ name: 'Last Day', start: +new Date() - 1000 * 60 * 60 * 24 },
		{ name: 'Last Week', start: +new Date() - 1000 * 60 * 60 * 24 * 7 },
		{ name: 'Last Month', start: +new Date() - 1000 * 60 * 60 * 24 * 30.4 },
		{ name: 'Last 3 Months', start: +new Date() - 1000 * 60 * 60 * 24 * 30.4 * 3 }
	];

	timeRange = this.timeRanges[2];

	valueRanges = [
		{ name: 'Absolute', range: 'absolute' },
		{ name: 'Relative', range: 'relative' }
	];

	valueRange = this.valueRanges[1];

	async onload() {
		this.metrics = await new MetricService().list();
	}

	render() {
		return <ui-metrics>
			<ui-view-options>
				<select $ui-value={this.timeRange} ui-change={() => this.update()}>
					{this.timeRanges.map(range => <option ui-value={range}>
						{range.name}
					</option>)}
				</select>

				<select $ui-value={this.valueRange} ui-change={() => this.update()}>
					{this.valueRanges.map(range => <option ui-value={range}>
						{range.name}
					</option>)}
				</select>
			</ui-view-options>

			{this.metrics.map(metric => new MetricComponent(metric, new Date(this.timeRange.start), this.valueRange.range as any))}
		</ui-metrics>
	}
}
