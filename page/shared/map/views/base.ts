import { MapView } from ".";
import { Point } from "../../../../interface/point";

export class BaseMapView extends MapView {
	render(offset: Point) {
		this.context.clearRect(0, 0, this.map.width, this.map.height);
		this.renderLayerBuffers();

		// zero marker
		this.context.fillStyle = 'blue';
		this.context.fillRect(-offset.x, -offset.y, 1, 1);
	}
}
