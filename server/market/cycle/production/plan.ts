import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from "..";
import { Time } from "../../../../interface/time";
import { Interpreter, ToolError, SystemMessage, UserMessage } from "../../../life/interpreter";
import { Commodity, StockSeed, TradeBid } from "../../../managed/database";
import { TradingEntity } from "../../entity";

export class MarketProductionPlanner extends MarketIterationGenerator {
	logger = new Logger('production').task('plan');

	async generate(innovations: Commodity[] = []) {
		const trader = await this.randomEntity();

		this.logger.log(`planning production for ${trader.name}`);

		const target = await this.findProductionTarget();

		if (!commodity) {
			this.logger.warn(`no match found: ${openSeed.matchReason}`);

			return;
		}

		// multiple open stocks might match
		const peers = await this.database.stockSeed
			.where(seed => seed.commodityId == null)
			.where(seed => seed.sourceName.valueOf() == openSeed.sourceName)
			.toArray();

		for (let seed of peers) {
			seed.commodity = commodity;

			await this.quantise(trader, seed, commodity);

			this.logger.log(`matched ${seed.id.split('-')[0]} ${seed.sourceName} (${seed.sourceQuantity}) to ${commodity.name} (${seed.quantity} ${commodity.unit})`);
		}
	}

	findProductionTarget(trader: TradingEntity) {
		return new Promise<Commodity>(async done => {
			const interpreter = new Interpreter('smart');

			interpreter.addTool('plan', [
				{ name: 'name', type: String },
				{ name: 'description', type: String },
			], async (name, description) => {

			});

			await interpreter.execute(
				new SystemMessage(`
					Your job is to analyse the market and find a product that ${trader.name} can and should produce in this environment.
					I will provide you with market details, recent news, details about ${trader.name}.

					You are acting as ${trader.name} now.
				`),

				new SystemMessage(await this.compileNews('Recently in the News', await this.getNews())),

				new SystemMessage(`
					# Task
					You have to find what ${seed.sourceName} with a quantity of ${seed.sourceQuantity} corresponds to.
					For extra context: ${seed.sourceReason}

					The item might be a straight match.
					Example: "Wool" (5kg) corresponds to "Wool" (5kg).

					The name might be slightly different, or be phrased slightly differently but still mean the same thing.
					Example: "Lamb Meat" corresponds to "Sheep Meat"
					Example: "Red Paint" corresponds to "Paint, Red"

					The units might not align, as the commodities exchange sometimes trades in bigger quantities that are not very practical for residential use.
					Example: "Coal" (2kg) will be "Coal" (0.002t)
					Example: "Wool Thread" (25 feet) will be "Wool Thread" 7.62m

					The item might be a combination of two commodities.
					Only do one match call, with the more important device.
					Example: A "Teabox with Tea" corresponds to "Tin Box" (1pcs) and "Tea" (35g). Pick "Tin Box" in this case.

					Some items might have to be downcasted, into a more general form.
					Example: "Antique Hand Made Candle" corresponds to "Hand Made Candle", or even "Candle"
					But never: "Wooden Spoon" to "Wood". Because that is not the same thing.
					And never: "Coffe" to "Tea" just because they both contain coffeine. Just skip it instead.
					You are allowed to skip if it does not match, only match if confident!

					And some items will just not match at all. That is okay.
					We would rather have good matches that you are confident about, instead of lots of matches that are not accurate.
					If none match, call the 'noMatch' tool.
					It is very normal to call noMatch, if it does not match.
					This is not only acceptable, this is good.

					If it matches, call the 'match' tool, and supply the id and a reason.
					Provide a one sentence reason for why this matched.

					For example:
					- Exact match
					- Antique workbench too specific, picked Workbench
					- Exact match, converting one bundle to 25g.
				`)
			);

			// save reason
			await seed.update();

			if (!commodity) {
				return done(null);
			}

			if (!await this.validateProduct(seed, commodity)) {
				return done(null);
			}

			done(commodity);
		});
	}

	validateProduct(seed: StockSeed, commodity: Commodity) {
		return new Promise<Boolean>(async done => {
			const interpreter = new Interpreter('smart');

			interpreter.addTool('validate', [
				{ name: 'confidence', type: Number }
			], async (confidence: number) => {
				this.logger.log(`${seed.sourceName} / ${commodity.name} = ${confidence}`);

				done(confidence > 0.7);
			});

			await interpreter.execute(
				new SystemMessage(`
					Your job is to confirm if the two products are the same.

					Left: ${seed.sourceName}
					Context: ${seed.sourceReason}

					Right: ${commodity.name}
					Context: ${commodity.description}

					The right might be a less specific version of the left, which should still pass (>0.9).
					If the products are not related, set a low score.

					Call the validate tool.
				`)
			);
		});
	}

	quantise(trader: TradingEntity, seed: StockSeed, commodity: Commodity) {
		return new Promise<void>(async done => {
			const interpreter = new Interpreter('smart');

			interpreter.addTool('quantise', [
				{ name: 'quantity', type: Number },
				{ name: 'unit', type: String }
			], async (quantity: number, unit: string) => {
				if (unit.trim() != commodity.unit.trim()) {
					throw new ToolError(`The units do not match up! ${commodity.name} is traded in '${commodity.unit}', but you provided '${unit}'`);
				}

				this.logger.log(`quantise ${commodity.name}, ${seed.sourceQuantity} to ${quantity} ${commodity.unit}`);

				seed.quantity = quantity;

				await seed.update();

				done();
			});

			await interpreter.execute(
				new SystemMessage(`
					Your job is to convert the units into our format.

					# Situation
					We are currently assessing what people in our fictional town are worth.
					This data will be used to allow them to interact with our market simulation, where they can buy and sell stuff.
					We have collected a list of tradeable commodities that are listed at our exchange.
					The commodities have prices attached and are always tracked for supply and demand.

					The people have now written down their belogings, and we have to somehow merge the lists.
					We have already determined, that the user has ${commodity.name}, but we need to make sure that the quantity is correct.

					If the user just wrote down "many" or something like that, assume what ${trader.name} would mean by that in ${commodity.unit} numbers.

					The user wrote down:
					I have ${commodity.name} (${seed.sourceQuantity}).

					${commodity.name} is traded as ${commodity.unit} at the exchange.
					Call 'quantise' with the converted quantity and unit in ${commodity.unit}.
				`)
			);
		});
	}
}
