import { MarketCycleGeneratorStep } from ".";
import { Time } from "../../../../interface/time";
import { formatTradingUnit, parseTradingUnitValue } from "../../../../interface/trading-unit";
import { AssistantMessage, Interpreter, SystemMessage, ToolError, UserMessage } from "../../../life/interpreter";
import { Commodity, CommodityTradingUnit, ResidentAssessmentParameter, ResidentialDemand, ResidentialDemandRule, StockSeedRule, StockSeedRuleOperation, StockSeedRuleProperty } from "../../../managed/database";

export class ResidentialDemandMarketCycleGeneratorStep extends MarketCycleGeneratorStep {
	parameters: ResidentAssessmentParameter[];

	operations: Record<string, StockSeedRuleOperation> = {
		'=': StockSeedRuleOperation.apply,
		'-': StockSeedRuleOperation.subtract,
		'+': StockSeedRuleOperation.add
	};

	async generate() {
		const commodity = await this.randomCommodity();

		this.logger.log(`creating rules for '${commodity.name}' (${commodity.tag})`);

		// create rule group
		const demand = new ResidentialDemand();
		demand.commodity = commodity;

		await demand.create();

		this.parameters = await this.database.residentAssessmentParameter
			.orderByAscending(parameter => parameter.name)
			.toArray();

		const interpreter = this.getInterpreter();

		interpreter.remember([new SystemMessage(`
			Your job is to rate how much people want / need a certain commodity.
			Not everyone will get their demands fulfilled, but the companies will try to produce accordingly.

			Each commodity has a quality variable, ranging from 0 (basic / economic version) to 20 (advanced / high quality version).

			Each resident is assessed on a bunch of parameters.
			They have a value from 0 - 1 for each of the following parameters:
			${this.parameters.map(parameter => `- ${parameter.name} (0.0 = ${parameter.low}, 1.0 = ${parameter.high})`).join('\n')}

			You must create a rule list, which we will use to control the market with.

			The rules should represent what people would like to have in their stock.
			This will always be a bit more than they already have.
			Ignore the consumption, it will automatically be subtracted, just figure out how much they want to have on them / at home.

			Lets make an example using Bread traded in 'kg':

			Most people eat bread, so they want to always have some bread at home.
			People who are self sufficient might buy more grain and make their own bread.
			We can create the following rules:
			self sufficiency 0-0.7: quantity = 1 kg - 2 kg
			self sufficiency 0.7-0.8: quantity = 500 g - 1.5 kg
			self sufficiency 0.8-1: quantity = 0 g - 1 kg
			our system will randomly assign values in the defined quantity range to each resident

			people with a strong security need like to stockpile their bread, to prepare for bad times
			security need 0.8-1: + 1 kg - 2 kg
			use the + to just add some on top of the already set value

			people who can, usually like to buy good bread
			financial pressure 0-0.6: quality = 10-15
			financial pressure 0.6-0.8: quality = 5-10
			financial pressure 0.6-0.8: quality = 0-2

			Values with = set a value, values with + add to a value, - subtract from a value.
			Quantity is used to determine how many of something someone has.
			Quality in which quality it is (0 - 20).

			Guidelines:
			- Only use tags that have a believable causal relationship with the item.
			- Quality ranges always stay within 0–20 after modifiers.
			- Multiple rules are intended to stack unless an = establishes the initial value.
			- Avoid using every tag unnecessarily, most commodities should only depend on 3–7 relevant characteristics.

			We will apply this to every member of a family. Only consider what a single person requires, or for shared goods, use fractions.
			There are a lot of tradable commodities that no private resident would ever own, in that case, just don't return any rules.

			You must also say how likely it is for a private resident to even want this commodity.
			Call the 'demandLikeliness' tool with a value from 0.0 - 1.0.
			1.0 = everyone really wants to have this at home (a bed)
			0.9 = most people (like milk, some people dont like it)
			0.1 = rare (some mortar, not everyone is a builder...)
		`)]);

		// create a tool for each parameter that is available
		const rules: ResidentialDemandRule[] = [];

		const unit = await commodity.tradingUnit.fetch();
		const unitBaseline = 10 ** commodity.tradingUnitRetailBaseline;
		const unitBaseValue = formatTradingUnit(unit, unitBaseline);

		this.logger.log(`traded in ${unit.name}, baseline '${unitBaseValue}'`);

		if (unitBaseValue.match(/[0-9]+/)[0] != '1') {
			throw new Error(`Unit retail baseline must resolve to a unit shorthand, cannot be '${unitBaseValue}'.`);
		}

		for (let parameter of this.parameters) {
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

				if (!(operation in this.operations)) {
					throw new ToolError(`Cannot '${operation}', use: ${Object.keys(this.operations)}`);
				}

				const rule = new ResidentialDemandRule();
				rule.demand = demand;
				rule.parameter = parameter;
				rule.parameterMinimum = parameterMinimum;
				rule.parameterMaximum = parameterMaximum;
				rule.property = property;
				rule.operation = this.operations[operation];

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

		interpreter.addTool('demandLikeliness', [{ name: 'likeliness', type: Number }], likeliness => {
			this.logger.log(`demand likeliness: ${likeliness}`);

			demand.likeliness = likeliness;
		});

		// show some examples
		this.logger.log('preparing examples');

		const examples = await this.database.residentialDemand
			.orderByAscending(demand => demand.id)
			.where(demand => demand.commodityId != commodity.id) // ignore demand to current commodity
			.where(demand => demand.activates != null) // filter invalid demand
			.where(demand => demand.commodity.seedRulesCreated != null) // needed to create other rules
			.include(demand => demand.commodity)
			.include(demand => demand.rules)
			.limit(30)
			.toArray();

		examples.sort(() => Math.random() > 0.5 ? 1 : -1);

		for (let example of examples.slice(0, 10)) {
			const commodity = await example.commodity.fetch();

			const unit = await commodity.tradingUnit.fetch();
			const unitBaseline = 10 ** commodity.tradingUnitRetailBaseline;

			const toolCalls: string[] = this.ruleMessages(commodity, unit, await example.rules.toArray());

			toolCalls.push(Interpreter.simulateToolReponse('ownershipLikeliness', {
				likeliness: example.likeliness
			}).message);

			interpreter.remember([
				this.commodityMessage(commodity, unit, unitBaseline, await commodity.stockSeedRules.toArray()),

				new AssistantMessage(toolCalls.join('\n'))
			]);
		}

		await interpreter.execute(this.commodityMessage(commodity, unit, unitBaseline, await commodity.stockSeedRules.toArray()));

		for (let rule of rules) {
			const parameter = await rule.parameter.fetch();
			await rule.create();

			this.logger.log(`rule #${rule.id.split('-')[0]}: ${parameter.name} ${rule.parameterMinimum}-${rule.parameterMaximum}: ${rule.property} ${rule.operation} ${rule.valueMinimum}-${rule.valueMaximum}`);
		}

		demand.activates = new Date();
		await demand.update();

		commodity.activeResidentialDemand = demand;
		await commodity.update();
	}

	private ruleMessages(commodity: Commodity, unit: CommodityTradingUnit, rules: ResidentialDemandRule[]) {
		const toolCalls: string[] = [];

		for (let rule of rules) {
			const parameter = this.parameters.find(parameter => parameter.id == rule.parameterId);

			const convertValueBoundary = (value: number) => {
				switch (rule.property) {
					case StockSeedRuleProperty.quality: {
						return value;
					}

					case StockSeedRuleProperty.quantity: {
						return formatTradingUnit(unit, value);
					}
				}
			};

			toolCalls.push(Interpreter.simulateToolReponse(parameter.name, {
				parameterMinimum: rule.parameterMinimum,
				parameterMaximum: rule.parameterMaximum,
				property: rule.property,
				operation: Object.entries(this.operations).find(([shorthand, operation]) => rule.operation == operation)[0],
				valueMinimum: convertValueBoundary(rule.valueMinimum),
				valueMaximum: convertValueBoundary(rule.valueMaximum)
			}).message);
		}

		return toolCalls;
	}

	private commodityMessage(commodity: Commodity, unit: CommodityTradingUnit, unitBaseline: number, stockSeedRules: StockSeedRule[]) {
		const stockParameters = [];

		for (let rule of stockSeedRules) {
			const parameter = this.parameters.find(parameter => parameter.id == rule.parameterId);

			if (!stockParameters.includes(parameter.name)) {
				stockParameters.push(parameter.name);
			}
		}

		return new UserMessage(`
			Commodity: ${commodity.name}
			Traded in ${formatTradingUnit(unit, unitBaseline)} units, example: '${formatTradingUnit(unit, unitBaseline * 2)}', '${formatTradingUnit(unit, unitBaseline * 3.14)}'.
			All quantity rules must use this unit format!

			${commodity.description}

			Avoid following parameters: ${stockParameters.join(', ')}
		`);
	}
}
