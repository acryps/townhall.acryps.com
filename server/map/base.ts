import { DbContext, MapType } from "../managed/database";
import { ManagedServer } from "../managed/server";

export class BaseTileServer {
	constructor(
		private app: ManagedServer,
		private database: DbContext
	) {
		app.app.get('/tile/base/:type/:x/:y', async (request, response) => {
			const type = request.params.type == 'day' ? MapType.overworld : MapType.night;

			const x = +request.params.x;
			const y = +request.params.y;

			const newest = await database.mapTile
				.where(tile => tile.regionX == x)
				.where(tile => tile.regionY == y)
				.where(tile => tile.type == type)
				.where(tile => tile.complete == true)
				.orderByDescending(tile => tile.captured)
				.first();

			if (newest) {
				response.contentType('image/png');
				response.end(newest.image);
			}
		});
	}
}
