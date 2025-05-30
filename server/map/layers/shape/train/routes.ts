import { ShapeTileServer } from "..";
import { DbContext } from "../../../../managed/database";
import { ManagedServer } from "../../../../managed/server";

export class TrainRoutesTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'train-route/:code',

			async (parameters) => {
				const route = await database.trainRoute.first(route => route.code.valueOf() == parameters.code);

				const shapes = [
					{
						id: route.id,
						stroke: route.color,
						bounds: route.path,
						open: true
					}
				];

				return shapes;
			}
		);
	}
}
