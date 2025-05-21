import { MetricTracker } from ".";
import { toSimulatedAge } from "../../../../interface/time";

export class WorkUnemploymentMetric extends MetricTracker {
	tag = ['work', 'unemployment'];

	name = 'Unemployment rate';
	description = 'Unemployment rate of all residents, including children and elders';

	async fetch() {
		const residents = await this.database.resident
			.where(resident => resident.birthday.isBefore(new Date()))
			.include(resident => resident.workContracts)
			.toArray();

		let unemployed = 0;

		for (let resident of residents) {
			const contracts = await resident.workContracts.toArray();

			if (!contracts.find(contract => !contract.canceled)) {
				unemployed++;
			}
		}

		return 1 / residents.length * unemployed;
	}

	format(value: number) {
		return `${Math.floor(value * 100 * 100) / 100}%`;
	}
}
