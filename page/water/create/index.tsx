import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapComponent } from "../../shared/map";
import { WaterBodyService } from "../../managed/services";

export class CreateWaterBodyPage extends Component {
	declare parameters: { shape };

	shape: Point[];
	name = '';

	async onload() {
		this.shape = Point.unpack(atob(this.parameters.shape));
	}

	render() {
		return <ui-create-water-body>
			{new MapComponent().highlight(this.shape)}

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					this.navigate(`/water/body/${await new WaterBodyService().createWaterBody(Point.pack(this.shape), this.name)}`);
				}}>
					Create Water Body
				</ui-action>
			</ui-actions>
		</ui-create-water-body>;
	}
}
