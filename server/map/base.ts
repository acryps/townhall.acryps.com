import { Canvas, Image, loadImage, Path2D } from "skia-canvas";
import { DbContext, MapType, MilitaryFacility } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { MapImporter } from "./import";
import { getTiles, mapBaseTileSize } from "../../interface/tile";
import { calculateDanwinstonShapePath } from "../../interface/line";
import { Point } from "../../interface/point";
import { writeFileSync } from "fs";
import { get } from "http";

export class BaseTileServer {
	militaryFacilityCache = {
		[MapType.overworld]: new Map<string, { image: Image, plot: Point[], top: number, left: number }>(),
		[MapType.night]: new Map<string, { image: Image, plot: Point[], top: number, left: number }>(),
	}

	constructor(
		private app: ManagedServer,
		private database: DbContext
	) {
		app.app.get('/tile/base/:type/:x/:y', async (request, response) => {
			const type = request.params.type == 'day' ? MapType.overworld : MapType.night;

			const x = +request.params.x;
			const y = +request.params.y;

			const image = await this.getTile(x, y, type);

			if (!image) {
				return response.status(404).end();
			}

			const canvas = new Canvas(mapBaseTileSize, mapBaseTileSize);
			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);

			// blur military facilities
			const militaryFacilities = await database.militaryFacility
				.include(facility => facility.property)
				.toArray();

			for (let facility of militaryFacilities) {
				let blurred = this.militaryFacilityCache[type].get(facility.id);

				if (!blurred) {
					const property = await facility.property.fetch();
					const boundary = await property.activePlotBoundary.fetch();
					const plot = Point.unpack(boundary.shape);

					blurred = await this.renderBlurredMilitaryFacility(facility, plot, type);
					this.militaryFacilityCache[type].set(facility.id, blurred);

					// refresh every day
					setTimeout(() => this.militaryFacilityCache[type].delete(facility.id), 1000 * 60 * 60 * 24);
				}

				// create shape
				for (let offset of [new Point(0, 0), new Point(0, 1), new Point(1, 0), new Point(1, 1)]) {
					let path: Path2D;

					for (let point of calculateDanwinstonShapePath(blurred.plot, true)) {
						point = point.copy(-x * mapBaseTileSize + offset.x, -y * mapBaseTileSize + offset.y);

						if (path) {
							path.lineTo(point.x, point.y);
						} else {
							path = new Path2D();
							path.moveTo(point.x, point.y);
						}
					}

					context.save();

					context.clip(path);
					context.drawImage(
						blurred.image,
						blurred.left - x * mapBaseTileSize,
						blurred.top - y * mapBaseTileSize
					);

					context.restore();
				}
			}

			response.contentType('image/png');
			response.end(await canvas.toBuffer('png'));
		});

		app.app.get('/map/area/:minX/:minY/:maxX/:maxY', async (request, response) => {
			const minX = +request.params.minX;
			const minY = +request.params.minY;
			const maxX = +request.params.maxX;
			const maxY = +request.params.maxY;

			const width = maxX - minX;
			const height = maxY - minY;

			if (width <= 0 || width > 1000 || height <= 0 || height > 1000) {
				response.status(500);
				response.send(`area too big / too small / inverted (max dimension 1000)`);
			}

			const canvas = new Canvas(width, height);
			const context = canvas.getContext('2d');

			const offset = {
				x: minX % MapImporter.tile,
				y: minY % MapImporter.tile,
			}

			for (let x = Math.floor(minX / MapImporter.tile); x < Math.ceil(maxX / MapImporter.tile); x++) {
				for (let y = Math.floor(minY / MapImporter.tile); x < Math.ceil(maxY / MapImporter.tile); y++) {
					const tile = await database.mapTile
						.where(tile => tile.regionX == x)
						.where(tile => tile.regionY == y)
						.where(tile => tile.type == MapType.overworld)
						.where(tile => tile.complete == true)
						.orderByDescending(tile => tile.captured)
						.first();

					if (tile) {
						const image = await loadImage(tile.image);

						context.drawImage(
							image,
							x * MapImporter.tile - offset.x,
							y * MapImporter.tile - offset.y
						);
					}
				}
			}

			response.contentType('image/png');
			response.end(await canvas.toBuffer('png'));
		});
	}

	async getTile(regionX: number, regionY: number, type: MapType) {
		const newest = await this.database.mapTile
			.where(tile => tile.regionX == regionX)
			.where(tile => tile.regionY == regionY)
			.where(tile => tile.type == type)
			.where(tile => tile.complete == true)
			.orderByDescending(tile => tile.captured)
			.first();

		if (newest) {
			return await loadImage(newest.image);
		}
	}

	async renderBlurredMilitaryFacility(facility: MilitaryFacility, plot: Point[], type: MapType) {
		const blur = 10;

		const bounds = Point.bounds(plot, blur);

		const canvas = new Canvas(bounds.width, bounds.height);
		const context = canvas.getContext('2d');

		for (let tile of getTiles(Point.center(plot), bounds.width, bounds.height, mapBaseTileSize)) {
			const image = await this.getTile(tile.x, tile.y, type)

			context.drawImage(
				image,
				tile.x * mapBaseTileSize - bounds.x.min,
				tile.y * mapBaseTileSize - bounds.y.min
			);
		}

		context.filter = `blur(${blur}px)`;
		context.drawCanvas(canvas, 0, 0);

		return {
			image: await loadImage(await canvas.toBuffer('png')),
			plot,
			top: bounds.y.min,
			left: bounds.x.min
		};
	}
}
