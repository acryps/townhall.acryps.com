import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapLayer } from "./layer";
import { mapOverdraw, mapPixelHeight, mapPixelWidth, mapSubpixelHeight, mapSubpixelWidth, subpixelOffsetX, subpixelOffsetY } from "./index.style";
import { baseLayer } from "./layers";
import { drawDanwinstonLine } from "../../../interface/line";
import { Observable } from "@acryps/page-observable";
import { Hex } from "@acryps/style";

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

	subpixelWidth: number;
	subpixelHeight: number;

	drawing?: Point[];
	drawingClosePossible = new Observable<boolean>(false);

	highlightedShape: Point[];

	subpixel = new Point(0, 0);
	pixelSize = 0;

	layers: MapLayer[] = [
		baseLayer
	];

	// centers the map around this point (intially)
	show(center: Point, scale: number) {
		this.center = center.floor().copy(0.5, 0.5);
		this.scale = scale;

		console.debug(this.center)

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

	// enable drawing mode
	enableDrawing() {
		this.drawingClosePossible.emit(false);

		this.drawing = [];
		this.renderLayers();

		return this;
	}

	pushDrawingPoint(point = this.cursor) {
		this.drawing.push(this.cursor.copy());
		this.renderLayers();
	}

	completeDrawing() {
		const shape = [...this.drawing];
		delete this.drawing;

		this.renderLayers();
		this.drawingClosePossible.emit(false);

		return shape;
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
		});

		const container = <ui-map-container>
			{this.canvas}
		</ui-map-container>;

		return container;
	}

	get cursor() {
		return new Point(
			Math.floor(this.center.x),
			Math.floor(this.center.y)
		);
	}

	private resize() {
		const boundingBox = this.rootNode.getBoundingClientRect();

		this.subpixelWidth = boundingBox.width * this.scale;
		this.subpixelHeight = boundingBox.height * this.scale;

		if (this.subpixelWidth < this.minimumWidth) {
			this.scale = this.minimumWidth / boundingBox.width;

			return this.resize();
		}

		if (this.subpixelWidth > this.maximumWidth) {
			this.scale = this.maximumWidth / boundingBox.width;

			return this.resize();
		}

		this.pixelSize = boundingBox.width / this.subpixelWidth;

		// always render some pixel too much, to compensate the sub pixel offset
		this.subpixelWidth += mapOverdraw;
		this.subpixelHeight += mapOverdraw;

		this.width = Math.floor(this.subpixelWidth);
		this.height = Math.floor(this.subpixelHeight);
	}

	private updateScale() {
		this.resize();
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.canvas.style.width = `${this.pixelSize * this.width}px`;
		this.canvas.style.height = `${this.pixelSize * this.height}px`;

		this.canvas.style.setProperty(mapPixelWidth.propertyName, this.width.toString());
		this.canvas.style.setProperty(mapPixelHeight.propertyName, this.height.toString());

		this.canvas.style.setProperty(mapSubpixelWidth.propertyName, this.subpixelWidth.toString());
		this.canvas.style.setProperty(mapSubpixelHeight.propertyName, this.subpixelHeight.toString());

		this.resize();
		this.updateLayers();
	}

	// updates map content
	updateLayers() {
		const box = this.canvas.getBoundingClientRect();
		const bounds = this.rootNode.getBoundingClientRect();

		// how much partially visible pixels are on the canvas
		const outboard = new Point(
			bounds.width % this.pixelSize,
			bounds.height % this.pixelSize
		);

		// set subpixel offsets
		//
		// moves map slightly (within one map pixel) to allow for floating-point movement without jitter
		// the map is expanded by one pixel to the bottom right to prevent the bottom pixel from not being rendered
		// everyting is rendered to the top left pixel, which is only partially shown
		this.subpixel = new Point(
			(this.center.x - Math.floor(this.center.x)) * this.pixelSize,
			(this.center.y - Math.floor(this.center.y)) * this.pixelSize
		);

		// source of this not found yet
		const oddOffset = new Point(
			this.width % 2 ? 0.5 : 0,
			this.height % 2 ? 0.5 : 0
		);

		// it does not work in styles as the width/height are relative
		this.canvas.style.left = `${-this.subpixel.x + outboard.x / 2 - mapOverdraw / 2 * this.pixelSize - oddOffset.x * this.pixelSize}px`;
		this.canvas.style.top = `${-this.subpixel.y + outboard.y / 2 - mapOverdraw / 2 * this.pixelSize - oddOffset.y * this.pixelSize}px`;

		for (let layer of this.layers) {
			layer.update(this.cursor, this.width, this.height).then(() => {
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

		// top most pixel offset
		// point 0,0 in canvas converted to map location
		const offset = new Point(
			this.cursor.x - this.width / 2 - (this.width % 2 ? 0.5 : 0), // Math.floor(this.cursor.x - this.width / 2),
			this.cursor.y - this.height / 2 - (this.height % 2 ? 0.5 : 0)	 // Math.floor(this.cursor.y - this.height / 2)
		);

		// console.clear();

		console.debug('center', this.center);
		console.debug('cursor', this.cursor);
		console.debug('offset', offset);
		console.debug('subpixel', this.subpixel);
		console.debug('size', this.width, this.height);

		if (this.drawing) {
			if (this.drawing.length) {
				const firstPoint = this.drawing[0];

				this.drawingClosePossible.emit(this.cursor.x == firstPoint.x && this.cursor.y == firstPoint.y);
			}

			// draw existing
			this.context.strokeStyle = '#000';

			for (let pointIndex = 1; pointIndex < this.drawing.length; pointIndex++) {
				const point = this.drawing[pointIndex];

				drawDanwinstonLine(
					this.context,
					this.drawing[pointIndex - 1].subtract(offset),
					this.drawing[pointIndex].subtract(offset)
				);
			}

			// draw current line
			const last = this.drawing[this.drawing.length - 1];
			const cursor = this.cursor;

			if (last) {
				// draw current line
				this.context.strokeStyle = '#0008';

				drawDanwinstonLine(
					this.context,
					last.subtract(offset),
					cursor.subtract(offset)
				);

				// draw cursor aligned line indicator
				if (last.x == cursor.x || last.y == cursor.y || Math.abs(last.x - cursor.x) == Math.abs(last.y - cursor.y)) {
					this.context.fillStyle = '#0f08';
					this.context.fillRect(cursor.x - offset.x - 1, cursor.y - offset.y - 1, 3, 3);
				}
			}

			// draw cursor
			this.context.fillStyle = '#000';
			this.context.fillRect(cursor.x - offset.x, cursor.y - offset.y, 1, 1);
		}

		if (this.highlightedShape) {
			// prepare clip area
			const path = new Path2D();
			this.context.beginPath();

			for (let pointIndex = 1; pointIndex < this.highlightedShape.length; pointIndex++) {
				const x = this.highlightedShape[pointIndex].x - offset.x;
				const y = this.highlightedShape[pointIndex].y - offset.y;

				if (pointIndex) {
					path.lineTo(x, y);
				} else {
					path.moveTo(x, y);
				}
			}

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

			// draw highlighted area in color
			this.context.save();
			this.context.clip(path);
			this.renderLayerBuffers();

			// draw shape
			this.context.restore();
			this.context.strokeStyle = '#000';

			for (let pointIndex = 0; pointIndex < this.highlightedShape.length; pointIndex++) {
				for (let x = -1; x < 1; x++) {
					for (let y = -1; y < 1; y++) {
						drawDanwinstonLine(
							this.context,
							this.highlightedShape[pointIndex].subtract(offset),
							this.highlightedShape[(pointIndex + 1) % this.highlightedShape.length].subtract(offset)
						);
					}
				}
			}
		}

		this.context.fillStyle = 'blue';
		this.context.fillRect(-offset.x, -offset.y, 1, 1);

		this.context.restore();
	}

	private renderLayerBuffers() {
		// copy layer buffers to main context
		for (let layer of this.layers) {
			const image = layer.render(this.cursor, this.width, this.height);

			this.context.drawImage(image, 0, 0);
		}
	}
}
