import { MarketIterationGenerator } from ".";
import { Time } from "../../../interface/time";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../life/interpreter";
import { Logger } from "../../log";
import { Commodity, TradeAsk } from "../../managed/database";

export class MarketDemander extends MarketIterationGenerator {
	logger = new Logger('demand');

	generate(innovations: Commodity[] = []) {
		return new Promise<void>(async done => {
			const trader = await this.randomEntity();
			this.logger.log(`trading as ${trader.name}`);

			const commodities = await this.getCommodities();

			const interpreter = new Interpreter('smart');

			interpreter.addTool('demand', [
				{ name: 'id', type: String },
				{ name: 'pricePerUnit', type: Number },
				{ name: 'quantity', type: Number }
			], async (id, pricePerUnit, quantity) => {
				const commodity = commodities.find(commodity => commodity.id.split('-')[0] == id.replace('id=', ''));

				if (!commodity) {
					throw new ToolError(`No commodity found with id ${id}. The id should look like ${commodities.slice(0, 3).map(commodity => commodity.id.split('-')[0]).join(', ')}`);
				}

				const request = new TradeAsk();
				request.asker = trader.entity;
				request.posted = new Date();
				request.price = pricePerUnit;
				request.quantity = quantity;
				request.commodity = commodity;

				this.logger.log(`${trader.name} ask ${commodity.name}, ${quantity} ${commodity.unit} at ${pricePerUnit}`);

				await request.create();

				done();
			});

			interpreter.addTool('skip', [
				{ name: 'confidence', type: Number }
			], reason => {
				this.logger.warn(`${trader.name} skip`);

				done();
			});

			interpreter.execute(
				new SystemMessage(`
					You are acting as ${trader.name}.
					This is all fictional, it is currently ${Time.now().toDateString()}.

					I will provide you with some details about ${trader.name}, as well as some recent news and a list of assets ${trader.name} already ownes.
					Additionally, I will list some tradeable commodities.

					Your goal is to pick a commodity that ${trader.name} would be interested to buy.
				`),

				new UserMessage(await this.compileContext(trader)),
				new UserMessage(await this.compileNews('Recently in the news', await this.getNews())),
				new UserMessage(await this.compileCommoditiesList('Tradeable Commodities', commodities)),

				new UserMessage(innovations.length ? await this.compileCommoditiesList('Recent Innovations (take a closer look)', commodities) : ''),

				new UserMessage(await this.compileStock('Owned Assets', trader)),

				new SystemMessage(`
					When you found something, call the 'demand' tool.
					Provide the id of the commodity, a price you'd be willing to pay per unit and a quantity.
					Beware that the units might be in tonnes or other huge quantities.
					Some prices are NaN, if you want one of those items, just guess a price based on the other information.
					Depending on how much you need this commodity, adjust the price from the average price.
					You can request fractions, and demand a very specific price.

					Make sure to check:
					- Does a private resident really buy 100kg of beef?
					- Does a company that produces tunneling segments really need to buy apples?

					If there is nothing that ${trader.name} could use or it just does not make sense, call 'skip'.
					It is very normal that you call skip, really only create demand if the commodity matches.
					This is very normal.
				`)
			);
		});
	}
}
