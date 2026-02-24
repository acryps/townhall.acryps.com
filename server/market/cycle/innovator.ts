import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from ".";
import { Time } from "../../../interface/time";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../life/interpreter";
import { Commodity, TradeAsk } from "../../managed/database";

export class MarketInnovator extends MarketIterationGenerator {
	logger = new Logger('innovation');

	generate() {
		return new Promise<Commodity>(async done => {
			const trader = Math.random() > 0.8 && await this.randomEntity();
			this.logger.log(trader ? `inventing as ${trader.name}` : 'inventing basic item');

			const commodities = await this.database.commodity
				.orderByAscending(commodity => commodity.id)
				.toArray();

			const categories = await this.database.commodityCategory
				.where(category => category.parentId != null)
				.toArray();

			const interpreter = new Interpreter('smart');

			interpreter.addTool('innovate', [
				{ name: 'name', type: String },
				{ name: 'description', type: String },
				{ name: 'unit', type: String },
				{ name: 'hsCode', type: String, optional: true }
			], async (name: string, description, unit, hsCode) => {
				name = name.trim();

				const existing = commodities.find(existing => existing.name.toLowerCase() == name.toLowerCase());

				if (existing) {
					throw new ToolError([
						`Commodity '${name}' already exists.`,
						'Come up with something completely different!',

						`Make something related to ${commodities[Math.floor(Math.random() * commodities.length)].name}, ${[...categories].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 5).map(category => category.name).join(', ')}`
					].join('\n'));
				}

				const innovation = new Commodity();
				innovation.tag = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

				innovation.innovated = new Date();
				innovation.name = name;
				innovation.description = description;
				innovation.unit = unit;

				if (hsCode) {
					const code = +hsCode.substring(0, 2);

					innovation.category = await this.database.commodityCategory.first(category => category.harmonizedSystemCode == code);
				}

				this.logger.log(`${trader?.name ?? 'universe'} innovate ${name} in ${hsCode ?? 'any'}`);

				await innovation.create();

				done(innovation);
			});

			interpreter.addTool('skip', [
				{ name: 'confidence', type: Number }
			], () => {
				this.logger.warn(`${trader.name} skip`);

				done(null);
			});

			interpreter.execute(
				new SystemMessage(`
					You are acting as ${trader?.name ?? 'the clerc collecting all the basic commodities'}.
					This is all fictional, it is currently ${Time.now().toDateString()}.

					I will provide you with some details about ${trader?.name ?? 'the realm'}, as well as some recent news and a list of assets ${trader.name} already ownes.
					Additionally, I will list all the commodities that can currently be traded.
					For some of them, I will supply a description as a template.
				`),

				new UserMessage(trader ? await this.compileContext(trader) : ''),
				new UserMessage(await this.compileNews('Recently in the news', await this.getNews())),
				new UserMessage(await this.compileCommoditiesList('Tradeable commodities', commodities)),

				new SystemMessage(trader ? `
					Your goal is to invent a new commodity that ${trader.name} would come up with.
					If you see something basic missing, "innovate" that instead of comming up with something now.
					Do NOT just create variants of existing products, you are only allowed to do this if it really matches what ${trader.name} is known for, and there is no other basic product missing!
					Keep the commodities generic, don't make a "branded" product.

					Some entities, like an investment bank, a propery management company, some holding, do not acutally invent new products.
					If it does not make sense that ${trader.name} would create a product, call the 'skip' tool instead.
					This is very normal.
				` : `
					Your goal is to list every commodity that usually exists.
					You can do this one by one, so only call 'innovate' with the next missing commodity.
					What we are interested in is stuff like wool, wheat, gravel, beer, lamb meat, ...
					Commodities used in every day use by both private people and businesses.

					The following commodities cannot be invented, because they already exist:
					${commodities.map(commodity => `- ${commodity.name}`).join('\n')}
				`),

				new SystemMessage(`
					Here are some pointers, just a selection of random products and categories where you CAN base your invention on.
					${[...commodities].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 5).map(commodity => commodity.name).join(', ')}
					${[...categories].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 5).map(category => category.name).join(', ')}

					The world is not just pretty, people might want some twisted stuff too.
				`),

				new SystemMessage(`
					When you found something, call the 'innovate' tool.
					Provide a name, a description and a unit of the commodity.
					The unit should be in european or Si units, if it is sold by the piece, provice 'pcs'.
					Always use the singular name for a product (Apple, not Apples).
					If you happen to know the global HS Customs code (0 - 99, without subcategories), please provide it.
					Beware that we are in the year ${Time.now().year} and not our current year, a lot of stuff will not have been invented yet!

					Make sure to only invent stuff that does not already exits.
				`)
			);
		});
	}
}
