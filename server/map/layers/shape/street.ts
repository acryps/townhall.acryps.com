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

				const streets = await database.street.toArray();

				for (let street of streets) {
					const points = Point.unpack(street.path);

					shapes.push({
						id: street.id,
						fill: 'transparent',
						stroke: '#f00',
						bounds: [...points, ...points.reverse()]
					});
				}

				const squares = await database.square.toArray();

				for (let square of squares) {
					shapes.push({
						id: square.id,
						fill: '#ff05',
						stroke: '#ff0',
						bounds: Point.unpack(square.bounds)
					});
				}

				return shapes;
			}
		);
	}
}
