import { ShapeTileServer } from ".";
import { Point } from "../../../interface/point";
import { DbContext } from "../../managed/database";
import { ManagedServer } from "../../managed/server";

export class PropertyTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'property',

			async () => {
				const properties = await database.property.toArray();
				const types = await database.propertyType.toArray();

				const shapes = [];

				for (let property of properties) {
					const type = types.find(type => type.id == property.typeId);

					shapes.push({
						id: property.id,
						fill: type?.color ?? 'transparent',
						bounds: Point.unpack(property.bounds)
					});
				}

				return shapes;
			}
		);
	}
}
