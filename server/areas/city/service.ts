import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { CityViewModel } from "./city";

export class CityService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	getCities() {
		return CityViewModel.from(
			this.database.city
				.orderByAscending(city => city.orderIndex)
		);
	}
}
