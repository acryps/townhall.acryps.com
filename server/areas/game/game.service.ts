import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { PlayerViewModel } from "../player.view";

export class GameService extends Service {
	constructor(
		private db: DbContext
	) {
		super();
	}

	getPlayers() {
		return PlayerViewModel.from(
			this.db.player.orderByAscending(player => player.username)
		);
	}
}