import { ViewModel } from "vlserver";
import { Company, Office } from "../managed/database";

export class CompanySummaryModel extends ViewModel<Company> {
	id;
	tag;

	name;
	type;
}

export class CompanyViewModel extends CompanySummaryModel {
	description;

	offices: OfficeViewModel[];
}

export class OfficeSummaryModel extends ViewModel<Office> {
	id;

	name;
}

export class OfficeViewModel extends OfficeSummaryModel {
	company: CompanySummaryModel;
}
