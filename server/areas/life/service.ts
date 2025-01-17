import { Service } from "vlserver";
import { Life } from "../../life";
import { ResidentRelationViewModel, ResidentSummaryModel, ResidentViewModel } from "./resident";
import { DbContext } from "../../managed/database";

export class LifeService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getResident(tag: string) {
		return new ResidentViewModel(
			await this.database.resident.first(resident => resident.tag.valueOf() == tag)
		);
	}

	async getRelations(id: string) {
		return ResidentRelationViewModel.from(
			this.database.residentRelationship
				.where(relationship => relationship.initiatorId == id || relationship.peerId == id)
				.orderByAscending(relationship => relationship.bonded)
		);
	}

	listResidents(page: number) {
		return ResidentSummaryModel.from(
			this.database.resident
				.orderByDescending(resident => resident.birthday)
				.page(page, 100)
		);
	}
}
