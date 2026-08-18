
import { Canvas, CanvasRenderingContext2D, FontLibrary, loadImage } from "skia-canvas";
import { BoundingBox, Point } from "../../../interface/point";
import { DbContext, MapType, Street } from "../../managed/database";
import { getTiles, mapBaseTileSize } from "../../../interface/tile";
import { calculateDanwinstonShapePath } from "../../../interface/line";
import { ManagedServer } from "../../managed/server";
import { BoroughSummaryModel } from "../../areas/borough.summary";
import { Logger } from "@acryps/log";
import { StreetFiller } from "../fill/street";
import { WaterBodyFiller } from "../fill/water";
import { join } from "path";

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
		server.app.get('/planning-map/:x/:y', async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			response.contentType('image/png');
			response.end(await this.generate(regionX, regionY));
		});
	}

	async generate(regionX: number, regionY: number) {
		const logger = this.logger.task('generator');

		const size = mapBaseTileSize * this.scale;
		const topLeft = new Point(regionX * mapBaseTileSize, regionY * mapBaseTileSize);

		logger.log('render map');
		const canvas = new Canvas(size, size);
		const context = canvas.getContext('2d');

		context.fillStyle = '#fff';
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

		// draw roads
		logger.log('render streets');
		const streetFiller = new StreetFiller(this.database);
		const filledStreets = await streetFiller.update();

		for (let street of new Set(filledStreets.filled.values())) {
			const boundary = new Map<string, Point>();

			for (let [point, source] of filledStreets.filled) {
				if (source == street) {
					boundary.set(point, Point.unpackSingle(point));
				}
			}

			use(boundary);
			this.fill(boundary, topLeft, context, '#eee', '#000', this.plotWidth);
		}

		// draw water
		logger.log('render water bodies');
		const waterFiller = new WaterBodyFiller(this.database);
		const filledWaterBodies = await waterFiller.update();

		for (let waterBody of new Set(filledWaterBodies.filled.values())) {
			const boundary = new Map<string, Point>();

			for (let [point, source] of filledWaterBodies.filled) {
				if (source == waterBody) {
					boundary.set(point, Point.unpackSingle(point));
				}
			}

			use(boundary);
			this.fill(boundary, topLeft, context, '#00f4', '#00f', this.plotWidth);
		}

		// fill properties
		logger.log('render plots');
		const plotBoundaries = await this.database.plotBoundary
			.where(plot => plot.property.deactivated == null)
			.where(plot => plot.property.activePlotBoundaryId == plot.id)
			.toArray();

		for (let plot of plotBoundaries) {
			const boundary = Point.unpack(plot.shape);

			const filled = use(this.fillShape(boundary, topLeft, context, '#fff', '#000', this.plotWidth));
			this.labelFilledShape(filled, topLeft, labelContext, '#000', plot.propertyId.split('-')[0]);
		}

		// fill buildings
		logger.log('render buildings');
		const buildings = await this.database.building
			.where(building => building.archived == null)
			.where(building => building.property.deactivated == null)
			.toArray();

		for (let building of buildings) {
			use(this.fillShape(Point.unpack(building.boundary), topLeft, context, '#ff0', '#000', this.buildingWidth));
		}

		// draw not used
		this.fill(unusedPixels, topLeft, context, '#afa', '#4f4', this.administrativeWidth);

		// draw rail lines
		logger.log('render train routes');
		const trainRoutes = await this.database.trainRoute
			.where(route => route.closed == null)
			.include(route => route.activePath)
			.toArray();

		context.fillStyle = '#f0f';

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

				this.fill(filledPixels, topLeft, context, '#222', null, 0);
				this.fill(whitePixels, topLeft, context, '#eee', '#222', this.railWidth);
			}
		}

		// outline boroughs
		logger.log('render borough outlines');
		const boroughs = await this.database.borough
			.toArray();

		for (let borough of boroughs) {
			const boundary = Point.unpack(borough.bounds);
			const pixels = this.fillShape(boundary, topLeft, context, null, '#f00', this.administrativeWidth);

			// remove used pixels
			for (let [packed, pixel] of pixels) {
				unallocatedPixels.delete(packed);
			}

			this.labelOutline(boundary, topLeft, labelContext, '#fff', '#f00', borough.name);
		}

		// not in borough
		this.fill(unallocatedPixels, topLeft, context, '#f004', null, 0);

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
