import { Life } from "..";
import { Point } from "../../../interface/point";
import { Time, toRealTime } from "../../../interface/time";
import { Borough, DbContext, Dwelling, Property, Resident, ResidentRelationship, Tenancy, WorkContract, WorkOffer } from "../../managed/database";
import { female, genders, male } from "../gender";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";
import { Language } from "../language";

export class FillLife {
	oldestPersonBirthday = +new Date('2021-06-01');
	youngestParentBirthday = +new Date('2024-01-01');
	now = +new Date();

	language = new Language('smart');

	constructor(
		private life: Life,
		private database: DbContext
	) {}

	async fillEmptyDwellings() {
		const properties = await this.database.property
			.where(property => property.deactivated == null)
			.where(property => property.boroughId != null)
			.include(property => property.borough)
			.include(property => property.dwellings)
			.toArray();

		for (let property of properties) {
			const dwellings = await property.dwellings.toArray();
			const borough = await property.borough.fetch();

			for (let dwelling of dwellings) {
				if (await dwelling.tenants.count() == 0) {
					await this.fillDwelling(borough, dwelling);
				}
			}
		}
	}

	async fillDwelling(borough: Borough, dwelling: Dwelling) {
		console.log(`filling dwelling`, dwelling.id, borough.name);

		await this.createFamily(dwelling, borough);
	}

	// generates a random family
	//
	// picks random jobs in the general area of the dwelling
	// may create only one parent, no kids or a lot of kids - it's all random!
	async createFamily(dwelling: Dwelling, borough: Borough) {
		const interpreter = new Interpreter();
		interpreter.remember([
			new SystemMessage(`
				We are in a fictional world, the current year is ${Time.now().year}.
				Your job is to generate a fictional family.

				When generating people, call the 'addPerson' function.
				Core values are a short, concrete description of the person: an opinion, a habit, a grudge, a debt, a hobby, a fear, a belief, a routine - not an abstract summary of their character.
				Write core values the way you'd describe someone to a friend over a drink, not the way you'd describe them in a job reference.
				The core values will apply to this person forever, so make sure kids get values that might not manifest as kids yet, but will shape who they become.

				I will tell you the role, you respond create the responding person.
				The role will be followed by a job description of their current or future job.
				Try to form the person to match this job, but not everyone loves their job - some do it for the money, some resent it, some are just drifting.
				Consider the person a housewife/houseman or otherwise unemployed if there is no job description

				${this.language.characterRealism()}
				${this.language.environment()}

				Suggested family names: ${await this.life.familyNameGenerator.selection()}
			`)
		]);

		for (let gender of genders) {
			const generator = this.life.givenNameGenerators.find(generator => generator.gender == gender);

			interpreter.remember([
				new SystemMessage(`Suggested ${gender.name} names: ${await generator.selection()}`)
			]);
		}

		const homeProperty = await dwelling.property.fetch();
		const homeBoundary = await homeProperty.activePlotBoundary.fetch();
		const homeLocation = Point.center(Point.unpack(homeBoundary.shape));

		const parentRoles = ['mother', 'father'].sort(() => Math.random() - 0.5);

		const firstAge = Math.random() * 40 + 20;

		const members: Resident[] = [];
		const jobs: WorkOffer[] = [];

		interpreter.addTool('addPerson', [
			{ type: String, name: 'givenName' },
			{ type: String, name: 'familyName' },
			{ type: Number, name: 'age' },
			{ type: String, name: 'coreValues' }
		], (givenName: string, familyName: string, age: number, coreValues: string) => {
			if (age < 0) {
				return;
			}

			const resident = new Resident();
			resident.givenName = givenName;
			resident.familyName = familyName;

			// assign random age
			let birthday = Time.from(Time.now().year, Math.random() * 31, Math.random() * 12);
			resident.birthday = birthday.real;

			resident.coreValues = coreValues;

			console.log(`+ ${resident.givenName} ${resident.familyName} ${resident.birthday.toLocaleString()} ${new Time(resident.birthday).age()}`);

			members.push(resident);
		});

		console.log('GEN');

		let iterations = 0;

		do {
			const job = await this.findJobOffering(homeLocation);
			jobs.push(job);

			let role = parentRoles.shift();

			if (!role) {
				role = ['daughter', 'son'].sort(() => Math.random() - 0.5)[0];
			}

			const count = members.length;

			while (count == members.length) {
				console.log('TRYING GEN...');

				await interpreter.execute(new UserMessage(`
					${role}
					${members.length == 0 ? `age: ${firstAge}` : ''}
					${job?.task}
				`));

				iterations++;

				if (iterations > 100) {
					return await this.createFamily(dwelling, borough);
				}
			}
		} while (Math.random() > 0.3);

		console.log('GEN DONE');

		// create residents and assign jobs
		for (let memberIndex = 0; memberIndex < members.length; memberIndex++) {
			const member = members[memberIndex];
			const job = jobs[memberIndex];

			member.generated = new Date();
			member.tag = await this.life.createNameTag(member.givenName, member.familyName);
			await member.create();

			await this.updateBiography(member, job, members);
			await this.life.assignFigure(member);

			if (job && new Time(member.birthday).age() > 18) {
				const contract = new WorkContract();
				contract.worker = member;
				contract.offer = job;
				contract.signed = new Date();

				await contract.create();

				FillLife.contracts.push(contract);
			}
		}

		// bond parents
		const familyName = members[0].familyName;
		const parents = [members[0], members[1]];
		const children = members.slice(2);

		if (members.length > 1) {
			const relationship = new ResidentRelationship();
			relationship.initiator = members[0];
			relationship.peer = members[1];
			relationship.purpose = 'Romantic';
			relationship.connection = `${familyName} Family`;
			relationship.bonded = new Date();

			await relationship.create();
		}

		// bond children with parents
		for (let child of children) {
			for (let parent of parents) {
				const relationship = new ResidentRelationship();
				relationship.initiator = parent;
				relationship.peer = child;
				relationship.purpose = 'Parent';
				relationship.connection = `${familyName} Family`;
				relationship.bonded = child.birthday;
				relationship.unbreakable = true;

				await relationship.create();
			}
		}

		// move family into home
		const moveIn = new Date(this.now - ((Math.random() * 100) / 20) * 365 * 24 * 60 * 60 * 1000);

		for (let member of members) {
			const tenancy = new Tenancy();
			tenancy.inhabitant = member;
			tenancy.dwelling = dwelling;
			tenancy.start = new Date(Math.max(+member.birthday, +moveIn));

			await tenancy.create();

			member.mainTenancyId = tenancy.id;
			await member.update();
		}
	}

	static offers: WorkOffer[];
	static contracts: WorkContract[];
	static properties: Property[];

	async findJobOffering(location: Point) {
		if (Math.random() < 0.1) {
			return;
		}

		let offers = FillLife.offers;

		if (!offers) {
			offers = FillLife.offers = await this.database.workOffer
				.where(offer => offer.closed == null)
				.include(offer => offer.office)
				.toArray();

			FillLife.contracts = await this.database.workContract.toArray();
			FillLife.properties = await this.database.property.include(property => property.activePlotBoundary).toArray();
		}

		const pool: { offer: WorkOffer, distance: number }[] = [];

		for (let offer of offers) {
			const office = await offer.office.fetch();
			const property = FillLife.properties.find(property => property.id == office.propertyId);
			const boundary = await property.activePlotBoundary.fetch();

			const center = Point.center(Point.unpack(boundary.shape));

			const contracts = FillLife.contracts
				.filter(contract => contract.offerId == offer.id)
				.filter(contract => !contract.canceled)
				.length;

			if (contracts < offer.count) {
				pool.push({
					offer,
					distance: center.distance(location)
				});
			}
		}

		pool.sort((a, b) => a.distance - b.distance);

		// only use jobs that are somewhat close
		const scope = pool.slice(0, Math.floor(pool.length / 5));

		return scope[Math.floor(Math.random() * scope.length)]?.offer;
	}

	async updateBiography(resident: Resident, referenceJob: WorkOffer, familyMembers: Resident[]) {
		const interpreter = new Interpreter('smart');

		interpreter.addTool('biography', [
			{ type: String, name: 'text' },
			{ type: String, name: 'secret' }
		], async (text, secret) => {
			resident.biography = text;
			resident.secret = secret;

			await resident.update();
		});

		await interpreter.execute(new UserMessage(`
			Write a short biography of ${resident.givenName} ${resident.familyName}, aged ${new Time(resident.birthday).age()}.
			Never mention any dates.

			Use the following as raw material to draw from, not as a checklist of traits to describe or allude to:
			${resident.coreValues}

			${referenceJob && `
				They currently work here. Let it shape the biography, but do not mention the job description directly.
				${referenceJob.task}
			`}

			Family members:
			${familyMembers.filter(member => member.id != resident.id).map(member => `- ${member.givenName} ${member.familyName}, aged ${new Time(member.birthday).age()}`).join('\n')}

			Also invent a secret for them, passed separately to the 'secret' parameter.
			This is something true about them that shapes who they are, but that they would never volunteer, and that they'd be uncomfortable, ashamed or afraid of others finding out.
			It must not appear anywhere in the biography, not even hinted at - the biography is what people can find out about them, the secret is what they can't.
			Make it human and plausible, not a crime-novel twist: things like resenting a family member, no longer loving a partner and not having said so, skimming a little money, having lied about a qualification to get the job, secretly doubting a belief they publicly hold, being afraid of something mundane, still wanting someone they shouldn't.
			It can be dark or it can be small and petty - both are realistic. Write it plainly, one or two sentences, no flourishes.
			${referenceJob && `Feel free to let their job shape the secret - what the role involves, who it puts them near, what it tempts or exposes them to.`}

			${this.language.characterRealism()}
			${this.language.environment()}
		`));
	}
}
