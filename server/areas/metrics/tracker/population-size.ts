import { MetricTracker } from ".";

export class PopulationSizeMetric extends MetricTracker {
	tag = ['population', 'size'];

	name = 'Population Size';
	description = 'Number of living residents';

	async fetch() {
		return await this.database.resident
			.where(resident => resident.birthday.isBefore(new Date()))
			.count();
	}
}
