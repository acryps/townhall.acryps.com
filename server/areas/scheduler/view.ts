import { ViewModel } from "vlserver";
import { QueuedTaskStatus } from "../../scheduler";

export class QueuedTaskViewModel extends ViewModel<QueuedTaskStatus> {
	name;
	urgent;
	usesWorker;
	enabled;
	running;
	nextRunAt;
	lastStartedAt;
	lastError;
}
