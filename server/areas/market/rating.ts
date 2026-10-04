import { ViewModel } from "vlserver";
import { CommodityRating } from "../../managed/database";
import { CommoditySummaryModel } from "./commodity";

export class CommodityRatingViewModel extends ViewModel<CommodityRating> {
	id;

	retailStockSize;
	commercialStockSize;

	retailDemand;
	commercialDemand;

	commodity: CommoditySummaryModel;
}
