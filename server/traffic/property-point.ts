import { DbContext } from "../managed/database";
import { Point } from "../../interface/point";

// resolves a property to a single representative point, the same way the map does: the center of
// its active plot boundary. results are cached since many residents share the same home or workplace.
export class PropertyPointResolver {
	private cache = new Map<string, Point | null>();

	constructor(
		private database: DbContext
	) {}

	async resolve(propertyId: string): Promise<Point | null> {
		if (!propertyId) {
			return null;
		}

		if (this.cache.has(propertyId)) {
			return this.cache.get(propertyId);
		}

		const point = await this.compute(propertyId);
		this.cache.set(propertyId, point);

		return point;
	}

	private async compute(propertyId: string): Promise<Point | null> {
		const property = await this.database.property.find(propertyId);

		if (!property?.activePlotBoundaryId) {
			return null;
		}

		const boundary = await this.database.plotBoundary.find(property.activePlotBoundaryId);
		const shape = boundary?.shape ? Point.unpack(boundary.shape) : [];

		if (!shape.length) {
			return null;
		}

		return Point.center(shape);
	}
}
