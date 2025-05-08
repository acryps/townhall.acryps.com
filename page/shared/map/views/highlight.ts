import { MapView } from ".";
import { MapComponent } from "..";
import { calculateDanwinstonShapePath } from "../../../../interface/line";
import { Point } from "../../../../interface/point";

export class MapHighlighterView extends MapView {
	readonly margin = 1.5;

	private mask = new Path2D();

	constructor(
		map: MapComponent,

		private shape: Point[],
		private close: boolean
	) {
		super(map);

		this.canvas.setAttribute('ui-highlight-shape', '');
		map.base.canvas.setAttribute('ui-highlight-base', '');

		for (let point of calculateDanwinstonShapePath(shape, close)) {
			this.mask.rect(point.x, point.y, 1, 1);
		}

		if (this.close) {
			for (let [key, pixel] of Point.fill(shape)) {
				this.mask.rect(pixel.x, pixel.y, 1, 1);
			}
		}

		if (close) {
			this.mask.closePath();
		}
	}

	prepare(bounds: DOMRect) {
		// adjust scale to fit highlighted shape
		const shape = Point.bounds(this.shape);

		this.map.scale = Math.max(
			(shape.width * this.margin / bounds.width),
			(shape.height * this.margin / bounds.height)
		);
	}

	render(offset: Point) {
		// draw highlighted area in color
		this.context.reset();
		this.context.globalCompositeOperation = 'source-over';
		this.renderLayerBuffers();

		// turns next draw into a mask
		this.context.globalCompositeOperation = 'destination-in';
		this.context.fillStyle = 'black';

		this.context.translate(-offset.x, -offset.y);
		this.context.fill(this.mask);
	}
}
