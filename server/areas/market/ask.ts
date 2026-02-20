import { ViewModel } from "vlserver";
import { TradeAsk } from "../../managed/database";
import { LegalEntityViewModel } from "../legal-entity";

export class AskViewModel extends ViewModel<TradeAsk> {
	id;

	asker: LegalEntityViewModel;

	price;
	quantity;

	posted;
}
