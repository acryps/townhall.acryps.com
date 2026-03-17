import { ViewModel } from "vlserver";
import { TradeBid } from "../../managed/database";
import { LegalEntityViewModel } from "../../../interface/models";
import { CommoditySummaryModel } from "./commodity";

export class BidViewModel extends ViewModel<TradeBid> {
	id;

	price;
	quantity;

	posted;
}

export class CommodityBidViewModel extends BidViewModel {
	bidder: LegalEntityViewModel;
}


export class TraderBidViewModel extends BidViewModel {
	commodity: CommoditySummaryModel;
}
