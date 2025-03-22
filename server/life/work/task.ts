import { toSimulatedTime } from "../../../interface/time";
import { Company, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";
import { Language } from "../language";

export const findTask = async (company: Company, offer: WorkOffer) => {
	const language = new Language('fast');

	let response = '';

	while (response.length < 100 || response.length > 800) {
		response = (await language.respondTextArray(`
			Write a short job listing for someone working at ${company.name} as a ${offer.title}.
			Write about the the common tasks and requirements, highlighting special stuff required when working this job at ${company.name} compared to other places.
			Do not write it as a list.
			Make each sentence an item in the JSON array.

			Company: ${company.name}
			Company description: ${company.description}

			${language.environment()}
			${language.metaRules()}
		`)).join('\n');
	}

	console.log(`<${response}>`);

	return response;
}
