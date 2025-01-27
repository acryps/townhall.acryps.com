import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";

export class LocationMarkerComponent extends Component {
	constructor(
		private point: Point
	) {
		super();
	}

	render() {
		return <ui-location-marker>
			<ui-x>{this.point.x}</ui-x>

			<ui-marker>/</ui-marker>

			<ui-y>{this.point.y}</ui-y>
		</ui-location-marker>;
	}
}
