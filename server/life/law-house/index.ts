import { Life } from "..";
import { toSimulatedAge } from "../../../interface/time";
import { BillHonestium, DbContext, District, Property, Resident, Vote } from "../../managed/database";
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
		await this.sendVotingBallots();

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

	// sends out ballots for new votes
	private async sendVotingBallots() {
		for (let bill of await this.getOpenBills()) {
			if (!bill.mailed) {
				bill.mailed = new Date();
				await bill.update();

				const honestiums = await bill.honestiums.toArray();
				bill.summary = await this.language.summarize(`
					${bill.title}
					${bill.description}

					${honestiums.map(honestium => `${honestium.question}\n${honestium.answer}`).join('\n\n')}
				`);

				await bill.update();

				const residents = await this.collectLegallyCompetentResidents(await bill.scope.fetch());

				for (let resident of residents) {
					const vote = new Vote();
					vote.bill = bill;
					vote.resident = resident;

					await vote.create();
				}
			}
		}
	}

	private async certifyBills() {
		for (let bill of await this.getOpenBills()) {
			const openVotes = await bill.votes.where(vote => vote.submitted == null).count();

			if (openVotes == 0 && !bill.certified && bill.mailed) {
				const votes = await bill.votes.toArray();

				bill.pro = votes.filter(vote => vote.pro).length > votes.length / 2;
				bill.certified = new Date();

				await bill.update();
			}
		}
	}

	// only people who are responsible in a legal sense
	// no children
	private async collectLegallyCompetentResidents(district: District) {
		return (await this.collectResidents(district))
			.filter(resident => toSimulatedAge(resident.birthday) > 18)
	}

	private async collectResidents(district: District) {
		// find people who need to vote on this bill
		const boroughs = await this.collectBoroughs(district);

		// find residents
		const residents: Resident[] = [];

		for (let borough of boroughs) {
			for (let resident of await this.database.resident
				.where(resident => resident.mainTenancy.dwelling.property.boroughId == borough.id)
				.include(resident => resident.votes)
				.toArray()
			) {
				residents.push(resident);
			}
		}

		return residents;
	}

	private async collectBoroughs(district: District) {
		const boroughs = await district.boroughs.toArray();

		for (let child of await district.children.toArray()) {
			boroughs.push(...await this.collectBoroughs(child));
		}

		return boroughs;
	}
}
