import { ViewModel } from "vlserver";
import { BoroughBoundary } from "../../managed/database";

export class BoroughBoundaryShapeModel extends ViewModel<BoroughBoundary> {
	id;
	shape;
}

export class BoroughBoundarySummaryModel extends BoroughBoundaryShapeModel {
	created;
	changeComment;
}
