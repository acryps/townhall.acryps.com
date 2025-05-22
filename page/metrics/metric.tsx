import { Component } from "@acryps/page";
import { MetricService, MetricValueViewModel, MetricViewModel } from "../managed/services";
import { chartDuration, chartMaxValue, chartValue } from "./index.style";

export class MetricComponent extends Component {
	data: MetricValueViewModel[] = [];

	constructor(
		private metric: MetricViewModel
	) {
		super();

		new MetricService().plot(this.metric.id).then(data => {
			this.data = data;

			this.update();
		});
	}

	render() {
		const high = Math.max(...this.data.map(item => item.value));
		const low = Math.min(...this.data.map(item => item.value));

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
						{this.data[0]?.formatted ?? '-'}
					</ui-current>

					<ui-peak>
						High {this.data.find(item => item.value == high)?.formatted ?? '-'} / Low {this.data.find(item => item.value == low)?.formatted ?? '-'}
					</ui-peak>
				</ui-value>
			</ui-header>

			<ui-chart style={chartMaxValue.provide(high)}>
				<ui-data>
					{this.data.map((value, index) => <ui-value style={[
						chartValue.provide(value.value),
						chartDuration.provide(index == this.data.length - 1 ? Infinity : +value.updated - +this.data[index + 1].updated)
					].join(';')}></ui-value>)}
				</ui-data>
			</ui-chart>

			<ui-time>
				Updated at {this.data[0]?.updated.toLocaleString()} in {this.data[0]?.elapsed}ms. {this.data.length} datapoints rendered.
			</ui-time>
		</ui-metric>
	}
}
