import { MetricTracker } from ".";

export class DwellingCountMetric extends MetricTracker {
	tag = ['property', 'dwelling', 'count'];

	name = 'Dwellings';
	description = 'Number of registered dwellings in active properties';

	async fetch() {
		return await this.database.dwelling
			.where(dwelling => dwelling.property.deactivated == null)
			.count();
	}
}
