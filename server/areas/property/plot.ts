import { ViewModel } from "vlserver";
import { PlotBoundary } from "../../managed/database";

export class PlotBoundaryShapeModel extends ViewModel<PlotBoundary> {
	id;
	shape;
}

export class PlotBoundarySummaryModel extends PlotBoundaryShapeModel {
	created;
	changeComment;
}
