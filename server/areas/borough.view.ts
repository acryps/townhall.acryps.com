import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";
import { DistrictViewModel } from "./vote/district";

export class BoroughViewModel extends ViewModel<Borough> {
	id;
	tag;
	name;
	description;
	color;
	incorporation;

	bounds;
	banner;

	district: DistrictViewModel;
}
