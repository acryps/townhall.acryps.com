import { toSimulatedTime } from "../../../interface/time";
import { Company, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";

export const findSkills = async (company: Company, offer: WorkOffer) => {
	const interpreter = new Interpreter('smart');

	interpreter.remember([
		new SystemMessage(`
			What are the seven key skills required to work as a ${offer.title} at ${company.name}?
			Call the 'skill' function for each required skill.
			We are in a fictional world, currently in the year ${toSimulatedTime(new Date())}.

			Company Purpose: ${company.purpose}
		`)
	]);

	const skills: string[] = [];

	interpreter.addTool('skill', [{ type: String, name: 'skill' }], skill => skills.push(skill.trim()));

	while (skills.length < 5) {
		await interpreter.execute(new UserMessage('Continue, list skills.'));
	}

	return skills;
}
