import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapLayer } from "./layer";
import { mapOverdraw, mapPixelWidth, subpixelOffsetX, subpixelOffsetY } from "./index.style";
import { baseLayer } from "./layers";

export class MapComponent extends Component {
	readonly defaultZoom = 4;

	declare rootNode: HTMLElement;

	center: Point;
	scale = 0.8;

	readonly minimumWidth = 10;
	readonly maximumWidth = 1000;

	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	width: number;
	height: number;

	highlightedShape: Point[];

	layers: MapLayer[] = [
		baseLayer
	];

	// centers the map around this point (intially)
	show(center: Point, scale: number) {
		this.center = center;
		this.scale = scale;

		return this;
	}

	// move map to new center
	move(center: Point) {
		this.center = center;

		this.updateLayers();
	}

	// scales map
	zoom(scale: number) {
		this.scale = scale;
		this.resize();

		this.updateScale();
	}

	// highlight an area
	highlight(shape: Point[]) {
		this.highlightedShape = shape;
		this.show(Point.center(shape), this.scale);

		return this;
	}

	// pick
	async pick(point: Point) {
		for (let layer of this.layers) {
			const link = await layer.pick(point.x, point.y);

			if (link) {
				// most picks resolve into /go/ links, which can only be followed using this
				location.href = link;

				return;
			}
		}
	}

	capture() {
		return new Promise<Blob>(done => this.canvas.toBlob(done, 'image/png'));
	}

	render() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		requestAnimationFrame(() => this.updateScale());

		addEventListener('resize', () => {
			if (document.contains(this.canvas)) {
				this.updateScale();
			}
		})

		const container = <ui-map-container>
			{this.canvas}
		</ui-map-container>;

		return container;
	}

	private resize() {
		const boundingBox = this.rootNode.getBoundingClientRect();

		this.width = Math.floor(boundingBox.width * this.scale);
		this.height = Math.floor(boundingBox.height * this.scale);

		if (this.width < this.minimumWidth) {
			this.scale = this.minimumWidth / boundingBox.width;

			return this.resize();
		}

		if (this.width > this.maximumWidth) {
			this.scale = this.maximumWidth / boundingBox.width;

			return this.resize();
		}

		// always render two pixel too much, to compensate the sub pixel offset
		this.width += mapOverdraw;
		this.height += mapOverdraw;
	}

	private updateScale() {
		this.resize();
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.canvas.style.setProperty(mapPixelWidth.propertyName, this.width.toString());

		this.resize();
		this.updateLayers();
	}

	// updates map content
	updateLayers() {
		// set subpixel offsets
		//
		// moves map slightly (within one map pixel) to allow for floating-point movement without jitter
		// the map is expanded by one pixel to the bottom right to prevent the bottom pixel from not being rendered
		// everyting is rendered to the top left pixel, which is only partially shown
		this.canvas.style.setProperty(subpixelOffsetX.propertyName, (this.center.x - Math.floor(this.center.x)).toString());
		this.canvas.style.setProperty(subpixelOffsetY.propertyName, (this.center.y - Math.floor(this.center.y)).toString());

		for (let layer of this.layers) {
			layer.update(this.center.floor(), this.width, this.height).then(() => {
				this.renderLayers();
			});
		}

		this.renderLayers();
	}

	// render layers onto map
	private renderLayers() {
		this.context.save();

		this.context.clearRect(0, 0, this.width, this.height);
		this.renderLayerBuffers();

		if (this.highlightedShape) {
			const left = Math.floor(this.center.x - this.width / 2);
			const top = Math.floor(this.center.y - this.height / 2);

			// prepare clip area
			const path = new Path2D();
			this.context.beginPath();

			for (let pointIndex = 0; pointIndex < this.highlightedShape.length; pointIndex++) {
				// offset by 1/2 pixel to keep lines unblurry
				const x = this.highlightedShape[pointIndex].x - left;
				const y = this.highlightedShape[pointIndex].y - top;

				if (pointIndex) {
					path.lineTo(x, y);
				} else {
					path.moveTo(x, y);
				}
			}

			path.closePath();

			// gray out map
			const imageData = this.context.getImageData(0, 0, this.width, this.height);
			let index = 0;

			while (index < imageData.data.length) {
				// make it a big brighter
				const gray = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 4 + 0xff / 2;

				imageData.data[index++] = gray;
				imageData.data[index++] = gray;
				imageData.data[index++] = gray;
				index++; // alpha
			}

			this.context.putImageData(imageData, 0, 0);

			// draw shape
			this.context.lineWidth = 2;
			this.context.strokeStyle = '#000';
			this.context.stroke(path);

			this.context.fillStyle = '#fff3';
			this.context.fill(path);

			// draw highlighted area in color
			this.context.clip(path);
			this.renderLayerBuffers();
		}

		this.context.restore();
	}

	private renderLayerBuffers() {
		// copy layer buffers to main context
		for (let layer of this.layers) {
			const image = layer.render(this.center.floor(), this.width, this.height);

			this.context.drawImage(image, 0, 0);
		}
	}
}
