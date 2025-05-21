import { MetricTracker } from ".";
import { convertToCurrency } from "../../../../interface/currency";
import { Point } from "../../../../interface/point";

export class TotalPropertyValueMetric extends MetricTracker {
	tag = ['property', 'value', 'total'];

	name = 'Property Value';
	description = 'Total value of all properties according to their last aquisition valueation';

	async fetch() {
		const owners = await this.database.propertyOwner
			.where(owner => owner.property.deactivated == null)
			.orderByDescending(owner => owner.aquired)
			.include(owner => owner.aquiredValuation)
			.toArray();

		let sum = 0;
		const valued: string[] = [];

		for (let owner of owners) {
			if (owner.aquiredValuationId && !valued.includes(owner.propertyId)) {
				const valueation = await owner.aquiredValuation.fetch();
				sum += valueation.price;

				valued.push(owner.propertyId);
			}
		}

		return sum;
	}

	format(value: number) {
		return convertToCurrency(value);
	}
}
