import { Service } from "vlserver";
import { Scheduler } from "../../scheduler";
import { QueuedTaskViewModel } from "./view";

export class SchedulerService extends Service {
	constructor(
		private scheduler: Scheduler
	) {
		super();
	}

	getQueue() {
		return QueuedTaskViewModel.from(this.scheduler.getStatus());
	}
}
