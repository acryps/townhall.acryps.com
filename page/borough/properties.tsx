import { Component } from "@acryps/page";
import { BoroughService, BoroughViewModel, PropertySummaryModel } from "../managed/services";
import { BoundaryComponent } from "../properties/property/boundary";
import { Point } from "../../interface/point";
import { Time } from "../../interface/time";

export class BoroughPropertiesTab extends Component {
	properties: PropertySummaryModel[];

	constructor(
		private borough: BoroughViewModel
	) {
		super();
	}

	async onload() {
		this.properties = await new BoroughService().listProperties(this.borough.id);
	}

	render() {
		return <ui-properties>
			{this.properties.filter(property => !property.deactivated).map(property => this.renderProperty(property))}
			{this.properties.filter(property => property.deactivated).map(property => this.renderProperty(property))}
		</ui-properties>
	}

	renderProperty(property: PropertySummaryModel) {
		return <ui-property ui-href={`/property/${property.id}`} ui-deactivated={!!property.deactivated}>
			<ui-detail>
				<ui-name>
					{property.name || `#${property.id.split('-')[0]}`}
				</ui-name>

				{property.created && <ui-created>
					{property.created.toLocaleDateString()}, {new Time(property.created).age()} years ago
				</ui-created>}

				<ui-size>
					{Point.area(Point.unpack(property.activePlotBoundary?.shape))}b²
				</ui-size>

				{property.historicListingGrade && <ui-historic-listing>
					Historic listing grade {property.historicListingGrade.grade}
				</ui-historic-listing>}
			</ui-detail>

			{new BoundaryComponent(property.activePlotBoundary?.shape)}
		</ui-property>;
	}
}
