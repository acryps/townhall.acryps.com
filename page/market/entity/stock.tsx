import { Component } from "@acryps/page";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { LegalEntityViewModel, MarketService, StockSeedViewModel, StockViewModel } from "../../managed/services";

export class StockComponent extends Component {
	stock: StockViewModel[];
	openSeedStock: StockSeedViewModel[];

	constructor(
		private entity: LegalEntityViewModel
	) {
		super();
	}

	async onload() {
		this.stock = await new MarketService().getStock(this.entity.id);
		this.openSeedStock = await new MarketService().getOpenSeedStock(this.entity.id);
	}

	render() {
		return <ui-stock>
			<ui-description>
				Items owned by {new LegalEntityComponent(this.entity)}, collected from their completed trades, production and items owned before the market tracking started.
			</ui-description>

			<ui-list>
				{this.stock.map(item => <ui-item>
					<ui-commodity>
						<ui-name ui-href={`/market/commodity/${item.commodity.tag}`}>
							{item.commodity.name}
						</ui-name>
					</ui-commodity>

					<ui-quantity>
						<ui-number>
							{item.quantity}
						</ui-number>

						<ui-unit>
							{item.commodity.unit}
						</ui-unit>
					</ui-quantity>
				</ui-item>)}

				{this.openSeedStock.map(seed => <ui-item>
					<ui-commodity>
						<ui-name>
							{seed.sourceName}
						</ui-name>

						<ui-seed>
							Unmatched seed stock
						</ui-seed>
					</ui-commodity>

					<ui-quantity>
						{seed.sourceQuantity}
					</ui-quantity>
				</ui-item>)}
			</ui-list>
		</ui-stock>
	}
}
