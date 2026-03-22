import OpenAI from "openai";
import { InterpreterProvider } from ".";
import { InterpreterMessage } from "..";
import { TokenSponsor, TokenUse } from "../../../managed/database";

export class OpenAiInterpreterProvider implements InterpreterProvider {
	client: OpenAI;

	constructor(
		private sponsor: TokenSponsor
	) {
		this.client = new OpenAI({
			apiKey: this.sponsor.key
		});
	}

	async request(messages: InterpreterMessage[]) {
		const response = await this.client.responses.create({
			model: this.sponsor.model,
			input: messages.map(message => `${message.role}:\n${message.message}`).join('\n\n')
		});

		const usage = new TokenUse();
		usage.billed = new Date();
		usage.sponsor = this.sponsor;

		usage.input = response.usage?.input_tokens ?? -1;
		usage.output = response.usage?.output_tokens ?? -1;

		await usage.create();

		console.log(response.output_text)

		return response.output_text;
	}
}
