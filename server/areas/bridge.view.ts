import { ViewModel } from "vlserver";
import { Bridge } from "../managed/database";

export class BridgeViewModel extends ViewModel<Bridge> {
	id;

	name;
	path;
}