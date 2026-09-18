import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";
import { DistrictViewModel } from "./vote/district";
import { BoroughBoundarySummaryModel } from "./borough/boundary";

export class BoroughViewModel extends ViewModel<Borough> {
	id;
	tag;
	name;
	description;
	color;
	incorporation;

	banner;

	activeBoundaryId;
	boundaries: BoroughBoundarySummaryModel[];

	district: DistrictViewModel;
}
