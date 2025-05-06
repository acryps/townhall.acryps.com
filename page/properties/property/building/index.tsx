import { Component } from "@acryps/page";
import { PropertyPage } from "..";
import { BuildingShapeModel, BuildingSummaryModel, PropertyService } from "../../../managed/services";
import { MapComponent } from "../../../shared/map";
import { Point } from "../../../../interface/point";
import { deleteIcon } from "../../../assets/icons/managed";
import { toSimulatedAge } from "../../../../interface/time";

export class BuildingPage extends Component {
	declare parent: PropertyPage;
	declare parameters: { id: string };

	building: BuildingSummaryModel;

	onload() {
		this.building = this.parent.property.buildings.find(building => building.id == this.parameters.id);
	}

	render() {
		return <ui-building>
			<ui-identifier>
				Building #{this.building.id.split('-')[0]}
			</ui-identifier>

			{this.building.archived && <ui-deactivated>
				This building has been archived {toSimulatedAge(this.building.archived)} years ago ({this.building.archived.toLocaleDateString()})
			</ui-deactivated>}

			{new MapComponent().highlight(Point.unpack(this.building.boundary))}

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.building.name} ui-change={() => new PropertyService().saveBuilding(this.building)}></input>
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					await new PropertyService().archiveBuilding(this.building.id);
					this.building.archived = new Date();

					history.back();
				}}>
					{deleteIcon()} Archive Building
				</ui-action>
			</ui-actions>
		</ui-building>
	}
}
