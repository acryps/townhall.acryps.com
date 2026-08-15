import { ViewModel } from "vlserver";
import { MarketCycle } from "../../managed/database";

export class MarketCycleViewModel extends ViewModel<MarketCycle> {
	id;
	opened;
	closed;

	riskAppetite;
}
