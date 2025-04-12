import { ShapeTileServer } from ".";
import { Point } from "../../../../interface/point";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class PropertyTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'property',

			async () => {
				const shapes = [];

				for (let borough of await database.borough.toArray()) {
					shapes.push({
						fill: '#fffc',
						stroke: borough.color,
						bounds: borough.bounds
					});
				}

				const properties = await database.property
					.where(property => property.deactivated == null)
					.include(property => property.activePlotBoundary)
					.include(property => property.buildings)
					.toArray();

				for (let property of properties) {
					if (property.activePlotBoundaryId) {
						const activePlotBoundary = await property.activePlotBoundary.fetch();

						shapes.push({
							id: property.id,
							fill: '#fff',
							stroke: property.historicListingGradeId ? '#f00' : '#000',
							bounds: activePlotBoundary.shape
						});
					}

					for (let building of await property.buildings.toArray()) {
						shapes.push({
							fill: '#ccc',
							stroke: '#666',
							bounds: building.boundary
						});
					}
				}

				return shapes;
			}
		);
	}
}
