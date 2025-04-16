import { Canvas, ImageData } from "skia-canvas";
import { ManagedServer } from "../managed/server";
import { Point } from "../../interface/point";
import { DbContext } from "../managed/database";
import { Shape } from "../../interface/shape";

export class PlotterInterface {
	static superScale = 4;

	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		app.app.get('/plot/:x/:y/:size', async (request, response) => {
			const offset = new Point(+request.params.x, +request.params.y);
			const size = Math.max(50, Math.min(500, +request.params.size));

			const canvas = new Canvas(size * PlotterInterface.superScale, size * PlotterInterface.superScale);
			const context = canvas.getContext('2d');
			context.scale(PlotterInterface.superScale, PlotterInterface.superScale);

			const properties = await database.property
				.where(property => property.deactivated == null)
				.include(property => property.activePlotBoundary)
				.include(property => property.buildings)
				.toArray();

			for (let property of properties) {
				const boundary = await property.activePlotBoundary.fetch();

				Shape.render({
					bounds: boundary.shape,
					fill: '#fff',
					stroke: '#000',
				}, offset, context as any);
			}

			const plotLayer = context.getImageData(0, 0, canvas.width, canvas.height);
			context.clearRect(0, 0, canvas.width, canvas.height);

			for (let property of properties) {
				for (let building of await property.buildings.toArray()) {
					if (!building.archived) {
						Shape.render({
							bounds: building.boundary,
							fill: '#eee',
							stroke: '#666',
						}, offset, context as any);
					}
				}
			}

			const buildingLayer = context.getImageData(0, 0, canvas.width, canvas.height);

			context.putImageData(this.combine(
				plotLayer,
				buildingLayer
			), 0, 0);

			response.contentType('image/png');
			response.send(await canvas.toBuffer('png'));
		});
	}

	private combine(...sources: ImageData[]) {
		const width = sources[0].width;
		const height = sources[0].height;

		const output = new ImageData(width, height);
		const layerCount = sources.length;
		let pixelIndex = 0;

		for (let y = 0; y < height; y++) {
			let firstLayer = y % layerCount;

			for (let x = 0; x < width; x++) {
				for (let layer = 0; layer < layerCount; layer++) {
					const source = sources[(firstLayer + layer) % layerCount].data;

					if (output.data[pixelIndex + 3] != 0xff) {
						output.data[pixelIndex + 0] += source[pixelIndex + 0];
						output.data[pixelIndex + 1] += source[pixelIndex + 1];
						output.data[pixelIndex + 2] += source[pixelIndex + 2];

						output.data[pixelIndex + 3] += source[pixelIndex + 3];
					}
				}

				firstLayer++;
				pixelIndex += 4;
			}
		}

		return output;
	}
}
