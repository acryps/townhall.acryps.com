import { MetricTracker } from ".";

export class HomelessCountMetric extends MetricTracker {
	tag = ['population', 'homeless', 'count'];

	name = 'Homeless Resident Count';
	description = 'Number of residents without a permantent home (main tenancy)';

	async fetch() {
		return await this.database.resident
			.where(resident => resident.mainTenancyId == null)
			.count();
	}
}
