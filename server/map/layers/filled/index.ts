import { Canvas } from "skia-canvas";
import { PackedPoint, Point } from "../../../../interface/point";
import { ManagedServer } from "../../../managed/server";

type Color = {
	fill: [number, number, number, number],
	stroke: [number, number, number, number]
};

export class FilledTileServer<ItemType extends { id: string }> {
	constructor(
		app: ManagedServer,
		route: string,

		fetchFilled: () => Map<PackedPoint, ItemType>,
		fetchBoundaries: () => PackedPoint[],

		colorize: (item: ItemType) => Color | Promise<Color>,
		boundaryColor: [number, number, number, number]
	) {
		const size = 500;

		const canvas = new Canvas(size, size);
		const context = canvas.getContext('2d');

		const registerRoute = (route: string, showBounds: boolean) => app.app.get(route, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			const imageData = context.createImageData(size, size);
			const source = fetchFilled();
			const boundaries = [];

			if (showBounds) {
				for (let packedPoint of fetchBoundaries()) {
					const point = Point.unpackSingle(packedPoint);

					if (point.x >= offset.x && point.x <= offset.x + size && point.y >= offset.y && point.y <= offset.y + size) {
						boundaries.push(packedPoint);
					}
				}
			}

			const colors = new Map<ItemType, Color>();

			const cursor = offset.copy();
			let index = 0;

			for (; cursor.y < offset.y + size; cursor.y++) {
				for (cursor.x = offset.x; cursor.x < offset.x + size; cursor.x++) {
					const pack = cursor.pack();
					const item = source.get(pack);

					if (item) {
						let color = colors.get(item);

						if (!color) {
							color = await colorize(item);
							colors.set(item, color);
						}

						if (
							source.get(cursor.copy(-1, 0).pack()) == item &&
							source.get(cursor.copy(1, 0).pack()) == item &&
							source.get(cursor.copy(0, -1).pack()) == item &&
							source.get(cursor.copy(0, 1).pack()) == item
						) {
							imageData.data.set(color.fill, index);
						} else {
							imageData.data.set(color.stroke, index);
						}
					} else if (boundaries.includes(pack)) {
						imageData.data.set(boundaryColor, index);
					}

					index += 4;
				}
			}

			context.putImageData(imageData, 0, 0);

			response.contentType('image/png');
			response.end(await canvas.toBuffer('png'));
		});

		registerRoute(`/tile/${route}/:x/:y`, false);
		registerRoute(`/tile/${route}/:x/:y/boundary`, true);

		app.app.get(`/pick/${route}/:x/:y`, async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const data = fetchFilled();
			const cursor = new Point(x, y);
			const item = data.get(cursor.pack());

			if (item) {
				return response.json(item.id);
			}

			response.json(null);
		});
	}
}
