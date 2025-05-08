import { Component } from "@acryps/page";
import { MapComponent } from "..";
import { MapView } from ".";

export class MapViewContainer extends Component {
	declare parent: MapComponent;

	rendered: MapView[] = [];

	render() {
		const active = [...this.parent.activeViews];

		for (let view of active) {
			if (!this.rendered.includes(view)) {
				view.resize();
			}
		}

		this.rendered = active;

		return <ui-container>
			{this.parent.activeViews.map(view => view.canvas)}
		</ui-container>
	}
}
