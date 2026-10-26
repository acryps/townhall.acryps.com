import { DbContext } from "../managed/database";
import { Life } from ".";
import { Task } from "../scheduler";

// one-shot: assigns a figure to any resident that's missing one. disabled by default -
// this used to be commented-out startup code; kept around but off unless explicitly enabled.
export class ResidentFigureAssignmentTask extends Task {
	constructor(
		private database: DbContext,
		private life: Life
	) {
		super();
	}

	async run() {
		for (let resident of await this.database.resident.where(resident => resident.figure == null).toArray()) {
			console.log(resident.givenName);

			await this.life.assignFigure(resident);
		}

		return Infinity;
	}
}
