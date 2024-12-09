import { Component } from "@acryps/page";
import { Point } from "../point";
import { MapLayer } from "./layer";
import { registerInteration } from "./interaction";

export class MapComponent extends Component {
	readonly defaultZoom = 4;

	declare rootNode: HTMLElement;

	center: Point;
	scale = 0.8;

	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	width: number;
	height: number;

	highlightedShape: Point[];

	layers: MapLayer[] = [
		// night layer
		MapLayer.fromTileSource((x, y) => `/map/tile/night/${x}/${y}`, 250)
	];

	show(center: Point) {
		this.center = center;
	}

	move(center: Point) {
		this.center = center;

		this.updateLayers();
	}

	zoom(scale: number) {
		const old = this.scale;

		this.scale = scale;
		this.resize();

		if (this.width < 10 || this.width > 1000) {
			this.scale = old;
		}

		this.updateScale();
	}

	highlight(shape: Point[]) {
		this.highlightedShape = shape;
		this.show(Point.center(shape));
	}

	render() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		requestAnimationFrame(() => this.updateScale());

		const container = <ui-map>
			{this.canvas}
		</ui-map>;

		return container;
	}

	private resize() {
		const boundingBox = this.rootNode.getBoundingClientRect();

		this.width = boundingBox.width * this.scale;
		this.height = boundingBox.height * this.scale;
	}

	private updateScale() {
		this.resize();
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.resize();
		this.updateLayers();
	}

	// updates map content
	private updateLayers() {
		for (let layer of this.layers) {
			layer.update(this.center.copy(), this.width, this.height).then(() => {
				this.renderLayers();
			});
		}

		this.renderLayers();
	}

	// render layers onto map
	private renderLayers() {
		this.context.clearRect(0, 0, this.width, this.height);

		for (let layer of this.layers) {
			const image = layer.render(this.center.copy(), this.width, this.height);

			this.context.drawImage(image, 0, 0);
		}

		if (this.highlightedShape) {
			const left = Math.floor(this.center.x - this.width / 2);
			const top = Math.floor(this.center.y - this.height / 2);

			this.context.beginPath();

			for (let pointIndex = 0; pointIndex < this.highlightedShape.length; pointIndex++) {
				const x = this.highlightedShape[pointIndex].x - left + 0.5;
				const y = this.highlightedShape[pointIndex].y - top + 0.5;

				if (pointIndex) {
					this.context.lineTo(x, y);
				} else {
					this.context.moveTo(x, y);
				}
			}

			this.context.closePath();

			this.context.strokeStyle = '#000';
			this.context.stroke();

			this.context.fillStyle = '#fff3';
			this.context.fill();
		}
	}
}
