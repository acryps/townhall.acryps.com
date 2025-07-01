
import { Bill, Borough, DbContext, District, Dwelling, PlotBoundary, Resident, ResidentRelationship, Vote } from "../managed/database";
import { TickFactor } from "./factor";
import { Gender, genders } from "./gender";
import { NameGenerator } from "./name";
import { Language } from "./language";
import { resolve } from "dns/promises";
import { Interpreter, SystemMessage, UserMessage } from "./interpreter";
import { Interface } from "readline/promises";
import { config } from "process";
import { Point } from "../../interface/point";
import { Time } from "../../interface/time";

export class Life {
	// weights, of how many people do what on a tick
	// factor of total people * random(0 - 1) rounded up
	readonly bondingFactor = new TickFactor(this, 'bond', 0.1, 2);

	readonly language = new Language('smart');

	residents: Resident[];

	// contains points that a resident frequents
	residentAnchors = new Map<Resident, Point[]>();

	// name generators
	familyNameGenerator: NameGenerator;
	givenNameGenerators: NameGenerator[];

	constructor(
		private database: DbContext
	) {}

	async load() {
		this.residents = await this.database.resident
			.include(resident => resident.tenancies)
			.toArray();

		await this.updateResidentAnchors();

		this.familyNameGenerator = new NameGenerator('family', this.residents.map(resident => resident.familyName));
		this.givenNameGenerators = genders.map(gender => new NameGenerator('given', this.residents.map(resident => resident.givenName), gender));

		console.log(`[life] now: ${Time.now().toString()}`);
	}

	async updateResidentAnchors() {
		const workContracts = await this.database.workContract
			.where(contract => contract.canceled == null)
			.include(contract => contract.offer)
			.toArray();

		const offices = await this.database.office.toArray();
		const plots = await this.database.plotBoundary
			.where(boundary => boundary.property.activePlotBoundaryId == boundary.id)
			.toArray();

		const dwellings = await this.database.dwelling.toArray();

		for (let resident of this.residents) {
			const boundaries: PlotBoundary[] = [];

			const contracts = workContracts.filter(contract => contract.workerId == resident.id);

			for (let contract of contracts) {
				const offer = await contract.offer.fetch();
				const office = offices.find(office => office.id == offer.officeId);

				boundaries.push(plots.find(plot => plot.propertyId == office.propertyId));
			}

			for (let tenancy of await resident.tenancies.toArray()) {
				if (!tenancy.end) {
					const dwelling = dwellings.find(dwelling => dwelling.id == tenancy.dwellingId);

					boundaries.push(plots.find(plot => plot.propertyId == dwelling.propertyId));
				}
			}

			this.residentAnchors.set(resident, boundaries.map(boundary => Point.center(Point.unpack(boundary.shape))));
		}
	}

	async tick() {
		await this.bondNext();
	}

	async bondNext() {
		const initiator = [...this.residents].sort(() => Math.random() - 0.5)[0];
		const meetingAnchor = [...this.residentAnchors.get(initiator)].sort(() => Math.random() - 0.5)[0];

		if (!meetingAnchor) {
			return await this.bondNext();
		}

		const pool = [];

		for (let [peer, anchors] of this.residentAnchors) {
			for (let anchor of anchors) {
				const distance = anchor.distance(meetingAnchor);

				pool.push({
					peer,
					distance
				});
			}
		}

		pool.sort((a, b) => a.distance - b.distance);

		const weights = pool.map((_, index) => 1 / Math.sqrt(index + 1));
		const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
		const pick = Math.random() * totalWeight;

		console.log('pick', totalWeight, pick);

		let cumulative = 0;
		for (let index = 0; index < pool.length; index++) {
			cumulative += weights[index];

			if (pick < cumulative) {
				const peer = pool[index].peer;
				console.log(peer);

				await this.bond(initiator, peer);

				return;
			}
		}
	}

	async vote() {
		const openVotes = await this.database.vote
			.where(vote => vote.submitted == null)
			.orderByAscending(vote => vote.id)
			.include(vote => vote.bill)
			.include(vote => vote.resident)
			.toArray();

		console.log(`open vote ballots: ${openVotes.length}`);

		for (let ballot of openVotes) {
			await this.voteBill(ballot);
		}
	}

	async voteBill(ballot: Vote) {
		const fast = new Language('fast');

		if (ballot.submitted) {
			throw new Error(`Vote '${ballot.id}' already submitted`);
		}

		const resident = await ballot.resident.fetch();
		const bill = await ballot.bill.fetch();
		const honestums = await bill.honestiums.toArray();

		console.log('vote', bill.title, resident.id, resident.givenName, resident.familyName);

		let response = await fast.respondRaw(this.language.vote(resident),
			await this.compileDescription(resident),
			bill.title,
			bill.description,
			...honestums.map(honestium => `${honestium.question}: ${honestium.answer}`)
		);

		response = response.toLowerCase();

		if (bill.certified) {
			throw new Error(`Bill '${bill.tag}' already certified`);
		}

		if (!response.startsWith('yes') && !response.startsWith('no')) {
			console.log(response);

			return this.voteBill(ballot);
		}

		ballot.submitted = new Date();
		ballot.pro = response.startsWith('yes');

		const reason = response.split(/\s/).slice(1).join(' ').trim();

		if (reason) {
			ballot.reason = reason;
		}

		console.log('+ vote', resident.givenName, resident.familyName, ballot.pro, ballot.reason);

		await ballot.update();
	}

	async assignPoliticalTags(resident: Resident) {
		const labels = await this.language.respondTextArray(this.language.assignPoliticalLabels(resident));

		resident.politicalSetting = labels.join(', ');
		await resident.update();
	}

	async assignFigure(resident: Resident) {
		const figures = await this.database.residentFigure
			.includeTree({ id: true, outfit: true })
			.toArray();

		figures.sort(() => Math.random() - 0.5);

		const prompt = this.language.assignFigure(resident, figures.slice(0, 20));

		const response = await this.language.respondText(prompt, resident.biography);
		const figureIndex = +response - 1;

		if (isNaN(figureIndex) || figureIndex >= figures.length) {
			return await this.assignFigure(resident);
		}

		const figure = figures[figureIndex];

		console.log(resident.givenName, resident.familyName, figure.outfit)

		resident.figure = figure;
		await resident.update();
	}

	async bond(initiator: Resident, peer: Resident) {
		if (initiator.id == peer.id) {
			return;
		}

		const initiatorRelationships = await this.findActiveRelations(initiator);
		const peerRelationships = await this.findActiveRelations(peer);

		// if they already have a relationship, break it!
		// new relationships form frequently, as finding existing relationsships is rarer
		const existingRelationship = initiatorRelationships.find(relationship => relationship.initiatorId == peer.id || relationship.peerId == peer.id);

		if (existingRelationship && !existingRelationship.unbreakable) {
			console.log(`-separate: ${initiator.tag} ${peer.tag}`);

			const interpreter = new Interpreter();

			interpreter.addTool('separate', [{ type: String, name: 'conflict' }], conflict => {
				existingRelationship.conflict = conflict;
			});

			await interpreter.execute(
				new SystemMessage(`
					${initiator.givenName} and ${peer.givenName} have meet ${new Time(existingRelationship.bonded).age()} years ago.
					They had their fun times, but sadly they cannot continue their connection.
					Come up with a fictional story, why they are no longer friends, ...

					I will provide you with their bonding story and some detail about the people.
					When you found a separaration story, call the 'separate' function.
				`),

				new UserMessage(existingRelationship.connection),

				new UserMessage(await this.compilePersonDescription(initiator, initiatorRelationships)),
				new UserMessage(await this.compilePersonDescription(peer, peerRelationships))
			);

			existingRelationship.ended = new Date();

			await existingRelationship.update();

			return;
		}

		console.log(`+bond: ${initiator.tag} ${peer.tag}`);

		const relationship = new ResidentRelationship();
		relationship.bonded = new Date();
		relationship.initiator = initiator;
		relationship.peer = peer;

		const interpreter = new Interpreter('smart');

		interpreter.addTool('bond', [{ type: String, name: 'story' }, { type: String, name: 'summary' }, { type: String, name: 'type' }], (connection, summary, type) => {
			relationship.connection = connection;
			relationship.summary = summary;
			relationship.purpose = type;
		});

		await interpreter.execute(
			new SystemMessage(`
				${initiator.givenName} and ${peer.givenName} just meet.
				Given thier biographies and friends, write an imaginary a story why they bonded.
				They might have meet outside randomly, meet in a pub, at work, thru friends or any other way!
				They may become friends, partners or might even start a business together - any type of relationship may emerge from this connection.
				I will provide you with a biography of the people and a list of all their friends and relations.

				Call the 'bond' function when you found their story, a short summary of the story and a type ("Romantic", "Work", "Friendship", ...).
			`),

			new UserMessage(await this.compilePersonDescription(initiator, initiatorRelationships)),
			new UserMessage(await this.compilePersonDescription(peer, peerRelationships))
		);

		await relationship.create();
	}

	async compilePersonDescription(resident: Resident, relationships: ResidentRelationship[]) {
		return `
			${resident.givenName} ${resident.familyName}
			age ${new Time(resident.birthday).age()}

			${resident.biography}

			friendships and relations:
			${(await this.compileFriendList(resident, relationships)).join('\n')}
		`;
	}

	async compileFriendList(resident: Resident, relationships: ResidentRelationship[]) {
		let relations = [];

		for (let relationship of relationships) {
			const peer = relationship.initiatorId == resident.id ? await relationship.peer.fetch() : await relationship.initiator.fetch();

			relations.push(`- ${relationship} with ${peer.givenName} ${peer.familyName} (since ${new Time(relationship.bonded).age()} years): ${relationship.summary}`);
		}

		return relations;
	}

	async compileDescription(resident: Resident) {
		const relations = await this.findActiveRelations(resident);

		return `
			${resident.biography}

			relations:
			${(await this.compileFriendList(resident, relations)).join('\n\n')
		}`;
	}

	async findActiveRelations(resident: Resident) {
		return this.database.residentRelationship
			.where(relationship => relationship.initiatorId == resident.id || relationship.peerId == resident.id)
			.where(relationship => relationship.ended == null)
			.toArray();
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

		await resident.create();
		this.residents.push(resident);
		this.assignFigure(resident);

		console.log(`+ merge ${resident.tag} ${parentA.givenName} + ${parentB.givenName} ${familyName} = ${resident.givenName} ${familyName}`);

		for (let parent of [parentA, parentB]) {
			const relation = new ResidentRelationship();
			relation.bonded = birthday;
			relation.connection = 'Parent';
			relation.purpose = 'Parent';
			relation.summary = 'Parent';
			relation.initiator = parent;
			relation.peer = resident;

			await relation.create();
		}

		return resident;
	}

	async createNameTag(givenName: string, familyName: string, iteration = 0) {
		const name = `${givenName.toLowerCase()}-${familyName.toLowerCase()}${iteration ? `-${iteration}` : ''}`;

		if (await this.database.resident.where(resident => resident.tag.valueOf() == name).count()) {
			return await this.createNameTag(givenName, familyName, iteration + 1);
		}

		return name;
	}
}
