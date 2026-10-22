import { Component } from "@acryps/page";
import { MetricService, MetricValueViewModel, MetricViewModel } from "../managed/services";
import { chartFillColor, chartLineColor } from "./index.style";
import { ChartComponent } from "../shared/chart";

export class MetricComponent extends Component {
	datapoints: MetricValueViewModel[];

	end: Date;

	constructor(
		private metric: MetricViewModel,
		private start: Date,
		private type: 'absolute' | 'relative'
	) {
		super();

		new MetricService().plot(this.metric.id, start).then(data => {
			this.datapoints = data;
			this.end = new Date();

			this.update();
		});
	}

	render() {
		const current = this.datapoints?.at(0);
		const high = Math.max(...this.datapoints?.map(item => item.value) ?? []);
		const low = Math.min(...this.datapoints?.map(item => item.value) ?? []);

		return <ui-metric>
			<ui-header>
				<ui-detail>
					<ui-name>
						{this.metric.name}
					</ui-name>

					<ui-description>
						{this.metric.description}
					</ui-description>
				</ui-detail>

				<ui-value>
					<ui-current>
						{current?.formatted ?? '-'}
					</ui-current>

					<ui-peak>
						High {this.datapoints?.find(item => item.value == high)?.formatted ?? '-'} / Low {this.datapoints?.find(item => item.value == low)?.formatted ?? '-'}
					</ui-peak>
				</ui-value>
			</ui-header>

			{this.datapoints && new ChartComponent(
				[{
					name: this.metric.name,
					color: chartLineColor,
					fill: chartFillColor,
					points: this.datapoints.map(datapoint => ({ time: datapoint.updated, value: datapoint.value }))
				}],
				this.start,
				this.end,
				this.type
			)}

			{current ? <ui-time>
				Updated at {current.updated.toLocaleString()} in {current.elapsed}ms. {this.datapoints.length} datapoints rendered.
			</ui-time> : <ui-time>
				Loading datapoints...
			</ui-time>}
		</ui-metric>
	}
}
