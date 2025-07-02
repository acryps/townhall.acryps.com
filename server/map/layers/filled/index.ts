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

		fetch: () => Map<PackedPoint, ItemType>,
		colorize: (item: ItemType) => Color | Promise<Color>
	) {
		const size = 500;

		const canvas = new Canvas(size, size);
		const context = canvas.getContext('2d');

		app.app.get(`/tile/${route}/:x/:y`, async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			const imageData = context.createImageData(size, size);
			const source = fetch();

			const colors = new Map<ItemType, Color>();

			const cursor = offset.copy();
			let index = 0;

			for (; cursor.y < offset.y + size; cursor.y++) {
				for (cursor.x = offset.x; cursor.x < offset.x + size; cursor.x++) {
					const item = source.get(cursor.pack());

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
					}

					index += 4;
				}
			}

			context.putImageData(imageData, 0, 0);

			response.contentType('image/png');
			response.end(await canvas.toBuffer('png'));
		});

		app.app.get(`/pick/${route}/:x/:y`, async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const data = fetch();
			const cursor = new Point(x, y);
			const item = data.get(cursor.pack());

			if (item) {
				return response.json(item.id);
			}

			response.json(null);
		});
	}
}
