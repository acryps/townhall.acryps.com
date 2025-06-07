import { ViewModel } from "vlserver";
import { TrainStop } from "../../managed/database";
import { TrainStationViewModel } from "./station.view";
import { TrainRouteSummaryModel, TrainRouteViewModel } from "./route.view";

export class TrainStopViewModel extends ViewModel<TrainStop> {
	id;
	name;

	opened;
	closed;

	trackPosition;

	stationId;
}

export class StationTrainStopViewModel extends ViewModel<TrainStop> {
	id;
	name;

	opened;
	closed;

	upPlatform;
	downPlatform;

	route: TrainRouteViewModel;
}
