import { DbContext } from "./managed/database";
import { ManagedServer } from "./managed/server";

export class TileInterface {
	constructor(
		private app: ManagedServer,
		private database: DbContext
	) {
		app.app.get('/map/tile/night/:x/:y', async (request, response) => {
			const x = +request.params.x;
			const y = +request.params.y;

			const newest = await database.mapTile
				.where(tile => tile.regionX == x)
				.where(tile => tile.regionY == y)
				.where(tile => tile.type == 'overworld')
				.where(tile => tile.complete == true)
				.orderByDescending(tile => tile.captured)
				.first();

			if (newest) {
				response.setHeader('content-type', 'image/png');
				response.end(newest.image);
			}
		});
	}
}
