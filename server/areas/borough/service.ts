import { Service } from "vlserver";
import { BoroughViewModel } from "../borough.view";
import { DbContext } from "../../managed/database";
import { BoroughSummaryModel } from "../borough.summary";

export class BoroughService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async get(tag: string) {
		return new BoroughViewModel(await this.database.borough.first(borough => borough.tag.valueOf() == tag));
	}

	list() {
		return BoroughSummaryModel.from(this.database.borough.orderByAscending(borough => borough.name));
	}
}
