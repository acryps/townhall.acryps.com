import { Component } from "@acryps/page";
import { CompanyOfficeService, WorkOfferViewModel } from "../../managed/services";
import { toSimulatedAge } from "../../../interface/time";
import { convertToLegalCompanyName } from "../../../interface/company";

export class WorkOfferPage extends Component {
	declare parameters: { id };

	workOffer: WorkOfferViewModel;

	async onload() {
		this.workOffer = await new CompanyOfficeService().getWorkOffer(this.parameters.id);
	}

	render() {
		return <ui-work-offer>
			<ui-title>
				{this.workOffer.title}
			</ui-title>

			<ui-task>
				{this.workOffer.task}
			</ui-task>

			<ui-description>
				{convertToLegalCompanyName(this.workOffer.office.company)} is employing {this.workOffer.count} workers at the {this.workOffer.office.name} in {this.workOffer.office.property.borough?.name}.
			</ui-description>

			<ui-contracts>
				{this.workOffer.workContracts.toSorted((a, b) => +(a.canceled ?? a.signed) - +(b.canceled ?? b.signed)).map(contract => <ui-contract ui-cancled={!!contract.canceled}>
					<ui-name>
						{contract.worker.givenName} {contract.worker.familyName} ({toSimulatedAge(contract.worker.birthday)})
					</ui-name>

					<ui-match>
						{contract.match}
					</ui-match>

					<ui-timespan>
						Signed {contract.signed.toLocaleDateString()}{contract.canceled ? `, canceled ${contract.canceled.toLocaleDateString()}.` : ''}
					</ui-timespan>
				</ui-contract>)}
			</ui-contracts>
		</ui-work-offer>
	}
}
