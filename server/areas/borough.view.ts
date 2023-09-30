import { ViewModel } from "vlserver";
import { Borough } from "../managed/database";

export class BoroughViewModel extends ViewModel<Borough> {
	id;
	name;
	color;
	
	bounds;
}