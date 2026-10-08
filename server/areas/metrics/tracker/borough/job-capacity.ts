import { BoroughMetricTracker } from ".";
import { MetricTracker } from "..";
import { Borough, DbContext } from "../../../../managed/database";

export class BoroughJobCapacityMetric extends BoroughMetricTracker {
	constructor(
		database: DbContext,
		private borough: Borough
	) {
		super(database);
	}

	tag = ['borough', this.borough.tag, 'job-capacity'];

	name = `${this.borough.name} Job Capacity`;
	description = `Total capacity granted to offices in ${this.borough.name}`;

	async fetch() {
		const offices = await this.database.office
			.where(office => office.property.boroughId == this.borough.id)
			.toArray();

		let capacity = 0;

		for (let office of offices) {
			const grant = await office.capacityGrants
				.orderByDescending(grant => grant.issued)
				.first();

			if (grant) {
				capacity += grant.size;
			}
		}

		return capacity;
	}
}
