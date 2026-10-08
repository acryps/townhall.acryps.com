import { BoroughMetricTracker } from ".";
import { MetricTracker } from "..";
import { PackedPoint, Point } from "../../../../../interface/point";
import { Borough, DbContext } from "../../../../managed/database";
import { SquareFiller } from "../../../../map/fill/square";
import { StreetFiller } from "../../../../map/fill/street";
import { WaterBodyFiller } from "../../../../map/fill/water";

export class BoroughAllocatedAreaMetric extends BoroughMetricTracker {
	constructor(
		database: DbContext,
		private borough: Borough
	) {
		super(database);
	}

	tag = ['borough', this.borough.tag, 'allocated-area'];

	name = `${this.borough.name} Allocated Area`;
	description = `Pixels within ${this.borough.name}'s boundary covered by a property, a filled street, a square or a water body`;

	async fetch() {
		const boundary = await this.borough.activeBoundary.fetch();
		const boundaryPixels = Point.fill(Point.unpack(boundary.shape));

		const plots = await this.database.plotBoundary
			.where(plot => plot.property.deactivated == null)
			.where(plot => plot.property.activePlotBoundaryId == plot.id)
			.toArray();

		const propertyPixels = new Map<PackedPoint, true>();

		for (let plot of plots) {
			for (let packed of Point.fill(Point.unpack(plot.shape)).keys()) {
				propertyPixels.set(packed, true);
			}
		}

		// fillers compute lazily & cache on the class - make sure they exist in this worker thread
		SquareFiller.active ??= new SquareFiller(this.database);
		StreetFiller.active ??= new StreetFiller(this.database);
		WaterBodyFiller.active ??= new WaterBodyFiller(this.database);

		const squares = (await SquareFiller.active.update()).filled;
		const streets = (await StreetFiller.active.update()).filled;
		const waterBodies = (await WaterBodyFiller.active.update()).filled;

		let allocated = 0;

		for (let packed of boundaryPixels.keys()) {
			if (propertyPixels.has(packed) || streets.has(packed) || squares.has(packed) || waterBodies.has(packed)) {
				allocated++;
			}
		}

		return allocated;
	}

	format(value: number) {
		return `${value.toLocaleString()} b²`;
	}
}
