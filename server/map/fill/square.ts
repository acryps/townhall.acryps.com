import { Filler } from ".";
import { PackedPoint, Point } from "../../../interface/point";
import { DbContext, Square } from "../../managed/database";

export class SquareFiller extends Filler<Square> {
	static active: SquareFiller;

	constructor(
		private database: DbContext
	) {
		super();
	}

	async fetch() {
		return await this.database.square
			.where(square => square.deactivated == null)
			.include(square => square.activeBoundary)
			.toArray();
	}

	async obstacles() {
		const properties = await this.database.property
			.where(property => property.deactivated == null)
			.include(property => property.activePlotBoundary)
			.toArray();

		const obstacles: Point[][] = [];

		for (let property of properties) {
			const activeBoundary = await property.activePlotBoundary.fetch();

			obstacles.push(Point.unpack(activeBoundary.shape));
		}

		return obstacles;
	}

	rank(a: Square, b: Square) {
		return a.name.localeCompare(b.name);
	}

	async fill(source: Square) {
		const boundary = await source.activeBoundary.fetch();
		const shape = Point.fill(Point.unpack(boundary.shape));

		return [...shape.keys()];
	}
}
