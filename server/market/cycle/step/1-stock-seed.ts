import { MarketCycleGeneratorStep } from ".";
import { Time } from "../../../../interface/time";
import { formatTradingUnit, parseTradingUnitValue } from "../../../../interface/trading-unit";
import { SystemMessage, ToolError, UserMessage } from "../../../life/interpreter";
import { StockSeedRule, StockSeedRuleOperation, StockSeedRuleProperty } from "../../../managed/database";

export class StockSeedRuleMarketCycleGeneratorStep extends MarketCycleGeneratorStep {
	async generate() {
		const commodity = await this.database.commodity
			.orderByAscending(commodity => commodity.id) // pseudo-random
			.where(commodity => commodity.tradingUnit != null) // only with proper units
			.first(commodity => commodity.seedRulesCreated == null);

		if (!commodity) {
			return;
		}

		this.logger.log(`creating rules for '${commodity.name}' (${commodity.tag})`);

		// delete unfinished rules
		for (let rule of await commodity.stockSeedRules.toArray()) {
			await rule.delete();
		}

		const parameters = await this.database.residentAssessmentParameter
			.orderByAscending(parameter => parameter.name)
			.toArray();

		const interpreter = this.getInterpreter();

		interpreter.remember([new SystemMessage(`
			We are creating a market simulation. Current year: ${new Time(new Date()).year}, our imaginary country is somewhere in Europe, a mix between Switzerland and England.

			Your job is to figure out, how much of a given commodity a certain group of people owns.
			Each commodity has a quality variable, ranging from 0 (basic / economic version) to 20 (advanced / high quality version).

			Each resident is assessed on a bunch of parameters.
			They have a value from 0 - 1 for each of the following parameters:
			${parameters.map(parameter => `- ${parameter.name} (0.0 = ${parameter.low}, 1.0 = ${parameter.high})`).join('\n')}

			You must create a rule list, which we will use to populate our people's inventory with.

			Lets make an example using Scissors traded in 'pcs':

			People with high selfSufficiency tend to need tools, where as people who buy stuff finished dont need that many tools.
			Most people still have some, so let people have them.
			We can create the following rules:
			self sufficiency 0-0.7: quantity = 0pcs-1pcs
			self sufficiency 0.7-0.8: quantity = 1pcs-4pcs
			self sufficiency 0.8-1: quantity = 2pcs-4pcs
			our system will randomly assign values in the defined quantity range to each resident

			wealthy people tend to have a couple spares of everything
			income level 0.8-1: quantity + 1pcs-2pcs
			use the + to just add some on top of the already set value

			people who spend freely usually buy a better tool
			thriftiness 0-0.6: quality = 10-15
			thriftiness 0.6-1: quality = 5-10

			Values with = set a value, values with + add to a value, - subtract from a value.
			Quantity is used to determine how many of something someone has.
			Quality in which quality it is (0 - 20).

			Guidelines:
			- Only use tags that have a believable causal relationship with the item.
			- Quantity rules represent long-term ownership, not current purchases.
			- Quality ranges always stay within 0–20 after modifiers.
			- Multiple rules are intended to stack unless an = establishes the initial value.
			- Avoid using every tag unnecessarily, most commodities should only depend on 3–7 relevant characteristics.

			We will apply this to every member of a family. Only consider what a single person requires, or for shared goods, use fractions.
			There are a lot of tradable commodities that no private resident would ever own, in that case, just don't return any rules.

			Beware that there are a lot of tradable items, even if this is a item that some people would have, you can be very restricting with your rules.
			For example, only make people with some parameter over 0.8 own some things, and do not even define a rule for anything under that.
		`)]);

		// create a tool for each parameter that is available
		const rules: StockSeedRule[] = [];

		const operations: Record<string, StockSeedRuleOperation> = {
			'=': StockSeedRuleOperation.apply,
			'-': StockSeedRuleOperation.subtract,
			'+': StockSeedRuleOperation.add
		};

		const unit = await commodity.tradingUnit.fetch();
		const unitBaseline = 10 ** commodity.tradingUnitRetailBaseline;
		const unitBaseValue = formatTradingUnit(unit, unitBaseline);

		this.logger.log(`traded in ${unit.name}, baseline '${unitBaseValue}'`);

		if (unitBaseValue.match(/[0-9]+/)[0] != '1') {
			throw new Error(`Unit retail baseline must resolve to a unit shorthand, cannot be '${unitBaseValue}'.`);
		}

		for (let parameter of parameters) {
			interpreter.addTool(parameter.name, [
				{ name: 'parameterMinimum', type: Number },
				{ name: 'parameterMaximum', type: Number },
				{ name: 'property', type: String },
				{ name: 'operation', type: String },
				{ name: 'valueMinimum', type: String },
				{ name: 'valueMaximum', type: String },
			], async (parameterMinimum, parameterMaximum, property, operation, valueMinimum, valueMaximum) => {
				if (!(property in StockSeedRuleProperty)) {
					throw new ToolError(`Cannot '${property}', use: ${Object.keys(StockSeedRuleProperty)}`);
				}

				if (!(operation in operations)) {
					throw new ToolError(`Cannot '${operation}', use: ${Object.keys(operations)}`);
				}

				const rule = new StockSeedRule();
				rule.commodity = commodity;
				rule.parameter = parameter;
				rule.parameterMinimum = parameterMinimum;
				rule.parameterMaximum = parameterMaximum;
				rule.property = property;
				rule.operation = operations[operation];

				switch (property) {
					case StockSeedRuleProperty.quality: {
						rule.valueMinimum = +valueMinimum;
						rule.valueMaximum = +valueMaximum;

						break;
					}

					case StockSeedRuleProperty.quantity: {
						try {
							rule.valueMinimum = parseTradingUnitValue(unit, valueMinimum);
							rule.valueMaximum = parseTradingUnitValue(unit, valueMaximum);
						} catch (error) {
							throw new ToolError(`The quantity value must include the unit, '${valueMinimum}' or '${valueMaximum}' is invalid, valid example: '${unitBaseValue}'`);
						}

						break;
					}
				}

				if (parameterMinimum > parameterMaximum || rule.valueMinimum > rule.valueMaximum) {
					throw new ToolError(`Values inverted, minimum must be bigger or equal than maximum`);
				}

				rules.push(rule);
			});
		}

		await interpreter.execute(new UserMessage(`
			Commodity: ${commodity.name}
			Traded in ${unitBaseValue} units, example: '${formatTradingUnit(unit, unitBaseline * 2)}', '${formatTradingUnit(unit, unitBaseline * 3.14)}'.
			All quantity rules must use this unit format!

			${commodity.description}
		`));

		for (let rule of rules) {
			const parameter = await rule.parameter.fetch();
			await rule.create();

			this.logger.log(`rule #${rule.id.split('-')[0]}: ${parameter.name} ${rule.parameterMinimum}-${rule.parameterMaximum}: ${rule.property} ${rule.operation} ${rule.valueMinimum}-${rule.valueMaximum}`);
		}

		commodity.seedRulesCreated = new Date();
		await commodity.update();
	}
}
