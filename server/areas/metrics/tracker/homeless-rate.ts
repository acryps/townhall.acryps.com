import { MetricTracker } from ".";

export class HomelessRateMetric extends MetricTracker {
	tag = ['population', 'homeless', 'rate'];

	name = 'Homelessness Rate';
	description = 'Percentage of residents without a permantent home (main tenancy)';

	async fetch() {
		const homeless = await this.database.resident
			.where(resident => resident.mainTenancyId == null)
			.count();

		const residents = await this.database.resident
			.where(resident => resident.birthday.isBefore(new Date()))
			.count();

		return 1 / residents * homeless;
	}

	format(value: number) {
		return `${Math.floor(value * 100 * 100) / 100}%`;
	}
}
