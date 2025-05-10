import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapLayer } from "./layer";
import { labelX, labelY, mapOverdraw, mapPixelHeight, mapPixelWidth, mapPositionX, mapPositionY, mapSubpixelHeight, mapSubpixelWidth } from "./index.style";
import { baseLayer } from "./layers";
import { Label } from "./layer/label";
import { BaseMapView } from "./views/base";
import { MapHighlighterView } from "./views/highlight";
import { MapDrawView } from "./views/draw";
import { MapViewContainer } from "./views/container";
import { MapView } from "./views";
import { top } from "@acryps/style";

export class MapComponent extends Component {
	readonly defaultZoom = 4;

	declare rootNode: HTMLElement;

	center: Point;
	scale = 0.8;

	readonly minimumWidth = 10;
	readonly maximumWidth = 1000;

	width: number;
	height: number;

	subpixelWidth: number;
	subpixelHeight: number;

	base = new BaseMapView(this);
	highlighter: MapHighlighterView;
	drawer: MapDrawView;

	viewContainer: MapViewContainer;

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
		this.highlighter = new MapHighlighterView(this, shape, close);
		this.updateViews();

		this.show(Point.center(shape), this.scale);

		return this;
	}

	// enable drawing mode
	enableDrawing() {
		this.drawer = new MapDrawView(this);
		this.updateViews();

		return this;
	}

	pushDrawingPoint(point = this.cursor) {
		this.drawer.shape.push(point.copy());
		this.renderLayers();
	}

	popDrawingPoint() {
		this.drawer.shape.pop();
		this.renderLayers();
	}

	flipDrawingDirection() {
		this.drawer.shape.reverse();
		this.renderLayers();
	}

	// pick
	async pick(point: Point) {
		for (let layer of this.layers) {
			if (await layer.pick(point.x, point.y)) {
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
		const source = this.base.context.getImageData(0, 0, this.width, this.height);

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
		this.viewContainer = new MapViewContainer();

		requestAnimationFrame(() => {
			const bounds = this.rootNode.getBoundingClientRect();

			for (let view of this.activeViews) {
				view.prepare(bounds);
			}

			this.updateScale();
		});

		addEventListener('resize', () => {
			if (document.contains(this.base.canvas)) {
				this.updateScale();
			}
		});

		const container = <ui-map-container>
			{this.viewContainer}

			{this.labelContainer}
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
		const boundingBox = this.base.canvas.getBoundingClientRect();
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

		if (Math.floor(this.subpixelWidth) > this.maximumWidth) {
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

	get activeViews(): MapView[] {
		return [
			this.base,
			this.highlighter,
			this.drawer
		].filter(item => item);
	}

	private get activeSubpixelOffsetElements() {
		return [
			...this.activeViews.map(view => view.canvas),
			this.labelContainer,
		];
	}

	private updateViews() {
		if (this.viewContainer) {
			this.viewContainer.update();
			this.updateScale();
		}
	}

	private updateScale() {
		this.resize();

		for (let view of this.activeViews) {
			view.resize();
		}

		for (let element of this.activeSubpixelOffsetElements) {
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

		for (let element of this.activeSubpixelOffsetElements) {
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
		if (!this.base.context) {
			return;
		}

		// top most pixel offset
		// point 0,0 in canvas converted to map location
		const offset = new Point(
			this.cursor.x - this.width / 2 - (this.width % 2 ? 0.5 : 0),
			this.cursor.y - this.height / 2 - (this.height % 2 ? 0.5 : 0)
		);

		// label positions
		this.rootNode.style.setProperty(mapPositionX.propertyName, offset.x);
		this.rootNode.style.setProperty(mapPositionY.propertyName, offset.y);

		for (let view of this.activeViews) {
			view.render(offset);
		}

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
}
