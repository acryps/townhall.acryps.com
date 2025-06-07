import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { addIcon } from "../../assets/icons/managed";
import { convertToLegalCompanyName } from "../../../interface/company";
import { ResidentBadgeListComponent } from "../../shared/resident-badge-list";
import { PropertyService } from "../../managed/services";

export class PropertyUsageTab extends Component {
	newDwellingCount = 1;

	constructor(
		private page: PropertyPage
	) {
		super();
	}

	render() {
		return <ui-usage>
			<ui-offices>
				{this.page.property.offices.map(office => <ui-office ui-href={`/company-office/office/${office.id}`}>
					<ui-company ui-href={`/company-office/company/${office.company.tag}`}>
						{convertToLegalCompanyName(office.company)}
					</ui-company>

					<ui-name>
						{office.name ?? office.id.split('-')[0]}
					</ui-name>
				</ui-office>)}

				<ui-action ui-href={`/company-office/register/${this.page.property.id}`}>
					{addIcon()} Create Company Here
				</ui-action>

				<ui-action ui-href={`/company-office/office/create/${this.page.property.id}`}>
					{addIcon()} Create Office for existing company
				</ui-action>
			</ui-offices>

			<ui-dwellings>
				{this.page.property.dwellings.map(dwelling => <ui-dwelling>
					<ui-name>
						Dwelling #{dwelling.id.split('-')[0]}
					</ui-name>

					{dwelling.tenants.length ? new ResidentBadgeListComponent(dwelling.tenants.map(tenant => tenant.inhabitant)) : <ui-vacant>
						Vacant
					</ui-vacant>}
				</ui-dwelling>)}

				<ui-create>
					<ui-hint>
						Each dwelling can hold a family, which will automatically be spawned by the AI system.
						This might take some time, as the AI generator takes a lot of processing power and is not running 24/7.
					</ui-hint>

					<ui-field>
						<label>
							New Dwellings Count
						</label>

						<input type='number' min='1' max='100' $ui-value={this.newDwellingCount} />
					</ui-field>

					<ui-action ui-create-dwellings ui-click={async () => {
						this.page.property.dwellings.push(...await new PropertyService().createDwellings(this.page.property.id, this.newDwellingCount));
						this.update();
					}}>
						{addIcon()} Create Dwellings
					</ui-action>
				</ui-create>
			</ui-dwellings>
		</ui-usage>
	}
}
