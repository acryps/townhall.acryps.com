import { convertToCurrency } from "../../../../interface/currency";
import { Interpreter, InterpreterMessage, SystemMessage, UserMessage } from "../../../life/interpreter";
import { LegalEntity, Valuation } from "../../../managed/database";

export type ValuedItem<ItemType> = {
	item: ItemType,
	valueation: Valuation
}

export abstract class Valueator<ItemType> {
	abstract compileItemName(source: ItemType): Promise<string>;
	abstract findReferences(source: ItemType): Promise<ValuedItem<ItemType>[]>;
	abstract compileItemDescription(source: ItemType, refereces: ItemType[]): Promise<string>;

	constructor(
		private issuer: LegalEntity
	) {}

	async valueate(target: ItemType) {
		const targetName = await this.compileItemName(target);
		console.log(`valueating ${targetName}...`);

		const targetReferences = await this.findReferences(target);

		const history: InterpreterMessage[] = [
			new SystemMessage(`
				Your task is to value items based on their description.
				I will provide a description, you call the 'value' function with the value.
				The value does not have to be a round number, a very specific number is preferred.
			`)
		];

		for (let reference of targetReferences) {
			const subreferences = await this.findReferences(reference.item);
			const description = await this.compileItemDescription(reference.item, subreferences.map(reference => reference.item));

			history.push(
				new UserMessage(description),
				Interpreter.simulateToolReponse('value', { price: reference.valueation.price })
			);
		}

		const targetDescription = await this.compileItemDescription(target, targetReferences.map(reference => reference.item));

		const opinions = [];

		for (let opinonIndex = 0; opinonIndex < 5; opinonIndex++) {
			opinions.push(
				await this.valueationOpinion(history, targetName, targetDescription)
			);
		}

		opinions.sort((a, b) => a - b);

		const price = opinions[Math.floor(opinions.length / 2)];
		console.log(`valued ${targetName} at ${convertToCurrency(price)}`);

		const valueation = new Valuation();
		valueation.item = targetName;
		valueation.description = targetDescription;
		valueation.estimated = new Date();
		valueation.issuer = this.issuer;
		valueation.price = price;

		return await valueation.create();
	}

	private async valueationOpinion(history: InterpreterMessage[], targetName: string, targetDescription: string) {
		const interpreter = new Interpreter('smart');
		interpreter.remember(history);

		return new Promise<number>(async done => {
			let completed = false;

			interpreter.addTool('value', [{ name: 'price', type: Number }], (price: number) => {
				completed = true;

				console.warn(`valueation opinion ${targetName}: ${convertToCurrency(price)}`);

				done(price);
			});

			await interpreter.execute(new UserMessage(targetDescription));

			// retry
			if (!completed) {
				console.warn(`valuation for ${targetName} failed. retrying...`);

				done(await this.valueationOpinion(history, targetName, targetDescription));
			}
		});
	}
}
