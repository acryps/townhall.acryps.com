import { Component } from "@acryps/page";
import { LegalEntityService, LegalEntityViewModel, MarketService, StockViewModel } from "../../managed/services";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { Tabs } from "../../shared/tabs";
import { StockComponent } from "./stock";
import { PositionComponent } from "./position";

export class MarketEntityPage extends Component {
	declare parameters: { id };

	entity: LegalEntityViewModel;

	async onload() {
		this.entity = await new LegalEntityService().findById(this.parameters.id);
	}

	render() {
		return <ui-entity>
			<ui-title>
				{new LegalEntityComponent(this.entity)}
			</ui-title>

			{new Tabs()
				.addTab('Stock', () => new StockComponent(this.entity))

				.addTab(
					'Asks',
					() => new PositionComponent(this.entity, entity => new MarketService().getAsks(entity.id))
				)

				.addTab(
					'Bids',
					() => new PositionComponent(this.entity, entity => new MarketService().getBids(entity.id))
				)
			}
		</ui-entity>
	}
}
