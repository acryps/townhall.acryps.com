import { DbContext, Resident } from "../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "./interpreter";

export class PoliticalCompassRater {
	constructor(
		private database: DbContext
	) {}

	async next() {
		const resident = await this.database.resident.first(resident => resident.compassSocial == null);

		if (resident) {
			await this.rate(resident);

			setTimeout(() => this.next(), 50);
		} else {
			setTimeout(() => this.next(), 1000 * 60);
		}
	}

	rate(resident: Resident) {
		console.log(`rating ${resident.tag}`);

		return new Promise<void>(done => {
			const interpreter = new Interpreter();

			interpreter.addTool('compass', [
				{ type: Number, name: 'economic', optional: true },
				{ type: Number, name: 'social', optional: true }
			], async (economic, social) => {
				resident.compassEconomic = economic ?? 0;
				resident.compassSocial = social ?? 0;

				await resident.update();

				done();
			});

			interpreter.execute(
				new SystemMessage(`
					Where would you rate this fictional character on the political compass, given their biography?

					Call the 'compass' tool with your result.
					Economic: -1 = Left, 0 = Neutral, 1 = Right
					Social: -1 = Authoritarian, 0 = Neutral, 1 = Libertarian

					Try to be as fine grained as possible, avoid just doing -1 0 0.5 and 1, go a bit to a 0.35 sometimes.
				`),

				new UserMessage(resident.biography)
			);
		});
	}
}
