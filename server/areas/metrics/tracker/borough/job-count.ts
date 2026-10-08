import { BoroughMetricTracker } from ".";
import { MetricTracker } from "..";
import { Borough, DbContext } from "../../../../managed/database";

export class BoroughJobCountMetric extends BoroughMetricTracker {
	constructor(
		database: DbContext,
		private borough: Borough
	) {
		super(database);
	}

	tag = ['borough', this.borough.tag, 'job-count'];

	name = `${this.borough.name} Jobs`;
	description = `Total number of active work contracts at offices in ${this.borough.name}`;

	async fetch() {
		return await this.database.workContract
			.where(contract => contract.canceled == null)
			.where(contract => contract.offer.office.property.boroughId == this.borough.id)
			.count();
	}
}
