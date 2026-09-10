import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapComponent } from "../../shared/map";
import { SquareService } from "../../managed/services";

export class CreateSquarePage extends Component {
	declare parameters: { shape };

	shape: Point[];
	name = '';

	async onload() {
		this.shape = Point.unpack(atob(this.parameters.shape));
	}

	render() {
		return <ui-create-square>
			{new MapComponent().highlight(this.shape)}

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					this.navigate(`/square/${await new SquareService().createSquare(Point.pack(this.shape), this.name)}`);
				}}>
					Create Square
				</ui-action>
			</ui-actions>
		</ui-create-square>;
	}
}
