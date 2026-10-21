import { DbContext } from "../managed/database";
import { Point } from "../../interface/point";

// resolves a property to a single representative point: a random point inside its active plot
// boundary, not just the center - some properties are a whole block of consecutive buildings
// merged into one big plot, and everyone "living" at the exact center would bunch all of their
// trips onto the same spot instead of spreading across the block. results are cached since many
// residents share the same home or workplace, so each property still resolves to one stable point
// for the whole analysis run.
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

		const interior = [...Point.fill(shape).values()];

		// Point.fill only works out the interior for an actual polygon (3+ points) - fall back to
		// the center for anything degenerate
		if (!interior.length) {
			return Point.center(shape);
		}

		return interior[Math.floor(Math.random() * interior.length)];
	}
}
