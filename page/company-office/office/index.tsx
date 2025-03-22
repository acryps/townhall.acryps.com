import { Component } from "@acryps/page";
import { CompanyOfficeService, OfficeViewModel } from "../../managed/services";
import { convertToLegalCompanyName } from "../company/type";

export class OfficePage extends Component {
	declare parameters: { id };

	office: OfficeViewModel;

	async onload() {
		this.office = await new CompanyOfficeService().getOffice(this.parameters.id);
	}

	get activeOffers() {
		return this.office.workOffers.filter(offer => !offer.closed);
	}

	render() {
		const currentCapacity = this.office.capacityGrants.toSorted((a, b) => +a.issued - +b.issued)[0];

		return <ui-office>
			<ui-company ui-href={`../../company/${this.office.company.tag}`}>
				{convertToLegalCompanyName(this.office.company)}
			</ui-company>

			<ui-name>
				{this.office.name}
			</ui-name>

			<ui-location ui-href={`/property/${this.office.property.id}`}>
				Located at {this.office.property.name ?? this.office.property.id.split('-')[0]}
			</ui-location>

			<ui-capacity>
				<ui-metrics>
					<ui-planned>
						{currentCapacity.size} workers capacity
					</ui-planned>

					<ui-offered>
						{this.activeOffers.reduce((sum, offer) => sum + offer.count, 0)} currently offered
					</ui-offered>
				</ui-metrics>

				<ui-action>
					Resize office capacity
				</ui-action>
			</ui-capacity>

			<ui-work-offers>
				{this.activeOffers.toSorted((a, b) => b.count - a.count).map(offer => <ui-offer ui-href={`../../work-offer/${offer.id}`}>
					<ui-role>
						{offer.title}
					</ui-role>

					<ui-count>
						{offer.count}
					</ui-count>
				</ui-offer>)}
			</ui-work-offers>
		</ui-office>
	}
}
