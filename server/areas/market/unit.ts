import { ViewModel } from "vlserver";
import { CommodityTradingUnit } from "../../managed/database";

export class TradingUnitViewModel extends ViewModel<CommodityTradingUnit> {
	id;

	name;
	format;

	baseUnit;
	shorthands;

	whole;
}
