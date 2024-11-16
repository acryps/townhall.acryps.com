import ollama from "ollama"
import { Borough, DbContext, Resident, ResidentRelationship } from "./managed/database";
import { Message } from "../interface";
import { writeFileSync } from "fs";
import { toSimulatedTime } from "../interface/time";

export class Life {
	// weights, of how many people do what on a tick
	// factor of total people * random(0 - 1) rounded up
	readonly bondingFactor = new TickFactor(this, 'bond', 0.1, 2);

	residents: Resident[];

	constructor(
		private database: DbContext
	) {}

	async load() {
		this.residents = await this.database.resident.toArray();
	}

	async tick() {
		await this.bondingFactor.tick(async (initiator: Resident, peer: Resident) => await this.bond(initiator, peer));
	}

	async bond(initiator: Resident, peer: Resident) {
		const initiatorRelationships = await this.findActiveRelations(initiator);

		// if they already have a relationship, break it!
		// new relationships form frequently, as finding existing relationsships is rarer
		const existingRelationship = initiatorRelationships.find(relationship => relationship.initiatorId == peer.id || relationship.peerId == peer.id);

		if (existingRelationship) {
			existingRelationship.conflict = await this.respond(`
				${initiator.givenName} and ${peer.givenName} were socially connected as ${existingRelationship.purpose}.
				given thier biographies, write an imaginary a story why their bond broke.
				do not tell me that you are writing a story, or any meta text.
			`, existingRelationship.connection, initiator.biography, peer.biography);

			existingRelationship.ended = new Date();
		}

		const peerRelationships = await this.findActiveRelations(peer);

		const relationship = new ResidentRelationship();
		relationship.bonded = new Date();
		relationship.initiator = initiator;
		relationship.peer = peer;

		relationship.connection = await this.respond(`
			${initiator.givenName} and ${peer.givenName} just meet.
			given thier biographies and friends, write an imaginary a story why they bonded.
			they might have meet outside randomly, meet in a pub, at work, thru friends or any other way!
			they may become friends, partners or might even start a business together - any type of relationship may emerge from this connection.
			do not tell me that you are writing a story, or any meta text.

			their current relations are:
			${initiator.givenName}: ${(await this.compileFriendList(initiator, initiatorRelationships)).join(', ')}
			${peer.givenName}: ${(await this.compileFriendList(peer, peerRelationships)).join(', ')}
		`, initiator.biography, peer.biography);

		relationship.summary = await this.summarize(relationship.connection);

		relationship.purpose = await this.respond(`
			given the following story, what type of bond do ${initiator.givenName} and ${peer.givenName} have?
			is this a relationship, a friendship, a business relation or what?
			reply in a single word
		`);

		await relationship.create();
	}

	private async compileFriendList(resident: Resident, relationships: ResidentRelationship[]) {
		let relations = [];

		for (let relationship of relationships) {
			const peer = relationship.initiatorId == resident.id ? await relationship.peer.fetch() : await relationship.initiator.fetch();

			relations.push(`${relationship} with ${peer.givenName} ${peer.familyName}`);
		}

		return relations;
	}

	async findActiveRelations(resident: Resident) {
		return this.database.residentRelationship
			.where(relationship => relationship.initiatorId == resident.id || relationship.peerId == resident.id)
			.where(relationship => relationship.ended == null)
			.toArray();
	}

	// create someone new
	async spawn(place: Borough, standing: number, birthday: Date) {
		const resident = new Resident();
		resident.birthday = birthday;

		const age = toSimulatedTime(new Date()).getFullYear() - toSimulatedTime(birthday).getFullYear();

		// there are more women in the world...
		const pronoun = Math.random() > 0.51 ? 'he' : 'she';

		// prevents everybody being called Emilia Fothergrill
		const usedNames = [...this.residents].sort(() => Math.random() - 0.5).slice(0, 100).flatMap(peer => [peer.givenName, peer.familyName]).join(', ');

		const biography = await this.respond(`
			a new person appeared in our fictional city called Pilegron.
			come up with a biography of this person.
			${pronoun} appeared in ${place.name} and is ${age} years old.
			${pronoun} social standing is ${standing}, where 0 is the worst and 1 is the best.
			it is currently ${toSimulatedTime(new Date()).toDateString()}.
			we are in europe, in a place like england, but it is not england.
			well known world events, like the world wars, did not happen here.
			when mentioning dates, always use YYYY-MM-DD format.
			write a biography as a story, do not mention facts like age or social standing.
			do not tell me that you are writing a biography, or any meta text.
			imagine a name, probable occupation, core beliefs and principles.
			do not mention that this city is fictional, pretend that the story is real.
			do not name ${pronoun} any of the following names: ${usedNames}
		`, place.description);

		resident.biography = biography;

		const extractName = async (type: string) => {
			const tasks: Promise<string>[] = [];

			for (let attempt = 0; attempt < 10; attempt++) {
				tasks.push(this.respond(`
					what is this persons ${type}, given the following biography?
					only respond with the name
					if you cannot or do not want to respond, just do not respond with anything
				`, biography));
			}

			const names = new Map<string, number>();

			let common;
			let maxOccurences = 0;

			for (let name of await Promise.all(tasks)) {
				if (name.trim()) {
					if (names.has(name)) {
						const occurences = names.get(name) + 1;

						names.set(name, occurences);

						if (occurences > maxOccurences) {
							common = name;

							maxOccurences = occurences;
						}
					} else {
						names.set(name, 1);
					}
				}
			}

			return common;
		};

		resident.givenName = await extractName('given name');
		resident.familyName = await extractName('family name');

		// retry if fishy
		let retry = false;

		if (!resident.givenName || !resident.familyName || resident.givenName.includes(resident.familyName) || resident.familyName.includes(resident.givenName)) {
			retry = true;
		}

		for (let key in ['givenName', 'familyName']) {
			if (!(await this.confirm(`is this a ${key}`, resident[key]))) {
				retry = true;
			}
		}

		console.log(`+ spawn ${resident.givenName} ${resident.familyName}`);

		await resident.create();
		this.residents.push(resident);

		return resident;
	}

	private async confirm(instruction: string, ...data: string[]) {
		const token = Math.random().toString(36).substring(2);
		const response = await this.respond(`${instruction} if this applies, respond with ${token}`, ...data);

		return response!.includes(token);
	}

	private async respond(instruction: string, ...data: string[]) {
		console.debug(`-- ${instruction.replace(/\s+/g, ' ').substring(0, 100).trim()}`);

		const messages = [
			{ role: 'user', content: instruction },
			...data.map(data => ({ role: 'user', content: data }))
		];

		const response = await ollama.chat({
			model: 'llama3.2',
			messages: messages
		});

		writeFileSync('.prompt', JSON.stringify(messages, null, '\t'))

		return response.message.content;
	}

	private async summarize(message: string) {
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

export class TickFactor {
	constructor(
		private simulator: Life,
		private name: string,
		private baseFactor: number,
		private size = 1
	) { }

	async tick(call: (...residens: Resident[]) => Promise<void>) {
		const factor = Math.ceil(Math.random() * this.baseFactor * this.simulator.residents.length);
		console.group(`${this.name}: ${factor}`);

		const people = [...this.simulator.residents];
		people.sort(() => Math.random() - 0.5);

		for (let iteration = 0; iteration < factor; iteration++) {
			const subjects = people.splice(0, this.size);

			if (subjects.length == this.size) {
				console.log(subjects.map(subject => `${subject.givenName} ${subject.familyName}`).join(', '));

				await call(...subjects);
			}
		}

		console.groupEnd();
	}
}
