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
			'train-routes',

			async () => {
				const shapes = [];

				const routes = await database.trainRoute
					.include(route => route.activePath)
					.where(route => route.closed == null)
					.toArray()

				for (let route of routes) {
					const path = await route.activePath.fetch();

					shapes.push({
						id: route.id,
						stroke: route.color,
						bounds: path.path,
						open: true
					});
				}

				return shapes;
			}
		);
	}
}
