import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapLayer } from "./layer";
import { labelX, labelY, mapOverdraw, mapPixelHeight, mapPixelWidth, mapPositionX, mapPositionY, mapSubpixelHeight, mapSubpixelWidth, subpixelOffsetX, subpixelOffsetY } from "./index.style";
import { baseLayer } from "./layers";
import { calcualteDanwinstonLine, calculateDanwinstonShapePath, drawDanwinstonLine } from "../../../interface/line";
import { Observable } from "@acryps/page-observable";
import { Hex } from "@acryps/style";
import { Label } from "./layer/label";
import { Application } from "../..";

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

	highlightMargin = 1.5;
	highlightOutline: SVGElement;
	highlightedShape: {
		shape: Point[],
		close: boolean
	};

	subpixel = new Point(0, 0);
	pixelSize = 0;

	layers: MapLayer[] = [
		baseLayer
	];

	labelContainer: HTMLElement = <ui-labels />;

	// centers the map around this point (intially)
	show(center: Point, scale: number) {
		this.center = center.floor().copy(0.5, 0.5);
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
	highlight(shape: Point[], close = true) {
		this.highlightedShape = { shape, close };
		this.show(Point.center(shape), this.scale);

		this.highlightOutline = Application.createSVGElement('svg');

		const outline = Application.createSVGElement('path') as SVGPathElement;
		outline.setAttribute('d', calculateDanwinstonShapePath(shape, close).map((point, index) => `${index ? 'L' : 'M'} ${point.x},${point.y}`).join(' '));

		this.highlightOutline.appendChild(outline);

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

	// returns the map as a JPEG!
	// yes not a PNG, because all messengers compress the images
	capture() {
		// scale everyting up to fit the jpeg compression block to get clean sharing
		const jpegCompressionBlock = 8;

		const superscaledCanvas = document.createElement('canvas');
		superscaledCanvas.width = this.width * jpegCompressionBlock;
		superscaledCanvas.height = this.height * jpegCompressionBlock;

		const context = superscaledCanvas.getContext('2d');

		// superscale
		const source = this.context.getImageData(0, 0, this.width, this.height);

		for (let sourceX = 0; sourceX < this.width; sourceX++) {
			for (let sourceY = 0; sourceY < this.height; sourceY++) {
				const sourceOffset = (sourceX + sourceY * this.width) * 4;

				context.fillStyle = `rgb(${source.data.slice(sourceOffset, sourceOffset + 3).join(',')})`;
				context.fillRect(sourceX * jpegCompressionBlock, sourceY * jpegCompressionBlock, jpegCompressionBlock, jpegCompressionBlock);
			}
		}

		return new Promise<Blob>(done => superscaledCanvas.toBlob(done, 'image/jpeg'));
	}

	render() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		requestAnimationFrame(() => {
			// adjust scale to fit highlighted shape
			if (this.highlightedShape) {
				const shape = Point.bounds(this.highlightedShape.shape);
				const bounds = this.canvas.getBoundingClientRect();

				this.scale = Math.max(
					(shape.width * this.highlightMargin / bounds.width),
					(shape.height * this.highlightMargin / bounds.height)
				);
			}

			this.updateScale();
		});

		addEventListener('resize', () => {
			if (document.contains(this.canvas)) {
				this.updateScale();
			}
		});

		const container = <ui-map-container>
			{this.canvas}

			{this.labelContainer}
			{this.highlightOutline}
		</ui-map-container>;

		return container;
	}

	get cursor() {
		return new Point(
			Math.floor(this.center.x),
			Math.floor(this.center.y)
		);
	}

	// convert screen position to map position
	translate(cursor: Point) {
		const boundingBox = this.canvas.getBoundingClientRect();
		const offset = cursor.subtract(new Point(boundingBox.x, boundingBox.y));

		const pixel = offset.scale(1 / this.pixelSize);

		const topLeft = new Point(
			this.cursor.x - this.width / 2 - (this.width % 2 ? 0.5 : 0),
			this.cursor.y - this.height / 2 - (this.height % 2 ? 0.5 : 0)
		);

		return pixel.add(topLeft).floor();
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

	private get subpixelOffsetElements() {
		return [
			this.canvas,
			this.labelContainer,
			this.highlightOutline
		].filter(item => item);
	}

	private updateScale() {
		this.resize();
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		for (let element of this.subpixelOffsetElements) {
			element.style.width = `${this.pixelSize * this.width}px`;
			element.style.height = `${this.pixelSize * this.height}px`;
		}

		this.rootNode.style.setProperty(mapPixelWidth.propertyName, this.width.toString());
		this.rootNode.style.setProperty(mapPixelHeight.propertyName, this.height.toString());

		this.rootNode.style.setProperty(mapSubpixelWidth.propertyName, this.subpixelWidth.toString());
		this.rootNode.style.setProperty(mapSubpixelHeight.propertyName, this.subpixelHeight.toString());

		this.resize();
		this.updateLayers();
	}

	// updates map content
	updateLayers() {
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
		const subpixelX = `${-this.subpixel.x + outboard.x / 2 - mapOverdraw / 2 * this.pixelSize - oddOffset.x * this.pixelSize}px`;
		const subpixelY = `${-this.subpixel.y + outboard.y / 2 - mapOverdraw / 2 * this.pixelSize - oddOffset.y * this.pixelSize}px`;

		for (let element of this.subpixelOffsetElements) {
			element.style.left = subpixelX;
			element.style.top = subpixelY;
		}

		for (let layer of this.layers) {
			layer.update(this.cursor, this.width, this.height).then(() => {
				this.renderLayers();
			});
		}

		this.renderLayers();
	}

	// render layers onto map
	private renderLayers() {
		if (!this.context) {
			return;
		}

		this.context.save();

		this.context.clearRect(0, 0, this.width, this.height);
		this.renderLayerBuffers();

		// top most pixel offset
		// point 0,0 in canvas converted to map location
		const offset = new Point(
			this.cursor.x - this.width / 2 - (this.width % 2 ? 0.5 : 0),
			this.cursor.y - this.height / 2 - (this.height % 2 ? 0.5 : 0)
		);

		// label positions
		this.rootNode.style.setProperty(mapPositionX.propertyName, offset.x);
		this.rootNode.style.setProperty(mapPositionY.propertyName, offset.y);

		if (this.highlightOutline) {
			this.highlightOutline.setAttribute('viewBox', `${offset.x} ${offset.y} ${this.width} ${this.height}`);
		}

		if (this.highlightedShape) {
			// prepare clip area
			const path = new Path2D();

			for (let pointIndex = 0; pointIndex < this.highlightedShape.shape.length; pointIndex++) {
				const x = this.highlightedShape.shape[pointIndex].x - offset.x;
				const y = this.highlightedShape.shape[pointIndex].y - offset.y;

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

			// draw highlighted area in color
			this.context.save();
			this.context.clip(path);
			this.renderLayerBuffers();
			this.context.restore();
		}

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

				let cursorColor = '#fff8';

				// draw cursor aligned line indicator
				if (last.x == cursor.x || last.y == cursor.y || Math.abs(last.x - cursor.x) == Math.abs(last.y - cursor.y)) {
					cursorColor = '#0f08';
				}

				this.context.fillStyle = cursorColor;
				this.context.fillRect(cursor.x - offset.x - 1, cursor.y - offset.y - 1, 3, 3);
			}

			// draw cursor
			this.context.fillStyle = '#000';
			this.context.fillRect(cursor.x - offset.x, cursor.y - offset.y, 1, 1);
		}

		this.context.fillStyle = 'blue';
		this.context.fillRect(-offset.x, -offset.y, 1, 1);

		this.context.restore();

		this.renderLabels();
	}

	private renderLabels() {
		const labels: Label[] = [];

		for (let layer of this.layers) {
			labels.push(...layer.labels);
		}

		for (let label of labels) {
			if (label.visible(this.center, this.width, this.height)) {
				if (!label.rendered) {
					label.rendered = <ui-label style={`
						${labelX.propertyName}: ${label.position.x};
						${labelY.propertyName}: ${label.position.y};
					`}>
						{label.name}
					</ui-label>;
				}

				if (!label.rendered.parentElement) {
					this.labelContainer.append(label.rendered);
				}
			} else if (label.rendered?.parentElement) {
				label.rendered.remove();
			}
		}
	}

	private renderLayerBuffers() {
		// copy layer buffers to main context
		for (let layer of this.layers) {
			const image = layer.render(this.cursor, this.width, this.height);

			this.context.drawImage(image, 0, 0);
		}
	}
}
