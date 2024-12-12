import { Canvas } from "skia-canvas";
import { DbContext } from "../managed/database";
import { ManagedServer } from "../managed/server";
import { Point } from "../../interface/point";
import { writeFileSync } from "fs";

export class PropertyRegisterTileServer {
	constructor(
		private app: ManagedServer,
		private database: DbContext
	) {
		const size = 500;

		app.app.get('/tile/property/:x/:y', async (request, response) => {
			const regionX = +request.params.x;
			const regionY = +request.params.y;

			const offset = new Point(regionX * size, regionY * size);

			// TODO only load relevant properties
			const properties = await database.property.toArray();
			const types = await database.propertyType.toArray();

			const canvas = new Canvas(size, size);
			const context = canvas.getContext('2d');

			for (let property of properties) {
				const type = types.find(type => type.id == property.typeId);

				const path = Point.unpack(property.bounds);
				context.beginPath();

				for (let index = 0; index < path.length; index++) {
					const point = path[index].subtract(offset).add(new Point(0.5, 0.5));

					if (index) {
						context.lineTo(point.x, point.y);
					} else {
						context.moveTo(point.x, point.y);
					}
				}

				context.closePath();

				context.fillStyle = type?.color ?? 'transparent';
				context.fill();
				context.stroke();
			}

			response.contentType('image/png');
			canvas.toBuffer('png').then(buffer => response.end(buffer));
		});

		app.app.get('/pick/property/:x/:y', async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const canvas = new Canvas(size, size);
			const context = canvas.getContext('2d');

			const properties = await database.property.toArray();

			for (let property of properties) {
				const path = Point.unpack(property.bounds);
				const bounds = Point.bounds(path);

				canvas.width = bounds.width;
				canvas.height = bounds.height;

				context.beginPath();

				for (let index = 0; index < path.length; index++) {
					const point = path[index].add(new Point(0.5, 0.5));

					if (index) {
						context.lineTo(point.x - bounds.x.min, point.y - bounds.y.min);
					} else {
						context.moveTo(point.x - bounds.x.min, point.y - bounds.y.min);
					}
				}

				context.fill();

				const intensity = context.getImageData(x - bounds.x.min, y - bounds.y.min, 1, 1).data[3];

				if (intensity == 0xff) {
					return response.json(property.id);
				}
			}

			response.json(null);
		});
	}
}
