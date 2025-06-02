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
				const route = await database.trainRoute
					.first(route => route.code.valueOf() == parameters.code);

				const shapes = [];

				for (let stop of await route.stops.where(stop => stop.closed == null).toArray()) {
					const station = await stop.station.fetch();
					const property = await station.property.fetch();
					const boundary = await property.activePlotBoundary.fetch();

					shapes.push({
						stroke: '#000',
						fill: '#fff',
						bounds: boundary.shape
					});
				}

				const path = await route.activePath.fetch();

				shapes.push({
					stroke: route.color,
					bounds: path.path,
					open: true
				});

				return shapes;
			}
		);
	}
}
