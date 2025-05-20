import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { DbSet } from "vlquery";
import { LegalEntityManager } from "./manager";
import { LegalEntityViewModel } from ".";
import { LegalEntityReferenceCounter } from "./reference-counter";

export class LegalEntityService extends Service {
	constructor(
		private manager: LegalEntityManager
	) {
		super();
	}

	async find(search: string) {
		return LegalEntityViewModel.from(
			await this.manager.find(search)
		);
	}

	async findById(id: string) {
		return new LegalEntityViewModel(
			await this.manager.findBySourceId(id)
		);
	}

	listFeatured() {
		return LegalEntityViewModel.from(
			LegalEntityReferenceCounter.active.ranked.slice(0, 25)
		);
	}
}
