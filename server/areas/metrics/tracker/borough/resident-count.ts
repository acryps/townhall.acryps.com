import { BoroughMetricTracker } from ".";
import { MetricTracker } from "..";
import { Borough, DbContext } from "../../../../managed/database";

export class BoroughResidentCountMetric extends BoroughMetricTracker {
	constructor(
		database: DbContext,
		private borough: Borough
	) {
		super(database);
	}

	tag = ['borough', this.borough.tag, 'resident-count'];

	name = `${this.borough.name} Residents`;
	description = `Total number of residents with their main tenancy in ${this.borough.name}`;

	async fetch() {
		return await this.database.resident
			.where(resident => resident.mainTenancy.dwelling.property.boroughId == this.borough.id)
			.count();
	}
}
