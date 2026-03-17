import { Logger } from "@acryps/log";
import { convertToLegalCompanyName } from "../../interface/company";
import { Time } from "../../interface/time";
import { Borough, DbContext, Resident, ResidentAssessment, ResidentAssessmentParameter } from "../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "./interpreter";
import { time } from "console";

export class ResidentAssessor {
	logger = new Logger('life').task('resident-assessor');

	constructor(
		private database: DbContext
	) {}

	async next() {
		const candidates = await this.database.resident
			.where(resident => resident.assessed == null)
			.orderByAscending(resident => resident.id)
			.limit(5)
			.toArray();

		if (candidates.length) {
			const resident = candidates[Math.floor(Math.random() * candidates.length)];

			await this.assess(resident);

			setTimeout(() => this.next(), 50);
		} else {
			setTimeout(() => this.next(), 1000 * 60);
		}
	}

	async assess(resident: Resident) {
		const logger = this.logger.task(resident.tag);
		logger.log('assessing');

		const parameters = await this.database.residentAssessmentParameter.toArray();

		await new Promise<void>(async done => {
			const interpreter = new Interpreter();

			const details: string[] = [
				`Age: ${new Time(resident.birthday).age()}`,
				resident.biography
			];

			const mentionedBoroughs: Borough[] = [];

			const workContracts = await resident.workContracts.toArray();

			if (workContracts.length) {
				details.push('## Work');

				for (let contract of workContracts) {
					const offer = await contract.offer.fetch();
					const office = await offer.office.fetch();
					const company = await office.company.fetch();

					const property = await office.property.fetch();
					const borough = await property.borough.fetch();
					mentionedBoroughs.push(borough);

					details.push(`${contract.canceled ? 'Worked' : 'Works'} as ${offer.title} for ${convertToLegalCompanyName(company)} in ${borough?.name}`);
				}
			} else {
				details.push(`
					## Work
					${resident.givenName} does not have any work registered.
					Maybe they have never worked, or they have done informal jobs or care work.
				`);
			}

			const relations = await this.database.residentRelationship
				.where(relation => relation.initiatorId == resident.id || relation.peerId == resident.id)
				.include(relation => relation.initiator)
				.include(relation => relation.peer)
				.toArray();

			if (relations.length) {
				details.push(`## Relations`);

				for (let relation of relations) {
					const initiator = await relation.initiator.fetch();
					const peer = await relation.peer.fetch();

					details.push(`
					${relation.purpose} ${initiator.givenName} ${initiator.familyName} and ${peer.givenName} ${peer.familyName}: ${relation.connection}
				`);
				}
			}

			const home = await resident.mainTenancy.fetch();

			if (home) {
				const dwelling = await home.dwelling.fetch();
				const property = await dwelling.property.fetch();

				const borough = await property.borough.fetch();
				mentionedBoroughs.push(borough);

				details.push(`
					## Home
					${resident.givenName} lives in ${property.name ?? `#${property.id}`} ${borough.name}.
				`);

				const coTentants = await dwelling.tenants
					.where(tenant => tenant.id != home.id)
					.include(tenant => tenant.inhabitant)
					.toArray();

				for (let tenant of coTentants) {
					const inhabitant = await tenant.inhabitant.fetch();

					details.push(`Co Tenant: ${inhabitant.givenName} ${inhabitant.familyName}, aged ${new Time(inhabitant.birthday).age()}`)
				}
			} else {
				details.push(`
					## Home
					No home is registered for ${resident.givenName}.
					They might not have one, or they might not be registered.
				`);
			}

			const saveTasks: Promise<any>[] = [];

			for (let parameter of parameters) {
				interpreter.addTool(parameter.name, [
					{ name: 'value', type: Number, optional: true },
					{ name: 'confidence', type: Number, optional: true }
				], async (value: number, confidence: number) => {
					logger.log(`${parameter.name}: ${value} (${confidence})`);

					if (value === null) {
						return;
					}

					const assessment = new ResidentAssessment();
					assessment.parameter = parameter;
					assessment.resident = resident;
					assessment.assessed = new Date();

					assessment.value = Math.min(1.0, Math.max(0.0, value));
					assessment.confidence = Math.min(1.0, Math.max(0.0, confidence));

					saveTasks.push(assessment.create());
				});
			}

			if (mentionedBoroughs.length) {
				details.push(`
					## Mentioned Boroughs
					Here some details about the boroughs mentioned before

					${mentionedBoroughs.map(borough => `
						### ${borough.name}
						${borough.description}
					`)}
				`);
			}

			try {
				await interpreter.execute(
					new SystemMessage(`
					# Situation
					We are currently trying to assess our fictional characters one by one to analyse our virtual civilisation.

					I will provide you with details on ${resident.familyName} ${resident.givenName}.
					You will see a biography, as well as some details about them.
				`),

					new UserMessage(details.join('\n\n')),

					new SystemMessage(`
					# Task
					Please assess the person, calling the tool for each parameter.
					Provide a value and confidence.

					# Parameters
					Call the tools for all of the following parameters.

					${parameters.map(parameter => `
						## ${parameter.name}
						${parameter.prompt}

						0.0 when ${parameter.low}
						1.0 when ${parameter.high}
					`).join('')}
				`)
				);
			} catch (error) {
				logger.error(`assess failed. marking as assessed`, error);

				return done();
			}

			logger.log('assessed, saving');

			await Promise.all(saveTasks);

			resident.assessed = new Date();
			await resident.update();

			logger.finish();

			done();
		});
	}
}
