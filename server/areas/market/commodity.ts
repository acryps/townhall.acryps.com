import { ViewModel } from "vlserver";
import { Commodity, CommodityCategory, StockSeedRule } from "../../managed/database";
import { View } from "vlquery";
import { CommodityBidViewModel } from "./bid";
import { CommodityAskViewModel } from "./ask";
import { TradingUnitViewModel } from "./unit";
import { ResidentAssessmentParameterViewModel } from "../life/resident";

export class CommoditySummaryModel extends ViewModel<Commodity> {
	id;
	tag;
	iconId;
	symbol;

	name;

	tradingUnit: TradingUnitViewModel;
}

export class CommodityViewModel extends CommoditySummaryModel {
	activeResidentialDemandId;

	innovated;
	description;
	category: CommodityCategorySummaryModel;

	tradingUnitCommercialBaseline;
	tradingUnitRetailBaseline;

	asks: CommodityAskViewModel[];
	bids: CommodityBidViewModel[];

	stockSeedRules: StockSeedRuleViewModel[];
}

export class CommodityCategorySummaryModel extends ViewModel<CommodityCategory> {
	id;
	name;
}

export class StockSeedRuleViewModel extends ViewModel<StockSeedRule> {
	id;

	property;
	operation;

	parameterMinimum;
	parameterMaximum;

	valueMinimum;
	valueMaximum;

	parameter: ResidentAssessmentParameterViewModel;
}
