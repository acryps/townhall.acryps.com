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
import { DemandViewModel } from "./demand";
import { MarketCycleSummaryModel, MarketCycleViewModel } from "./cycle";

export class MarketService extends Service {
	constructor(
		private database: DbContext,
		private market: MarketManager,
		private tracker: MarketTracker
	) {
		super();
	}

	async getCurrentCycle() {
		return new MarketCycleSummaryModel(
			await this.database.marketCycle
				.orderByDescending(cycle => cycle.opened)
				.first()
		);
	}

	async getCycle(id: string) {
		return new MarketCycleViewModel(
			await this.database.marketCycle.find(id)
		);
	}

	async getCycleNeighbors(time: Date) {
		const before = await this.database.marketCycle
			.orderByAscending(cycle => cycle.opened)
			.where(cycle => cycle.opened.isAfter(time))
			.limit(3)
			.toArray();

		const after = await this.database.marketCycle
			.orderByDescending(cycle => cycle.opened)
			.where(cycle => cycle.opened.isBefore(time))
			.limit(3)
			.toArray();

		return MarketCycleSummaryModel.from([...before, ...after]);
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
		);
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
					bidCapitalization: ticker.bid.capitalization,

					estimatedStockSize: ticker.estimatedStockSize,
					estimatedDemandTarget: ticker.estimatedDemand.find(demand => demand.active)?.target ?? 0
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

	async getDemand(commodityId: string) {
		const tracker = this.tracker.find(commodityId);

		if (tracker.estimatedDemand) {
			return DemandViewModel.from(tracker.estimatedDemand);
		}

		return [];
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
