import { Component } from "@acryps/page";
import { PlotBoundaryShapeModel, StreetRouteSummaryModel, StreetService, StreetViewModel } from "../managed/services";
import { MapComponent } from "../shared/map";
import { Point } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { calcualteDanwinstonLine } from "../../interface/line";
import { propertyLayer } from "../shared/map/layers";
import { StreetPlotsPage } from "./plots";
import { RouteComponent } from "./route";
import { addIcon, drawIcon, streetIcon } from "../assets/icons/managed";

export class StreetPage extends Component {
	declare parameters: { id };

	street: StreetViewModel;
	currentRoute: StreetRouteSummaryModel;

	async onload() {
		this.street = await new StreetService().getStreet(this.parameters.id);
		this.currentRoute = this.street.routes.find(route => route.id == this.street.activeRouteId);
	}

	render(child) {
		const path = Point.unpack(this.currentRoute.path);
		const center = Point.center(path).floor();
		const map = new MapComponent().highlight(path, false);

		return <ui-street>
			<ui-name>
				{this.street.name}
			</ui-name>

			<ui-grade>
				Width {this.street.size}b
			</ui-grade>

			{child ?? <ui-content>
				{map}

				<ui-routes>
					<ui-hint>
						The streets route defines the main path of the street.
						The plots will automatically be generated based on the active route and width.
						The plots will extend in each direction to half the streets width rounded up.
						Thicker roads get plots before smaller roads.
					</ui-hint>

					<ui-field>
						<label>
							Street Width
						</label>

						<input
							$ui-value={this.street.size}
							ui-change={() => new StreetService().setWidth(this.street.id, this.street.size)}
							type='number'
						/>
					</ui-field>

					{this.street.routes.map(route => <ui-route ui-active={route.id == this.currentRoute.id}>
						<ui-name>
							{route.changeComment ?? `Route #${route.id.split('-')[0]}`}
						</ui-name>

						{new RouteComponent(route.path)}
					</ui-route>)}

					<ui-action ui-href={`/map/${center.x}/${center.y}/5/edit-route/${this.street.id}`}>
						{drawIcon()} Edit Route
					</ui-action>

					<ui-action ui-href='plots'>
						{streetIcon()} View Plots
					</ui-action>
				</ui-routes>
			</ui-content>}
		</ui-street>
	}
}
