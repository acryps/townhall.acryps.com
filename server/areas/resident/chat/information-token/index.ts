export class InformationToken {
	constructor(
		private purpose: string,
		private token: string,
		private resolve: (name: string) => Promise<string>
	) {
		this.token = this.token.toUpperCase();
	}

	toTokenPrefix() {
		return `<<NEED KNOW ${this.token} "`;
	}

	toTokenSuffix() {
		return `">>`;
	}

	toToken(name: string) {
		return `${this.toTokenPrefix()}${name}${this.toTokenSuffix()}`;
	}

	toPrompt() {
		return `when talking about ${this.purpose} you do now know, ask me about it using this format: ${this.toToken('name')}.`;
	}

	shouldRespond(message: string) {
		return message.includes(this.toTokenPrefix()) && message.includes(this.toTokenSuffix());
	}

	async respond(message: string) {
		const request = message.split(this.toTokenPrefix())[1].split(this.toTokenSuffix())[0];
		const response = await this.resolve(request);

		if (!response) {
			console.log(`RESPOND NOT FOUND: ${request}`);
			return `${this.purpose} ${request}: no information could be found about this ${this.purpose}`;
		}

		console.log(`RESPOND: ${request}`, response);
		return `${this.purpose} ${request}: ${response}`;
	}
}
