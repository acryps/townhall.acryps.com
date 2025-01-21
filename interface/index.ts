import { PlayerViewModel } from "./models";

export class Message {
	static types: (typeof Message)[];
	
	static encode(message: Message) {
		const index = this.types.findIndex(type => message instanceof type);
		
		if (index == -1) {
			throw new Error(`Message type '${Message}' not registered`);
		}
		
		return JSON.stringify([index, message]);
	}
	
	static decode(data: string) {
		const unpackedData = JSON.parse(data);
		const message = new this.types[unpackedData[0]]();
		Object.assign(message, unpackedData[1]);
		
		return message;
	}
}

export class JoinMessage extends Message {
	player: PlayerViewModel;
}

export class LeaveMessage extends Message {
	id: string;
}

export class MoveMessage extends Message {
	id: string;
	
	x: number;
	y: number;
}

Message.types = [
	JoinMessage
];
