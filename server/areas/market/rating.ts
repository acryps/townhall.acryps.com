import { ViewModel } from "vlserver";
import { CommodityRating, MarketCycle } from "../../managed/database";
import { CommoditySummaryModel } from "./commodity";

export class CommodityRatingViewModel extends ViewModel<CommodityRating> {
	id;

	retailStockSize;
	commercialStockSize;

	retailDemand;
	commercialDemand;

	price;

	commodity: CommoditySummaryModel;
}

export class CommodityRatingChartModel extends ViewModel<CommodityRating> {
	id;

	retailStockSize;
	commercialStockSize;

	retailDemand;
	commercialDemand;

	price;

	cycle: MarketCycleChartModel;
}

export class MarketCycleChartModel extends ViewModel<MarketCycle> {
	id;

	opened;
}
