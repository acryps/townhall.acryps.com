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

	async getRoute(code: string) {
		return new TrainRouteViewModel(
			await this.db.trainRoute
				.first(route => route.code.valueOf() == code)
		);
	}

	getRoutes() {
		return TrainRouteViewModel.from(
			this.db.trainRoute
				.orderByAscending(route => route.code)
		);
	}

	getStations() {
		return TrainStationViewModel.from(
			this.db.trainStation
				.orderByAscending(station => station.name)
		);
	}
}
