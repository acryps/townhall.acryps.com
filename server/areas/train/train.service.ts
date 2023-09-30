import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { TrainRouteViewModel } from "./route.view";
import { TrainStationViewModel } from "./station.view";

export class TrainService extends Service {
	constructor(
		private db: DbContext
	) {
		super();
	}

	getRoutes() {
		return TrainRouteViewModel.from(this.db.trainRoute);
	}

	getStations() {
		return TrainStationViewModel.from(this.db.trainStation);
	}
}