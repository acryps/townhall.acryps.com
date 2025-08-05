import { Canvas, CanvasRenderingContext2D, loadImage } from "skia-canvas";
import { BoundingBox, Point } from "../../../interface/point";
import { DbContext, MapType } from "../../managed/database";
import { getTiles, mapBaseTileSize } from "../../../interface/tile";
import { readFileSync, writeFileSync } from "fs";
import { calculateDanwinstonShapePath, drawDanwinstonLine } from "../../../interface/line";
import { ManagedServer } from "../../managed/server";
import { getMinimapBounds, minimapScale } from "../../../interface/minimap";
import { BoroughSummaryModel } from "../../areas/borough.summary";

export class MinimapGenerator {
	cached: Buffer;

	constructor(
		private database: DbContext,
		server: ManagedServer
	) {
		// generate empty image
		const canvas = new Canvas(1, 1);
		canvas.getContext('2d');

		this.cached = canvas.toBufferSync('png');

		server.app.get('/minimap', (request, response) => {
			response.contentType('image/png');
			response.end(this.cached);
		});
	}

	schedule() {
		const next = async () => {
			console.log('rendering minimap...');
			this.cached = await this.generate();

			console.log('rendered minimap');
			setTimeout(() => next(), 1000 * 60 * 60);
		};

		next();
	}

	async generate() {
		const boroughs = await Promise.all((await BoroughSummaryModel.from(this.database.borough) as any).map(borough => borough.resolveToJSON()));

		const bounds = getMinimapBounds(boroughs);

		const width = Math.floor(bounds.width * minimapScale);
		const height = Math.floor(bounds.height * minimapScale);

		const canvas = new Canvas(width, height);
		const context = canvas.getContext('2d');

		// render tiles onto map
		await this.renderBaseMap(context, bounds);
		const baseMap = await loadImage(await canvas.toBuffer('png'));

		// abstract minimap to water
		const imageData = context.getImageData(0, 0, width, height);

		for (let offset = 0; offset < imageData.data.length; offset += 4) {
			imageData.data.set(this.abstractColor(imageData.data[offset], imageData.data[offset + 1], imageData.data[offset + 2], offset / 4), offset);
		}

		context.putImageData(imageData, 0, 0);

		// add a little bit of the base map back
		context.save();
		context.globalAlpha = 0.1;
		context.globalCompositeOperation = 'luminosity';
		context.drawImage(baseMap, 0, 0);
		context.restore();

		const translate = (point: Point, offset = 0) => [
			Math.floor((point.x - bounds.x.min - offset) * minimapScale),
			Math.floor((point.y - bounds.y.min - offset) * minimapScale),
		] as [number, number];

		// draw mayor roads
		const streets = await this.database.street
			.where(street => street.deactivated == null)
			.include(street => street.activeRoute)
			.toArray();

		context.fillStyle = '#444';

		for (let street of streets) {
			const path = await street.activeRoute.fetch();
			const size = Math.ceil(street.size * minimapScale);

			if (path) {
				for (let point of calculateDanwinstonShapePath(Point.unpack(path.path), false)) {
					context.fillRect(...translate(point, size / 2 + 1 / minimapScale), size + 2, size + 2);
				}
			}
		}

		context.fillStyle = '#eee';

		for (let street of streets) {
			const path = await street.activeRoute.fetch();
			const size = Math.ceil(street.size * minimapScale);

			if (path) {
				for (let point of calculateDanwinstonShapePath(Point.unpack(path.path), false)) {
					context.fillRect(...translate(point, size / 2), size, size);
				}
			}
		}

		// fill buildings
		const buildings = await this.database.building
			.where(building => building.archived == null)
			.where(building => building.property.deactivated == null)
			.toArray();

		context.beginPath();

		for (let building of buildings) {
			const outline = calculateDanwinstonShapePath(Point.unpack(building.boundary), true);

			for (let index = 0; index < outline.length; index++) {
				context[index ? 'lineTo' : 'moveTo'](...translate(outline[index], 0.5 / minimapScale));
			}

			context.closePath();
		}

		context.fillStyle = '#000';
		context.fill();

		// draw rail lines
		const trainRoutes = await this.database.trainRoute
			.where(route => route.closed == null)
			.include(route => route.activePath)
			.toArray();

		context.fillStyle = '#fff';

		// outline rail lines
		for (let route of trainRoutes) {
			const path = await route.activePath.fetch();

			if (path) {
				for (let point of calculateDanwinstonShapePath(Point.unpack(path.path), false)) {
					context.fillRect(...translate(point, 1 / minimapScale), 3, 3);
				}
			}
		}

		// draw colored lines
		context.fillStyle = '#f00';

		for (let route of trainRoutes) {
			const path = await route.activePath.fetch();

			if (path) {
				for (let point of calculateDanwinstonShapePath(Point.unpack(path.path), false)) {
					context.fillRect(...translate(point), 1, 1);
				}
			}
		}

		return await canvas.toBuffer('png');
	}

	async renderBaseMap(context: CanvasRenderingContext2D, bounds: BoundingBox) {
		const center = new Point(
			bounds.x.min + bounds.width / 2,
			bounds.y.min + bounds.height / 2
		);

		const regions = getTiles(center, bounds.width, bounds.height, mapBaseTileSize);

		for (let region of regions) {
			console.log(region)

			const capture = await this.database.mapTile
				.where(tile => tile.complete == true)
				.where(tile => tile.type == MapType.overworld)
				.where(tile => tile.regionX == region.x)
				.where(tile => tile.regionY == region.y)
				.orderByDescending(tile => tile.captured)
				.first();

			if (capture) {
				const tile = await loadImage(capture.image);

				context.drawImage(
					tile,

					Math.floor((region.x * mapBaseTileSize - bounds.x.min) * minimapScale),
					Math.floor((region.y * mapBaseTileSize - bounds.y.min) * minimapScale),

					Math.ceil(mapBaseTileSize * minimapScale),
					Math.ceil(mapBaseTileSize * minimapScale)
				);
			}
		}
	}

	abstractColor(red: number, green: number, blue: number, index: number) {
		if (blue > 150 && red < 100 && green < 100) {
			if (index % 3 == 1) {
				return [0x91, 0xa9, 0xea];
			}

			return [0x66, 0x84, 0xd6];
		}

		const hue = this.hue(red, green, blue);

		if (hue > 85 && hue < 180) {
			if (index % 3 == 1) {
				return [0x78, 0xe2, 0xca];
			}

			return [0x78, 0xe2, 0xa8];
		}

		return [0xff, 0xff, 0xff];
	}

	hue(red: number, green: number, blue: number) {
		red /= 255;
		green /= 255;
		blue /= 255;

		const max = Math.max(red, green, blue), min = Math.min(red, green, blue);
		let hue: number;

		if (max === min) {
			hue = 0; // achromatic
		} else {
			const d = max - min;

			switch (max) {
				case red:
					hue = ((green - blue) / d + (green < blue ? 6 : 0));
					break;
				case green:
					hue = ((blue - red) / d + 2);
					break;
				case blue:
					hue = ((red - green) / d + 4);
					break;
			}

			hue *= 60;
		}

		return hue;
	}
}
