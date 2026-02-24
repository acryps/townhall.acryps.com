import { Component } from "@acryps/page";
import { AskViewModel, BidViewModel, CommodityViewModel, MarketService } from "../../managed/services";
import { Time } from "../../../interface/time";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { positionIntensity } from "./index.style";
import { percentage } from "@acryps/style";
import { convertToCurrency } from "../../../interface/currency";

export class CommodityPage extends Component {
	declare parameters: { tag };

	commodity: CommodityViewModel;

	async onload() {
		this.commodity = await new MarketService().getCommodity(this.parameters.tag);
	}

	render() {
		return <ui-commodity>
			<ui-title>
				{this.commodity.name}
			</ui-title>

			<ui-description>
				{this.commodity.name} is tracked since {this.commodity.innovated ? `${new Time(this.commodity.innovated).age()} years` : 'the markets opened'}.
				The commodity is traded in {this.commodity.unit} units.
				{this.commodity.name} has {this.commodity.category ? `been categorized as ${this.commodity.category.name}` : 'not been categorized yet'}.
			</ui-description>

			<ui-positions>
				{this.renderPositions(
					'asks',
					(a, b) => a.price - b.price,
					'Asks',
					'Currently offered on the market (supply).'
				)}

				{this.renderPositions(
					'bids',
					(a, b) => b.price - a.price,
					'Bids',
					'Requested items from the market (demand).'
				)}
			</ui-positions>
		</ui-commodity>
	}

	renderPositions(
		property: keyof CommodityViewModel,
		sort: (a: AskViewModel | BidViewModel, b: AskViewModel | BidViewModel) => number,
		name: string,
		description: string
	) {
		const positions = [...this.commodity[property] as (AskViewModel | BidViewModel)[]]
			.sort(sort);

		const min = Math.min(...positions.map(position => position.price * position.quantity));
		const max = Math.max(...positions.map(position => position.price * position.quantity));

		const total = positions.reduce((sum, position) => sum + position.price * position.quantity, 0);
		const volume = positions.reduce((sum, position) => sum + position.quantity, 0);

		const average = total / volume;

		return <ui-positions>
			<ui-header>
				<ui-name>
					{name}
				</ui-name>

				{!!volume && <ui-average>
					ø {convertToCurrency(average)}
				</ui-average>}
			</ui-header>

			<ui-description>
				{description}
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
