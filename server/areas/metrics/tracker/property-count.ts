import { MetricTracker } from ".";

export class PropertyCountMetric extends MetricTracker {
	tag = ['property', 'count'];

	name = 'Properties';
	description = 'Number of active registered properties';

	async fetch() {
		return await this.database.property
			.where(property => property.deactivated == null)
			.count();
	}
}
