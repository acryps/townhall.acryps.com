import { MetricTracker } from ".";
import { Point } from "../../../../interface/point";

export class AllocatedAreaMetric extends MetricTracker {
	tag = ['property', 'area', 'total'];

	name = 'Allocated Area';
	description = 'Total allocated area of all properties';

	async fetch() {
		const plots = await this.database.plotBoundary
			.where(plot => plot.property.deactivated == null)
			.where(plot => plot.property.activePlotBoundaryId == plot.id)
			.toArray();

		let area = 0;

		for (let plot of plots) {
			area += Point.area(Point.unpack(plot.shape));
		}

		return area;
	}

	format(value: number) {
		return `${value} b2`;
	}
}
