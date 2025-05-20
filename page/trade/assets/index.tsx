import { Component } from "@acryps/page";
import { AssetViewModel, LegalEntityService, LegalEntityViewModel, PropertyOwnerViewModel, TradeService } from "../../managed/services";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { convertToCurrency } from "../../../interface/currency";

export class EntityAssetsPage extends Component {
	declare parameters: { id: string };

	entity: LegalEntityViewModel;
	assets: AssetViewModel[];

	async onload() {
		this.entity = await new LegalEntityService().findById(this.parameters.id);

		new TradeService().compileAssets(this.entity.id).then(assets => {
			this.assets = assets;

			this.update();
		});
	}

	render() {
		return <ui-assets>
			<ui-entity>
				{new LegalEntityComponent(this.entity)}
			</ui-entity>

			{this.assets ? <ui-assets>
				{this.assets.map(asset => <ui-asset ui-href={`/go/${asset.id}`}>
					<ui-name>
						{asset.name}
					</ui-name>

					<ui-price>
						{convertToCurrency(asset.value)}
					</ui-price>
				</ui-asset>)}

				<ui-total>
					{convertToCurrency(this.assets.reduce((sum, asset) => asset.value + sum, 0))}
				</ui-total>
			</ui-assets> : 'Compiling assets...'}
		</ui-assets>
	}
}
