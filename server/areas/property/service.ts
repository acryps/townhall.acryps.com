import { Service } from "vlserver";
import { DbContext, Dwelling } from "../../managed/database";
import { DwellingViewModel } from "../life/resident";
import { PropertyDwellingViewModel } from "../property.view";

export class PropertyService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async createDwelling(propertyId: string) {
		const property = await this.database.property.find(propertyId);

		const dwelling = new Dwelling();
		dwelling.property = property;

		await dwelling.create();

		return new PropertyDwellingViewModel(dwelling);
	}
}
