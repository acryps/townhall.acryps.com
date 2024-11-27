import ollama from "ollama"
import { Borough, DbContext, Resident, ResidentRelationship } from "./managed/database";
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

	private async compileDescription(resident: Resident) {
		const relations = await this.findActiveRelations(resident);

		return `${resident.biography}. relations: ${(await this.compileFriendList(resident, relations)).join(', ')}`;
	}

	async findActiveRelations(resident: Resident) {
		return this.database.residentRelationship
			.where(relationship => relationship.initiatorId == resident.id || relationship.peerId == resident.id)
			.where(relationship => relationship.ended == null)
			.toArray();
	}

	// create someone new
	async spawn(place: Borough, standing: number, birthday: Date, pronoun: string = Math.random() > 0.51 ? 'he' : 'she'): Promise<Resident> {
		const resident = new Resident();
		resident.birthday = birthday;

		const age = toSimulatedTime(new Date()).getFullYear() - toSimulatedTime(birthday).getFullYear();

		// prevents everybody being called Emilia Fothergrill
		const usedNames = [...this.residents].sort(() => Math.random() - 0.5).slice(0, 100).flatMap(peer => [peer.givenName, peer.familyName]).join(', ');
		const nameLength = Math.floor(Math.random() * 8 + 4);

		const biography = await this.respond(`
			we are comming up with a history our fictional city called Pilegron.
			invent a person who is a Pilegron native.
			come up with a biography of this person - written in the third person.
			menion the persons given and family name.
			for the given name, use ${nameLength} - ${nameLength + 4} letters, containing the letters ${this.randomLetters(nameLength / 3).join(' ')}.
			${pronoun} appeared in ${place.name} and is ${age} years old.
			${pronoun} social standing is ${standing}, where 0 is the worst and 1 is the best.
			it is currently ${toSimulatedTime(new Date()).toDateString()}.
			we are in europe, in a place like england, but it is not england.
			well known world events, like the world wars, did not happen here.
			when mentioning dates, always use YYYY-MM-DD format.
			write a biography as a story, do not mention facts like age or social standing.
			do not tell me that you are writing a biography, or any meta text.
			imagine a creative given and family name, probable occupation, core beliefs and principles.
			do not mention that this city is fictional, pretend that the story is real.
			do not under any circumstance name the person any of the names below
		`, place.description, usedNames);

		// console.debug(biography)

		resident.biography = biography;

		const extractName = async (type: string) => {
			const tasks: Promise<string>[] = [];

			for (let attempt = 0; attempt < 4; attempt++) {
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

			return common?.trim();
		};

		resident.givenName = await extractName('given name');
		resident.familyName = await extractName('family name');

		// retry if fishy
		let retry = false;

		// make sure that the used names are not reused
		// small chance that we'll just let it happen anyways
		if ((Math.random() > 0.2 && usedNames.includes(resident.givenName)) || (Math.random() > 0.3 && usedNames.includes(resident.familyName))) {
			retry = true;
		}

		if (!resident.givenName || !resident.familyName || resident.givenName == resident.familyName || resident.givenName.includes(resident.familyName) || resident.familyName.includes(resident.givenName)) {
			retry = true;
		}

		for (let key of ['givenName', 'familyName']) {
			if (!(await this.confirm('fictional persons name', 'random sentence or text explaining an error', resident[key]))) {
				retry = true;
			}
		}

		if (retry) {
			return await this.spawn(place, standing, birthday, pronoun);
		}

		console.log(`+ spawn ${resident.givenName} ${resident.familyName}`);

		await resident.create();
		this.residents.push(resident);

		return resident as Resident;
	}

	async merge(parentA: Resident, parentB: Resident, familyName: string, birthday = new Date(), pronoun: string = Math.random() > 0.51 ? 'he' : 'she') {
		const resident = new Resident();
		resident.birthday = birthday;

		const age = toSimulatedTime(new Date()).getFullYear() - toSimulatedTime(birthday).getFullYear();

		// prevents everybody being called Emilia Fothergrill
		const usedNames = [...this.residents].sort(() => Math.random() - 0.5).slice(0, 100).flatMap(peer => [peer.givenName, peer.familyName]).join(', ');
		const nameLength = Math.floor(Math.random() * 8 + 4);

		const biography = await this.respond(`
			a new person was born in our fictional city called Pilegron.
			${pronoun} is ${age} years old now.
			the family name is ${familyName}.
			menion the persons name, use ${nameLength} - ${nameLength + 4} letters, containing the letters ${this.randomLetters(nameLength / 3).join(' ')}.
			come up with a biography of this person based on their parents.
			even tho a common practice, do not name ${pronoun} like one of the parents.
			${age < 3 ? '' : 'as they were just born, there is not much to write. keep it short.'}
			it is currently ${toSimulatedTime(new Date()).toDateString()}.
			we are in europe, in a place like england, but it is not england.
			well known world events, like the world wars, did not happen here.
			when mentioning dates, always use YYYY-MM-DD format.
			write a biography as a story, do not mention facts like age.
			do not tell me that you are writing a biography, or any meta text.
			imagine a creative name, probable occupation, core beliefs and principles.
			do not mention that this city is fictional, pretend that the story is real.
			do not name them any of the names listed below.
		`, await this.compileDescription(parentA), await this.compileDescription(parentB), usedNames);

		resident.biography = biography;

		const extractName = async () => {
			const tasks: Promise<string>[] = [];

			for (let attempt = 0; attempt < 4; attempt++) {
				tasks.push(this.respond(`
					what is this persons given name, given the following biography?
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

		resident.givenName = await extractName();

		resident.familyName = familyName;

		// retry if fishy
		let retry = false;

		if (usedNames.includes(resident.givenName)) {
			retry = true;
		}

		if (!resident.givenName || !resident.familyName || resident.givenName.includes(resident.familyName) || resident.familyName.includes(resident.givenName)) {
			retry = true;
		}

		if (!(await this.confirm('fictional persons given name', 'random sentence or error message', resident.familyName))) {
			retry = true;
		}

		if (retry) {
			return await this.merge(parentA, parentB, familyName, birthday);
		}

		console.log(`+ merge ${parentA.givenName} + ${parentB.givenName} ${familyName} = ${resident.givenName}`);

		await resident.create();
		this.residents.push(resident);

		for (let parent of [parentA, parentB]) {
			const relation = new ResidentRelationship();
			relation.bonded = birthday;
			relation.connection = 'parent';
			relation.purpose = 'parent';
			relation.summary = 'parent';
			relation.initiator = parent;
			relation.peer = resident;

			await relation.create();
		}

		return resident;
	}

	private async confirm(positive: string, negative: string, ...data: string[]) {
		const response = await this.respond(`is the following text acceptable as a ${positive}, then respond with YES. if it is clearly a ${negative}, respond with NO`, ...data);

		console.log(data, response)

		return response.includes('YES');
	}

	private async respond(instruction: string, ...data: string[]) {
		// console.debug(`-- ${instruction.replace(/\s+/g, ' ').substring(0, 100).trim()}`);

		const messages = [
			{ role: 'user', content: instruction },
			...data.map(data => ({ role: 'user', content: data }))
		];

		const response = await ollama.chat({
			model: 'gemma2:27b',
			messages: messages
		});

		writeFileSync('.prompt', JSON.stringify(messages, null, '\t'))

		return response.message.content?.trim();
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

	private randomLetters(length: number) {
		const frequencies: Record<string, number> = {
			a: 8.2,
			b: 1.5,
			c: 2.8,
			d: 4.3,
			e: 12.7,
			f: 2.2,
			g: 2.0,
			h: 6.1,
			i: 7.0,
			j: 0.15,
			k: 0.77,
			l: 4.0,
			m: 2.4,
			n: 6.7,
			o: 7.5,
			p: 1.9,
			q: 0.095,
			r: 6.0,
			s: 6.3,
			t: 9.1,
			u: 2.8,
			v: 0.98,
			w: 2.4,
			x: 0.15,
			y: 2.0,
			z: 0.074
		};

		const characters = Object.keys(frequencies);
		const totalWeight = Object.values(frequencies).reduce((sum, weight) => sum + weight, 0);

		const output: string[] = [];

		for (let index = 0; index < length; index++) {
			let distance = totalWeight * Math.random();
			let characterIndex = -1;

			while (distance > 0) {
				characterIndex++;

				distance -= frequencies[characters[characterIndex]];
			}

			output.push(characters[characterIndex]);
		}

		return output;
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
