import { Component } from "@acryps/page";
import { convertToCurrency } from "../../../interface/currency";
import { positionIntensity } from "./index.style";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { AskViewModel, BidViewModel, CommodityViewModel } from "../../managed/services";

export class CommodityPositionsTab extends Component {
	constructor(
		private commodity: CommodityViewModel,
		private property: keyof CommodityViewModel,
		private sort: (a: AskViewModel | BidViewModel, b: AskViewModel | BidViewModel) => number,
		private name: string,
		private description: string
	) {
		super();
	}

	render() {
		const positions = [...this.commodity[this.property] as (AskViewModel | BidViewModel)[]]
			.sort(this.sort);

		const min = Math.min(...positions.map(position => position.price * position.quantity));
		const max = Math.max(...positions.map(position => position.price * position.quantity));

		const total = positions.reduce((sum, position) => sum + position.price * position.quantity, 0);
		const volume = positions.reduce((sum, position) => sum + position.quantity, 0);

		const average = total / volume;

		return <ui-positions>
			<ui-header>
				<ui-name>
					{this.name}
				</ui-name>

				{!!volume && <ui-average>
					ø {convertToCurrency(average)}
				</ui-average>}
			</ui-header>

			<ui-description>
				{this.description}
			</ui-description>

			{positions.map(position => <ui-position>
				<ui-indicator
					style={positionIntensity.provide(
						((position.price * position.quantity) - min) / (max - min)
					)}
				/>

				{new LegalEntityComponent((position as AskViewModel).asker ?? (position as BidViewModel).bidder)}

				<ui-quantity>
					{position.quantity}
				</ui-quantity>

				<ui-price>
					{convertToCurrency(position.price)}
				</ui-price>
			</ui-position>)}
		</ui-positions>
	}
}
