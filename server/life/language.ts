import ollama from "ollama"
import { Borough, Resident, ResidentFigure, ResidentRelationship } from "../managed/database";
import { toSimulatedTime } from "../../interface/time";
import { NameType } from "./name";
import { Gender } from "./gender";

export class Language {
	readonly environment = () => `
		environment:
		Pilegron, a fictional city.
		Somewhere Europe, in a place like England, but it is not England.
		This is fictional, there is not Europe or England, it's just similar.
		It is currently ${toSimulatedTime(new Date()).toDateString()}.
		Well known world events, like the World Wars, did not happen here.
	`;

	readonly metaRules = () => `
		Do not tell me what you are doing, just respond in a JSON format.
		Do not encapsulate the object, just respond as a JSON string or array of strings.
		Do not mention that this is all fictional, pretend that the story is real.
		When mentioning dates, always use YYYY-MM-DD format.
	`;

	readonly createNames = (size: number, type: NameType, gender: Gender, used: string[], characterSeed: string[]) => `
		Create a list of ${size} ${gender.name} ${type} names.
		Avoid compound names.
		Do not create full names, only ${type} names!
		The names will be used to create fictional characters.
		Use the characters ${characterSeed.join(' ')} more often than usually, but do not over do it.
		Avoid any of the following names: ${used.map(name => JSON.stringify(name)).join(' ')}

		${this.environment()}
		${this.metaRules()}
	`;

	readonly createSpawnedBiography = (givenName: string, familyName: string, birthday: Date, gender: Gender, home: Borough, standing: number) => `
		Invent a person who lives here.

		${this.createBiography(givenName, familyName, birthday, gender, home, standing)}
	`;

	readonly createChildBiography = (parents: Resident[], givenName: string, familyName: string, birthday: Date, gender: Gender, home: Borough, standing: number) => `
		Invent a child from ${parents.map(parent => `${parent.givenName} ${parent.familyName}`).join(' and ')}.
		The biographies of the parents will follow.

		${this.createBiography(givenName, familyName, birthday, gender, home, standing)}
	`;

	private readonly createBiography = (givenName: string, familyName: string, birthday: Date, gender: Gender, home: Borough, standing: number) => `
		Invent a person who lives here.
		Their given name is ${givenName}, family name ${familyName}.
		${gender.pronoun} lives in ${home.name}, described later.
		${gender.pronoun} is ${toSimulatedTime(new Date()).getFullYear() - toSimulatedTime(birthday).getFullYear()} years old.
		If the person is still a little kid, keep the story short.

		${gender.pronoun} has a social standing of ${standing}.
		A social standing of 1 would place them in the very top social spot of their area, while a standing of 0 would place them at the very bottom.
		This standing is not just economical, but a combination of multiple factors.
		For example, a well known and loved homeless person might have a higher standing than a secluded banker.

		Write a biography as a story.
		Imagine a creative given and family name, probable occupation, core beliefs and principles.
		Do not mention facts like age or social standing.

		${this.environment()}
		${this.metaRules()}
	`;

	readonly createBond = (initiator: Resident, peer: Resident) => `
		${initiator.givenName} and ${peer.givenName} just meet.
		Given thier biographies and friends, write an imaginary a story why they bonded.
		They might have meet outside randomly, meet in a pub, at work, thru friends or any other way!
		They may become friends, partners or might even start a business together - any type of relationship may emerge from this connection.

		${this.environment()}
		${this.metaRules()}
	`;

	readonly assignFigure = (resident: Resident, figures: ResidentFigure[]) => `
		What outfit would best fit ${resident.givenName} ${resident.familyName}, given the selection below?
		Just return the number of the outfit.
		If none of them fit even remotely, return null.

		${figures.map((figure, index) => `${index + 1}: ${figure.outfit.trim()}`).join('\n')}

		${this.metaRules()}
	`;

	readonly classifyBond = (initiator: Resident, peer: Resident) => `
		Given the following story, what type of bond do ${initiator.givenName} and ${peer.givenName} have?
		Is this a relationship, a friendship, a business relation, an affair, ... or what?
		Reply in a single word
	`;

	readonly breakBond = (initiator: Resident, peer: Resident, relationship: ResidentRelationship) => `
		${initiator.givenName} and ${peer.givenName} were socially connected as ${relationship.purpose}.
		Given thier biographies and other relations, write an imaginary a story why their bond broke.

		${this.environment()}
		${this.metaRules()}
	`;

	async respondText(instruction: string, ...data: string[]): Promise<string> {
		const response = await this.respondJSON(instruction, ...data);

		if (typeof response == 'string') {
			return response;
		}

		// sometimes it is just an array with one item in it
		if (Array.isArray(response) && response.length && typeof response[0] == 'string') {
			return response.map(item => `${item}`.trim()).join('\n\n');
		}

		console.warn(`[language] invalid string: ${JSON.stringify(response)}`);
		return await this.respondText(instruction, ...data);
	}

	async respondTextArray(instruction: string, ...data: string[]): Promise<string[]> {
		const response = await this.respondJSON(instruction, ...data);

		if (Array.isArray(response) && typeof response[0] == 'string') {
			return response.map(item => `${item}`);
		}

		console.warn(`[language] invalid string array: ${JSON.stringify(response)}`);
		return await this.respondTextArray(instruction, ...data);
	}

	private async respondJSON(instruction: string, ...data: string[]) {
		let response = await this.respondRaw(instruction, ...data);
		response = response.trim();

		// remove markdown wrapping
		if (response.startsWith('json')) {
			response = response.replace('json', '');
		}

		if (response.startsWith('```')) {
			response = response.replace('```', '');
		}

		if (response.endsWith('```')) {
			response = response.split('').reverse().join('').replace('```', '').split('').reverse().join('');
		}

		if (response.startsWith('json')) {
			response = response.replace('json', '');
		}

		// llms struggle with putting '\n' in multiline strings
		// replaces new lines with \n as a string, making it valid JSON
		let inString = false;
		const source = response;
		response = '';

		for (let characterIndex = 0; characterIndex < source.length; characterIndex++) {
			const character = source[characterIndex];

			if (inString) {
				if (character == '\n') {
					response += "\\n";
				} else {
					if (character == '"') {
						inString = false;
					}

					response += character;
				}
			} else {
				if (character == '"') {
					inString = true;
				}

				response += character;
			}
		}

		try {
			return JSON.parse(response);
		} catch {
			console.warn(`[language] invalid json: ${response}`);

			return await this.respondJSON(instruction, ...data);
		}
	}

	private async respondRaw(instruction: string, ...data: string[]) {
		const messages = [
			{ role: 'user', content: instruction },
			...data.map(data => ({ role: 'user', content: data }))
		];

		const response = await ollama.chat({
			model: 'gemma2:27b',
			messages: messages
		});

		return response.message.content?.trim();
	}

	private async confirm(positive: string, negative: string, ...data: string[]) {
		const response = await this.respond(`is the following text acceptable as a ${positive}, then respond with YES. if it is clearly a ${negative}, respond with NO`, ...data);

		console.log(data, response)

		return response.includes('YES');
	}

	async summarize(message: string) {
		const summary = await this.respond(`
			summarize the text in two to three sentences.
			do not tell me that you made a summary, or add any other meta text, just return the summary
		`, message);

		if (summary.trim().includes('\n')) {
			console.debug(summary)

			return await this.summarize(message);
		}

		return summary;
	}
}
