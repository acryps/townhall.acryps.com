import { Logger } from "@acryps/log";

// a task is one unit of recurring (or one-shot) background work.
// `run()` is called by the `Scheduler` and its return value decides when it may run again:
//  - `undefined` / `0` -> eligible again immediately (idle backlog draining, or "there's more queued up")
//  - a positive number  -> not eligible again until that many ms have passed (fixed-interval recurring, or backoff)
//  - `Infinity`         -> one-shot, never runs again
export abstract class Task {
	readonly name: string = this.constructor.name;

	enabled = true;

	// urgent tasks always get a free run slot before idle ones - everything else loops as backlog filler
	urgent = false;

	// counts against the scheduler's `workerConcurrency` cap instead of its general `concurrency` cap -
	// every worker-dispatched task spins up a full Node Worker (its own DB pool included), so this is
	// what actually bounds how many of those can be alive at once
	usesWorker = false;

	nextRunAt = 0;
	running = false;

	// set by `Scheduler.register` - lets a task wake the loop early (eg. `MapImporter.poke` scheduling a debounced region update)
	scheduler?: Scheduler;

	// bookkeeping surfaced on the /queue page - see `Scheduler.getStatus`
	lastStartedAt?: number;
	lastError?: string;

	abstract run(): Promise<number | void>;
}

// plain snapshot of a task's state - returned by `Scheduler.getStatus`, consumed by `SchedulerService`.
// a class, not an interface - `QueuedTaskViewModel`'s generated `toModel()` needs to construct one.
// `nextRunAt` is `null` (not `Infinity`) for one-shot tasks that already ran - `Infinity` doesn't survive JSON
export class QueuedTaskStatus {
	name: string;
	urgent: boolean;
	usesWorker: boolean;
	enabled: boolean;
	running: boolean;
	nextRunAt: number | null;
	lastStartedAt?: number;
	lastError?: string;
}

export class Scheduler {
	private logger = new Logger('scheduler');

	// how many tasks may run at once in total
	concurrency = 6;

	// of those, how many may be `usesWorker` tasks at once
	workerConcurrency = 1;

	// backoff applied after a task throws, so a persistently broken task can't hot-loop the scheduler
	errorBackoff = 1000 * 10;

	private tasks: Task[] = [];
	private wake = () => {};

	// registers a task, optionally setting its `enabled` flag inline (handy for wiring up env-var gates)
	register<TaskType extends Task>(task: TaskType, enabled = task.enabled): TaskType {
		task.enabled = enabled;
		task.scheduler = this;
		this.tasks.push(task);

		return task;
	}

	start() {
		this.loop();
	}

	// wakes the loop early - used by tasks that can become eligible sooner than their current `nextRunAt`
	// (eg. `MapImporter.poke` scheduling a debounced region update)
	notify() {
		this.wake();
	}

	// plain snapshot of every registered task - see `SchedulerService.getQueue` for the exposed service
	getStatus(): QueuedTaskStatus[] {
		return this.tasks
			.sort((a, b) => (a.urgent == b.urgent ? a.name.localeCompare(b.name) : a.urgent ? -1 : 1))
			.map(task => ({
				name: task.name,
				urgent: task.urgent,
				usesWorker: task.usesWorker,
				enabled: task.enabled,
				running: task.running,
				nextRunAt: Number.isFinite(task.nextRunAt) ? task.nextRunAt : null,
				lastStartedAt: task.lastStartedAt,
				lastError: task.lastError
			}));
	}

	private runningCount() {
		return this.tasks.filter(task => task.running).length;
	}

	private runningWorkerCount() {
		return this.tasks.filter(task => task.running && task.usesWorker).length;
	}

	private async loop() {
		while (true) {
			const now = Date.now();

			const ready = this.tasks
				.filter(task => task.enabled && !task.running && task.nextRunAt <= now)
				// urgent tasks get first pick of the available slots; ties broken by whoever's been due longest
				.sort((a, b) => (a.urgent == b.urgent ? a.nextRunAt - b.nextRunAt : a.urgent ? -1 : 1));

			for (let task of ready) {
				if (this.runningCount() >= this.concurrency) {
					break;
				}

				if (task.usesWorker && this.runningWorkerCount() >= this.workerConcurrency) {
					continue;
				}

				this.execute(task);
			}

			await this.sleepUntilNextEvent();
		}
	}

	private execute(task: Task) {
		task.running = true;
		task.lastStartedAt = Date.now();

		const logger = this.logger.task(task.name);

		task.run()
			.then(delay => {
				task.nextRunAt = Date.now() + (delay || 0);
				task.lastError = undefined;
			})
			.catch(error => {
				logger.error('failed', error);
				task.nextRunAt = Date.now() + this.errorBackoff;
				task.lastError = error?.message ?? String(error);
			})
			.finally(() => {
				task.running = false;
				this.wake();
			});
	}

	// resolves as soon as either the earliest pending task becomes due, or something wakes the loop early
	private sleepUntilNextEvent() {
		return new Promise<void>(resolve => {
			this.wake = resolve;

			const pending = this.tasks.filter(task => task.enabled && !task.running);
			const dueTimes = pending.map(task => task.nextRunAt).filter(dueAt => Number.isFinite(dueAt));

			const next = dueTimes.length ? Math.min(...dueTimes) : Date.now() + 1000 * 60;
			const delay = Math.max(0, next - Date.now());

			setTimeout(resolve, delay);
		});
	}
}
