import { JoinMessage, LeaveMessage, Message, MoveMessage } from "../interface";
import { PlayerViewModel } from "./areas/player.view";
import { DbContext, Movement, Player } from "./managed/database";
import { ManagedServer } from "./managed/server";

export class GameBridge {
	constructor(
		app: ManagedServer,
		database: DbContext,
		broadcast: (message: Message) => void
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
			
			const join = new JoinMessage();
			join.player = await new PlayerViewModel(player).resolveToJSON();
			
			broadcast(join);
			
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
			
			const move = new MoveMessage();
			move.id = player.id;
			move.x = player.x;
			move.y = player.y;
			
			broadcast(move);
			
			const movement = new Movement();
			movement.time = new Date();
			movement.x = player.x;
			movement.y = player.y;
			movement.player = player;
			
			movement.create();
			
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
			
			const leave = new LeaveMessage();
			leave.id = player.id;
			
			broadcast(leave);
			
			response.end();
		});
	}
}
