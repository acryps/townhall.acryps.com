import { Component } from "@acryps/page";
import { MetricService, MetricValueViewModel, MetricViewModel } from "../managed/services";
import { chartFillColor, chartLineColor, chartLineWidth } from "./index.style";

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

		const canvas = document.createElement('canvas');

		requestAnimationFrame(() => {
			if (!this.datapoints) {
				return;
			}

			const container = canvas.parentElement;

			if (this.datapoints.length <= 1) {
				container.remove();
			}

			const bounds = container.getBoundingClientRect();

			canvas.width = bounds.width * devicePixelRatio;
			canvas.height = bounds.height * devicePixelRatio;

			const context = canvas.getContext('2d');
			context.scale(devicePixelRatio, devicePixelRatio);
			context.translate(0, chartLineWidth / 2);

			context.strokeStyle = chartLineColor.toValueString();
			context.lineWidth = chartLineWidth;
			context.fillStyle = chartFillColor.toValueString();

			const height = bounds.height - chartLineWidth;

			const timeRange = +this.end - +this.start;
			const translateTimeToX = (time: Date) => bounds.width - bounds.width / timeRange * (+this.end - +time);

			const valueRange = this.type == 'absolute' ? high : (high - low);
			const baseValue = this.type == 'absolute' ? 0 : low;

			const translateValueToY = (value: number) => height - height / valueRange * (value - baseValue);

			context.beginPath();
			context.lineTo(bounds.width, translateValueToY(this.datapoints[0].value));

			for (let datapoint of this.datapoints) {
				context.lineTo(translateTimeToX(datapoint.updated), translateValueToY(datapoint.value));
			}

			context.stroke();

			context.lineTo(translateTimeToX(this.datapoints[this.datapoints.length - 1].updated), bounds.height);
			context.lineTo(bounds.width, bounds.height);
			context.closePath();

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
						{current?.formatted ?? '-'}
					</ui-current>

					<ui-peak>
						High {this.datapoints?.find(item => item.value == high)?.formatted ?? '-'} / Low {this.datapoints?.find(item => item.value == low)?.formatted ?? '-'}
					</ui-peak>
				</ui-value>
			</ui-header>

			<ui-chart>
				{canvas}
			</ui-chart>

			{current ? <ui-time>
				Updated at {current.updated.toLocaleString()} in {current.elapsed}ms. {this.datapoints.length} datapoints rendered.
			</ui-time> : <ui-time>
				Loading datapoints...
			</ui-time>}
		</ui-metric>
	}
}
