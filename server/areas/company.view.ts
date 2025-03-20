import { ViewModel } from "vlserver";
import { Company, Office, OfficeCapacity } from "../managed/database";
import { PropertySummaryModel } from "./property.summary";
import { WorkOfferSummaryModel } from "./work";

export class CompanySummaryModel extends ViewModel<Company> {
	id;
	tag;

	name;
	type;
	purpose;
}

export class CompanyViewModel extends CompanySummaryModel {
	description;
	created;
	incorporated;

	offices: OfficeSummaryModel[];
}

export class OfficeSummaryModel extends ViewModel<Office> {
	id;

	name;
	property: PropertySummaryModel;
}

export class OfficeViewModel extends OfficeSummaryModel {
	company: CompanySummaryModel;
	workOffers: WorkOfferSummaryModel[];
	capacityGrants: OfficeCapacityViewModel[];
}

export class OfficeCapacityViewModel extends ViewModel<OfficeCapacity> {
	id;

	issued;
	size;
}
