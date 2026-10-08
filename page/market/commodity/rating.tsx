import { Component } from "@acryps/page";
import { CommodityRatingChartModel, CommodityViewModel } from "../../../interface/models";
import { CommodityRatingViewModel, MarketService } from "../../managed/services";
import { chartFillColor, chartLineColor, chartLineWidth } from "../../metrics/index.style";

export class CommodityRatingsTab extends Component {
	ratings: CommodityRatingChartModel[];

	start: Date;
	end: Date;

	type = 'absolute';

	constructor(
		public commodity: CommodityViewModel
	) {
		super();
	}

	async onload() {
		this.ratings = await new MarketService().getCommodityRatings(this.commodity.id);
	}

	render() {
		return <ui-ratings>
			{this.renderChart('Retail Demand', 'Retai', 'retailDemand')}
		</ui-ratings>;
	}

	renderChart(name: string, description: string, property: keyof CommodityRatingChartModel) {
		const datapoints = this.ratings.map(rating => rating[property]) as number[];

		const high = Math.max(...datapoints ?? []);
		const low = Math.min(...datapoints ?? []);

		const canvas = document.createElement('canvas');

		requestAnimationFrame(() => {
			if (!datapoints) {
				return;
			}

			const container = canvas.parentElement;

			if (datapoints.length <= 1) {
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
			context.lineTo(bounds.width, translateValueToY(datapoints[0]));

			for (let datapointIndex = 0; datapointIndex < datapoints.length; datapointIndex++) {
				const datapoint = datapoints[datapointIndex];
				const rating = this.ratings[datapointIndex];

				context.lineTo(translateTimeToX(rating.cycle.opened), translateValueToY(datapoint));
			}

			context.stroke();

			context.lineTo(translateTimeToX(this.ratings[datapoints.length - 1].cycle.opened), bounds.height);
			context.lineTo(bounds.width, bounds.height);
			context.closePath();

			context.fill();
		});

		return <ui-rating>
			<ui-name>
				{name}
			</ui-name>

			<ui-description>
				{description}
			</ui-description>

			{canvas}
		</ui-rating>
	}
}
