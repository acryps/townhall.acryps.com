import { Component } from "@acryps/page";
import { WaterBodyService, WaterBodyViewModel } from "../../managed/services";
import { BoundaryComponent } from "../../properties/property/boundary";
import { WaterBody } from "../../../server/managed/database";

export class WaterBodyPage extends Component {
	declare parameters: { tag };

	waterBody: WaterBodyViewModel;

	async onload() {
		this.waterBody = await new WaterBodyService().getWaterBody(this.parameters.tag);
	}

	render() {
		return <ui-water-body>
			<ui-field>
				<input
					placeholder='Name (including Lake, River, ...)'
					$ui-value={this.waterBody.name}
					ui-change={() => new WaterBodyService().rename(this.waterBody.id, this.waterBody.name)}
				/>
			</ui-field>

			<ui-areas>
				<ui-hint>
					The areas defined here define the general area where the water is present.
					The areas include the shoreline and beaches.

					Water plots will automatically be generated based on the areas.
					Any other plot will remove are from the water body.
				</ui-hint>

				{this.waterBody.areas.map(area => <ui-area ui-archived={!!area.archived}>
					<ui-detail>
						<ui-actions>
							{area.archived ? <ui-action ui-click={async () => {
								await new WaterBodyService().unarchive(area.id);
								area.archived = null;

								this.update();
							}}>
								Reactivate
							</ui-action> : <ui-action ui-click={async () => {
								await new WaterBodyService().archive(area.id);
								area.archived = new Date();

								this.update();
							}}>
								Archive
							</ui-action>}
						</ui-actions>
					</ui-detail>

					{new BoundaryComponent(area.shape)}
				</ui-area>)}
			</ui-areas>
		</ui-water-body>
	}
}
