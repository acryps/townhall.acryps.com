import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { CommoditySummaryModel, CommodityViewModel } from "./commodity";
import { CommodityRatingChartModel, CommodityRatingViewModel } from "./rating";
import { TradingEntity } from "../../market/entity";
import { StockModel, StockSeedViewModel, StockViewModel } from "./stock";
import { CommodityBidViewModel, TraderBidViewModel } from "./bid";
import { CommodityAskViewModel, TraderAskViewModel } from "./ask";
import { MarketCycleSummaryModel, MarketCycleViewModel } from "./cycle";
import { CommoditySymbolTickerViewModel } from "./ticker";

export class MarketService extends Service {
	constructor(
		private database: DbContext
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

	getSymbolTicker() {
		return CommoditySymbolTickerViewModel.from(
			this.database.views.commoditySymbolTicker
				.orderByAscending(item => item.symbol)
		);
	}

	async getRatings() {
		const lastCycle = await this.database.marketCycle
			.where(cycle => cycle.closed != null)
			.orderByDescending(cycle => cycle.closed)
			.first();

		if (!lastCycle) {
			return [];
		}

		return CommodityRatingViewModel.from(lastCycle.commodityRatings);
	}

	async getRating(id: string) {
		const lastCycle = await this.database.marketCycle
			.where(cycle => cycle.closed != null)
			.orderByDescending(cycle => cycle.closed)
			.first();

		if (!lastCycle) {
			return;
		}

		return new CommodityRatingViewModel(
			await lastCycle.commodityRatings.first(rating => rating.commodityId == id)
		);
	}

	async getCommodity(tag: string) {
		return new CommodityViewModel(
			await this.database.commodity.first(commodity => commodity.tag.valueOf() == tag)
		);
	}

	async getCommodityRatings(id: string) {
		return CommodityRatingChartModel.from(
			this.database.commodityRating
				.where(rating => rating.commodityId == id)
				.orderByDescending(rating => rating.cycle.opened)
				.limit(100)
				.include(rating => rating.cycle)
		);
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
