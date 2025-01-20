import { ViewModel } from "vlserver";
import { ResidentEventView } from "../../managed/database";

export class ResidentTickerModel extends ViewModel<ResidentEventView> {
	id;

	primaryResidentId;
	action;
}
