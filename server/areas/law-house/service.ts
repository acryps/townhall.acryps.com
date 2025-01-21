import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { LawHouseSessionSummaryModel, LawHouseSessionViewModel } from "./session";

export class LawHouseService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	getSessions() {
		return LawHouseSessionSummaryModel.from(this.database.lawHouseSession
			.orderByDescending(session => session.started)
		);
	}

	async getSession(id: string) {
		return new LawHouseSessionViewModel(await this.database.lawHouseSession.find(id));
	}
}
