import { Component } from "@acryps/page";
import { Hex, Hsl, Rgb } from "@acryps/style";
import { chartLineWidth, seriesColor } from "./index.style";

export type ChartColor = Hex | Rgb | Hsl;

export interface ChartSeries {
	name: string;
	color: ChartColor;

	// only drawn when this is the only series in the chart
	fill?: ChartColor;

	// shown next to the series name in the legend, when there is more than one series
	current?: string;

	points: { time: Date, value: number }[];
}

export class ChartComponent extends Component {
	constructor(
		private series: ChartSeries[],
		private start: Date,
		private end: Date,
		private type: 'absolute' | 'relative' = 'absolute'
	) {
		super();
	}

	render() {
		const canvas = document.createElement('canvas');

		requestAnimationFrame(() => this.draw(canvas));

		return <ui-chart>
			{this.series.length > 1 && <ui-legend>
				{this.series.map(series => <ui-series style={seriesColor.provide(series.color)}>
					<ui-swatch></ui-swatch>

					<ui-name>
						{series.name}
					</ui-name>

					{series.current && <ui-value>
						{series.current}
					</ui-value>}
				</ui-series>)}
			</ui-legend>}

			<ui-canvas>
				{canvas}
			</ui-canvas>
		</ui-chart>;
	}

	private draw(canvas: HTMLCanvasElement) {
		const container = canvas.parentElement;

		if (!container) {
			return;
		}

		if (!this.series.some(series => series.points.length > 1)) {
			container.remove();

			return;
		}

		const bounds = container.getBoundingClientRect();

		canvas.width = bounds.width * devicePixelRatio;
		canvas.height = bounds.height * devicePixelRatio;

		const context = canvas.getContext('2d');
		context.scale(devicePixelRatio, devicePixelRatio);

		const values = this.series.flatMap(series => series.points.map(point => point.value));
		const high = Math.max(...values);
		const low = Math.min(...values);

		const valueRange = this.type == 'absolute' ? high : (high - low);
		const baseValue = this.type == 'absolute' ? 0 : low;

		const timeRange = +this.end - +this.start;
		const translateTimeToX = (time: Date) => bounds.width - bounds.width / timeRange * (+this.end - +time);

		const height = bounds.height - chartLineWidth;
		const translateValueToY = (value: number) => chartLineWidth / 2 + height - height / valueRange * (value - baseValue);

		// only fill the area below the line when there is exactly one series, overlapping fills get unreadable
		const fillColor = this.series.length == 1 ? this.series[0].fill : undefined;

		for (let series of this.series) {
			if (series.points.length <= 1) {
				continue;
			}

			context.strokeStyle = series.color.toValueString();
			context.lineWidth = chartLineWidth;

			context.beginPath();
			context.lineTo(bounds.width, translateValueToY(series.points[0].value));

			for (let point of series.points) {
				context.lineTo(translateTimeToX(point.time), translateValueToY(point.value));
			}

			context.stroke();

			if (fillColor) {
				context.fillStyle = fillColor.toValueString();

				context.lineTo(translateTimeToX(series.points[series.points.length - 1].time), bounds.height);
				context.lineTo(bounds.width, bounds.height);
				context.closePath();
				context.fill();
			}
		}
	}
}
