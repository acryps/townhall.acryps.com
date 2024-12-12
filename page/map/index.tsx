import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Application } from "..";
import { registerInteration } from "../shared/map/interaction";
import { Point } from "../../interface/point";

export class MapPage extends Component {
	declare parameters: { x, y, zoom };

	// scales zoom conversion (scale is a floating number, zoom a integer)
	//
	// 3 keeps a good balance between number length (usually max 2 characters) and accuracy
	readonly zoomAccuracy = 3;

	render() {
		const map = new MapComponent();
		map.show(new Point(+this.parameters.x, +this.parameters.y), 1 / ((+this.parameters.zoom / this.zoomAccuracy) ** 2));

		requestAnimationFrame(() => {
			registerInteration(map, point => {
				this.parameters.x = point.x.toFixed(0);
				this.parameters.y = point.y.toFixed(0);
			}, scale => {
				this.parameters.zoom = (Math.sqrt(1 / scale) * this.zoomAccuracy).toFixed(0);
			}, pick => {
				map.pick(pick);
			});
		});

		return <ui-map>
			{map}
		</ui-map>
	}
}
