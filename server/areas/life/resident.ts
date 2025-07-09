import { ViewModel } from "vlserver";
import { Dwelling, Resident, ResidentEventView, ResidentRelationship, Tenancy } from "../../managed/database";
import { PropertySummaryModel } from "../property.summary";
import { WorkContractEmploymentModel, WorkContractViewModel } from "../work";

export class ResidentSummaryModel extends ViewModel<Resident> {
	id;
	tag;

	givenName;
	familyName;
	birthday;
}

export class ResidentViewModel extends ViewModel<Resident> {
	id;
	tag;

	givenName;
	familyName;
	birthday;

	biography;

	mainTenancy: TenancyViewModel;
	workContracts: WorkContractEmploymentModel[];

	compassSocial;
	compassEconomic;
}

export class ResidentRelationViewModel extends ViewModel<ResidentRelationship> {
	id;
	purpose;

	bonded;
	connection;

	ended;
	conflict;

	initiator: ResidentSummaryModel;
	peer: ResidentSummaryModel;
}

export class DwellingViewModel extends ViewModel<Dwelling> {
	id;

	property: PropertySummaryModel;
}

export class TenancyViewModel extends ViewModel<Tenancy> {
	id;
	dwelling: DwellingViewModel;

	start;
	end;
}

export class ResidentEventViewModel extends ViewModel<ResidentEventView> {
	id;

	timestamp;
	action;
	detail;
}
