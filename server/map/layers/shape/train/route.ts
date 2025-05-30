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
			'train-route/:code',

			async (parameters) => {
				const route = await database.trainRoute.first(route => route.code.valueOf() == parameters.code);
				const path = await route.activePath.fetch();

				const shapes = [
					{
						id: route.id,
						stroke: route.color,
						bounds: path.path,
						open: true
					}
				];

				return shapes;
			}
		);
	}
}
