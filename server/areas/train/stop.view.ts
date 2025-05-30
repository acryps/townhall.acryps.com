import { ViewModel } from "vlserver";
import { TrainStop } from "../../managed/database";
import { TrainStationViewModel } from "./station.view";

export class TrainStopViewModel extends ViewModel<TrainStop> {
	id;
	name;

	opened;
	closed;

	trackPosition;

	stationId;
}
