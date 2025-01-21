import { LawHouse } from ".";
import { Life } from "..";
import { BillHonestium, DbContext, District, LawHouseSession, LawHouseSessionary, Resident, ResidentEventView, Vote } from "../../managed/database";
import { Language } from "../language";

export class LawHouseSessionManager {
	sessionaryCount = 7;
	honestiumSize = 3;

	private residents: Resident[];
	private sessionaries: Resident[] = [];
	private session: LawHouseSession;

	constructor(
		private database: DbContext,
		private language: Language,
		private life: Life,
		private district: District,
		private lawHouse: LawHouse
	) { }

	async execute() {
		this.session = new LawHouseSession();
		this.session.started = new Date();
		this.session.protocol = '';

		await this.session.create();

		// find sessionaries
		// sessionaries decide on the tasks of this session
		this.residents = await this.lawHouse.collectLegallyCompetentResidents(this.district);
		this.protocol(`Consensus for ${this.district.name}: ${this.residents.length} legally competent residents`);

		if (this.residents.length < this.sessionaryCount) {
			this.protocol(`Not enough legally competent residents to hold law house session.`);

			this.session.ended = new Date();
			await this.session.update();

			return;
		}

		const sessionaryPool = [...this.residents];
		sessionaryPool.sort(() => Math.random() - 0.5);

		for (let index = 0; index < this.sessionaryCount; index++) {
			const resident = sessionaryPool.shift();

			const sessionary = new LawHouseSessionary();
			sessionary.session = this.session;
			sessionary.resident = resident;

			await sessionary.create();

			this.sessionaries.push(resident);
			this.protocol(`Sessionary ${resident.givenName} ${resident.familyName} present.`);
		}

		await this.writeHonestiums();
		await this.certifyBills();
		await this.sendVotingBallots();

		this.session.ended = new Date();
		await this.session.update();
	}

	private async getOpenBills() {
		return await this.district.bills
			.where(bill => bill.scopeId == this.district.id)
			.where(bill => bill.certified == null)
			.toArray();
	}

	private async protocol(message: string) {
		console.log(`[law-house session ${this.district.name}]: ${message}`);

		this.session.protocol += `${new Date().toLocaleString()}: ${message}\n\n`;

		await this.session.update();
	}

	private async writeHonestiums() {
		for (let bill of await this.getOpenBills()) {
			const honestiums = await bill.honestiums.toArray();

			while (honestiums.length != this.honestiumSize * 2) {
				const pro = honestiums.filter(honestium => honestium.pro).length < this.honestiumSize;

				this.protocol(`Writing ${pro ? 'pro' : 'contra'} honestium question for bill '${bill.tag}'`);

				const honestium = new BillHonestium();
				honestium.bill = bill;
				honestium.pro = pro;
				honestium.question = await this.language.respondText(this.language.writeHonestiumQuestion(pro, honestiums));

				await honestium.create();

				honestiums.push(honestium);
			}
		}
	}

	// sends out ballots for new votes
	private async sendVotingBallots() {
		for (let bill of await this.getOpenBills()) {
			if (!bill.mailed) {
				this.protocol(`Mailing ballots for bill '${bill.tag}'`);

				bill.mailed = new Date();
				await bill.update();

				this.protocol(`Summarizing bill '${bill.tag}' for voters`);
				const honestiums = await bill.honestiums.toArray();
				bill.summary = await this.language.summarize(`
					${bill.title}
					${bill.description}

					${honestiums.map(honestium => `${honestium.question}\n${honestium.answer}`).join('\n\n')}
				`);

				await bill.update();

				this.protocol(`Sending ballots to ${this.residents.length} residents`);

				for (let resident of this.residents) {
					const vote = new Vote();
					vote.bill = bill;
					vote.resident = resident;

					await vote.create();
				}

				this.protocol(`Sent ballots`);
			}
		}
	}

	private async certifyBills() {
		for (let bill of await this.getOpenBills()) {
			if (bill.mailed) {
				this.protocol(`Reviewing votes for '${bill.tag}'`);

				const openVotes = await bill.votes.where(vote => vote.submitted == null).count();
				this.protocol(`${openVotes} open ballots found for '${bill.tag}'`);

				if (openVotes == 0) {
					this.protocol(`Votes complete for bill '${bill.tag}'`);

					const votes = await bill.votes.toArray();

					bill.pro = votes.filter(vote => vote.pro).length > votes.length / 2;
					bill.certified = new Date();

					this.protocol(`Bill '${bill.tag}' certified as ${bill.pro ? 'PRO' : 'CONTRA'} at ${bill.certified.toLocaleString()}.`);

					await bill.update();
				}
			}
		}
	}
}
