import { MapComponent } from "..";
import { Point } from "../../../../interface/point";

export abstract class MapView {
	superscale = 1;

	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;

	constructor(
		protected map: MapComponent
	) {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
	}

	// prepare is only called with views initialy active when loading a map
	// this can be used to adjust the scale, ...
	prepare(bounds: DOMRect) {}

	resize() {
		this.canvas.width = this.map.width * this.superscale;
		this.canvas.height = this.map.height * this.superscale;
	}

	abstract render(offset: Point);

	protected renderLayerBuffers() {
		// copy layer buffers to main context
		for (let layer of this.map.layers) {
			const image = layer.render(this.map.cursor, this.map.width, this.map.height, this.superscale);

			this.context.globalCompositeOperation = layer.blendMode;
			this.context.drawImage(image, 0, 0);
		}
	}
}
