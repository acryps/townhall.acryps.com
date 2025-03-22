import { toSimulatedTime } from "../../../interface/time";
import { Office, WorkContract, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";
import { Language } from "../language";
import { fireWorstMatch } from "./fire";
import { adjustRoleList } from "./list";
import { findTask } from "./task";

export const updateWorkOffers = async (office: Office) => {
	const company = await office.company.fetch();

	const capacity = await office.capacityGrants
		.orderByDescending(capacity => capacity.issued)
		.first();

	const existingOfferQuery = () => office.workOffers
		.where(offer => offer.closed == null);

	const existingOffers = await existingOfferQuery().toArray();

	const updatedRoles = await adjustRoleList(office, await existingOfferQuery().toArray(), capacity.size);

	if (!updatedRoles.changed) {
		return;
	}

	const redundantContracts: WorkContract[] = [];

	for (let created of updatedRoles.addedRoles) {
		created.office = office;
		created.offered = new Date();
		created.task = await findTask(company, created);

		await created.create();

		console.log(`${company.name} newly offers ${created.title}`);
	}

	for (let updated of updatedRoles.resizedRoles) {
		let count = await updated.workContracts.where(contract => contract.canceled == null).count();

		while (count > updated.count) {
			redundantContracts.push(await fireWorstMatch(updated));

			count--;
		}

		await updated.update();

		console.log(`${company.name} changed ${updated.title} offer count to ${updated.count}`);
	}

	for (let removed of updatedRoles.removedRoles) {
		redundantContracts.push(
			...await removed.workContracts
				.where(contract => contract.canceled == null)
				.toArray()
		);

		removed.closed = new Date();
		await removed.update();

		console.log(`${company.name} no longer offers ${removed.title}`);
	}

	console.log(`${company.name} will terminate ${redundantContracts.length} contracts.`);

	// fire people (this is the hard part)
	// they might find new jobs at the same office
	for (let contract of redundantContracts) {
		contract.canceled = new Date();

		await contract.update();

		console.log(`${company.name} terminated work contract ${contract.id}`);
	}

	for (let offer of updatedRoles.roles) {
		const contracts = await offer.workContracts.where(contract => contract.canceled == null).count();

		console.log(`${company.name} is hiring ${offer.count - contracts} ${offer.title}`);
	}
};
