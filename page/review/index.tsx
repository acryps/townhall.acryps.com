import { Component } from "@acryps/page";
import { LegalEntityService, PropertyService, PropertyViewModel } from "../managed/services";
import { MapComponent } from "../shared/map";
import { Point } from "../../interface/point";
import { LegalEntitySelectorComponent } from "../shared/legal-entity/select";
import { Time } from "../../interface/time";
import { boroughIcon, companyOfficeIcon, residentIcon } from "../assets/icons/managed";

export class ReviewPage extends Component {
	property: PropertyViewModel;

	async onload() {
		this.property = await new PropertyService().reviewNext();
	}

	render() {
		const bounds = this.property.plotBoundaries.find(boundary => boundary.id == this.property.activePlotBoundaryId);

		const randomResident = this.property.dwellings
			.flatMap(dwelling => dwelling.tenants)
			.map(tenant => tenant.inhabitant)
			.filter(resident => new Time(resident.birthday).age() > 25)
			.sort(() => Math.random() - 0.5)[0];

		return <ui-review>
			{new MapComponent().highlight(Point.unpack(bounds.shape))}
			{new LegalEntitySelectorComponent().onSelect(entity => this.save(entity.id))}

			<ui-name>
				{this.property.name ?? this.property.id}
			</ui-name>

			<ui-actions>
				<ui-action ui-click={async () => this.save((await new LegalEntityService().findById(this.property.borough.id)).id)}>
					{boroughIcon()} Assign to {this.property.borough.name}
				</ui-action>

				{randomResident && <ui-action ui-click={async () => this.save((await new LegalEntityService().findById(randomResident.id)).id)}>
					{residentIcon()} Assign to {randomResident.givenName} {randomResident.familyName}
				</ui-action>}

				{this.property.offices.map(office => <ui-action ui-click={async () => this.save((await new LegalEntityService().findById(office.company.id)).id)}>
					{companyOfficeIcon()} Assign to {office.company.name}
				</ui-action>)}
			</ui-actions>
		</ui-review>
	}

	save(id: string) {
		new PropertyService().assignSoleOwner(this.property.id, id);
	}
}
