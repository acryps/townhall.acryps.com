import { ShapeTileServer } from ".";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class PropertyOwnershipTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'property-ownership',

			async () => {
				const shapes = [];

				const properties = await database.property
					.where(property => property.deactivated == null)
					.include(property => property.activePlotBoundary)
					.include(property => property.owners)
					.toArray();

				for (let property of properties) {
					if (property.activePlotBoundaryId) {
						const activePlotBoundary = await property.activePlotBoundary.fetch();

						const ownership = await property.owners
							.orderByDescending(owner => owner.aquired)
							.include(owner => owner.owner)
							.first();

						let color = '#fff';

						if (ownership) {
							const entity = await ownership.owner.fetch();

							if (entity) {
								if (entity.state) {
									color = '#20b2bf';
								} else if (entity.boroughId) {
									color = '#20bf23';
								} else if (entity.companyId) {
									color = '#bf2050';
								} else if (entity.residentId) {
									color = '#d4e20d';
								}
							}
						}

						shapes.push({
							id: property.id,
							fill: color,
							stroke: '#000',
							bounds: activePlotBoundary.shape
						});
					}
				}

				return shapes;
			}
		);
	}
}
