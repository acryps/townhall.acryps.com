import { Manager } from "vlserver";
import { DbContext, LegalEntity, Property, Valuation } from "../../managed/database";
import { Entity } from "vlquery";
import { Point } from "../../../interface/point";

export class TradeManager extends Manager {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async valueateProperty(property: Property, issuer?: LegalEntity) {
		const valuation = new Valuation();
		valuation.estimated = new Date();
		valuation.issuer = issuer;
		valuation.item = `Property ${property.name ?? property.id}`;

		const type = await property.type.fetch();

		const activePlot = await property.activePlotBoundary.fetch();
		const boundary = Point.unpack(activePlot.shape);
		const area = Point.area(boundary);

		const borough = await property.borough.fetch();

		const dwellings = await property.dwellings.toArray();
		const buildings = await property.buildings.toArray();

		valuation.description = `
			Property in ${borough.name} with ${area}b2 plot.
			Usage type ${type.name}
			The property contains ${buildings.length} buildings with ${dwellings.length} dwellings.
		`;

		// TODO execute valuation

		await valuation.create();

		return valuation;
	}
}
