import { Life } from "..";
import { BillHonestium, DbContext, Property } from "../../managed/database";
import { Language } from "../language";

export class LawHouse {
	active = false;

	honestiumSize = 3;

	constructor(
		private database: DbContext,
		private language: Language,
		private life: Life
	) { }

	// works through all tasks assigned to the law house
	// the team goes into session every four hours
	async session() {
		this.active = true;

		await this.writeHonestiums();
		await this.certifyBills();

		this.active = false;
	}

	private async getOpenBills() {
		return await this.database.bill
			.where(bill => bill.certified == null)
			.toArray();
	}

	private async writeHonestiums() {
		for (let bill of await this.getOpenBills()) {
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

	private async certifyBills() {
		for (let bill of await this.getOpenBills()) {
			const openVoters = await this.life.getPendingVoters(bill);

			if (openVoters.length == 0 && !bill.certified) {
				const votes = await bill.votes.toArray();

				bill.pro = votes.filter(vote => vote.pro).length > votes.length / 2;
				bill.certified = new Date();

				await bill.update();
			}
		}
	}
}
