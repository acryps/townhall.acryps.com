import { Service } from "vlserver";
import { Life } from "../../life";
import { ResidentEventViewModel, ResidentRelationViewModel, ResidentSummaryModel, ResidentViewModel } from "./resident";
import { DbContext, ResidentEventView } from "../../managed/database";
import { ResidentTickerModel } from "./ticker";
import { NameFrequency, NameFrequencyViewModel } from "./name-frequency";

export class LifeService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	ticker() {
		return ResidentTickerModel.from(
			this.database.views.residentEvent
				.orderByDescending(event => event.timestamp)
				.limit(10)
		);
	}

	async getResident(tag: string) {
		return new ResidentViewModel(
			await this.database.resident.first(resident => resident.tag.valueOf() == tag)
		);
	}

	async getEventHistory(id: string) {
		return ResidentEventViewModel.from(
			this.database.views.residentEvent
				.where(event => event.primaryResidentId.valueOf() == id || event.secondaryResidentId.valueOf() == id)
				.orderByAscending(event => event.timestamp)
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
				.orderByAscending(resident => resident.familyName)
				.orderByAscending(resident => resident.givenName)
				.where(resident => resident.deceased == null)
				.page(page, 250)
		);
	}

	search(query: string) {
		query = query.toLowerCase();

		return ResidentViewModel.from(
			this.database.resident
				.where(resident =>
					resident.givenName.lowercase().includes(query) ||
					resident.familyName.lowercase().includes(query)
				)
				.limit(25)
		)
	}

	async listGivenNameFrequencies() {
		return NameFrequencyViewModel.from(
			await NameFrequency.collect(this.database.resident.includeTree({ givenName: true }))
		);
	}

	async listFamilyNameFrequencies() {
		return NameFrequencyViewModel.from(
			await NameFrequency.collect(this.database.resident.includeTree({ familyName: true }))
		);
	}
}
