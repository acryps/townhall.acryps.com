import { Component } from "@acryps/page";
import { TradeService, ValuationViewModel } from "../../managed/services";
import { toSimulatedAge } from "../../../interface/time";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { convertToCurrency } from "../../../interface/currency";

export class ValuationPage extends Component {
	declare parameters: { id };

	valuation: ValuationViewModel;

	clickCount = 0;
	priceField: HTMLElement;

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
				System issued
			</ui-issuer>}

			<ui-target>
				<ui-item>
					{this.valuation.item}
				</ui-item>

				<ui-description>
					{this.valuation.description}
				</ui-description>
			</ui-target>

			{this.priceField = <ui-price ui-click={() => {
				this.clickCount++;

				if (this.clickCount == 3) {
					this.priceField.contentEditable = 'plaintext-only';
					this.priceField.textContent = this.valuation.price?.toString() ?? '0';

					this.priceField.focus();

					this.priceField.onblur = async () => {
						await new TradeService().overwriteValuation(this.valuation.id, +this.priceField.textContent);

						this.reload();
					}
				}
			}}>
				{convertToCurrency(this.valuation.price)}
			</ui-price>}
		</ui-valuation>
	}
}
