import { Component } from "@acryps/page";
import { TradeService, ValuationViewModel } from "../../managed/services";
import { toSimulatedAge } from "../../../interface/time";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { convertToCurrency } from "../../../interface/currency";

export class ValuationPage extends Component {
	declare parameters: { id };

	valuation: ValuationViewModel;

	async onload() {
		this.valuation = await new TradeService().getValuation(this.parameters.id);
	}

	render() {
		return <ui-valuation>
			<ui-time>
				{this.valuation.estimated.toLocaleDateString()}, {toSimulatedAge(this.valuation.estimated)} years ago.
			</ui-time>

			{this.valuation.issuer ? <ui-issuer>
				Issued by {new LegalEntityComponent(this.valuation.issuer)}
			</ui-issuer> : <ui-issuer ui-generic>
				Generically issued
			</ui-issuer>}

			<ui-item>
				{this.valuation.item}
			</ui-item>

			<ui-price>
				{convertToCurrency(this.valuation.price)}
			</ui-price>

			<ui-description>
				{this.valuation.description}
			</ui-description>
		</ui-valuation>
	}
}
