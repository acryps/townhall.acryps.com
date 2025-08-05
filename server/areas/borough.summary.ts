import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";
import { DistrictSummaryModel, DistrictViewModel } from "./vote/district";

export class BoroughSummaryModel extends ViewModel<Borough> {
	id;
	tag;

	name;
	color;
	banner;
	bounds;
	incorporation;

	district: DistrictSummaryModel;
}
