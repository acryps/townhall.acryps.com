import { convertToLegalCompanyName } from "../../../interface/company";
import { Time } from "../../../interface/time";
import { Company, DbContext, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";

export const fillSalary = async (database: DbContext) => {
	const companies = await database.company
		.toArray();

	while (true) {
		const pending = await database.workOffer
			.where(offer => offer.dailySalary == null)
			.orderByAscending(offer => offer.id)
			.include(offer => offer.office)
			.limit(10)
			.toArray();

		if (pending.length == 0) {
			return;
		}

		const references = await database.workOffer
			.where(offer => offer.dailySalary != null)
			.include(offer => offer.office)
			.limit(1000)
			.toArray();

		references.sort(() => Math.random() > 0.5 ? 1 : -1);

		for (let offer of pending) {
			await estimateSalary(database, offer, companies, references.slice(0, 10));
		}
	}
};

const estimateSalary = async (database: DbContext, offer: WorkOffer, companies: Company[], references: WorkOffer[]) => {
	const interpreter = new Interpreter('fast');
	interpreter.addTool('salary', [{ name: 'daily', type: Number }], value => offer.dailySalary = value + Math.floor(Math.random() * 100) / 100);

	console.log(`salary ${offer.title}`);

	interpreter.remember([
		new SystemMessage(`
			# Situation
			We are running a civilization simulation.
			It is currently ${Time.now().toString()}.
			Everything here is fictional, its a bit of a mix of England and Switzerland.

			We are creating a market simulation.
			To do so, we need to know approximately how much people earn.

			Based on the provided context, estimate a DAILY salary.
			What a worker would earn during that one day.
			Emit floating values, like 1.23.
		`)
	]);

	for (let reference of references) {
		interpreter.remember([
			await describe(reference, companies),
			Interpreter.simulateToolReponse('salary', { daily: reference.dailySalary })
		]);
	}

	await interpreter.execute(await describe(offer, companies));

	await offer.update();
	console.log(`salary ${offer.title}: ${offer.dailySalary}`);
};

const describe = async (offer: WorkOffer, companies: Company[]) => {
	const office = await offer.office.fetch();
	const company = companies.find(company => company.id == office.companyId);

	return new UserMessage(`
		# ${offer.title}
		Working for ${convertToLegalCompanyName(company)} at ${office.name}.

		${offer.task}
	`);
};
