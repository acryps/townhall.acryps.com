import { Component } from "@acryps/page";
import { CommodityViewModel, StockSeedRuleOperation, StockSeedRuleProperty, StockSeedRuleViewModel } from "../../managed/services";
import { formatTradingUnit } from "../../../interface/trading-unit";

const operationSymbols: Record<StockSeedRuleOperation, string> = {
	[StockSeedRuleOperation.apply]: '=',
	[StockSeedRuleOperation.add]: '+',
	[StockSeedRuleOperation.subtract]: '-'
};

export class CommodityStockingTab extends Component {
	constructor(
		public commodity: CommodityViewModel
	) {
		super();
	}

	render() {
		const rules = this.commodity.stockSeedRules;

		return <ui-stocking>
			<ui-description>
				Stocking rules describe how much of this commodity residents already own at home, based on their personal characteristics.
				They seed every resident's inventory and shape how much supply enters the market.
			</ui-description>

			{rules.length ? <ui-rules>
				{rules.map(rule => <ui-rule>
					<ui-parameter>
						{rule.parameter.name} {rule.parameterMinimum.toFixed(2)}–{rule.parameterMaximum.toFixed(2)}
					</ui-parameter>

					<ui-effect>
						{rule.property} {operationSymbols[rule.operation]} {this.formatValue(rule, rule.valueMinimum)}–{this.formatValue(rule, rule.valueMaximum)}
					</ui-effect>
				</ui-rule>)}
			</ui-rules> : <ui-rules>
				<ui-empty>
					No stocking rules defined, residents do not own this commodity.
				</ui-empty>
			</ui-rules>}
		</ui-stocking>;
	}

	private formatValue(rule: StockSeedRuleViewModel, value: number) {
		if (rule.property == StockSeedRuleProperty.quantity) {
			return formatTradingUnit(this.commodity.tradingUnit, value);
		}

		return value.toFixed(0);
	}
}
