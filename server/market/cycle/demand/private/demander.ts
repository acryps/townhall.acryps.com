import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from "../../generator";
import { Time } from "../../../../../interface/time";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../../../life/interpreter";
import { Commodity, TradeBid } from "../../../../managed/database";
import { TradingEntity } from "../../../entity";

export class MarketPrivateDemander extends MarketIterationGenerator {
	logger = new Logger('demand').child('private');

	async generate(innovations: Commodity[] = []) {
		const sourceTrader = await this.randomPrivateEntity();
		this.logger.log(`trading as ${sourceTrader.name}`);

		const sourceBids = await this.pickCommodities(sourceTrader, innovations);

		if (!sourceBids.length) {
			return;
		}

		// save source bids
		for (let bid of sourceBids) {
			await bid.create();
		}

		// replicate trade for similar residents
		const replicateLogger = this.logger.task('replicate');

		const traders = await this.pool(sourceTrader, this.configuration.demandReplicationPoolSize, this.configuration.demandReplicationSize);
		replicateLogger.log(`replicate for ${traders.length} traders`);

		for (let trader of traders) {
			const priceMultiplier = (Math.random() - 0.5) * 0.2;
			const quantityMultiplier = (Math.random() - 0.5) * 0.3;

			this.logger.log(`replicating for ${trader.name} (price ${Math.floor(priceMultiplier * 100)}%, quantity ${Math.floor(quantityMultiplier * 100)})`);

			const bids = [...sourceBids];

			while (bids.length > this.configuration.demandReplicationSetSize) {
				bids.splice(Math.floor(Math.random() * bids.length), 1);
			}

			for (let sourceBid of bids) {
				const pricePercision = `${sourceBid.price}`.split('.')[1]?.length ?? 0;
				const quantityPercision = `${sourceBid.quantity}`.split('.')[1]?.length ?? 0;

				const bid = new TradeBid();
				bid.tradeCycle = this.cycle;

				bid.bidder = trader.entity;
				bid.posted = new Date();
				bid.price = +`${(sourceBid.price * (1 + priceMultiplier)).toFixed(pricePercision + 1)}`;
				bid.quantity = +`${(sourceBid.quantity * (1 + quantityMultiplier)).toFixed(pricePercision + 1)}`;
				bid.commodity = sourceBid.commodity;
				bid.reason = sourceBid.reason;

				await bid.create();
			}
		}

		replicateLogger.finish();
	}

	async pickCommodities(trader: TradingEntity, innovations: Commodity[]) {
		const commodities = await this.getTradeableCommodities();
		const interpreter = await this.getSponsoredInterpreter();

		const requests: TradeBid[] = [];

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
			request.tradeCycle = this.cycle;

			request.bidder = trader.entity;
			request.posted = new Date();
			request.price = pricePerUnit;
			request.quantity = quantity;
			request.commodity = commodity;
			request.reason = reason;

			requests.push(request);

			this.logger.log(`${trader.name} bid ${commodity.name}, ${quantity} ${commodity.unit} at ${pricePerUnit}`);
		});

		interpreter.addTool('skip', [
			{ name: 'confidence', type: Number }
		], reason => {
			this.logger.warn(`${trader.name} skip`);
		});

		await interpreter.execute(
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
			new UserMessage(await this.compileCompactCommoditiesList('Tradeable Commodities', commodities)),

			new UserMessage(innovations.length ? await this.compileCommoditiesList('Recent Innovations (take a closer look)', innovations) : ''),

			new UserMessage(await this.compileStock('Owned Assets', trader)),

			new SystemMessage(`
				When you found things, call the 'demand' tool.
				Provide the id of the commodity, a price you'd be willing to pay per unit and a quantity.
				Beware that the units might be in tonnes or other huge quantities.
				Some prices are NaN, if you want one of those items, just guess a price based on the other information.
				Depending on how much you need this commodity, adjust the price from the average price.
				You can request fractions, and demand a very specific price.

				Provide a one sentence reason for why ${trader.name} would demand this.
				For example: I need food for my family dinner

				You can request multiple items at once, try to buy ${this.configuration.demandSetSize} commodities, call the 'demand' tool at least ${Math.floor(this.configuration.demandSetSize / 3)} times.

				You are acting as a private resident.
				Only buy stuff that is relevant to their private life, do not buy stuff for their business, even if they own a store.
				Buy stuff that you need for day to day use.
				No need to stockpile, you can go buy more stuff later.

				You can buy fractions of items.
				For example, if coal is traded in tonnes (t), you may also just buy 0.002t to get 2kg.

				If there is nothing that ${trader.name} could use or it just does not make sense, call 'skip'.
				It is very normal that you call skip, really only create demand if the commodity matches.
				This is very normal.
			`)
		);

		return requests;
	}
}
