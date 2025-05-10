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

				const pricedProperties = await database.propertyOwner.where(owner => owner.aquiredValuation.price != null).toArray();
				console.log(pricedProperties);

				for (let property of properties) {
					if (property.activePlotBoundaryId) {
						const activePlotBoundary = await property.activePlotBoundary.fetch();
						const owners = await property.owners.toArray();
						const priced = pricedProperties.find(priced => priced.propertyId == property.id);

						shapes.push({
							id: property.id,
							fill: owners.length ? (priced ? '#0f0' : '#ff0') : '#f00',
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
