import { Component } from "@acryps/page";
import { CommodityRatingChartModel, CommodityViewModel, MarketService } from "../../managed/services";
import { ChartComponent, ChartSeries } from "../../shared/chart";
import { chartFillColor, chartLineColor } from "../../metrics/index.style";
import { commercialColor, retailColor } from "./index.style";
import { convertToCurrency } from "../../../interface/currency";
import { formatTradingUnit } from "../../../interface/trading-unit";

export class CommodityRatingsTab extends Component {
	ratings: CommodityRatingChartModel[];

	timeRanges = [
		{ name: 'Last Day', start: +new Date() - 1000 * 60 * 60 * 24 },
		{ name: 'Last Week', start: +new Date() - 1000 * 60 * 60 * 24 * 7 },
		{ name: 'Last Month', start: +new Date() - 1000 * 60 * 60 * 24 * 30.4 },
		{ name: 'Last 3 Months', start: +new Date() - 1000 * 60 * 60 * 24 * 30.4 * 3 },
		{ name: 'All Time', start: 0 }
	];

	timeRange = this.timeRanges[2];

	valueRanges = [
		{ name: 'Absolute', range: 'absolute' },
		{ name: 'Relative', range: 'relative' }
	];

	valueRange = this.valueRanges[1];

	constructor(
		public commodity: CommodityViewModel
	) {
		super();
	}

	async onload() {
		this.ratings = await new MarketService().getCommodityRatings(this.commodity.id);
	}

	render() {
		// ratings are ordered newest first by the server
		const ratings = this.ratings.filter(rating => +rating.cycle.opened >= this.timeRange.start);

		const end = new Date();
		const start = new Date(this.timeRange.start);

		return <ui-ratings>
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

			{this.renderChart(
				'Price',
				'The price commodities last traded at on the market.',
				ratings, start, end,
				[{ name: 'Price', color: chartLineColor, fill: chartFillColor, property: 'price', format: value => convertToCurrency(value) }]
			)}

			{this.renderChart(
				'Demand',
				'How much residents and companies want to own, compared to how much is currently in stock.',
				ratings, start, end,
				[
					{ name: 'Retail', color: retailColor, property: 'retailDemand', format: value => formatTradingUnit(this.commodity.tradingUnit, value) },
					{ name: 'Commercial', color: commercialColor, property: 'commercialDemand', format: value => formatTradingUnit(this.commodity.tradingUnit, value) }
				]
			)}

			{this.renderChart(
				'Stock',
				'How much is currently held in storage, available to be sold.',
				ratings, start, end,
				[
					{ name: 'Retail', color: retailColor, property: 'retailStockSize', format: value => formatTradingUnit(this.commodity.tradingUnit, value) },
					{ name: 'Commercial', color: commercialColor, property: 'commercialStockSize', format: value => formatTradingUnit(this.commodity.tradingUnit, value) }
				]
			)}
		</ui-ratings>;
	}

	private renderChart(
		name: string,
		description: string,
		ratings: CommodityRatingChartModel[],
		start: Date,
		end: Date,
		definitions: { name: string, color: ChartSeries['color'], fill?: ChartSeries['fill'], property: keyof CommodityRatingChartModel, format: (value: number) => string }[]
	) {
		const series: ChartSeries[] = definitions.map(definition => ({
			name: definition.name,
			color: definition.color,
			fill: definition.fill,
			current: ratings.length ? definition.format(ratings[0][definition.property] as number) : undefined,
			points: ratings.map(rating => ({ time: rating.cycle.opened, value: rating[definition.property] as number }))
		}));

		return <ui-rating>
			<ui-header>
				<ui-name>
					{name}
				</ui-name>

				<ui-description>
					{description}
				</ui-description>
			</ui-header>

			{ratings.length ? new ChartComponent(series, start, end, this.valueRange.range as any) : <ui-empty>
				No ratings recorded for this time range yet.
			</ui-empty>}
		</ui-rating>;
	}
}
