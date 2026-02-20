import { ViewModel } from "vlserver";
import { TradeBid } from "../../managed/database";
import { LegalEntityViewModel } from "../../../interface/models";

export class BidViewModel extends ViewModel<TradeBid> {
	id;

	bidder: LegalEntityViewModel;

	price;
	quantity;

	posted;
}
