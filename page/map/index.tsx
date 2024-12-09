import { Component } from "@acryps/page";
import { MapComponent } from "./map";
import { Application } from "..";
import { Point } from "./point";
import { registerInteration } from "./map/interaction";

export class MapPage extends Component {
	declare parameters: { x, y, zoom };

	render() {
		const map = new MapComponent();
		map.show(new Point(+this.parameters.x, +this.parameters.y));

		requestAnimationFrame(() => {
			registerInteration(map, point => {
				this.parameters.x = point.x.toFixed(0);
				this.parameters.y = point.y.toFixed(0);
			});
		});

		return <ui-map>
			{map}
		</ui-map>
	}
}
