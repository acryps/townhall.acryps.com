import { ViewModel } from "vlserver";
import { Player } from "../managed/database";

export class PlayerViewModel extends ViewModel<Player> {
    id;
    
    username;
}