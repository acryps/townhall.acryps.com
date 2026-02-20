import { Service } from "vlserver";
import { Commodity, DbContext } from "../../managed/database";
import { MarketManager } from "../../market/manager";
import { MarketTracker } from "../../market/tracker";
import { CommoditySummaryModel, CommodityViewModel } from "./commodity";
import { LiveCommodityTickerModel, LiveCommodityTickerResponseModel } from "./ticker";

export class MarketService extends Service {
	constructor(
		private database: DbContext,
		private market: MarketManager,
		private tracker: MarketTracker
	) {
		super();
	}

	getCommodities() {
		return CommoditySummaryModel.from(
			this.database.commodity
				.orderByAscending(commodity => commodity.name)
		);
	}

	async getCommodity(tag: string) {
		return new CommodityViewModel(
			await this.database.commodity.first(commodity => commodity.tag.valueOf() == tag)
		)
	}

	getTickers() {
		const tickers: LiveCommodityTickerModel[] = [];

		for (let ticker of this.tracker.trackers) {
			if (ticker.ask.valid || ticker.bid.valid) {
				tickers.push({
					commodityId: ticker.commodity.id,

					askLow: ticker.ask.low,
					askMedian: ticker.ask.median,
					askHigh: ticker.ask.high,
					askVolume: ticker.ask.volume,

					bidLow: ticker.bid.low,
					bidMedian: ticker.bid.median,
					bidHigh: ticker.bid.high,
					bidVolume: ticker.bid.volume
				});
			}
		}

		return LiveCommodityTickerResponseModel.from(tickers);
	}
}
