import { ShapeTileServer } from "..";
import { DbContext } from "../../../../managed/database";
import { ManagedServer } from "../../../../managed/server";

export class TrainRouteTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'train-routes',

			async () => {
				const shapes = [];

				for (let route of await database.trainRoute.toArray()) {
					shapes.push({
						id: route.id,
						stroke: route.color,
						bounds: route.path,
						open: true
					});
				}

				return shapes;
			}
		);
	}
}
