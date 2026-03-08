import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from "..";
import { Time } from "../../../../interface/time";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../../life/interpreter";
import { Commodity, StockSeed, TradeAsk } from "../../../managed/database";

export class MarketSeedSourcers extends MarketIterationGenerator {
	logger = new Logger('seed').task('source');

	generate() {
		return new Promise<number>(async done => {
			const trader = await this.randomEntity(false);
			this.logger.log(`seeding ${trader.name}`);

			const interpreter = new Interpreter('smart');
			const seeds: StockSeed[] = [];

			interpreter.addTool('own', [
				{ name: 'name', type: String },
				{ name: 'quantity', type: String },
				{ name: 'reason', type: String }
			], async (name: string, quantity: string, reason: string) => {
				const seed = new StockSeed();
				seed.owner = trader.entity;
				seed.indexed = new Date();

				seed.sourceName = name;
				seed.sourceQuantity = quantity;
				seed.sourceReason = reason;

				await seed.create();

				seeds.push(seed);

				this.logger.log(`${trader.name} seeds ${name} (${quantity})`);
			});

			const communityStock = await this.getOpenCommunitySeedStock(trader);

			interpreter.remember([
				new SystemMessage(`
					You are acting as ${trader.name}.
					This is all fictional, it is currently ${Time.now().toDateString()}.

					I will provide you with some details about ${trader.name}, as well as some recent news to give you additional context about the environment ${trader.name} exists in.
					Additionally, I will list all the tings ${trader.name} already owns, so you do not need to list this again.

					We are currently trying to assess everybody's situation to know who owns what.
					Your goal is to list what that ${trader.name} owns.
					We need an extensive list, which might have a houndert items in it.
				`),

				new UserMessage(await this.compileContext(trader)),
				new UserMessage(await this.compileStock(`Things owned by ${trader.name}`, trader)),
				new UserMessage(await this.compileSeedStock(`Things owned by ${trader.name} and their immedeate environment (family, company group, ...)`, communityStock)),
				new UserMessage(await this.compileNews('Recently in the news', await this.getNews())),

				new SystemMessage(`
					Call the 'own' tool for everything ${trader.name} owns.
					Provide a name of the item, as well as a quantity and a reason/story why.
					This is a snapshot of their current life.
					Include stuff that one owns for a long time, like their furniture, as well as day to day items, in their current quantity, like food.
					Call the tool a couple times, we will ask for more if required.

					For example:
					Bed: 1pcs. Gift from mother
					Milk: 2L. For cake for Waynes birthday
					Beef: 750g. For dinner
					Candle: 6pcs. To illuminate during the dark months. Special candle with ornament.

					The world is not just pretty, people might own some twisted stuff too.
				`)
			]);

			for (let iteration = 0; iteration < 4; iteration++) {
				await interpreter.execute(new SystemMessage('Find twenty five items, call own for each of them'));
			}

			this.logger.log(`seeded ${seeds.length} for ${trader.name}`);

			done(seeds.length);
		});
	}
}
