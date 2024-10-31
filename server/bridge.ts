import { DbContext, Player } from "./managed/database";
import { ManagedServer } from "./managed/server";

export class GameBridge {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		app.app.get('/in/join/:uuid/:displayName', async (request, response) => {
			let player = await database.player.first(player => player.gameUuid.valueOf() == request.params.uuid);
			
			if (!player) {
				player = new Player();
				player.username = request.params.displayName;
				player.gameUuid = request.params.uuid;
				
				await player.create();
			}
			
			player.online = true;
			await player.update();
			
			response.end();
		});
		
		app.app.get('/in/move/:uuid/:x/:y', async (request, response) => {
			const player = await database.player.first(player => player.gameUuid.valueOf() == request.params.uuid);
			
			if (!player) {
				response.sendStatus(404).end();
				
				return;
			}
			
			player.x = +request.params.x;
			player.y = +request.params.y;
			
			await player.update();
			
			response.end();
		});
		
		app.app.get('/in/leave/:uuid', async (request, response) => {
			let player = await database.player.first(player => player.gameUuid.valueOf() == request.params.uuid);
			
			if (!player) {
				response.sendStatus(404).end();
				
				return;
			}
			
			player.online = false;
			await player.update();
		});
	}
}
