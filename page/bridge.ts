import { Observable } from "@acryps/page-observable";
import { JoinMessage, Message } from "../interface";
import { PlayerViewModel } from "./managed/services";

export class GameBridge {
	private socket: WebSocket;
	
	players = new Observable<PlayerViewModel[]>([]);
	
	constructor() {
		this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/game`);
		
		this.socket.onmessage = event => {
			const message = Message.decode(event.data);
			console.debug(message)
			
			if (message instanceof JoinMessage) {
				this.players.currentValue.push(message.player);
				this.players.emit(this.players.currentValue);
			}
		}
	}
}
