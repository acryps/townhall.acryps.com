import { Service } from "vlserver";
import { Life } from "../../life";
import { ResidentSummaryModel, ResidentViewModel } from "./resident";
import { DbContext } from "../../managed/database";

export class LifeService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getResident(id: string) {
		return new ResidentViewModel(await this.database.resident.find(id));
	}

	listResidents(page: number) {
		return ResidentSummaryModel.from(
			this.database.resident
				.orderByDescending(resident => resident.birthday)
				.page(page, 100)
		);
	}
}
