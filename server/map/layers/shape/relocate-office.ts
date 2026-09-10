import { ShapeTileServer } from ".";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { convertToLegalCompanyName } from "../../../../interface/company";

export class RelocateOfficeTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'relocate-office/:officeId',

			async (parameters) => {
				const sourceOffice = await database.office.find(parameters.officeId);
				const sourceProperty = await sourceOffice.property.fetch();
				const sourceBoundary = await sourceProperty.activePlotBoundary.fetch();

				const shapes = [];

				// the property the office is currently relocating from - highlighted, not pickable
				shapes.push({
					fill: '#e74c3c',
					stroke: '#000',
					bounds: sourceBoundary.shape
				});

				const properties = await database.property
					.where(property => property.deactivated == null)
					.where(property => property.id != sourceProperty.id)
					.includeTree({
						id: true,
						activePlotBoundaryId: true,

						activePlotBoundary: {
							id: true,
							shape: true
						},

						owners: {
							id: true,
							sold: true,
							aquired: true,
							ownerId: true,

							// batch the full ownership chain up front too, instead of a .fetch() per property (was an N+1 query per property)
							owner: {
								id: true,
								state: true,
								boroughId: true,
								companyId: true,
								residentId: true,

								borough: {
									id: true,
									name: true
								},

								company: {
									id: true,
									name: true,
									type: true
								},

								resident: {
									id: true,
									givenName: true,
									familyName: true
								}
							}
						},

						offices: {
							id: true,
							closed: true
						}
					})
					.toArray();

				for (let property of properties) {
					if (!property.activePlotBoundaryId) {
						continue;
					}

					const boundary = await property.activePlotBoundary.fetch();
					const offices = (await property.offices.toArray()).filter(office => office.closed == null);

					const ownership = (await property.owners.toArray())
						.filter(owner => owner.sold == null)
						.sort((a, b) => +b.aquired - +a.aquired)
						[0];

					let ownerName = 'Unowned';

					if (ownership) {
						const entity = await ownership.owner.fetch();

						if (entity) {
							if (entity.state) {
								ownerName = 'State';
							} else if (entity.boroughId) {
								ownerName = (await entity.borough.fetch())?.name ?? 'Borough';
							} else if (entity.companyId) {
								ownerName = convertToLegalCompanyName(await entity.company.fetch());
							} else if (entity.residentId) {
								const resident = await entity.resident.fetch();

								ownerName = `${resident.givenName} ${resident.familyName}`;
							}
						}
					}

					shapes.push({
						id: property.id,
						fill: offices.length ? '#2ecc71' : '#fff',
						stroke: '#000',
						bounds: boundary.shape,
						name: ownerName
					});
				}

				return shapes;
			}
		);
	}
}
