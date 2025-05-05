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

				for (let route of await database.trainRoute.toArray()) {
					shapes.push({
						id: route.id,
						stroke: route.color,
						bounds: route.path
					});
				}

				return shapes;
			}
		);
	}
}
