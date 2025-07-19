import { ShapeTileServer } from "..";
import { DbContext } from "../../../../managed/database";
import { ManagedServer } from "../../../../managed/server";

export class StationTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'train-station',

			async () => {
				const shapes = [];

				const stations = await database.trainStation
					.where(station => station.property.deactivated == null)
					.include(station => station.property)
					.toArray();

				for (let station of stations) {
					const property = await station.property.fetch();

					if (property.activePlotBoundaryId) {
						const activePlotBoundary = await property.activePlotBoundary.fetch();

						shapes.push({
							id: station.id,
							fill: '#fff',
							stroke: '#000',
							bounds: activePlotBoundary.shape,
							name: station.name ?? property.name
						});
					}
				}

				return shapes;
			}
		);
	}
}
