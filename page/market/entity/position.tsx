import { Component } from "@acryps/page";
import { AskViewModel, BidViewModel, LegalEntityViewModel, TraderAskViewModel, TraderBidViewModel } from "../../managed/services";
import { convertToCurrency } from "../../../interface/currency";
import { Time } from "../../../interface/time";

type Position = TraderBidViewModel | TraderAskViewModel;

export class PositionComponent extends Component {
	positions: Position[];

	commodities = new Map<string, Position[]>();

	constructor(
		private entity: LegalEntityViewModel,
		private fetcher: (entity: LegalEntityViewModel) => Promise<Position[]>
	) {
		super();
	}

	async onload() {
		this.positions = await this.fetcher(this.entity);

		for (let position of this.positions) {
			if (this.commodities.has(position.commodity.id)) {
				this.commodities.get(position.commodity.id).push(position);
			} else {
				this.commodities.set(position.commodity.id, [position]);
			}
		}
	}

	render() {
		return <ui-positions>
			<ui-commodities>
				{[...this.commodities.values()].map(positions => {
					const commodity = positions[0].commodity;

					return <ui-commodity>
						<ui-header>
							<ui-commodity ui-href={`/market/commodity/${commodity.tag}`}>
								{commodity.name}
							</ui-commodity>

							<ui-quantity>
								<ui-number>
									{positions.reduce((sum, position) => position.quantity + sum, 0)}
								</ui-number>

								<ui-unit>
									{commodity.unit}
								</ui-unit>
							</ui-quantity>

							<ui-price>
								{convertToCurrency(positions.reduce((sum, position) => position.quantity * position.price + sum, 0))}
							</ui-price>
						</ui-header>

						<ui-positions>
							{positions.map(position => <ui-position>
								<ui-date>
									{new Time(position.posted).toDateString()}
								</ui-date>

								<ui-quantity>
									<ui-number>
										{position.quantity}
									</ui-number>

									<ui-unit>
										{position.commodity.unit}
									</ui-unit>
								</ui-quantity>

								<ui-price>
									{convertToCurrency(position.price)}
								</ui-price>
							</ui-position>)}
						</ui-positions>
					</ui-commodity>
				})}
			</ui-commodities>
		</ui-positions>
	}
}
