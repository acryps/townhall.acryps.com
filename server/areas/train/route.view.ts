import { ViewModel } from "vlserver";
import { TrainRoute } from "../../managed/database";
import { TrainStopViewModel } from "./stop.view";

export class TrainRouteViewModel extends ViewModel<TrainRoute> {
	id;
	name;
	path;
	color;

	stops: TrainStopViewModel[];
}