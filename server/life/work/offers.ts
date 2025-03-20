import { toSimulatedTime } from "../../../interface/time";
import { Office, WorkContract, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";
import { Language } from "../language";
import { fireWorstMatch } from "./fire";
import { findSkills } from "./skills";

export const createWorkOffers = async (office: Office) => {
	const interpreter = new Interpreter('smart');

	const company = await office.company.fetch();

	const capacity = await office.capacityGrants
		.orderByDescending(capacity => capacity.issued)
		.first();

	const existingOffers = await office.workOffers
		.where(offer => offer.closed == null)
		.toArray();

	if (capacity.size == existingOffers.reduce((sum, item) => item.count + sum, 0)) {
		return;
	}

	console.log(`worker capacity for ${company.name} (target ${capacity.size}) at office ${office.name} does not match published work offers`);

	// find all required jobs
	const assignedOffers: WorkOffer[] = [];

	interpreter.addTool('job', [
		{ name: 'count', type: Number },
		{ name: 'name', type: String }
	], (count: number, name: string) => {
		const existing = assignedOffers.find(offer => offer.title == name);

		if (existing) {
			existing.count += count;

			return;
		}

		let offer = existingOffers.find(offer => offer.title == name);

		if (!offer) {
			offer = new WorkOffer();
			offer.offered = new Date();
			offer.office = office;
			offer.title = name;
		}

		offer.count = count;

		assignedOffers.push(offer);
	});

	interpreter.remember([
		new SystemMessage(`
			given the following company, make a list of all jobs. in total, ${capacity.size} people work at ${company.name}.
			calling the 'job' function for every job.
			keep the list short and make sure to distribute the people according to how many people would work in a real company, even if this means creating big groups of similar workers.
			beware that some activities might be outsourced and are not part of this companies offices.
			we are currently in the year ${toSimulatedTime(new Date())}.

			${existingOffers.length ? 'if possible, reuse the existing jobs and just adjust the counts. relist the existing jobs.' : ''}
		`),
		new UserMessage(`
			company: ${company.name}
			purpose: ${company.purpose}

			${existingOffers.length ? `
			current jobs:
			${existingOffers.map(offer => `- ${offer.count}x ${offer.title}`)}
			` : ''}
		`),
		new SystemMessage(new Language('fast').environment())
	]);

	while (assignedOffers.reduce((sum, item) => item.count + sum, 0) < capacity.size) {
		await interpreter.execute(new SystemMessage('Continue, there are still some jobs missings.'));
	}

	// find what is missing and what is no longer required
	const missingJobs: WorkOffer[] = [];
	const redundantContracts: WorkContract[] = [];

	for (let offer of assignedOffers) {
		if (offer.id) {
			await offer.update();
		} else {
			offer.task = (await findSkills(company, offer)).join(', ');

			await offer.create();
		}

		let currentContractCount = await offer.workContracts.where(contract => contract.canceled == null).count();

		while (currentContractCount > offer.count) {
			redundantContracts.push(await fireWorstMatch(offer));

			currentContractCount--;
		}

		while (currentContractCount < offer.count) {
			missingJobs.push(offer);

			currentContractCount++;
		}
	}

	// fire people first, this is the hard part
	for (let contract of redundantContracts) {
		contract.canceled = new Date();

		await contract.update();

		console.log(`${company.name} terminated work contract ${contract.id}`);
	}

	console.log(`${company.name} is hiring ${missingJobs.length} workers`);
};
