import { ViewModel } from "vlserver";
import { TrainRoute } from "../../managed/database";
import { TrainStopViewModel } from "./stop.view";
import { CompanyViewModel } from "../company.view";

export class TrainRouteViewModel extends ViewModel<TrainRoute> {
	id;
	code;

	name;
	description;
	operator: CompanyViewModel;

	color;
	textColor;

	opened;
	closed;

	path;
	stops: TrainStopViewModel[];
}
