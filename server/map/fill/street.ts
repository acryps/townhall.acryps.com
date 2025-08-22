import { Filler } from ".";
import { calculateDanwinstonShapePath } from "../../../interface/line";
import { PackedPoint, Point } from "../../../interface/point";
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

	async fill(source: Street) {
		const points = [];
		const shape = Point.unpack((await source.activeRoute.fetch()).path);
		const searchField = Point.searchMap(source.size);

		for (let point of calculateDanwinstonShapePath(shape, false)) {
			for (let offset of searchField) {
				const target = point.add(offset);
				const packed = target.pack();

				points.push(packed);
			}
		}

		return points;
	}
}
