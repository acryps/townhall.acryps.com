import ollama from "ollama";
import { Manager } from "vlserver";
import { Chat, ChatInteraction, DbContext } from "../../../managed/database";
import { randomBytes } from "crypto";
import internal from "stream";
import { Life } from "../../../life";
import { boroughInformationToken } from "./information-token/borough";

export class ChatManager extends Manager {
	constructor(
		private database: DbContext,
		private life: Life
	) {
		super();
	}

	private async getChat(tag: string) {
		return await this.database.chat.first(chat => chat.tag.valueOf() == tag);
	}

	private getInformationTokens() {
		return [
			boroughInformationToken(this.database)
		]
	}

	private async getSystemMessages(chat: Chat) {
		const resident = await chat.resident.fetch();
		const messages = await chat.interactions.orderByAscending(interaction => interaction.sent).toArray();

		const tokens = this.getInformationTokens();

		const history = [
			{
				role: 'system',
				content: `
					we are in a fictional world.
					from now on, only respond in character, pretending to be the character described now.
					keep answers short.

					${tokens.map(token => token.toPrompt()).join('\n')}
					i will provide you with details.
					remember, in this fictional world, you might be asked about things that exist in the real world, but do not exist there, so when in doubt, ask about the thing!
				`
			},
			{
				role: 'system',
				content: await this.life.compileDescription(resident)
			}
		];

		for (let message of messages) {
			if (message.question) {
				history.push({
					role: 'user',
					content: message.question
				});
			}

			if (message.responded) {
				history.push({
					role: 'assistant',
					content: message.response
				});

				const informationRequest = tokens.find(token => token.shouldRespond(message.response));

				if (informationRequest) {
					history.push({
						role: 'system',
						content: await informationRequest.respond(message.response)
					});
				}
			}
		}

		return history;
	}

	async start(tag: string) {
		const resident = await this.database.resident.first(resident => resident.tag.valueOf() == tag);

		const chat = new Chat();
		chat.tag = randomBytes(8).toString('base64url');
		chat.started = new Date();
		chat.resident = resident;

		await chat.create();

		return chat.tag;
	}

	async respond(chat: Chat, interaction: ChatInteraction, depth = 0) {
		if (depth == 5) {
			return [];
		}

		let history = await this.getSystemMessages(chat);

		const response = await ollama.chat({
			model: 'gemma2:27b',
			messages: history
		});

		interaction.response = response.message.content?.trim();
		interaction.responded = new Date();

		await interaction.update();

		// get the history again, make sure that we didnt end on a information response
		history = await this.getSystemMessages(chat);

		if (history.at(-1).role != 'system') {
			return [interaction];
		}

		interaction.containsInformationRequest = true;
		await interaction.update();

		const followUp = new ChatInteraction();
		followUp.chat = chat;
		followUp.sent = new Date();

		await followUp.create();

		return [interaction, ...(await this.respond(chat, followUp, depth + 1))];
	}

	async send(tag: string, message: string) {
		const chat = await this.getChat(tag);

		const interaction = new ChatInteraction();
		interaction.chat = chat;

		interaction.question = message;
		interaction.sent = new Date();

		await interaction.create();

		return await this.respond(chat, interaction);
	}

	async read(tag: string) {
		return (await this.getChat(tag)).interactions;
	}
}
