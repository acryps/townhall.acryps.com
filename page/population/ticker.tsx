import { Component } from "@acryps/page";
import { LifeService, ResidentTickerModel } from "../managed/services";

export class PopulationTickerComponent extends Component {
	events: ResidentTickerModel[];

	async onload() {
		this.events = await new LifeService().ticker();

		setTimeout(() => {
			if (this.loaded) {
				this.reload();
			}
		}, 1000);
	}

	render() {
		return <ui-ticker>
			<ui-header>
				Last actions by residents
			</ui-header>

			{this.events.map(event => <ui-event ui-href={`/go/${event.id}`}>
				<ui-action>
					{event.action}
				</ui-action>

				<ui-time>
					{event.timestamp.toLocaleString()}
				</ui-time>
			</ui-event>)}
		</ui-ticker>;
	}
}
