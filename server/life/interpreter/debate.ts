import { toSimulatedAge } from "../../../interface/time";
import { Resident } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from ".";

export class Debate {
	readonly maximumLength = 500;

	private intepreter = new Interpreter();

	prepared = false;
	iterations = 0;

	messages = 0;
	length: number;

	refer: Resident;

	conclusion: string;

	constructor(
		private introduction: string,
		private people: Resident[],
		private task: string,
		private onmessage: (person: Resident, message: string) => Promise<any>,
		private validate: (response: string) => Promise<boolean>,
	) {}

	async prepare() {
		if (this.prepared) {
			return;
		}

		this.prepared = true;

		const peopleDescriptions = [];

		for (let person of this.people) {
			const tenancy = await person.mainTenancy.fetch();
			const dwelling = await tenancy?.dwelling.fetch();
			const property = await dwelling?.property.fetch();
			const borough = await property?.borough.fetch();

			peopleDescriptions.push(`${person.id.split('-')[0]}: ${person.givenName} ${person.familyName}, aged ${toSimulatedAge(person.birthday)}, living in ${borough?.name ?? 'the city'}, ${person.politicalSetting}`);
		}

		console.log(peopleDescriptions)

		this.intepreter.remember([new SystemMessage(`
			${this.introduction}

			Present at this debate are the following people, in the format <id>: <name>, <detail>
			${peopleDescriptions.map(description => `- ${description}`).join('\n')}

			${this.task}

			The participants should argue and make sure that a consensus is reached. They can get angry, this debate does not have to be very civil. They can cut eachother off. They do not have to be nice to eachother. They should bring in their background, stand for their values and go all in. They are allowed to be rude. Keep arguing for a long time, this doesn't have to end quickly, each person should talk multiple times.

			Once a conclusion has been found and all involved sessioners agree, call 'conclude'.
			Hold a conversation between the sessioners, call 'speak' whenever someone says something.
			If someone should respond to the message, put their ID into the refer parameter.

			I will tell you the ID of the person that should speak next.
			You only ever respond with one 'speak' or 'conclude' response.
		`)]);

		this.intepreter.addTool('conclude', [{ name: 'conclusion', type: String }], async conclusion => {
			if (await this.validate(conclusion)) {
				this.conclusion = conclusion;

				return;
			}

			console.warn(`[debate] invalid conclusion: '${conclusion}', telling debaters and continuing...`);

			this.intepreter.remember([new UserMessage(`
				The conclusion "${conclusion}" is invalid, continue the debate, make sure to complete the task:
				${this.task}
			`)]);
		});

		this.intepreter.addTool('speak', [{ name: 'id', type: String }, { name: 'message', type: String }, { name: 'refer', type: String, optional: true }], async (id, message, refer) => {
			const person = this.people.find(person => person.id.split('-')[0] == id);

			if (!person) {
				throw new Error(`Person not found: ${id}`);
			}

			// might be null
			this.refer = this.people.find(person => person.id.split('-')[0] == refer);

			await this.onmessage(person, message);
		});
	}

	async debateUntilConcluded(length: number) {
		await this.prepare();

		this.length = length;

		while (!this.conclusion) {
			await this.next();
		}

		return this.conclusion;
	}

	private async next() {
		this.iterations++;

		if (this.iterations > this.maximumLength) {
			throw new Error(`Debate went on too long!`);
		}

		let speaker = this.people[Math.floor(Math.random() * this.people.length)];

		// prevent loops of only two people talking
		if (this.refer && Math.random() > 0.3) {
			speaker = this.refer;
		}

		// tell intepreter who should talk next, then wait for their response
		const remainingMessages = this.length - this.messages;
		console.log(speaker.givenName, remainingMessages);

		await this.intepreter.execute(
			new UserMessage(`It is ${speaker.givenName} ${speaker.familyName} (id: ${speaker.id.split('-')[0]}) turn to speak now. A conclusion should be reached in ${remainingMessages} messages or earlier, if the solution is clear.`)
		);

		this.messages++;
	}
}
