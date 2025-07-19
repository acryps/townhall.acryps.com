import { ViewModel } from "vlserver";
import { MilitaryFacility } from "../../managed/database";
import { MilitaryUnitSummaryModel, MilitaryUnitViewModel } from "../military/unit";
import { PropertySummaryModel } from "../property.summary";

export class MilitaryFacilityViewModel extends ViewModel<MilitaryFacility> {
	id;

	name;
	opened;
	closed;

	unit: MilitaryUnitSummaryModel;
	property: PropertySummaryModel;
}
