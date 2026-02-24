import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from ".";
import { Time } from "../../../interface/time";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../life/interpreter";
import { Commodity, TradeBid } from "../../managed/database";

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
				{ name: 'quantity', type: Number },
				{ name: 'reason', type: String }
			], async (id, pricePerUnit, quantity, reason) => {
				const commodity = commodities.find(commodity => commodity.id.split('-')[0] == id.replace('id=', ''));

				if (!commodity) {
					throw new ToolError(`No commodity found with id ${id}. The id should look like ${commodities.slice(0, 3).map(commodity => commodity.id.split('-')[0]).join(', ')}`);
				}

				const request = new TradeBid();
				request.bidder = trader.entity;
				request.posted = new Date();
				request.price = pricePerUnit;
				request.quantity = quantity;
				request.commodity = commodity;
				request.reason = reason;

				await request.create();

				this.logger.log(`${trader.name} bid #${request.id.split('-')[0]} ${commodity.name}, ${quantity} ${commodity.unit} at ${pricePerUnit}`);

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
					Something that suits them, something that they need to live or operate as a company or borough.
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

					Provide a one sentence reason for why ${trader.name} would demand this.
					For example:
					- We need to stock wool for future production of sofas (a furniture company)
					- I need food for my family dinner (a private resident)
					- We refill our iron stock to prevent shortage due to closure of Warthsoworh Iron Co. (reaction to news)
					- We restock milk for people in need (acting as a borough)

					Make sure to keep the demands sensible, like:
					- A private resident will only want one or two kilos of beef, not 50kg
					- An iron company needs to buy raw iron before buying cake

					If there is nothing that ${trader.name} could use or it just does not make sense, call 'skip'.
					It is very normal that you call skip, really only create demand if the commodity matches.
					This is very normal.
				`)
			);
		});
	}
}
