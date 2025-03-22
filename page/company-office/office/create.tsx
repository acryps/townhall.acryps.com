import { Component } from "@acryps/page";
import { CompanyOfficeService, CompanySummaryModel, MapService, PropertyService, PropertyViewModel } from "../../managed/services";
import { convertToLegalCompanyName } from "../company/type";

export class CreateOfficePage extends Component {
	declare parameters: { id };

	companies: CompanySummaryModel[];

	company: CompanySummaryModel;
	property: PropertyViewModel;

	name = '';
	capacity = 10;

	async onload() {
		this.companies = await new CompanyOfficeService().getCompanies();
		this.property = await new MapService().getProperty(this.parameters.id);
	}

	render() {
		return <ui-register>
			<ui-title>
				Register Office
			</ui-title>

			<ui-office>
				The office will be registered at '{this.property.name ?? this.property.id.split('-')[0]}' in {this.property.borough.name}.
			</ui-office>

			<ui-field>
				<label>Office Name</label>

				<input
					$ui-value={this.name}
				/>
			</ui-field>

			<ui-field>
				<label>Company</label>

				<select $ui-value={this.company}>
					{this.companies.toSorted((a, b) => a.name.localeCompare(b.name)).map(company => <option ui-value={company}>
						{convertToLegalCompanyName(company)}
					</option>)}
				</select>
			</ui-field>

			<ui-field>
				<label>Initial Employee Count</label>

				<input
					$ui-value={this.capacity}
					type='number'
				/>
			</ui-field>

			<ui-action ui-click={async () => {
				const id = await new CompanyOfficeService().registerOffice(
					this.name,
					this.company.id,
					this.property.id,
					this.capacity
				);

				this.navigate(`/company-office/office/${id}`);
			}}>
				Register Office
			</ui-action>
		</ui-register>;
	}
}
