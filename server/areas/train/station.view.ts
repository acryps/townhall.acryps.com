import { ViewModel } from "vlserver";
import { TrainStation, TrainStop } from "../../managed/database";
import { PropertyViewModel } from "../property.view";
import { PropertySummaryModel } from "../property.summary";

export class TrainStationViewModel extends ViewModel<TrainStation> {
	id;
	name;

	property: PropertySummaryModel;
}
