import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";

export class BoroughSummaryModel extends ViewModel<Borough> {
	id;
	tag;

	name;
	color;
	banner;
	bounds;
	incorporation;
}
