import { Ollama } from "ollama";
import { InterpreterProvider } from ".";
import { InterpreterMessage } from "..";

const ollama = new Ollama({
	host: process.env.LANGUAGE_MODEL_HOST // default: http://127.0.0.1:11434
});

export class LocalOllamaInterpreterProvider implements InterpreterProvider {
	constructor(
		public model: string
	) {}

	async request(messages: InterpreterMessage[]) {
		const context = messages.map(message => message.toOllamaMessage());

		const response = await ollama.chat({
			model: this.model,
			messages: context
		});

		return response.message.content;
	}
}
