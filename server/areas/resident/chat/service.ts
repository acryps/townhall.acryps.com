import { Service } from "vlserver";
import { ChatManager } from "./manager";
import { ChatInteractionViewModel } from "./interaction";

export class ChatService extends Service {
	constructor(
		private manager: ChatManager
	) {
		super();
	}

	async start(tag: string) {
		return await this.manager.start(tag);
	}

	async read(chatTag: string) {
		return ChatInteractionViewModel.from(await this.manager.read(chatTag));
	}

	async send(chatTag: string, message: string) {
		return ChatInteractionViewModel.from(await this.manager.send(chatTag, message));
	}
}
