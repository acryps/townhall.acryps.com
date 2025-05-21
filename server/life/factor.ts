import { Life } from ".";
import { Resident } from "../managed/database";

export class TickFactor {
	constructor(
		private simulator: Life,
		private name: string,
		private baseFactor: number,
		private size = 1
	) {}

	async tick(call: (...residens: Resident[]) => Promise<void>) {
		const factor = Math.ceil(Math.random() * this.baseFactor * this.simulator.residents.length);
		console.group(`${this.name}: ${factor}`);

		const people = this.simulator.residents;
		people.sort(() => Math.random() - 0.5);

		for (let iteration = 0; iteration < factor; iteration++) {
			const subjects = people.splice(0, this.size);

			if (subjects.length == this.size) {
				console.log(subjects.map(subject => `${subject.givenName} ${subject.familyName}`).join(', '));

				await call(...subjects);
			}
		}

		console.groupEnd();
	}
}
