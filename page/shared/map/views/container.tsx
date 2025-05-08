import { Component } from "@acryps/page";
import { MapComponent } from "..";
import { MapView } from ".";

export class MapViewContainer extends Component {
	declare parent: MapComponent;

	render() {
		return <ui-container>
			{this.parent.activeViews.map(view => view.canvas)}
		</ui-container>
	}
}
