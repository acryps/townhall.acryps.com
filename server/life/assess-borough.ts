import { Logger } from "@acryps/log";
import { Borough, BoroughAssessment, BoroughAssessmentParameter, DbContext } from "../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "./interpreter";

// mirrors CompanyAssessor: scores one (borough, parameter) pair at a time, so newly added parameters
// can be backfilled across every borough without re-touching the ones they were already scored on
export class BoroughAssessor {
	logger = new Logger('life').task('borough-assessor');

	constructor(
		private database: DbContext
	) {}

	async next() {
		const candidate = await this.findCandidate();

		if (candidate) {
			await this.assess(candidate.borough, candidate.parameter);

			setTimeout(() => this.next(), 50);
		} else {
			setTimeout(() => this.next(), 1000 * 60);
		}
	}

	private async findCandidate() {
		const parameters = await this.database.boroughAssessmentParameter.toArray();

		if (!parameters.length) {
			return null;
		}

		const parameter = parameters[Math.floor(Math.random() * parameters.length)];

		const assessedBoroughIds = (await this.database.boroughAssessment
			.where(assessment => assessment.parameterId == parameter.id)
			.toArray()).map(assessment => assessment.boroughId);

		const boroughs = await this.database.borough
			.orderByAscending(borough => borough.id)
			.toArray();

		const pending = boroughs.filter(borough => !assessedBoroughIds.includes(borough.id));

		if (!pending.length) {
			return null;
		}

		return {
			borough: pending[Math.floor(Math.random() * pending.length)],
			parameter
		};
	}

	async assess(borough: Borough, parameter: BoroughAssessmentParameter) {
		const logger = this.logger.task(borough.tag ?? borough.id.split('-')[0]);
		logger.log(`assessing '${parameter.name}'`);

		const details: string[] = [
			borough.description
		];

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

				const assessment = new BoroughAssessment();
				assessment.parameter = parameter;
				assessment.borough = borough;
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
						We are currently trying to assess our fictional boroughs one by one to analyse our virtual civilisation.

						I will provide you with details on '${borough.name}'.
					`),

					new UserMessage(details.join('\n\n')),

					new SystemMessage(`
						# Task
						Please assess the borough on a single parameter by calling the '${parameter.name}' tool.
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
				const assessment = new BoroughAssessment();
				assessment.parameter = parameter;
				assessment.borough = borough;
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
