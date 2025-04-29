import { Component } from "@acryps/page";
import { ValuationSummaryModel } from "../../managed/services";
import { convertToCurrency } from "../../../interface/currency";

export class ValuationComponent extends Component {
	constructor(
		private valuation: ValuationSummaryModel
	) {
		super();
	}

	render() {
		if (!this.valuation) {
			return <ui-valuation ui-empty>
				{convertToCurrency(null)}
			</ui-valuation>;
		}

		return <ui-valuation ui-href={`/trade/valuation/${this.valuation.id}`}>
			{convertToCurrency(this.valuation.price)}
		</ui-valuation>;
	}
}
