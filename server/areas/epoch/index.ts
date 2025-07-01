import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { EpochTimelineModel, EpochViewModel } from "./epoch";

export class EpochService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	timeline() {
		return EpochTimelineModel.from(this.database.epoch);
	}

	getEpochs() {
		return EpochViewModel.from(
			this.database.epoch
				.orderByAscending(epoch => epoch.start)
		);
	}
}
