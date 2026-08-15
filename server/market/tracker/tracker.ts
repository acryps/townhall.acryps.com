import { DemandModel } from "../../areas/market/demand";
import { Commodity } from "../../managed/database";
import { Demand } from "./demand";
import { MarketPriceRange } from "./price-range";

export class CommodityPriceTracker {
	commodity: Commodity;

	bid: MarketPriceRange;
	ask: MarketPriceRange;

	estimatedStockSize: number;
	estimatedDemand: Demand[] = [];
}
