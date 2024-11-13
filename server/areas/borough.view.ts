import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";

export class BoroughViewModel extends ViewModel<Borough> {
	id;
	tag;
	name;
	description;
	color;

	bounds;
	banner;
}
