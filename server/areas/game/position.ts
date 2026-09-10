import { ViewModel } from "vlserver";
import { PlayerPositionView } from "../../managed/database";

export class PlayerPositionViewModel extends ViewModel<PlayerPositionView> {
	id;
	x;
	y;
	time;
	username;
}
