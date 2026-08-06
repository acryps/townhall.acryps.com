import { ViewModel } from "vlserver";
import { Commodity, CommodityCategory } from "../../managed/database";
import { View } from "vlquery";
import { CommodityBidViewModel } from "./bid";
import { CommodityAskViewModel } from "./ask";
import { TradingUnitViewModel } from "./unit";

export class CommoditySummaryModel extends ViewModel<Commodity> {
	id;
	tag;
	iconId;

	name;
	unit;

	tradingUnit: TradingUnitViewModel;
}

export class CommodityViewModel extends CommoditySummaryModel {
	innovated;
	description;
	category: CommodityCategorySummaryModel;

	asks: CommodityAskViewModel[];
	bids: CommodityBidViewModel[];
}

export class CommodityCategorySummaryModel extends ViewModel<CommodityCategory> {
	id;
	name;
}
