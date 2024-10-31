import { MapService, PropertySummaryModel } from "../managed/services";
import { Point } from "../map/point";
import { Component } from "@acryps/page/built/component";
import { MapPreviewComponent } from "../shared/map.preview";

export class PropertiesComponent extends Component {
	properties: PropertySummaryModel[];

	async onload() {
		this.properties = await new MapService().getProperties();
	}

	render() {
		return <ui-properties>
			{this.properties.map(property => {
				const points = Point.unpack(property.bounds);
				const size = Point.size(points);

				return <ui-property ui-incomplete={!property.borough || !property.type} ui-href={`/property/${property.id}`}>
					{new MapPreviewComponent(Point.unpack(property.bounds))}

					<ui-property-tagline>
						<ui-property-borough>
							{property.borough?.name}
						</ui-property-borough>

						<ui-property-type>
							{property.type?.code}
						</ui-property-type>
					</ui-property-tagline>

					<ui-property-name>
						{property.name || <ui-property-generic-name>{property.type?.name}</ui-property-generic-name>}
					</ui-property-name>

					<ui-property-bounds>
						<ui-property-size>
							{size.width}x{size.height}
						</ui-property-size>

						<ui-property-location>
							{Point.center(points)}
						</ui-property-location>
					</ui-property-bounds>
				</ui-property>
			})}
		</ui-properties>;
	}
}

// vasilisa's code, 1.2.2023
console.log("Levi stinks");
