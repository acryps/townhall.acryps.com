import { Bill, BillHonestium, Borough, Company, District, Resident, ResidentFigure, ResidentRelationship } from "../managed/database";
import { toSimulatedAge, toSimulatedTime } from "../../interface/time";
import { NameType } from "./name";
import { Gender } from "./gender";
import { Ollama } from "ollama";

export class Language {
	constructor(
		private mode: 'smart' | 'fast'
	) { }

	readonly environment = () => `
		environment:
		Pilegron, a fictional city.
		Somewhere Europe, in a place like England, but it is not England.
		This is fictional, there is not Europe or England, it's just similar.
		It is currently ${toSimulatedTime(new Date()).toDateString()}.
		Well known world events, like the World Wars, did not happen here.
	`;

	readonly metaRules = () => `
		Do not tell me what you are doing, just respond in values in a JSON format.
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

		Remember, we are currently in the year ${toSimulatedTime(new Date()).getUTCFullYear()}.
		The people might not be progressive, they might not be nice, or kind.
		We cannot have everybody be a nice, socially hyperaware, environment-friendly gardener, some people will be industrialists, stupid, populists or whatever else.

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

	readonly lawHouseDebateIntor = (district: District) => `
		Random inhabitants of the legal district ${district.name} have been selected to participate in this Law House session. Each session has to work through some tasks which have accumulated over the past couple days.

		${this.environment()}
	`;

	readonly writeHonestiumQuestion = (pro: boolean, bill: Bill, peers: BillHonestium[]) => `
		Anybody can propose a bill in our city. They must write a name and description, and then the Law House asks them 6 questions, so called Honestiums, three pro their bill, three against. They then have to answer those questions under oath. Their bill, including the six questions and answers are then sent to voters who can then vote. The sessioners must now decide on a ${pro ? 'pro' : 'contra'} "Honestium", for the bill ${bill.tag}. The honestium has to be a question, it will be answered by someone else. The sessioners must find a fair question.

		${bill.tag}:
		${bill.title}
		${bill.description}

		Avoid asking questions like the following questions, as they have already been raised:
		${peers.map(honestium => `- ${honestium.pro ? 'pro' : 'contra'}: ${honestium.question}`).join('\n')}
	`;

	readonly verifyHonestiumQuestion = (pro: boolean, question: string) => `
		In our fictional voting system, anybody can propose a new bill, even without legal knowledge.
		The party submitting the bill must answer multiple pro and contra questions honestly - a so called Honestium.
		The independent commitee has now proposed the following ${pro ? 'pro' : 'contra'} honestium question to be answered by the creators of the bill.
		QUESTION: ${question}

		Is this a fair ${pro ? 'pro' : 'contra'} honestium question?
		Answer with "YES" if you think this is a fair honestium question.
		Answer with "NO", followed by you reason if this is not a fair question.
		The question might not align with your views, nor with what you'd vote.
		Your job is to decide wether this question is relevant to the bill.
		Your opinion on the question does not matter, you must only say if this question is relevant to this bill.
		Your biography will follow, pretend that you are this person.
		This question is aimed at the sumitters of the bill, which will try to argue ${pro ? 'for' : 'against'} this question.

		${this.environment()}
		${this.metaRules()}
	`;

	readonly vote = (resident: Resident) => `
		Given the following biography, bill proposal and q&a, what would ${resident.givenName} ${resident.familyName} vote?
		Answer with YES: or NO: followed by a short one sentence reason for the decision.

		The people do not have to be progressive, they might vote conservatively even in cases where it might not align with modern values.
		Do not forget, we are not in the current year, this is a long time ago.
		All voting is anonymous, and everybody is free to express their beliefs, even if they would be percieved as distruptive or evil by other people.

		${this.environment()}
		${this.metaRules()}
	`;

	readonly extractCompanyPurpose = () => `
		What is the short company type (like: "Investment Bank", "Trading Company", "Car Rental", "Railway") of this company based on this description?
		The answer should be as short as possible.
		Do not include "Company" or any other similar term.

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

	async respondJSON(instruction: string, ...data: string[]) {
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
		const response = await Language.chat([
			{ role: 'user', content: instruction },
			...data.map(data => ({ role: 'user', content: data }))
		], this.mode);

		return response.message.content?.trim();
	}

	static async chat(messages, mode: 'smart' | 'fast') {
		const ollama = new Ollama({
			host: process.env.LANGUAGE_MODEL_HOST // default: http://127.0.0.1:11434
		});

		return await ollama.chat({
			model: mode == 'smart' ? process.env.LANGUAGE_MODEL_MODEL_SMART : process.env.LANGUAGE_MODEL_MODEL_FAST,
			messages
		});
	}

	async debate(
		introduction: string,
		people: Resident[],
		task: string,
		onmessage: (person: Resident, message: string) => Promise<any>,
	) {
		return new Promise<string>(async done => {
			const history = [
				{
					role: 'system',
					content: `
					${introduction}

					Present at this debate are the following people:
					${people.map(person => `${person.id}: ${person.givenName} ${person.familyName}, aged ${toSimulatedAge(person.birthday)}`).join('\n')}

					${task}

					Hold a conversation between the sessioners, in the following format:
					SAY("PERSON ID", "MESSAGE")

					The participants should argue and make sure that a consensus is reached. They can get angry, this debate does not have to be very civil. They can cut eachother off. They do not have to be nice to eachother. They should bring in their background, stand for their values and go all in. They are allowed to be rude. Keep arguing for a long time, this doesn't have to end quickly, each person should talk multiple times.

					Once a conclusion has been found and all involved sessioners agree, respond with:
					CONCLUSION("RESULT").

					Only respond with one message at a time.
				`
				}
			];

			// safeguard
			let iterations = 0;

			while (iterations++ < 250) {
				const response = await Language.chat(history, 'smart');

				for (let match of response.message.content.match(/(SAY\s*\(\s*"?[0-9a-f-]+"?\s*,\s*\"(.*)\"\s*\))|(CONCLUSION\s*\(\s*\"(.*)\"\s*\))/g)) {
					const strings = match.match(/\"(.*?)\"/g).map(line => line.replace('"', '').replace('"', '').trim());

					switch (match.split('(')[0].trim().toLowerCase()) {
						case 'say': {
							const person = people.find(person => person.id == strings[0]);

							if (!person) {
								continue;
							}

							const content = strings[1];

							await onmessage(
								person,
								content
							);

							history.push({
								role: 'assistant',
								content
							});

							break;
						}

						case 'conclusion': {
							done(strings[0]);

							return;
						}
					}
				}
			}
		});
	}

	async summarize(message: string) {
		const lines = await this.respondTextArray(`
			${this.metaRules}

			summarize the text in two to three short sentences, encapsulated as a JSON array.
		`, message);

		const summary = lines.join(' ');

		if (summary.trim().includes('\n')) {
			console.debug(summary)

			return await this.summarize(message);
		}

		return summary;
	}
}
