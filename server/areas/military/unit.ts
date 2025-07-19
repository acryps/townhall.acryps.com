import { ViewModel } from "vlserver";
import { MilitaryUnit } from "../../managed/database";
import { MilitaryFacilityViewModel } from "../property/military-facility";

export class MilitaryUnitSummaryModel extends ViewModel<MilitaryUnit> {
	id;
	disbanded;

	code;
	name;
	banner;

	parentId;
}

export class MilitaryUnitViewModel extends MilitaryUnitSummaryModel {
	created;
	description;

	parent: MilitaryUnitSummaryModel;
	subunits: MilitaryUnitSummaryModel[];
	facilities: MilitaryFacilityViewModel[];
}
