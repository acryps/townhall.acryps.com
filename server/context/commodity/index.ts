import { Commodity } from "../../managed/database";
import { DescriptionFragment, ItemContextComposer, MetricFragment } from "../composer";

export class CommodityContextComposer extends ItemContextComposer<Commodity> {
	find = id => this.database.commodity.find(id);
	title = (item: Commodity) => item.name;

	async collect(commodity: Commodity) {
		const lastCycle = await this.database.marketCycle
			.where(cycle => cycle.closed != null)
			.orderByDescending(cycle => cycle.closed)
			.first();

		const rating = lastCycle
			? await lastCycle.commodityRatings.first(rating => rating.commodityId == commodity.id)
			: null;

		return [
			async () => [
				new DescriptionFragment(commodity.description),
				...(rating ? [
					new MetricFragment('Price', () => `${rating.price}`),
					new MetricFragment('Retail Demand', () => `${rating.retailDemand}`),
					new MetricFragment('Commercial Demand', () => `${rating.commercialDemand}`)
				] : [])
			]
		];
	}
}
