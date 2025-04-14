import { ShapeTileServer } from ".";
import { Point } from "../../../../interface/point";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class StreetTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'street',

			async () => {
				const shapes = [];

				const streets = await database.street
					.where(street => street.deactivated == null)
					.include(street => street.activeRoute)
					.toArray();

				for (let street of streets) {
					const route = await street.activeRoute.fetch();
					const points = Point.unpack(route.path);

					shapes.push({
						id: street.id,
						fill: 'transparent',
						stroke: '#f00',
						bounds: Point.pack([...points, ...points.reverse()])
					});
				}

				return shapes;
			}
		);
	}
}
