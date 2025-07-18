import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { MilitaryUnitSummaryModel, MilitaryUnitViewModel } from "./unit";

export class MiliatryService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getUnit(id: string) {
		return new MilitaryUnitViewModel(await this.database.militaryUnit.find(id));
	}

	getUnits() {
		return MilitaryUnitSummaryModel.from(this.database.militaryUnit);
	}
}
