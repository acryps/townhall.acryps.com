import { Filler } from ".";
import { Point } from "../../../interface/point";
import { DbContext, Street } from "../../managed/database";

export class StreetFiller extends Filler<Street> {
	static active: StreetFiller;

	constructor(
		private database: DbContext
	) {
		super();
	}

	async fetch() {
		return await this.database.street
			.where(street => street.deactivated == null)
			.include(street => street.activeRoute)
			.toArray();
	}

	async obstacles() {
		const properties = await this.database.property
			.where(street => street.deactivated == null)
			.include(street => street.activePlotBoundary)
			.toArray();

		const obstacles: Point[][] = [];

		for (let property of properties) {
			const activeBoundary = await property.activePlotBoundary.fetch();

			obstacles.push(Point.unpack(activeBoundary.shape));
		}

		return obstacles;
	}

	rank(a: Street, b: Street) {
		if (a.size == b.size) {
			return a.name.localeCompare(b.name);
		}

		return b.size - a.size;
	}

	async route(source: Street) {
		const route = await source.activeRoute.fetch();

		return {
			route: Point.unpack(route.path),
			radius: source.size
		};
	}
}
