import { ViewModel } from "vlserver";
import { Stock } from "../../market/stock";
import { CommoditySummaryModel } from "./commodity";
import { StockSeed } from "../../managed/database";

export class StockModel {
	commodity: CommoditySummaryModel;
	quantity: number;

	static from(source: Stock) {
		const model = new StockModel();
		model.commodity = new CommoditySummaryModel(source.commodity);
		model.quantity = source.quantity;

		return model;
	}
}

export class StockViewModel extends ViewModel<StockModel> {
	commodity: CommoditySummaryModel;
	quantity;
}

export class StockSeedViewModel extends ViewModel<StockSeed> {
	sourceName;
	sourceQuantity;
	sourceReason;

	commodity: CommoditySummaryModel;
	quantity;
}
