import { Valueator, ValuedItem } from ".";
import { calculateDanwinstonShapePath } from "../../../../interface/line";
import { Point } from "../../../../interface/point";
import { Property } from "../../../managed/database";

export class PropertyValueator extends Valueator<Property> {
	async findReferences(source: Property) {
		const activePlot = await source.activePlotBoundary.fetch();
		const center = Point.center(Point.unpack(activePlot.shape));

		const properties = await source.$$meta.set
			.where(property => property.id != source.id)
			.where(property => property.activePlotBoundaryId != null)
			.where(property => property.deactivated == null)
			.where(property => property.type != null)
			.include(property => property.activePlotBoundary)
			.include(property => property.owners)
			.toArray();

		const distances: { property: Property, distance: number }[] = [];

		for (let property of properties) {
			const activePlot = await property.activePlotBoundary.fetch();
			const boundary = Point.unpack(activePlot.shape);

			// take some of the outline pixels to find close properties if they are very big
			const outline = calculateDanwinstonShapePath(boundary).filter((point, index) => index % 10 == 0);

			let closest = Infinity;

			for (let pixel of outline) {
				closest = Math.min(closest, pixel.distance(center));
			}

			distances.push({
				property,
				distance: closest
			});
		}

		distances.sort((a, b) => a.distance - b.distance);

		const references: ValuedItem<Property>[] = [];

		for (let reference of distances.slice(0, 10).map(distance => distance.property)) {
			const owners = await reference.owners.toArray();

			const newest = owners
				.filter(owner => owner.aquiredValuationId)
				.sort((a, b) => +b.aquired - +a.aquired)
				[0];

			if (newest) {
				const valueation = await newest.aquiredValuation.fetch();

				if (valueation.price) {
					references.push({
						item: reference,
						valueation
					});
				}
			}
		}

		return references;
	}

	async compileItemName(source: Property) {
		return `Property ${source.name || source.id.split('-')[0]}`;
	}

	async compileItemDescription(property: Property, nearby: Property[]) {
		const type = await property.type.fetch();

		const activePlot = await property.activePlotBoundary.fetch();
		const boundary = Point.unpack(activePlot.shape);
		const center = Point.center(boundary);
		const area = Point.area(boundary);

		const borough = await property.borough.fetch();

		const dwellings = await property.dwellings.toArray();
		const buildings = await property.buildings.toArray();

		const nearbyList = [];

		for (let peer of nearby) {
			const type = await peer.type.fetch();
			const activePlot = await peer.activePlotBoundary.fetch();
			const boundary = Point.unpack(activePlot.shape);
			const distance = Point.center(boundary).distance(center);

			nearbyList.push(`${Math.floor(distance)}m away: "${await this.compileItemName(peer)}", ${type.name}, ${Point.area(boundary)}m2 plot`);
		}

		let buildingArea = 0;

		for (let building of buildings) {
			if (!building.archived) {
				buildingArea += Point.area(Point.unpack(building.boundary));
			}
		}

		return `
			"${await this.compileItemName(property)}" in ${borough.name}.
		 	The property has a ${area}m2 plot where ${buildingArea}m2 contains buildings.
			The property is classified as ${type.name}.

			The property contains ${buildings.length || 'no'} buildings${buildingArea ? `, totaling ${buildingArea}m2` : ''}.
			${dwellings.length || 'No'} dwellings are part of this property.

			Nearby properties include:
			${nearbyList.map(item => `- ${item}`).join('\n')}
		`;
	}
}
