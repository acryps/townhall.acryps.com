import { Service } from "vlserver";
import { Commodity, DbContext } from "../../managed/database";
import { MarketManager } from "../../market/manager";
import { MarketTracker } from "../../market/tracker";
import { CommoditySummaryModel, CommodityViewModel } from "./commodity";
import { LiveCommodityTickerModel, LiveCommodityTickerResponseModel } from "./ticker";
import { TradingEntity } from "../../market/entity";
import { StockModel, StockSeedViewModel, StockViewModel } from "./stock";
import { CommodityBidViewModel, TraderBidViewModel } from "./bid";
import { CommodityAskViewModel, TraderAskViewModel } from "./ask";

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
					askCapitalization: ticker.ask.capitalization,

					bidLow: ticker.bid.low,
					bidMedian: ticker.bid.median,
					bidHigh: ticker.bid.high,
					bidVolume: ticker.bid.volume,
					bidCapitalization: ticker.bid.capitalization
				});
			}
		}

		return LiveCommodityTickerResponseModel.from(tickers);
	}

	async getStock(entityId: string) {
		const entity = await this.database.legalEntity.find(entityId);
		const trader = await TradingEntity.from(entity, this.database);

		const stock = await trader.getStock();

		return StockViewModel.from(stock.map(item => StockModel.from(item)));
	}

	async getBids(entityId: string) {
		return TraderBidViewModel.from(
			this.database.tradeBid
				.where(bid => bid.bidderId == entityId)
				.orderByAscending(bid => bid.posted)
		);
	}

	async getAsks(entityId: string) {
		return TraderAskViewModel.from(
			this.database.tradeAsk
				.where(ask => ask.askerId == entityId)
				.orderByAscending(ask => ask.posted)
		);
	}

	async getOpenSeedStock(entityId: string) {
		return StockSeedViewModel.from(
			this.database.stockSeed
				.where(seed => seed.ownerId == entityId)
				.where(seed => seed.quantity == null)
				.orderByAscending(seed => seed.indexed)
		);
	}
}
