import { MetricTracker } from ".";
import { Time } from "../../../../interface/time";

export class PopulationAgeAverageMetric extends MetricTracker {
	tag = ['population', 'age', 'average'];

	name = 'Average Resident Age';
	description = 'Average age of all residents';

	async fetch() {
		const residents = await this.database.resident
			.where(resident => resident.birthday.isBefore(new Date()))
			.toArray();

		let sum = 0;

		for (let resident of residents) {
			sum += new Time(resident.birthday).age();
		}

		return Math.floor(sum / residents.length * 100) / 100;
	}

	format(value: number) {
		return `${value} years`;
	}
}
