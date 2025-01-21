import { Component } from "@acryps/page";
import { LifeService, ResidentTickerModel } from "../managed/services";

export class PopulationTickerComponent extends Component {
	events: ResidentTickerModel[];

	async onload() {
		this.events = await new LifeService().ticker();
	}

	render() {
		return <ui-ticker>
			{this.events.map(event => <ui-event>
				{event.action}
			</ui-event>)}
		</ui-ticker>;
	}
}
