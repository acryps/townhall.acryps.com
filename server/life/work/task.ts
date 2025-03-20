import { toSimulatedTime } from "../../../interface/time";
import { Company, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";

export const findTask = async (company: Company, offer: WorkOffer) => {
	const interpreter = new Interpreter('smart');

	interpreter.remember([
		new SystemMessage(`
			Write a short job listing for someone working at ${company.name} as a ${offer.title}.
			Write about the the common tasks and requirements, highlighting special stuff required when working this job at ${company.name} compared to other places.
			Call the 'task' function when you found a matching description.
			We are in a fictional world, currently in the year ${toSimulatedTime(new Date())}.

			Company Purpose: ${company.purpose}
		`)
	]);

	let task;

	interpreter.addTool('task', [{ type: String, name: 'task' }], source => task = source.trim());

	while (!task || task.length < 100 || task.length > 800) {
		await interpreter.execute(new UserMessage(`Write a description, ${task?.length < 100 ? 'make the text longer' : (task?.length > 800 ? 'make the text shorter' : '')}`));
	}

	return task;
}
