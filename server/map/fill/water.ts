import { Filler } from ".";
import { PackedPoint, Point } from "../../../interface/point";
import { DbContext, Street, WaterBody } from "../../managed/database";
import { StreetFiller } from "./street";

export class WaterBodyFiller extends Filler<WaterBody> {
	static active: WaterBodyFiller;

	after = [StreetFiller];

	constructor(
		private database: DbContext
	) {
		super();
	}

	async fetch() {
		return await this.database.waterBody
			.include(water => water.areas)
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

	rank(a: WaterBody, b: WaterBody) {
		return a.name.localeCompare(b.name);
	}

	async fill(source: WaterBody) {
		const points = [];
		const areas = await source.areas
			.where(area => area.archived == null)
			.toArray();

		for (let area of areas) {
			const shape = Point.fill(Point.unpack(area.shape));

			for (let point of shape.keys()) {
				points.push(point);
			}
		}

		return points;
	}
}
