import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { PlayerViewModel } from "../player.view";
import { PlayerPositionViewModel } from "./position";

export class GameService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	getPlayers() {
		return PlayerViewModel.from(
			this.database.player.orderByAscending(player => player.username)
		);
	}

	getOnlinePlayers() {
		return PlayerViewModel.from(this.database.player.where(player => player.online == true));
	}

	getPlayerPositions() {
		return PlayerPositionViewModel.from(
			this.database.views.playerPosition
				.orderByDescending(player => player.time)
		);
	}
}
