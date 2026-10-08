
import { Canvas, CanvasRenderingContext2D, FontLibrary, loadImage } from "skia-canvas";
import { BoundingBox, Point } from "../../../interface/point";
import { DbContext, MapType, Square, Street, WaterBody } from "../../managed/database";
import { getTiles, mapBaseTileSize } from "../../../interface/tile";
import { calculateDanwinstonShapePath, drawDanwinstonLine } from "../../../interface/line";
import { ManagedServer } from "../../managed/server";
import { BoroughSummaryModel } from "../../areas/borough.summary";
import { Logger } from "@acryps/log";
import { dispatchFill } from "../fill";
import { StreetFillWorkerHandle } from "../fill/street";
import { WaterBodyFillWorkerHandle } from "../fill/water";
import { SquareFillWorkerHandle } from "../fill/square";
import { join } from "path";

interface PlanningMapTheme {
	tag: string;

	background: string;
	square: { fill: string, stroke: string, label: string },
	street: { fill: string, stroke: string, label: string },
	waterBody: { fill: string, stroke: string },
	plot: { fill: string, stroke: string, label: string },
	building: { fill: string, stroke: string },
	train: { fillEven: string, fillOdd: string },
	borough: { stroke: string, label: string },
	unused: { fill: string, stroke: string },
	unallocated: { fill: string, stroke: string }
}

const townhallTheme: PlanningMapTheme = {
	tag: 'default',

	background: '#fff',
	square: { fill: '#ccc', stroke: '#000', label: '#000' },
	street: { fill: '#eee', stroke: '#000', label: '#aaa' },
	waterBody: { fill: '#00fa', stroke: '#00f' },
	plot: { fill: '#fff', stroke: '#000', label: '#000' },
	building: { fill: '#ff0', stroke: '#000' },
	train: { fillEven: '#222', fillOdd: '#eee' },
	borough: { stroke: '#f00', label: '#fff' },
	unused: { fill: '#afa', stroke: '#4f4' },
	unallocated: { fill: '#f004', stroke: null }
};

const adminTheme: PlanningMapTheme = {
	tag: 'admin',

	background: '#fff',
	square: { fill: '#fff', stroke: '#000', label: '#000' },
	street: { fill: '#fff', stroke: '#000', label: '#000' },
	waterBody: { fill: '#fff', stroke: '#000' },
	plot: { fill: '#fff', stroke: '#000', label: '#000' },
	building: { fill: '#ccc', stroke: '#000' },
	train: { fillEven: '#000', fillOdd: '#fff' },
	borough: { stroke: '#f00', label: '#fff' },
	unused: { fill: '#afa', stroke: '#4f4' },
	unallocated: { fill: '#f004', stroke: null }
};

export class PlanningMapGenerator {
	private logger = new Logger('planning-map');

	// beware: font is 8px tall (static size)
	scale = 10;

	plotWidth = 2;
	buildingWidth = 4;
	railWidth = 3;

	administrativeWidth = 2;

	edgeOffset = 2;
	edgePoint = 2;

	constructor(
		private database: DbContext,
		server: ManagedServer
	) {
		for (let theme of [townhallTheme, adminTheme]) {
			server.app.get(`/planning-map/${theme.tag}/:x/:y`, async (request, response) => {
				const regionX = +request.params.x;
				const regionY = +request.params.y;

				response.contentType('image/png');
				response.end(await this.generate(regionX, regionY, theme));
			});
		}
	}

	async generate(regionX: number, regionY: number, theme: PlanningMapTheme) {
		const logger = this.logger.task('generator');

		const size = mapBaseTileSize * this.scale;
		const topLeft = new Point(regionX * mapBaseTileSize, regionY * mapBaseTileSize);

		logger.log('render map');
		const canvas = new Canvas(size, size);
		const context = canvas.getContext('2d');

		context.fillStyle = theme.background;
		context.fillRect(0, 0, size, size);

		const labelCanvas = new Canvas(size, size);
		const labelContext = labelCanvas.getContext('2d');
		labelContext.font = `8px micro`;

		FontLibrary.use('micro', [
			join(process.cwd(), '..', 'page', 'assets', 'font', 'micro.ttf')
		]);

		labelContext.translate(0.5, 0); // keep sharp edges

		const unusedPixels = new Map<string, Point>; // general
		const unallocatedPixels = new Map<string, Point>; // boroughs

		for (let x = regionX * mapBaseTileSize; x < regionX * mapBaseTileSize + mapBaseTileSize; x++) {
			for (let y = regionY * mapBaseTileSize; y < regionY * mapBaseTileSize + mapBaseTileSize; y++) {
				const point = new Point(x, y);

				unusedPixels.set(Point.pack([point]), point);
				unallocatedPixels.set(Point.pack([point]), point);
			}
		}

		const use = (filled: Map<string, Point>) => {
			for (let [packed, pixel] of filled) {
				unusedPixels.delete(packed);
			}

			return filled;
		}

		// draw squares (take priority over streets and water)
		logger.log('render squares');
		const filledSquares = await dispatchFill<Square>(SquareFillWorkerHandle);

		for (let square of new Set(filledSquares.filled.values())) {
			const boundary = new Map<string, Point>();

			for (let [point, source] of filledSquares.filled) {
				if (source == square) {
					boundary.set(point, Point.unpackSingle(point));
				}
			}

			use(boundary);
			this.fill(boundary, topLeft, context, theme.square.fill, theme.square.stroke, this.plotWidth);
			this.labelFilledShape(boundary, topLeft, labelContext, theme.square.label, square.name);
		}

		// draw roads
		logger.log('render streets');
		const filledStreets = await dispatchFill<Street>(StreetFillWorkerHandle);

		for (let street of new Set(filledStreets.filled.values())) {
			const boundary = new Map<string, Point>();

			for (let [point, source] of filledStreets.filled) {
				if (source == street) {
					boundary.set(point, Point.unpackSingle(point));
				}
			}

			use(boundary);
			this.fill(boundary, topLeft, context, theme.street.fill, theme.street.stroke, this.plotWidth);

			const path = calculateDanwinstonShapePath(Point.unpack(street.path), false);

			for (let pointIndex = 5; pointIndex < path.length; pointIndex += 10) {
				const point = path[pointIndex];

				const before = path[pointIndex - 1];
				const after = path[pointIndex + 1];

				if (before && after) {
					if (boundary.has(Point.pack([point]))) {
						this.label(point, topLeft, labelContext, theme.street.label, street.name);
					}
				}
			}
		}

		// draw water
		logger.log('render water bodies');
		const filledWaterBodies = await dispatchFill<WaterBody>(WaterBodyFillWorkerHandle);

		for (let waterBody of new Set(filledWaterBodies.filled.values())) {
			const boundary = new Map<string, Point>();

			for (let [point, source] of filledWaterBodies.filled) {
				if (source == waterBody) {
					boundary.set(point, Point.unpackSingle(point));
				}
			}

			use(boundary);
			this.fill(boundary, topLeft, context, theme.waterBody.fill, theme.waterBody.stroke, this.plotWidth);
		}

		// fill properties
		logger.log('render plots');
		const plotBoundaries = await this.database.plotBoundary
			.where(plot => plot.property.deactivated == null)
			.where(plot => plot.property.activePlotBoundaryId == plot.id)
			.toArray();

		for (let plot of plotBoundaries) {
			const boundary = Point.unpack(plot.shape);

			const filled = use(this.fillShape(boundary, topLeft, context, theme.plot.fill, theme.plot.stroke, this.plotWidth));
			this.labelFilledShape(filled, topLeft, labelContext, theme.plot.label, plot.propertyId.split('-')[0]);
		}

		// fill buildings
		logger.log('render buildings');
		const buildings = await this.database.building
			.where(building => building.archived == null)
			.where(building => building.property.deactivated == null)
			.toArray();

		for (let building of buildings) {
			use(this.fillShape(Point.unpack(building.boundary), topLeft, context, theme.building.fill, theme.building.stroke, this.buildingWidth));
		}

		// draw not used
		this.fill(unusedPixels, topLeft, context, theme.unused.fill, theme.unused.stroke, this.administrativeWidth);

		// draw rail lines
		logger.log('render train routes');
		const trainRoutes = await this.database.trainRoute
			.where(route => route.closed == null)
			.include(route => route.activePath)
			.toArray();

		// outline rail lines
		for (let route of trainRoutes) {
			const path = await route.activePath.fetch();

			if (path) {
				const filledPixels = new Map<string, Point>();
				const whitePixels = new Map<string, Point>();

				let index = 0;

				for (let point of calculateDanwinstonShapePath(Point.unpack(path.path), false)) {
					const set = index++ % 6 < 3 ? filledPixels : whitePixels;

					set.set(Point.pack([point]), point);
				}

				this.fill(filledPixels, topLeft, context, theme.train.fillEven, null, 0);
				this.fill(whitePixels, topLeft, context, theme.train.fillOdd, theme.train.fillEven, this.railWidth);
			}
		}

		// outline boroughs
		logger.log('render borough outlines');
		const boroughs = await this.database.borough
			.include(borough => borough.activeBoundary)
			.toArray();

		for (let borough of boroughs) {
			const activeBoundary = await borough.activeBoundary.fetch();
			const boundary = Point.unpack(activeBoundary.shape);
			const pixels = this.fillShape(boundary, topLeft, context, null, theme.borough.stroke, this.administrativeWidth);

			// remove used pixels
			for (let [packed, pixel] of pixels) {
				unallocatedPixels.delete(packed);
			}

			this.labelOutline(boundary, topLeft, labelContext, theme.borough.label, theme.borough.stroke, borough.name);
		}

		// not in borough
		this.fill(unallocatedPixels, topLeft, context, theme.unallocated.fill, theme.unallocated.stroke, 0);

		context.drawCanvas(labelCanvas, 0, 0);

		logger.finish();
		return await canvas.toBuffer('png');
	}

	labelOutline(boundary: Point[], topLeft: Point, context: CanvasRenderingContext2D, color: string, outline: string, text: string) {
		// find first long edge
		for (let pointIndex = 0; pointIndex < boundary.length - 1; pointIndex++) {
			const start = boundary[pointIndex];
			const end = boundary[pointIndex + 1];

			if (start.y == end.y && Math.abs(start.x - end.x) > 5) {
				const x = (Math.min(start.x, end.x) - topLeft.x) * this.scale + this.scale * 2;
				const y = (start.y - topLeft.y) * this.scale;

				const size = context.measureText(text);
				const height = size.actualBoundingBoxDescent + size.actualBoundingBoxAscent;

				context.fillStyle = outline;
				context.fillRect(x, y, size.width, height);

				context.textAlign = 'left';
				context.textBaseline = 'top';
				context.fillStyle = color;

				context.fillText(text, x, y);

				return;
			}
		}
	}

	label(center: Point, topLeft: Point, context: CanvasRenderingContext2D, color: string, text: string) {
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = color;

		context.fillText(
			text,
			Math.floor((center.x - topLeft.x) * this.scale),
			Math.floor((center.y - topLeft.y) * this.scale)
		);
	}

	labelFilledShape(filled: Map<string, Point>, topLeft: Point, context: CanvasRenderingContext2D, color: string, text: string) {
		if (!filled.size) {
			return;
		}

		let center = Point.center([...filled.values()]);

		if (!filled.has(Point.pack([center.floor()]))) {
			center = filled.get([...filled.keys()][Math.floor(filled.size / 2)]);
		}

		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = color;

		context.fillText(
			text,
			(center.x - topLeft.x) * this.scale,
			(center.y - topLeft.y) * this.scale
		);
	}

	fillShape(shape: Point[], topLeft: Point, context: CanvasRenderingContext2D, fill: string, stroke: string, strokeWidth: number) {
		if (!Point.touches(topLeft, mapBaseTileSize, shape)) {
			return new Map<string, Point>();
		}

		const filled = Point.fill(shape);
		this.fill(filled, topLeft, context, fill, stroke, strokeWidth);

		return filled;
	}

	fill(filled: Map<string, Point>, topLeft: Point, context: CanvasRenderingContext2D, fill: string, stroke: string, strokeWidth: number) {
		if (!Point.touches(topLeft, mapBaseTileSize, [...filled.values()])) {
			return;
		}

		for (let [packed, pixel] of filled) {
			const x = (pixel.x - topLeft.x) * this.scale;
			const y = (pixel.y - topLeft.y) * this.scale;

			if (fill) {
				context.fillStyle = fill;
				context.fillRect(
					x, y,
					this.scale, this.scale
				);
			}

			if (stroke) {
				for (let edge of [
					// sides
					{ offset: new Point(-1, 0), x: 0, y: 0, width: strokeWidth, height: this.scale },
					{ offset: new Point(1, 0), x: this.scale - strokeWidth, y: 0, width: strokeWidth, height: this.scale },
					{ offset: new Point(0, -1), x: 0, y: 0, width: this.scale, height: strokeWidth },
					{ offset: new Point(0, 1), x: 0, y: this.scale - strokeWidth, width: this.scale, height: strokeWidth },

					// edges
					{ offset: new Point(-1, -1), x: 0, y: 0, width: strokeWidth, height: strokeWidth },
					{ offset: new Point(1, 1), x: this.scale - strokeWidth, y: this.scale - strokeWidth, width: strokeWidth, height: strokeWidth },
					{ offset: new Point(1, -1), x: this.scale - strokeWidth, y: 0, width: strokeWidth, height: strokeWidth },
					{ offset: new Point(-1, 1), x: 0, y: this.scale - strokeWidth, width: strokeWidth, height: strokeWidth }
				]) {
					if (!filled.has(Point.pack([edge.offset.add(pixel)]))) {
						context.fillStyle = stroke;
						context.fillRect(
							x + edge.x, y + edge.y,
							edge.width, edge.height
						);
					}
				}
			}
		}
	}
}
