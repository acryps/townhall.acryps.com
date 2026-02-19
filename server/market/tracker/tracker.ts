import { Commodity } from "../../managed/database";
import { MarketPriceRange } from "./price-range";

export class CommodityPriceTracker {
	commodity: Commodity;

	bid: MarketPriceRange;
	ask: MarketPriceRange;
}
