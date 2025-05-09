import { Manager } from "vlserver";
import { Borough, DbContext } from "../../managed/database";
import { Point } from "../../../interface/point";
import { calculateDanwinstonShapePath } from "../../../interface/line";
import { Shape } from "../../../interface/shape";

export class PropertyManager extends Manager {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async findTouchingBoroughs(shape: Point[]) {
		const boroughs = await this.database.borough.toArray();
		const pixels = calculateDanwinstonShapePath(shape, true);
		const touching: Borough[] = [];

		const bounds = Point.bounds(shape);

		for (let borough of boroughs) {
			const boundary = Point.unpack(borough.bounds);

			if (Point.touches(
				new Point(bounds.x.min, bounds.y.min),
				new Point(bounds.width, bounds.height),
				boundary
			)) {
				if (this.touchesBorough(pixels, boundary)) {
					touching.push(borough);
				}
			}
		}

		return touching;
	}

	touchesBorough(pixels: Point[], borough: Point[]) {
		const filled = Point.fill(borough);

		for (let pixel of pixels) {
			if (filled.has(pixel.pack())) {
				return true;
			}
		}
	}
}
