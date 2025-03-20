import { ViewModel } from "vlserver";
import { WorkContract, WorkOffer } from "../managed/database";
import { ResidentSummaryModel } from "./life/resident";
import { OfficeSummaryModel, OfficeViewModel } from "./company.view";

export class WorkOfferSummaryModel extends ViewModel<WorkOffer> {
	id;

	title;
	count;
	closed;
}

export class WorkOfferViewModel extends WorkOfferSummaryModel {
	task;
	offered;

	office: OfficeViewModel;
	workContracts: WorkContractViewModel[];
}

export class WorkContractViewModel extends ViewModel<WorkContract> {
	id;

	signed;
	canceled;
	match;

	worker: ResidentSummaryModel;
}
