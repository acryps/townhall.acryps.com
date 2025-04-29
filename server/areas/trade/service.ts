import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { TradeManager } from "./manager";
import { ValuationViewModel } from "./valuation.view";

export class TradeService extends Service {
	constructor(
		private database: DbContext,
		private manager: TradeManager
	) {
		super();
	}

	async getValuation(id: string) {
		return new ValuationViewModel(
			await this.database.valuation.find(id)
		);
	}
}
