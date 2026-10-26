import { DbContext } from "../../managed/database";
import { updateWorkOffers } from "./offers";
import { Task } from "../../scheduler";

// one-shot: makes sure every company's offices have their work offers up to date
export class WorkOfferBackfillTask extends Task {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async run() {
		for (let company of await this.database.company.toArray()) {
			console.log(company.name);

			for (let office of await company.offices.toArray()) {
				await updateWorkOffers(office);
			}
		}

		return Infinity;
	}
}
