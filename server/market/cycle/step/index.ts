import { MarketCycleGenerator } from "..";
import { Interpreter } from "../../../life/interpreter";
import { OpenAiInterpreterProvider } from "../../../life/interpreter/provider/openai";
import { DbContext, MarketCycle, TokenSponsor } from "../../../managed/database";
import { MarketManager } from "../../manager";
import { MarketTracker } from "../../tracker";
import { Logger, TaskLogger } from "@acryps/log";

export abstract class MarketCycleGeneratorStep {
	logger: Logger;

	constructor(
		public database: DbContext,
		public tracker: MarketTracker,
		public cycle: MarketCycle,

		public sponsor: TokenSponsor,
		logger: Logger,
		name: string
	) {
		this.logger = logger.child(name);
	}

	abstract generate(): Promise<void>;

	getInterpreter() {
		return new Interpreter(new OpenAiInterpreterProvider(this.sponsor));
	}
}
