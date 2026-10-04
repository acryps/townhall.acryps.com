import { Commodity, CommodityRating } from "../../managed/database";

export class CommodityMarketRating {
	constructor(
		public commodity: Commodity,
		public rating: CommodityRating
	) {}
}
