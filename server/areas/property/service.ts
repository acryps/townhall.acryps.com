import { Service } from "vlserver";
import { DbContext, Dwelling } from "../../managed/database";
import { DwellingViewModel } from "../life/resident";
import { PropertyDwellingViewModel, PropertyViewModel } from "../property.view";

export class PropertyService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async nextUnreviewed() {
		const property = await this.database.property.first(property => property.reviewCompany == null);

		return new PropertyViewModel(property);
	}

	async reviewDone(id: string) {
		const property = await this.database.property.find(id);

		property.reviewCompany = true;
		await property.update();
	}

	async createDwelling(propertyId: string) {
		const property = await this.database.property.find(propertyId);

		const dwelling = new Dwelling();
		dwelling.property = property;

		await dwelling.create();

		return new PropertyDwellingViewModel(dwelling);
	}
}
