import { ViewModel } from "vlserver";
import { Property } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";
import { HistoricListingGradeViewModel } from "./history-listing/grade.view";
import { PropertyTypeViewModel } from "./property-type.view";
import { PlotBoundaryShapeModel } from "../../interface/models";

export class PropertySummaryModel extends ViewModel<Property> {
	id;

	name;

	type: PropertyTypeViewModel;
	borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	activePlotBoundary: PlotBoundaryShapeModel;
}
