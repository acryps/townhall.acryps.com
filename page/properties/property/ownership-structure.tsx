import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { convertToCurrency } from "../../../interface/currency";
import { LegalEntitySelectorComponent } from "../../shared/legal-entity/select";
import { LegalEntityService, LegalEntityViewModel, PropertyService } from "../../managed/services";
import { companyOfficeIcon, residentIcon } from "../../assets/icons/managed";

export class PropertyOwnershipStructureTab extends Component {
	constructor(
		private page: PropertyPage
	) {
		super();
	}

	render() {
		const activeOwners = this.page.property.owners.filter(owner => !owner.sold);

		const randomResident = this.page.property.dwellings
			.flatMap(dwelling => dwelling.tenants.map(tenant => tenant.inhabitant))
			.sort(() => Math.random())[0];

		const randomCompany = this.page.property.offices
			.flatMap(office => office.company)
			.sort(() => Math.random())[0];

		return <ui-ownership-structure>
			{activeOwners.find(owner => owner.owner) ? activeOwners.map(owner => <ui-owner>
				{new LegalEntityComponent(owner.owner)}

				{activeOwners.length != 1 && <ui-share>
					{(owner.share * 100).toFixed(0)}%
				</ui-share>}

				{owner.aquiredValuation && <ui-value ui-href={`/trade/valuation/${owner.aquiredValuation.id}`}>
					{convertToCurrency(owner.share * owner.aquiredValuation.price)}
				</ui-value>}
			</ui-owner>) : <ui-field ui-quick-assign>
				<label>
					Assign single owner
				</label>

				{new LegalEntitySelectorComponent()
					.onSelect(async entity => this.assignSingleOwner(entity))}
			</ui-field>}

			{randomResident && <ui-action ui-click={async () => this.assignSingleOwner(await new LegalEntityService().findById(randomResident.id))}>
				{residentIcon()} Assign Random Resident
			</ui-action>}

			{randomCompany && <ui-action ui-click={async () => this.assignSingleOwner(await new LegalEntityService().findById(randomCompany.id))}>
				{companyOfficeIcon()} Assign Random Office
			</ui-action>}

			<ui-action ui-href='ownership'>
				Manage Ownership Structure
			</ui-action>
		</ui-ownership-structure>
	}

	async assignSingleOwner(entity: LegalEntityViewModel) {
		this.page.property.owners = [
			await new PropertyService().assignSoleOwner(this.page.property.id, entity.id)
		];

		this.update();
	}
}
