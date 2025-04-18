import { ShapeTileServer } from ".";
import { Point } from "../../../../interface/point";
import { Company, DbContext } from "../../../managed/database";
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
					.include(property => property.activePlotBoundary)
					.include(property => property.offices)
					.include(property => property.dwellings)
					.toArray();

				const types = await database.propertyType.toArray();
				const shapes = [];

				const companies = new Map<string, Company>();

				for (let property of properties) {
					const boundary = await property.activePlotBoundary.fetch();
					const area = Point.area(Point.unpack(boundary.shape));

					let color = '#fff';

					const offices = (await property.offices.toArray());
					const dwelling = (await property.dwellings.toArray()).length;

					if (offices.length && dwelling) {
						color = '#f0f';
					} else if (offices.length) {
						color = '#f00';
					} else if (dwelling) {
						color = `hsl(240deg, 100%, ${25 + Math.min(dwelling * 1000 / area, 50)}%)`;
					}

					let name: string;

					if (offices.length) {
						const operators = [];

						for (let office of offices) {
							const company = companies.get(office.companyId) ?? await office.company.fetch();
							companies.set(office.companyId, company);

							operators.push(company.name);
						}

						name = operators.join('\n');
					}

					shapes.push({
						id: property.id,
						fill: color,
						stroke: '#000',
						bounds: boundary.shape,
						name
					});
				}

				return shapes;
			}
		);
	}
}
