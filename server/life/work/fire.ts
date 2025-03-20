import { toSimulatedAge } from "../../../interface/time";
import { WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";

export const fireWorstMatch = async (offer: WorkOffer) => {
	const interpreter = new Interpreter('smart');

	const office = await offer.office.fetch();
	const company = await office.company.fetch();

	const contracts = await offer.workContracts
		.where(contract => contract.canceled == null)
		.limit(25)
		.toArray();

	interpreter.remember([
		new SystemMessage(`
			You have a difficult job but don't worry, this is all fictional.
			The ${office.name} is downsizing.
			You need to fire the worker with the least good match between the job description and their profile.

			When you make your decision, call the 'fire' function with the persons id.
		`),
		new UserMessage(`
			The position for working at ${company.name} as ${offer.title} requires the following skillset:
			${offer.task}

			The following people currently work in this position:
			${contracts.map(contract => `${contract.id.split('-')[0]}, employed since ${toSimulatedAge(contract.signed)}: ${contract.match}`).join('\n')}
		`)
	]);

	let fired;

	interpreter.addTool('fire', [{ type: String, name: 'id' }], id => {
		fired = contracts.find(contract => contract.id.split('-')[0] == id);
	});

	while (!fired) {
		interpreter.execute(new UserMessage('I know this is difficult, but please execute the task'));
	}

	return fired;
};
