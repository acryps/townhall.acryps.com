import { ViewModel } from "vlserver";
import { DbContext, Resident, ResidentQueryProxy } from "../../managed/database";
import { Queryable } from "vlquery";

export class NameFrequency {
	name: string;
	count: number;

	static async collect(query: Queryable<Resident, ResidentQueryProxy>) {
		const residents = await query.toArray();
		const names = residents.map(resident => resident.givenName ?? resident.familyName);
		const frequencies = new Map<string, NameFrequency>();

		for (let name of names) {
			if (frequencies.has(name)) {
				frequencies.get(name).count++;
			} else {
				const frequency = new NameFrequency();
				frequency.name = name;
				frequency.count = 1;

				frequencies.set(name, frequency);
			}
		}

		return [...frequencies.values()];
	}
}

export class NameFrequencyViewModel extends ViewModel<NameFrequency> {
	name;
	count;
}
