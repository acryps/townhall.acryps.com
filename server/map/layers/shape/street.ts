import { ShapeTileServer } from ".";
import { Point } from "../../../../interface/point";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { StreetFiller } from "../../fill/street";

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

				for (let [street, shape] of StreetFiller.active.cached) {
					shapes.push({
						id: street.id,
						fill: '#ccc',
						stroke: '#bbb',
						bounds: Point.pack(shape)
					});
				}

				for (let street of StreetFiller.active.cached.keys()) {
					const route = await street.activeRoute.fetch();
					const points = Point.unpack(route.path);

					shapes.push({
						id: street.id,
						fill: 'transparent',
						stroke: '#ddd',
						bounds: Point.pack([...points, ...points.reverse()])
					});
				}

				return shapes;
			}
		);
	}
}
