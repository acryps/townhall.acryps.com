import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { TradeManager } from "./manager";
import { ValuationViewModel } from "./valuation.view";
import { PropertyOwnerViewModel } from "../property.view";
import { AssetViewModel } from "./asset";

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

	async overwriteValuation(id: string, price: number) {
		const valuation = await this.database.valuation.find(id);
		valuation.price = price;

		await valuation.update();
	}

	async compileAssets(id: string) {
		return AssetViewModel.from(await this.manager.compileAssets(id));
	}
}
