import { ViewModel } from "vlserver";
import { TrainStation, TrainStop } from "../../managed/database";
import { PropertyViewModel } from "../property.view";
import { PropertySummaryModel } from "../property.summary";
import { StationTrainStopViewModel } from "./stop.view";

export class TrainStationViewModel extends ViewModel<TrainStation> {
	id;
	name;

	property: PropertySummaryModel;
}

export class PropertyTrainStationViewModel extends ViewModel<TrainStation> {
	id;
	name;

	stops: StationTrainStopViewModel[];
}
