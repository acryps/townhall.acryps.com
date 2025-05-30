import { Service } from "vlserver";
import { DbContext, TrainRoute, TrainRoutePath } from "../../managed/database";
import { TrainRouteViewModel } from "./route.view";
import { TrainStationViewModel } from "./station.view";
import { Point } from "../../../interface/point";

export class TrainService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getRoute(code: string) {
		return new TrainRouteViewModel(
			await this.database.trainRoute
				.first(route => route.code.valueOf() == code)
		);
	}

	getRoutes() {
		return TrainRouteViewModel.from(
			this.database.trainRoute
				.orderByAscending(route => route.code)
		);
	}

	async saveRoute(route: TrainRouteViewModel) {
		const model = await route.toModel();

		await model.update();
	}

	async setOperator(routeId: string, operatorId: string) {
		const route = await this.database.trainRoute.find(routeId);
		route.operatorId = operatorId;

		await route.update();
	}

	async register(path: string, code: string, color: string, textColor: string, name: string) {
		const route = new TrainRoute();
		route.opened = new Date();
		route.code = code;
		route.color = color;
		route.textColor = textColor;
		route.name = name;

		await route.create();

		const activePath = new TrainRoutePath();
		activePath.path = Point.pack(Point.unpack(path));
		activePath.trainRoute = route;

		await activePath.create();

		route.activePath = activePath;
		await route.update();
	}

	getStations() {
		return TrainStationViewModel.from(
			this.database.trainStation
				.orderByAscending(station => station.name)
		);
	}
}
