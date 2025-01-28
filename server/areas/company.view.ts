import { ViewModel } from "vlserver";
import { Company, Office } from "../managed/database";
import { PropertySummaryModel } from "./property.summary";

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

	offices: OfficeViewModel[];
}

export class OfficeSummaryModel extends ViewModel<Office> {
	id;

	name;
}

export class OfficeViewModel extends OfficeSummaryModel {
	capacity;

	company: CompanySummaryModel;
	property: PropertySummaryModel;
}
