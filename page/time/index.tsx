import { Component } from "@acryps/page";
import { EpochService, EpochViewModel } from "../managed/services";
import { Time } from "../../interface/time";

export class TimePage extends Component {
	epochs: EpochViewModel[];

	async onload() {
		this.epochs = await new EpochService().getEpochs();
	}

	render() {
		const currentEpoch = this.epochs.find(epoch => epoch.start <= new Date() && (!epoch.end || epoch.end >= new Date()));

		const date: HTMLElement = <ui-date></ui-date>;
		const time: HTMLElement = <ui-time></ui-time>;

		const updateClock = () => {
			const now = Time.now();

			date.textContent = now.toDateString();
			time.textContent = now.toTimeString();

			requestAnimationFrame(() => updateClock());
		};

		updateClock();

		return <ui-time>
			<ui-clock>
				{date}
				{time}

				{currentEpoch ? <ui-rate>
					{currentEpoch.rate}x
				</ui-rate> : <ui-pause>
					Time Paused
				</ui-pause>}
			</ui-clock>

			<ui-timeline>
				{this.epochs.map((epoch, index) => <ui-epoch>
					{this.renderTime(epoch.start)}
					{epoch.end ? this.renderTime(epoch.end) : <ui-now>
						Now
					</ui-now>}

					<ui-name>
						{epoch.name}
					</ui-name>

					<ui-description>
						{epoch.description}
					</ui-description>

					{this.epochs[index + 1] && +(this.epochs[index + 1].start ?? new Date()) != +epoch.end && <ui-pause>
						Time paused for {Math.floor((+(this.epochs[index + 1].start ?? new Date()) - +epoch.end) / 1000 / 60 / 60 / 24)} days
					</ui-pause>}
				</ui-epoch>)}
			</ui-timeline>
		</ui-time>;
	}

	renderTime(time: Date) {
		return <ui-time>
			<ui-simulated>
				{new Time(time).toDateString()}
			</ui-simulated>

			<ui-real>
				{time.toLocaleDateString()}
			</ui-real>
		</ui-time>
	}
}
