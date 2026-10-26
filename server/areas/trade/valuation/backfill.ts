import { DbContext } from "../../../managed/database";
import { LegalEntityManager } from "../../legal-entity/manager";
import { PropertyValueator } from "./property";
import { Task } from "../../../scheduler";

// one-shot: backfills the acquisition valuation for any property owner that's missing one
export class ValuationBackfillTask extends Task {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async run() {
		const properties = await this.database.property
			.where(property => property.deactivated == null)
			.where(property => property.typeId != null)
			.where(property => property.boroughId != null)
			.toArray();

		for (let property of properties) {
			const owner = await property.owners.orderByDescending(owner => owner.aquired).first();

			if (owner && !owner.aquiredValuationId) {
				const borough = await new LegalEntityManager(this.database).findBorough(property.boroughId);

				console.log(`valueing property ${property.id}`);
				const valueation = await new PropertyValueator(borough).valueate(property);

				owner.aquiredValuation = valueation;
				await owner.update();
			}
		}

		return Infinity;
	}
}
