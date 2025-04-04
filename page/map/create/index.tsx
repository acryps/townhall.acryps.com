import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { MapComponent } from "../../shared/map";
import { LocationMarkerComponent } from "../../shared/location";
import { boroughIcon, propertyRegisterIcon, streetIcon } from "../../assets/icons/managed";
import { MapService } from "../../managed/services";

export class CreateFeaturePage extends Component {
	declare parameters: { shape };

	shape: Point[];

	async onload() {
		this.shape = Point.unpack(atob(this.parameters.shape));
	}

	render() {
		const bounds = Point.bounds(this.shape);

		return <ui-create-feature>
			{new MapComponent().highlight(this.shape)}

			<ui-metrics>
				<ui-metric>
					<ui-name>
						Area
					</ui-name>

					<ui-value>
						{Point.area(this.shape)}b²
					</ui-value>
				</ui-metric>

				<ui-metric>
					<ui-name>
						Center
					</ui-name>

					<ui-value>
						{new LocationMarkerComponent(Point.center(this.shape))}
					</ui-value>
				</ui-metric>
			</ui-metrics>

			<ui-types>
				<ui-type ui-click={async () =>  this.navigate(`/property/${await new MapService().createProperty(Point.pack(this.shape))}`)}>
					{propertyRegisterIcon()}

					<ui-name>
						Register Property
					</ui-name>
				</ui-type>

				<ui-type ui-href={`/borough/register/${btoa(Point.pack(this.shape))}`}>
					{boroughIcon()}

					<ui-name>
						Register Borough
					</ui-name>
				</ui-type>

				<ui-type>
					{streetIcon()}

					<ui-name>
						Register Street (MISSING)
					</ui-name>
				</ui-type>

				<ui-type>
					{streetIcon()}

					<ui-name>
						Register Square (MISSING)
					</ui-name>
				</ui-type>
			</ui-types>

			<ui-metrics>
				<ui-metric>
					<ui-name>
						X Min
					</ui-name>

					<ui-value>
						{bounds.x.min}
					</ui-value>
				</ui-metric>

				<ui-metric>
					<ui-name>
						Y Min
					</ui-name>

					<ui-value>
						{bounds.y.min}
					</ui-value>
				</ui-metric>

				<ui-metric>
					<ui-name>
						X Max
					</ui-name>

					<ui-value>
						{bounds.x.max}
					</ui-value>
				</ui-metric>

				<ui-metric>
					<ui-name>
						Y Max
					</ui-name>

					<ui-value>
						{bounds.y.max}
					</ui-value>
				</ui-metric>
			</ui-metrics>
		</ui-create-feature>
	}
}
