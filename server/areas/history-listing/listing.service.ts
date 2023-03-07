import { Service } from "vlserver";
import { DbContext, PropertyHistoricListingModifier } from "../../managed/database";
import { PropertyViewModel } from "../property.view";
import { HistoricListingGradeViewModel } from "./grade.view";
import { PropertyHistoricListingModifierViewModel } from "./link.view";
import { HistoricListingModifierViewModel } from "./modifier.view";

export class HistoricListingService extends Service {
	constructor(
		private db: DbContext
	) {
		super();
	}

	getGrades() {
		return HistoricListingGradeViewModel.from(this.db.historicListingGrade);
	}

	getModifiers() {
		return HistoricListingModifierViewModel.from(this.db.historicListingModifier);
	}

	async addListing(propertyViewModel: PropertyViewModel, grade: HistoricListingGradeViewModel) {
		const property = await propertyViewModel.toModel();
		
		if (grade) {
			property.historicListingGrade = grade;

			if (!property.historicListingRegisteredAt) {
				property.historicListingRegisteredAt = new Date();
			}

			await property.update();
		} else {
			property.historicListingGrade = null;

			for (let link of await property.historicListingModifiers.toArray()) {
				await link.delete();
			}
		}
	}

	async addModifier(propertyId: string, modifierId: string) {
		const link = new PropertyHistoricListingModifier();
		link.propertyId = propertyId;
		link.historicListingModifierId = modifierId;

		await link.create();

		return new PropertyHistoricListingModifierViewModel(link);
	}

	async removeModifier(linkId: string) {
		const link = await this.db.propertyHistoricListingModifier.find(linkId);
		
		await link.delete();
	}
}