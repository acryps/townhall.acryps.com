import { ViewModel } from "vlserver";
import { Valuation } from "../../managed/database";
import { LegalEntityViewModel } from "../legal-entity";

export class ValuationSummaryModel extends ViewModel<Valuation> {
	id;

	price;
}

export class ValuationViewModel extends ValuationSummaryModel {
	issuer: LegalEntityViewModel;
	estimated;

	item;
	description;
}
