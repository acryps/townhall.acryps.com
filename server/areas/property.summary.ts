import { ViewModel } from "vlserver";
import { Property } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";
import { HistoricListingGradeViewModel } from "./history-listing/grade.view";
import { PropertyTypeViewModel } from "./property-type.view";

export class PropertySummaryModel extends ViewModel<Property> {
	id;
	
	name;
	bounds;

	type: PropertyTypeViewModel;
	borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
}