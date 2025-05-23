import { Component } from "@acryps/page";
import { MetricService, MetricValueViewModel, MetricViewModel } from "../managed/services";
import { chartFillColor, chartLineColor, chartLineWidth } from "./index.style";

export class MetricComponent extends Component {
	datapoints: MetricValueViewModel[] = [];

	constructor(
		private metric: MetricViewModel,
		private start: Date,
		private type: 'absolute' | 'relative'
	) {
		super();

		new MetricService().plot(this.metric.id, start).then(data => {
			this.datapoints = data;

			// will not render if relative
			if (this.datapoints.length == 1) {
				this.type = 'absolute';
			}

			this.update();
		});
	}

	render() {
		const high = Math.max(...this.datapoints.map(item => item.value));
		const low = Math.min(...this.datapoints.map(item => item.value));

		const canvas = document.createElement('canvas');

		requestAnimationFrame(() => {
			const container = canvas.parentElement;
			const bounds = container.getBoundingClientRect();

			canvas.width = bounds.width * devicePixelRatio;
			canvas.height = bounds.height * devicePixelRatio;

			const context = canvas.getContext('2d');
			context.scale(devicePixelRatio, devicePixelRatio);
			context.translate(0, chartLineWidth / 2);

			let x = bounds.width;
			const height = bounds.height - chartLineWidth;

			const timeRange = +new Date() - +this.start;
			const valueRange = this.type == 'absolute' ? high : (high - low);
			const valueBase = this.type == 'absolute' ? 0 : low;

			context.beginPath();
			context.moveTo(bounds.width, height - height / valueRange * (this.datapoints[0].value - valueBase));

			for (let datapoint of this.datapoints) {
				x -= bounds.width / timeRange * (+new Date() - +datapoint.updated);

				context.lineTo(x, height - height / valueRange * (datapoint.value - valueBase));
			}

			context.strokeStyle = chartLineColor.toValueString();
			context.lineWidth = chartLineWidth;
			context.stroke();

			context.lineTo(x, bounds.height);
			context.lineTo(bounds.width, bounds.height);
			context.closePath();

			context.fillStyle = chartFillColor.toValueString();
			context.fill();
		});

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
						{this.datapoints[0]?.formatted ?? '-'}
					</ui-current>

					<ui-peak>
						High {this.datapoints.find(item => item.value == high)?.formatted ?? '-'} / Low {this.datapoints.find(item => item.value == low)?.formatted ?? '-'}
					</ui-peak>
				</ui-value>
			</ui-header>

			<ui-chart>
				{canvas}
			</ui-chart>

			<ui-time>
				Updated at {this.datapoints[0]?.updated.toLocaleString()} in {this.datapoints[0]?.elapsed}ms. {this.datapoints.length} datapoints rendered.
			</ui-time>
		</ui-metric>
	}
}
