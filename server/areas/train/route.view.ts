import { ViewModel } from "vlserver";
import { TrainRoute, TrainRouteClass, TrainRoutePath } from "../../managed/database";
import { TrainStopViewModel } from "./stop.view";
import { CompanyViewModel } from "../company.view";
import { LegalEntityViewModel } from "../legal-entity";

export class TrainRouteClassViewModel extends ViewModel<TrainRouteClass> {
	id;

	name;

	trainSpeedUnitsPerSecond;
	stopDwellTimeSeconds;
}

export class TrainRouteSummaryModel extends ViewModel<TrainRoute> {
	id;
	code;

	name;
	class: TrainRouteClassViewModel;

	color;
	textColor;

	opened;
	closed;
}

export class TrainRouteViewModel extends TrainRouteSummaryModel {
	description;
	operator: LegalEntityViewModel;

	activePath: TrainRoutePathViewModel;
	looping;

	stops: TrainStopViewModel[];
}

export class TrainRoutePathViewModel extends ViewModel<TrainRoutePath> {
	id;

	path;
}
