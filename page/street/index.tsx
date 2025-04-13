import { Component } from "@acryps/page";
import { PlotBoundaryShapeModel, StreetService, StreetViewModel } from "../managed/services";
import { MapComponent } from "../shared/map";
import { Point } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { calcualteDanwinstonLine } from "../../interface/line";
import { propertyLayer } from "../shared/map/layers";
import { StreetPlotsComponent } from "./plots";

export class StreetPage extends Component {
	declare parameters: { id };

	street: StreetViewModel;

	async onload() {
		this.street = await new StreetService().getStreet(this.parameters.id);
	}

	render() {
		const path = Point.unpack(this.street.path);
		const map = new MapComponent().highlight(path);

		return <ui-street>
			{map}

			<ui-name>
				{this.street.name}
			</ui-name>

			<ui-grade>
				Grade {this.street.size}
			</ui-grade>

			{new StreetPlotsComponent(this.street)}
		</ui-street>
	}
}
