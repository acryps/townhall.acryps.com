import { Component } from "@acryps/page";
import { CompanyOfficeService, CompanyType, CompanyViewModel } from "../../managed/services";
import { toSimulatedAge } from "../../../interface/time";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";

export class CompanyPage extends Component {
	declare parameters: { tag };

	company: CompanyViewModel;

	async onload() {
		this.company = await new CompanyOfficeService().find(this.parameters.tag);
	}

	render() {
		return <ui-company>
			{!this.company.incorporated && <ui-alert>
				Company has not been legally incorporated yet.
				The next law house session for the main office should do this automatically.
			</ui-alert>}

			<ui-name>
				{this.company.name}
			</ui-name>

			{this.renderType()}

			{this.company.purpose && <ui-purpose>
				{this.company.purpose}
			</ui-purpose>}

			<ui-founding>
				Founded {this.company.created.toLocaleDateString()}, {toSimulatedAge(this.company.created)} years ago.
			</ui-founding>

			<ui-description>
				{this.company.description}
			</ui-description>

			<ui-offices>
				{this.company.offices.map(office => <ui-office ui-href={`/property/${office.property.id}`}>
					{new MapComponent().highlight(Point.unpack(office.property.bounds))}

					<ui-name>
						{office.name}
					</ui-name>

					<ui-capacity>
						{office.capacity} worker capacity
					</ui-capacity>
				</ui-office>)}
			</ui-offices>
		</ui-company>;
	}

	renderType() {
		switch (this.company.type) {
			case CompanyType.company: {
				return <ui-type>
					Private Company
				</ui-type>
			}

			case CompanyType.company: {
				return <ui-type>
					Government Company
				</ui-type>
			}
		}
	}
}
