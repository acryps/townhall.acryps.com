import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { ImpressionViewModel } from "./impression";

export class ImpressionService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	list() {
		return ImpressionViewModel.from(this.database.impression
			.orderByDescending(impression => impression.captured)
		);
	}
}
