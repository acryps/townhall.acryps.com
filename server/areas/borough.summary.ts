import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";
import { DistrictSummaryModel, DistrictViewModel } from "./vote/district";
import { BoroughBoundaryShapeModel } from "./borough/boundary";

export class BoroughSummaryModel extends ViewModel<Borough> {
	id;
	tag;

	name;
	contextTagline;

	color;
	banner;
	incorporation;

	activeBoundary: BoroughBoundaryShapeModel;
	district: DistrictSummaryModel;
}
