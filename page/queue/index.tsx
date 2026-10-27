import { Component } from "@acryps/page";
import { QueuedTaskViewModel, SchedulerService } from "../managed/services";

export class QueuePage extends Component {
	queue: QueuedTaskViewModel[] = [];

	async onload() {
		const poll = async () => {
			this.queue = await new SchedulerService().getQueue();
			this.update();

			if (this.loaded) {
				setTimeout(() => poll(), 2000);
			}
		};

		await poll();
	}

	render() {
		return <ui-queue>
			<ui-header>
				Scheduler Queue
			</ui-header>

			<ui-tasks>
				{this.queue.map(task => <ui-task ui-state={this.state(task)}>
					<ui-detail>
						<ui-name>
							{task.name}
						</ui-name>

						<ui-tags>
							<ui-priority>
								{task.urgent ? 'Urgent' : 'Idle'}
							</ui-priority>

							{task.usesWorker && <ui-worker>
								Worker
							</ui-worker>}
						</ui-tags>
					</ui-detail>

					<ui-runtime>
						<ui-status>
							{this.state(task)}
						</ui-status>

						<ui-next>
							{this.nextRun(task)}
						</ui-next>

						<ui-last>
							{this.lastRun(task)}
						</ui-last>
					</ui-runtime>

					{task.lastError && <ui-error>
						{task.lastError}
					</ui-error>}
				</ui-task>)}
			</ui-tasks>
		</ui-queue>;
	}

	state(task: QueuedTaskViewModel) {
		if (!task.enabled) {
			return 'disabled';
		}

		if (task.running) {
			return 'running';
		}

		return task.nextRunAt <= Date.now() ? 'ready' : 'waiting';
	}

	nextRun(task: QueuedTaskViewModel) {
		if (!task.enabled || task.running) {
			return '-';
		}

		if (task.nextRunAt == null) {
			return 'one-shot, done';
		}

		const delta = task.nextRunAt - Date.now();

		return delta <= 0 ? 'now' : `in ${this.duration(delta)}`;
	}

	lastRun(task: QueuedTaskViewModel) {
		return task.lastStartedAt ? `${this.duration(Date.now() - task.lastStartedAt)} ago` : 'never';
	}

	duration(ms: number) {
		const seconds = Math.ceil(Math.abs(ms) / 1000);

		if (seconds < 60) {
			return `${seconds}s`;
		}

		const minutes = Math.floor(seconds / 60);

		if (minutes < 60) {
			return `${minutes}m ${seconds % 60}s`;
		}

		const hours = Math.floor(minutes / 60);

		return `${hours}h ${minutes % 60}m`;
	}
}
