import { ViewModel } from "vlserver";
import { Dwelling, Resident, ResidentRelationship, Tenancy } from "../../managed/database";
import { PropertySummaryModel } from "../property.summary";

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
