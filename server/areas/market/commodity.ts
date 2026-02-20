import { ViewModel } from "vlserver";
import { Commodity, CommodityCategory } from "../../managed/database";
import { View } from "vlquery";
import { BidViewModel } from "./bid";
import { AskViewModel } from "./ask";

export class CommoditySummaryModel extends ViewModel<Commodity> {
	id;
	tag;

	name;
	unit;
}

export class CommodityViewModel extends CommoditySummaryModel {
	innovated;
	category: CommodityCategorySummaryModel;

	asks: AskViewModel[];
	bids: BidViewModel[];
}

export class CommodityCategorySummaryModel extends ViewModel<CommodityCategory> {
	id;
	name;
}
