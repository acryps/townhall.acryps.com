import { Component } from "@acryps/page";
import { LegalEntityViewModel } from "../../managed/services";
import { convertToLegalCompanyName } from "../../../interface/company";
import { boroughIcon, companyOfficeIcon, mapIcon, residentIcon, stateIcon } from "../../assets/icons/managed";

export class LegalEntityComponent extends Component {
	constructor(
		public entity: LegalEntityViewModel,
		public onClick?: () => void
	) {
		super();
	}

	render() {
		if (!this.entity) {
			return <ui-legal-entity ui-type='none'>
				None
			</ui-legal-entity>;
		}

		if (this.entity.state) {
			return <ui-legal-entity ui-type='state'>
				{stateIcon()} State
			</ui-legal-entity>;
		}

		if (this.entity.borough) {
			return <ui-legal-entity ui-type='borough' ui-click={() => this.onClick() ?? this.navigate(`/borough/${this.entity.borough.tag}`)}>
				{boroughIcon()} {this.entity.borough.name}
			</ui-legal-entity>;
		}

		if (this.entity.company) {
			return <ui-legal-entity ui-type='company' ui-click={() => this.onClick() ?? this.navigate(`/company-office/company/${this.entity.company.tag}`)}>
				{companyOfficeIcon()} {convertToLegalCompanyName(this.entity.company)}
			</ui-legal-entity>;
		}

		if (this.entity.resident) {
			return <ui-legal-entity ui-type='resident' ui-click={() => this.onClick() ?? this.navigate(`/resident/${this.entity.resident.tag}`)}>
				{residentIcon()} {this.entity.resident.givenName} {this.entity.resident.familyName}
			</ui-legal-entity>;
		}
	}
}
