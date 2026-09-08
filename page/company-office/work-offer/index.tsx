import { Component } from "@acryps/page";
import { CompanyOfficeService, WorkOfferViewModel } from "../../managed/services";
import { Time } from "../../../interface/time";
import { convertToLegalCompanyName } from "../../../interface/company";
import { convertToCurrency } from "../../../interface/currency";

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

			<ui-salary>
				{convertToCurrency(this.workOffer.dailySalary)}/day salary
			</ui-salary>

			<ui-task>
				{this.workOffer.task}
			</ui-task>

			<ui-description>
				{convertToLegalCompanyName(this.workOffer.office.company)} is employing {this.workOffer.count} workers at the {this.workOffer.office.name} in {this.workOffer.office.property.borough?.name}.
			</ui-description>

			<ui-contracts>
				{this.workOffer.workContracts.toSorted((a, b) => +(a.canceled ?? a.signed) - +(b.canceled ?? b.signed)).map(contract => <ui-contract ui-cancled={!!contract.canceled} ui-href={`/resident/${contract.worker.tag}`}>
					<ui-name>
						{contract.worker.givenName} {contract.worker.familyName} ({new Time(contract.worker.birthday).age()})
					</ui-name>

					<ui-match>
						{contract.match}
					</ui-match>

					<ui-timespan>
						Signed {contract.signed.toLocaleDateString()}{contract.canceled ? `, canceled ${contract.canceled.toLocaleDateString()}.` : ''}
					</ui-timespan>

					<ui-salary>
						{convertToCurrency(contract.dailySalary)}/day
					</ui-salary>
				</ui-contract>)}
			</ui-contracts>
		</ui-work-offer>
	}
}
