import { MetricTracker } from ".";

export class EmptyDwellingCountMetric extends MetricTracker {
	tag = ['property', 'dwelling', 'empty'];

	name = 'Empty Dwellings';
	description = 'Number of empty dwellings';

	async fetch() {
		let count = 0;

		const properties = await this.database.property
			.where(property => property.deactivated == null)
			.include(property => property.borough)
			.include(property => property.dwellings)
			.toArray();

		for (let property of properties) {
			const dwellings = await property.dwellings.toArray();
			const borough = await property.borough.fetch();

			for (let dwelling of dwellings) {
				if (await dwelling.tenants.count() == 0) {
					count++;
				}
			}
		}

		return count;
	}
}
