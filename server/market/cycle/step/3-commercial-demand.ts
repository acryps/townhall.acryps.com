import { MarketCycleGeneratorStep } from ".";
import { formatTradingUnit, parseTradingUnitValue } from "../../../../interface/trading-unit";
import { AssistantMessage, Interpreter, SystemMessage, ToolError, UserMessage } from "../../../life/interpreter";
import { Commodity, CommercialDemand, CommercialDemandRule, CommodityTradingUnit, CompanyAssessmentParameter, StockSeedRule, StockSeedRuleOperation, StockSeedRuleProperty } from "../../../managed/database";

export class CommercialDemandMarketCycleGeneratorStep extends MarketCycleGeneratorStep {
	parameters: CompanyAssessmentParameter[];

	operations: Record<string, StockSeedRuleOperation> = {
		'=': StockSeedRuleOperation.apply,
		'-': StockSeedRuleOperation.subtract,
		'+': StockSeedRuleOperation.add
	};

	async generate() {
		const commodity = await this.randomCommodity();

		this.logger.log(`creating commercial demand rules for '${commodity.name}' (${commodity.tag})`);

		// create rule group
		const demand = new CommercialDemand();
		demand.commodity = commodity;

		await demand.create();

		this.parameters = await this.database.companyAssessmentParameter
			.orderByAscending(parameter => parameter.name)
			.toArray();

		if (!this.parameters.length) {
			this.logger.log(`no company assessment parameters defined yet, skipping`);

			return;
		}

		const interpreter = this.getInterpreter();

		interpreter.remember([new SystemMessage(`
			Your job is to rate how much companies want / need a certain commodity for their own operation (procurement, not resale).
			Not everyone will get their demands fulfilled, but the companies producing this commodity will try to produce accordingly.

			Each commodity has a quality variable, ranging from 0 (basic / economic version) to 20 (advanced / high quality version).

			Each company is assessed on a bunch of parameters.
			They have a value from 0 - 1 for each of the following parameters:
			${this.parameters.map(parameter => `- ${parameter.name} (0.0 = ${parameter.low}, 1.0 = ${parameter.high})`).join('\n')}

			You must create a rule list, which we will use to control the market with.

			The rules should represent what companies would like to have in stock for their own operation.
			This will always be a bit more than they already have.
			Ignore consumption, it will automatically be subtracted, just figure out how much they want to have on hand.

			Lets make an example using Steel traded in 'kg':

			Companies with high machinery usage need steel for maintenance and parts.
			We can create the following rules:
			machinery usage 0-0.3: quantity = 0 kg - 50 kg
			machinery usage 0.3-0.7: quantity = 50 kg - 500 kg
			machinery usage 0.7-1: quantity = 500 kg - 5 t
			our system will randomly assign values in the defined quantity range to each company

			companies under financial pressure like to stockpile less, to save on capital tied up in inventory
			financial pressure 0.7-1: - 50 kg - 200 kg
			use the - to subtract from the already set value

			Values with = set a value, values with + add to a value, - subtract from a value.
			Quantity is used to determine how many of something a company wants on hand.
			Quality in which quality it is (0 - 20).

			Guidelines:
			- Only use parameters that have a believable causal relationship with the item.
			- Quality ranges always stay within 0–20 after modifiers.
			- Multiple rules are intended to stack unless an = establishes the initial value.
			- Avoid using every parameter unnecessarily, most commodities should only depend on 2–5 relevant characteristics.
			- Most tradable commodities are never procured by companies for their own operation, in that case, just don't return any rules.

			You must also say how likely it is for a company to even want this commodity for its own operation.
			Call the 'demandLikeliness' tool with a value from 0.0 - 1.0.
			1.0 = virtually every company needs this
			0.5 = only companies in relevant industries
			0.05 = rare, only very specific companies (eg mining explosives)
		`)]);

		// create a tool for each parameter that is available
		const rules: CommercialDemandRule[] = [];

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

				const rule = new CommercialDemandRule();
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

		const examples = await this.database.commercialDemand
			.orderByAscending(demand => demand.id)
			.where(demand => demand.commodityId != commodity.id) // ignore demand to current commodity
			.where(demand => demand.activates != null) // filter invalid demand
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

			toolCalls.push(Interpreter.simulateToolReponse('demandLikeliness', {
				likeliness: example.likeliness
			}).message);

			interpreter.remember([
				this.commodityMessage(commodity, unit, unitBaseline),

				new AssistantMessage(toolCalls.join('\n'))
			]);
		}

		await interpreter.execute(this.commodityMessage(commodity, unit, unitBaseline));

		for (let rule of rules) {
			const parameter = await rule.parameter.fetch();
			await rule.create();

			this.logger.log(`rule #${rule.id.split('-')[0]}: ${parameter.name} ${rule.parameterMinimum}-${rule.parameterMaximum}: ${rule.property} ${rule.operation} ${rule.valueMinimum}-${rule.valueMaximum}`);
		}

		demand.activates = new Date();
		await demand.update();

		commodity.activeCommercialDemand = demand;
		await commodity.update();
	}

	private ruleMessages(commodity: Commodity, unit: CommodityTradingUnit, rules: CommercialDemandRule[]) {
		const toolCalls: string[] = [];

		for (let rule of rules) {
			const parameter = this.parameters.find(parameter => parameter.id == rule.parameterId);

			if (!parameter) {
				continue;
			}

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

	private commodityMessage(commodity: Commodity, unit: CommodityTradingUnit, unitBaseline: number) {
		return new UserMessage(`
			Commodity: ${commodity.name}
			Traded in ${formatTradingUnit(unit, unitBaseline)} units, example: '${formatTradingUnit(unit, unitBaseline * 2)}', '${formatTradingUnit(unit, unitBaseline * 3.14)}'.
			All quantity rules must use this unit format!

			${commodity.description}
		`);
	}
}
