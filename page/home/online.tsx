import { Component } from "@acryps/page";
import { GameService, PlayerViewModel } from "../managed/services";
import { Application } from "..";

export class OnlinePlayerComponent extends Component {
	render() {
		return <ui-online>
			Players currently online

			{Application.bridge.players.map(list => list.length ? <ui-players>
				{list.map(player => <ui-player>
					{player.username}
				</ui-player>)}
			</ui-players> : <ui-empty>
				No players online
			</ui-empty>)}
		</ui-online>
	}
}
