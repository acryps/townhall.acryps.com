
import { Borough, DbContext, Resident, ResidentRelationship } from "../managed/database";
import { writeFileSync } from "fs";
import { toSimulatedTime } from "../../interface/time";
import { TickFactor } from "./factor";
import { Gender, genders } from "./gender";
import { NameGenerator } from "./name";
import { Language } from "./language";

export class Life {
	// weights, of how many people do what on a tick
	// factor of total people * random(0 - 1) rounded up
	readonly bondingFactor = new TickFactor(this, 'bond', 0.1, 2);

	readonly language = new Language();

	residents: Resident[];

	// name generators
	givenNameGenerators: NameGenerator[];
	familyNameGenerators: NameGenerator[];

	constructor(
		private database: DbContext
	) {}

	async load() {
		this.residents = await this.database.resident.toArray();

		this.givenNameGenerators = genders.map(gender => new NameGenerator('given', gender, this.residents.map(resident => resident.givenName)));
		this.familyNameGenerators = genders.map(gender => new NameGenerator('family', gender, this.residents.map(resident => resident.familyName)));

		console.log(`[life] now: ${toSimulatedTime(new Date()).toISOString()}`);
	}

	async tick() {
		await this.bondingFactor.tick(async (initiator: Resident, peer: Resident) => await this.bond(initiator, peer));
	}

	async assignFigure(resident: Resident) {
		const figures = await this.database.residentFigure
			.includeTree({ id: true, outfit: true })
			.toArray();

		figures.sort(() => Math.random() - 0.5);

		const prompt = this.language.assignFigure(resident, figures.slice(0, 20));
		console.debug(prompt);

		const identifier = await this.language.respondText(prompt, resident.biography);

		const figure = figures.find(figure => figure.id.split('-')[0] == identifier);

		if (!figure) {
			return await this.assignFigure(resident);
		}

		console.log(resident.givenName, resident.familyName, figure.outfit)

		resident.figure = figure;
		await resident.update();
	}

	async bond(initiator: Resident, peer: Resident) {
		/*const initiatorRelationships = await this.findActiveRelations(initiator);

		// if they already have a relationship, break it!
		// new relationships form frequently, as finding existing relationsships is rarer
		const existingRelationship = initiatorRelationships.find(relationship => relationship.initiatorId == peer.id || relationship.peerId == peer.id);

		if (existingRelationship) {
			existingRelationship.conflict = await this.respond(`

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

		`);

		await relationship.create();*/
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
	async spawn(
		place: Borough,
		standing: number,
		birthday: Date,
		gender: Gender = [...genders].sort(() => Math.random() - 0.5)[0]
	): Promise<Resident> {
		const resident = new Resident();
		resident.birthday = birthday;

		resident.givenName = await this.givenNameGenerators.find(generator => generator.gender == gender).next();
		resident.familyName = await this.familyNameGenerators.find(generator => generator.gender == gender).next();
		resident.tag = await this.createNameTag(resident.givenName, resident.familyName);

		const prompt = this.language.createSpawnedBiography(resident.givenName, resident.familyName, birthday, gender, place, standing);
		resident.biography = await this.language.respondText(prompt, place.description);

		console.log(`+ spawn ${resident.givenName} ${resident.familyName}`);

		await resident.create();
		this.residents.push(resident);
		this.assignFigure(resident);

		return resident as Resident;
	}

	async merge(
		parentA: Resident,
		parentB: Resident,
		familyName: string,
		birthday = new Date(),
		place: Borough,
		gender: Gender = [...genders].sort(() => Math.random() - 0.5)[0]
	) {
		const resident = new Resident();
		resident.birthday = birthday;

		resident.givenName = await this.givenNameGenerators.find(generator => generator.gender == gender).next();
		resident.familyName = familyName;
		resident.tag = await this.createNameTag(resident.givenName, resident.familyName);

		const prompt = this.language.createChildBiography([parentA, parentB], resident.givenName, familyName, birthday, gender, place, Math.random());
		resident.biography = await this.language.respondText(prompt, await this.compileDescription(parentA), await this.compileDescription(parentB));

		console.log(`+ merge ${parentA.givenName} + ${parentB.givenName} ${familyName} = ${resident.givenName} ${familyName}`);

		await resident.create();
		this.residents.push(resident);
		this.assignFigure(resident);

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

	private async createNameTag(givenName: string, familyName: string, iteration = 0) {
		const name = `${givenName.toLowerCase()}-${familyName.toLowerCase()}${iteration ? `-${iteration}` : ''}`;

		if (await this.database.resident.where(resident => resident.tag.valueOf() == name).count()) {
			return await this.createNameTag(givenName, familyName, iteration + 1);
		}

		return name;
	}
}
