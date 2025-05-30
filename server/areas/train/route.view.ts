import { ViewModel } from "vlserver";
import { TrainRoute, TrainRoutePath } from "../../managed/database";
import { TrainStopViewModel } from "./stop.view";
import { CompanyViewModel } from "../company.view";
import { LegalEntityViewModel } from "../legal-entity";

export class TrainRouteViewModel extends ViewModel<TrainRoute> {
	id;
	code;

	name;
	description;
	operator: LegalEntityViewModel;

	color;
	textColor;

	opened;
	closed;

	activePath: TrainRoutePathViewModel;
	stops: TrainStopViewModel[];
}

export class TrainRoutePathViewModel extends ViewModel<TrainRoutePath> {
	id;

	path;
}
