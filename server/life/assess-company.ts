import { Logger } from "@acryps/log";
import { Company, CompanyAssessment, CompanyAssessmentParameter, DbContext } from "../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "./interpreter";
import { Task } from "../scheduler";

// unlike ResidentAssessor, this scores one (company, parameter) pair at a time instead of every parameter in one shot.
// parameters get added continuously (eg new technology-bound ones), so existing companies must be able to be
// backfilled against just the new parameter without re-touching everything they were already scored on
export class CompanyAssessor extends Task {
	logger = new Logger('life').task('company-assessor');

	constructor(
		private database: DbContext
	) {
		super();
	}

	async run() {
		const candidate = await this.findCandidate();

		if (candidate) {
			await this.assess(candidate.company, candidate.parameter);

			return 50;
		}

		return 1000 * 60;
	}

	private async findCandidate() {
		const parameters = await this.database.companyAssessmentParameter.toArray();

		if (!parameters.length) {
			return null;
		}

		// pick a random parameter first, then find a company still missing it
		// keeps this cheap even while a freshly added parameter is being backfilled across every company
		const parameter = parameters[Math.floor(Math.random() * parameters.length)];

		const assessedCompanyIds = (await this.database.companyAssessment
			.where(assessment => assessment.parameterId == parameter.id)
			.toArray()).map(assessment => assessment.companyId);

		const companies = await this.database.company
			.orderByAscending(company => company.id)
			.toArray();

		const pending = companies.filter(company => !assessedCompanyIds.includes(company.id));

		if (!pending.length) {
			return null;
		}

		return {
			company: pending[Math.floor(Math.random() * pending.length)],
			parameter
		};
	}

	async assess(company: Company, parameter: CompanyAssessmentParameter) {
		const logger = this.logger.task(company.tag ?? company.id.split('-')[0]);
		logger.log(`assessing '${parameter.name}'`);

		const details: string[] = [
			`Type: ${company.type}`,
			company.purpose,
			company.description
		];

		const offices = await company.offices.toArray();

		if (offices.length) {
			details.push('## Offices');

			for (let office of offices) {
				const property = await office.property.fetch();
				const borough = property ? await property.borough.fetch() : null;

				details.push(`${office.name ?? 'Office'} in ${borough?.name ?? 'an unregistered location'}${office.closed ? ' (closed)' : ''}`);
			}
		}

		await new Promise<void>(async done => {
			const interpreter = new Interpreter();

			let saved = false;

			interpreter.addTool(parameter.name, [
				{ name: 'value', type: Number, optional: true },
				{ name: 'confidence', type: Number, optional: true }
			], async (value: number, confidence: number) => {
				logger.log(`${parameter.name}: ${value} (${confidence})`);

				if (value === null) {
					return;
				}

				const assessment = new CompanyAssessment();
				assessment.parameter = parameter;
				assessment.company = company;
				assessment.assessed = new Date();

				assessment.value = Math.min(1.0, Math.max(0.0, value));
				assessment.confidence = Math.min(1.0, Math.max(0.0, confidence));

				saved = true;
				await assessment.create();
			});

			try {
				await interpreter.execute(
					new SystemMessage(`
						# Situation
						We are currently trying to assess our fictional companies one by one to analyse our virtual economy.

						I will provide you with details on '${company.name}'.
					`),

					new UserMessage(details.join('\n\n')),

					new SystemMessage(`
						# Task
						Please assess the company on a single parameter by calling the '${parameter.name}' tool.
						Provide a value and confidence.

						## ${parameter.name}
						${parameter.prompt}

						0.0 when ${parameter.low}
						1.0 when ${parameter.high}
					`)
				);
			} catch (error) {
				logger.error(`assess failed`, error);

				return done();
			}

			if (!saved) {
				// still record a neutral assessment so this pair doesn't get endlessly retried
				const assessment = new CompanyAssessment();
				assessment.parameter = parameter;
				assessment.company = company;
				assessment.assessed = new Date();
				assessment.value = 0.5;
				assessment.confidence = 0;

				await assessment.create();
			}

			logger.finish();

			done();
		});
	}
}
