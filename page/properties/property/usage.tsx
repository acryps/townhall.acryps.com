import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { addIcon } from "../../assets/icons/managed";
import { convertToLegalCompanyName } from "../../../interface/company";
import { ResidentBadgeListComponent } from "../../shared/resident-badge-list";
import { PropertyService } from "../../managed/services";

export class PropertyUsageTab extends Component {
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
						<ui-header>
							Vacant
						</ui-header>

						<ui-hint>
							Residents will move in automatically, but it might take some time.
						</ui-hint>
					</ui-vacant>}
				</ui-dwelling>)}

				<ui-action ui-click={async () => {
					this.page.property.dwellings.push(await new PropertyService().createDwelling(this.page.property.id));
					this.update();
				}}>
					{addIcon()} Create Dwelling
				</ui-action>
			</ui-dwellings>
		</ui-usage>
	}
}
