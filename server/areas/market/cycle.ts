import { ViewModel } from "vlserver";
import { MarketCycle } from "../../managed/database";

export class MarketCycleSummaryModel extends ViewModel<MarketCycle> {
	id;
	opened;
	closed;

	riskAppetite;
}

export class MarketCycleViewModel extends MarketCycleSummaryModel {
	context;
}
