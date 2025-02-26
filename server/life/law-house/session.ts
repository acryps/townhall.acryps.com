import { LawHouse } from ".";
import { Life } from "..";
import { BillHonestium, Company, DbContext, District, LawHouseSession, LawHouseSessionary, LawHouseSessionProtocol, Resident, ResidentEventView, Vote } from "../../managed/database";
import { Language } from "../language";

export class LawHouseSessionManager {
	sessionaryCount = 7;
	honestiumSize = 3;

	private residents: Resident[];
	private companies: Company[];

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
		this.session.scope = this.district;

		await this.session.create();

		await this.collectConsensus();

		if (this.residents.length < this.sessionaryCount) {
			await this.protocol(`Not enough legally competent residents to hold law house session.`);

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
			await this.protocol(`Sessionary ${resident.givenName} ${resident.familyName} present.`);
		}

		await this.protocol(`Session tasks started.`);

		await this.executeTasks();
		await this.close();
	}

	// after session closed for some reason
	async resume(session: LawHouseSession) {
		this.session = session;

		// restart if nothing happened yet
		const sessionaries = await this.session.sessionaries.toArray();

		if (sessionaries.length == 0) {
			await this.execute();

			return;
		}

		await this.protocol(`Session resumed after an unexpected issue occured.`);

		for (let sessionary of sessionaries) {
			this.sessionaries.push(await sessionary.resident.fetch());
		}

		await this.collectConsensus();

		await this.executeTasks();
		await this.close();
	}

	private async collectConsensus() {
		await this.protocol(`Collecting population consensus for legal district ${this.district.name}`);

		// find sessionaries
		// sessionaries decide on the tasks of this session
		this.residents = await this.lawHouse.collectLegallyCompetentResidents(this.district);
		await this.protocol(`Consensus for ${this.district.name}: ${this.residents.length} legally competent residents`);

		await this.protocol(`Collecting registered companies for legal district ${this.district.name}`);

		this.companies = await this.lawHouse.collectCompanies(this.district);
		await this.protocol(`Consensus for ${this.district.name}: ${this.companies.length} companies`);
	}

	private async executeTasks() {
		await this.writeHonestiums();
		await this.certifyBills();
		await this.sendVotingBallots();
		await this.incorporateCompanies();
	}

	private async close() {
		this.session.ended = new Date();
		await this.protocol(`Session finished.`);

		await this.session.update();
	}

	private async protocol(message: string, person?: Resident) {
		console.log(`[law-house session ${this.district.name}]: ${message}`);

		const protocol = new LawHouseSessionProtocol();
		protocol.said = new Date();
		protocol.person = person;
		protocol.message = message;
		protocol.session = this.session;

		await protocol.create();
	}

	private async getOpenBills() {
		return await this.district.bills
			.where(bill => bill.scopeId == this.district.id)
			.where(bill => bill.certified == null)
			.toArray();
	}

	// write honestiums for bills
	private async writeHonestiums() {
		for (let bill of await this.getOpenBills()) {
			const honestiums = await bill.honestiums.toArray();

			while (honestiums.length != this.honestiumSize * 2) {
				const pro = honestiums.filter(honestium => honestium.pro).length < this.honestiumSize;

				await this.protocol(`Writing ${pro ? 'pro' : 'contra'} honestium question for bill '${bill.tag}'`);

				const honestium = new BillHonestium();
				honestium.bill = bill;
				honestium.pro = pro;

				honestium.question = await this.language.debate(
					this.language.lawHouseDebateIntor(this.district),
					this.sessionaries,
					this.language.writeHonestiumQuestion(pro, bill, honestiums),
					async (person, message) => await this.protocol(message, person),
					async (conclusion) => await this.language.verify(this.language.verifyHonestiumQuestion(pro, conclusion))
				);

				await honestium.create();

				await this.protocol(`Prepared ${pro ? 'pro' : 'contra'} honestium question for bill '${bill.tag}': ${honestium.question}`);

				honestiums.push(honestium);
			}
		}
	}

	// sends out ballots for new votes
	private async sendVotingBallots() {
		for (let bill of await this.getOpenBills()) {
			const unansweredHonestiums = await bill.honestiums.where(honestium => honestium.answered == null).count();

			if (!bill.mailed && unansweredHonestiums == 0) {
				await this.protocol(`Mailing ballots for bill '${bill.tag}'`);

				bill.mailed = new Date();
				await bill.update();

				await this.protocol(`Summarizing bill '${bill.tag}' for voters`);
				const honestiums = await bill.honestiums.toArray();
				bill.summary = await this.language.summarize(`
					${bill.title}
					${bill.description}

					${honestiums.map(honestium => `${honestium.question}\n${honestium.answer}`).join('\n\n')}
				`);

				await bill.update();

				await this.protocol(`Sending ballots to ${this.residents.length} residents`);

				for (let resident of this.residents) {
					const vote = new Vote();
					vote.bill = bill;
					vote.resident = resident;

					await vote.create();
				}

				await this.protocol(`Sent ballots`);
			}
		}
	}

	// certifiy completed elections
	private async certifyBills() {
		for (let bill of await this.getOpenBills()) {
			if (bill.mailed) {
				await this.protocol(`Reviewing votes for '${bill.tag}'`);

				const openVotes = await bill.votes.where(vote => vote.submitted == null).count();
				await this.protocol(`${openVotes} open ballots found for '${bill.tag}'`);

				if (openVotes == 0) {
					await this.protocol(`Votes complete for bill '${bill.tag}'`);

					const votes = await bill.votes.toArray();

					bill.pro = votes.filter(vote => vote.pro).length > votes.length / 2;
					bill.certified = new Date();

					await this.protocol(`Bill '${bill.tag}' certified as ${bill.pro ? 'PRO' : 'CONTRA'} at ${bill.certified.toLocaleString()}.`);

					await bill.update();
				}
			}
		}
	}

	// incorporate companies
	private async incorporateCompanies() {
		for (let company of this.companies) {
			if (!company.incorporated) {
				await this.protocol(`Create purpose description for company '${company.name}'.`);

				company.purpose = await this.language.debate(
					this.language.lawHouseDebateIntor(this.district),
					this.sessionaries,
					this.language.extractCompanyPurpose(company),
					async (person, message) => await this.protocol(message, person),
					async (result) => result.split(' ').length <= 2
				);

				company.incorporated = new Date();

				await this.protocol(`Company '${company.name}' incorporated as '${company.purpose}' at ${company.incorporated.toLocaleString()}.`);

				await company.update();
			}
		}
	}
}
