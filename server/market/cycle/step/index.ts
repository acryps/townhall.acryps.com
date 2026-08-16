import { Queryable } from "vlquery";
import { MarketCycleGenerator } from "..";
import { Interpreter, SystemMessage } from "../../../life/interpreter";
import { OpenAiInterpreterProvider } from "../../../life/interpreter/provider/openai";
import { DbContext, LegalEntity, LegalEntityQueryProxy, MarketCycle, TokenSponsor } from "../../../managed/database";
import { MarketManager } from "../../manager";
import { MarketTracker } from "../../tracker";
import { Logger, TaskLogger } from "@acryps/log";
import { TradingEntity } from "../../entity";
import { Time } from "../../../../interface/time";
import { MarketSituationParameter } from "../situation";

export abstract class MarketCycleGeneratorStep {
	logger: Logger;

	constructor(
		public database: DbContext,
		public tracker: MarketTracker,
		public cycle: MarketCycle,
		public situation: MarketSituationParameter[],

		public sponsor: TokenSponsor,
		logger: Logger,
		name: string
	) {
		this.logger = logger.child(name);
	}

	abstract generate(): Promise<void>;

	getInterpreter() {
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(this.sponsor));

		interpreter.remember([
			new SystemMessage(`
				We are creating a market simulation.

				Current year: ${new Time(new Date()).year},
				our imaginary country is somewhere in Europe,
				a mix between Switzerland and England.

				The current market situation is ${MarketSituationParameter.toSituationString(this.situation, this.cycle)}.
				Context: ${this.cycle.context}
			`)
		]);

		return interpreter;
	}

	async randomCommodity() {
		const count = await this.database.commodity.count();

		return this.database.commodity
			.skip(Math.floor(Math.random() * count))
			.first();
	}

	async randomEntity(tradeVolumeAdjusted = true) {
		let query: () => Queryable<LegalEntity, LegalEntityQueryProxy>;

		if (tradeVolumeAdjusted) {
			if (Math.random() < 0.2) {
				// any item
				query = () => this.database.legalEntity
					.where(entity => entity.state == null);
			} else {
				// a company
				query = () => this.database.legalEntity
					.where(entity => entity.state == null)
					.where(entity => entity.companyId != null);
			}
		} else {
			query = () => this.database.legalEntity
				.where(entity => entity.state == null);
		}

		const entityCount = await query().count() - 1;
		const entity = await query()
			.skip(Math.floor(Math.random() * entityCount))
			.first();

		return await TradingEntity.from(entity, this.database);
	}
}
