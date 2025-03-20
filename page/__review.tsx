import { Component } from "@acryps/page";
import { CompanyViewModel, PropertyService, PropertyViewModel } from "./managed/services";
import { MapComponent } from "./shared/map";
import { Point } from "../interface/point";

export class ReviewCompanyPage extends Component {
	property: PropertyViewModel;

	async onload() {
		this.property = await new PropertyService().nextUnreviewed();
	}

	render() {
		const bounds = Point.unpack(this.property.bounds);
		const center = Point.center(bounds);

		return <ui-review>
			<ui-title>
				{this.property.name}
			</ui-title>

			<ui-actions>
				<ui-action ui-click={async () => {
					await new PropertyService().reviewDone(this.property.id);

					this.reload();
				}}>
					Next
				</ui-action>

				<ui-action ui-href={`/company-office/register/${this.property.id}`}>
					Create Company
				</ui-action>

				<ui-action ui-click={() => open(`/map/${center.x}/${center.y}/10`)}>
					View Map
				</ui-action>

				<ui-action ui-href={`/property/${this.property.id}`}>
					View Property
				</ui-action>
			</ui-actions>

			{new MapComponent().highlight(bounds)}

			{this.property.type?.name ?? 'No TYPE!'}

			<ui-detail>
				{this.property.offices.length} offices
			</ui-detail>


			<ui-detail>
				{this.property.dwellings.length} dwellings
			</ui-detail>
		</ui-review>;
	}
}
