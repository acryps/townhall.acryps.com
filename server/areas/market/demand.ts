import { ViewModel } from "vlserver";
import { Demand } from "../../market/tracker/demand";

export class DemandViewModel extends ViewModel<Demand> {
	active;
	activates;

	target;
}
