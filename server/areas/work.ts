import { ViewModel } from "vlserver";
import { WorkContract, WorkOffer } from "../managed/database";
import { ResidentSummaryModel } from "./life/resident";
import { OfficeEmployeeModel, OfficeSummaryModel, OfficeViewModel } from "./company.view";

export class WorkOfferSummaryModel extends ViewModel<WorkOffer> {
	id;

	title;
	count;
	closed;
}

export class WorkOfferEmplymentModel extends WorkOfferSummaryModel {
	office: OfficeEmployeeModel;
}

export class WorkOfferViewModel extends WorkOfferSummaryModel {
	task;
	offered;

	office: OfficeViewModel;
	workContracts: WorkContractViewModel[];
}

export class WorkContractSummaryModel extends ViewModel<WorkContract> {
	id;

	signed;
	canceled;
}

export class WorkContractViewModel extends WorkContractSummaryModel {
	match;

	worker: ResidentSummaryModel;
}

export class WorkContractEmploymentModel extends WorkContractSummaryModel {
	offer: WorkOfferEmplymentModel;
}
