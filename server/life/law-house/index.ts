import { BillHonestium, DbContext, Property } from "../../managed/database";
import { Language } from "../language";

export class LawHouse {
	active = false;

	honestiumSize = 3;

	constructor(
		private database: DbContext,
		private language: Language
	) { }

	// works through all tasks assigned to the law house
	// the team goes into session every four hours
	async session() {
		this.active = true;

		await this.writeHonestiums();

		this.active = false;
	}

	private async writeHonestiums() {
		const openBills = await this.database.bill
			.where(bill => bill.certified == null)
			.toArray();

		for (let bill of openBills) {
			const honestiums = await bill.honestiums.toArray();

			while (honestiums.length != this.honestiumSize * 2) {
				const pro = honestiums.filter(honestium => honestium.pro).length < this.honestiumSize;

				const honestium = new BillHonestium();
				honestium.bill = bill;
				honestium.pro = pro;

				const prompt = this.language.writeHonestiumQuestion(pro, honestiums);
				console.log(prompt);

				honestium.question = await this.language.respondText(prompt, `
					${bill.title}
					${bill.description}
				`);

				await honestium.create();

				honestiums.push(honestium);
			}
		}
	}
}
