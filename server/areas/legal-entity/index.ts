import { ViewModel } from "vlserver";
import { CompanySummaryModel } from "../company.view";
import { ResidentSummaryModel } from "../life/resident";
import { BoroughSummaryModel } from "../borough.summary";
import { LegalEntity } from "../../managed/database";

export class LegalEntityViewModel extends ViewModel<LegalEntity> {
	id;

	referenceCount;

	state;
	borough: BoroughSummaryModel;
	resident: ResidentSummaryModel;
	company: CompanySummaryModel;
}
