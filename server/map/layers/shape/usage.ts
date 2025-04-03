import { ShapeTileServer } from ".";
import { Point } from "../../../../interface/point";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class PropertyUsageTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'usage',

			async () => {
				const properties = await database.property
					.where(property => property.deactivated == null)
					.include(property => property.offices)
					.include(property => property.dwellings)
					.toArray();

				const types = await database.propertyType.toArray();
				const shapes = [];

				for (let property of properties) {
					const type = types.find(type => type.id == property.typeId);

					let color = '#fff';

					const offices = (await property.offices.toArray());
					const dwelling = await property.dwellings.count() > 0;

					if (offices.length && dwelling) {
						color = '#f0f';
					} else if (offices.length) {
						color = '#f00';
					} else if (dwelling) {
						color = '#00f';
					}

					shapes.push({
						id: property.id,
						fill: color,
						stroke: '#000',
						bounds: property.bounds,
						name: offices.length ? offices.map(office => office.name).join('\n') : null
					});
				}

				return shapes;
			}
		);
	}
}
