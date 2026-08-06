import { ViewModel } from "vlserver";
import { Stock } from "../../market/stock";
import { CommoditySummaryModel } from "./commodity";
import { StockSeed } from "../../managed/database";

export class StockModel {
	commodity: CommoditySummaryModel;
	quantity: number;
	quality: number;

	static from(source: Stock) {
		const model = new StockModel();
		model.commodity = new CommoditySummaryModel(source.commodity);
		model.quantity = source.quantity;
		model.quality = source.quality;

		return model;
	}
}

export class StockViewModel extends ViewModel<StockModel> {
	commodity: CommoditySummaryModel;
	quantity;
	quality;
}

export class StockSeedViewModel extends ViewModel<StockSeed> {
	sourceName;
	sourceQuantity;
	sourceReason;

	commodity: CommoditySummaryModel;
	quantity;
}
