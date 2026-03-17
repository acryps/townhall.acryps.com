import { ViewModel } from "vlserver";
import { TradeAsk } from "../../managed/database";
import { LegalEntityViewModel } from "../legal-entity";
import { CommoditySummaryModel } from "./commodity";

export class AskViewModel extends ViewModel<TradeAsk> {
	id;

	price;
	quantity;

	posted;
}

export class CommodityAskViewModel extends AskViewModel {
	asker: LegalEntityViewModel;
}

export class TraderAskViewModel extends AskViewModel {
	commodity: CommoditySummaryModel;
}
