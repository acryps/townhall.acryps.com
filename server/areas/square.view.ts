import { ViewModel } from "vlserver";
import { Square, SquareBoundary } from "../managed/database";

export class SquareViewModel extends ViewModel<Square> {
	id;
	tag;

	name;

	activeBoundaryId;
	boundaries: SquareBoundarySummaryModel[];
}

export class SquareBoundarySummaryModel extends ViewModel<SquareBoundary> {
	id;
	created;
	changeComment;

	shape;
}
