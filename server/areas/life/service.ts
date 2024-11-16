import { Service } from "vlserver";
import { Life } from "../../life";
import { ResidentSummaryModel, ResidentViewModel } from "./resident";
import { DbContext, Dwelling, Property } from "../../managed/database";
import { PropertyViewModel } from "../property.view";

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

	async getNextEmptyProperty() {
		const houses = await this.database.property
			.where(property => property.type.code.valueOf() == 'H1' || property.type.code.valueOf() == 'H2' || property.type.code.valueOf() == 'H3' || property.type.code.valueOf() == 'H4')
			.include(property => property.dwellings)
			.toArray()

		for (let house of houses) {
			if ((await house.dwellings.toArray()).length == 0) {
				return new PropertyViewModel(house);
			}
		}

		return null;
	}

	async dwell(houseId: string, dwellings: number) {
		const house = await this.database.property.find(houseId);

		for (let dwellingIndex = 0; dwellingIndex < dwellings; dwellingIndex++) {
			const dwlling = new Dwelling();
			dwlling.property = house;

			await dwlling.create();
		}
	}
}
