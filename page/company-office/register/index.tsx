import { Component } from "@acryps/page";
import { CompanyOfficeService, CompanyType, MapService, PropertyService, PropertyViewModel } from "../../managed/services";

export class RegisterCompanyPage extends Component {
	declare parameters: { firstOfficeId };

	type: CompanyType.company;
	name = '';
	description = '';
	capacity = 10;

	firstOffice: PropertyViewModel;

	async onload() {
		this.firstOffice = await new MapService().getProperty(this.parameters.firstOfficeId);
	}

	render() {
		return <ui-register>
			<ui-title>
				Register Company
			</ui-title>

			<ui-office>
				The company will be registered at '{this.firstOffice.name ?? this.firstOffice.id.split('-')[0]}' in {this.firstOffice.borough.name}.
			</ui-office>

			<ui-field>
				<label>Name</label>

				<ui-hint>
					Do not include company type suffix (Co., Govcom., ...)
				</ui-hint>

				<input
					$ui-value={this.name}
				/>
			</ui-field>

			<ui-field>
				<label>Type</label>

				<select $ui-value={this.type}>
					<option ui-value={CompanyType.company}>
						Privately Held Company
					</option>

					<option ui-value={CompanyType.nonProfit}>
						Non-Profit
					</option>

					<option ui-value={CompanyType.guild}>
						Guild (Workers Club/Union)
					</option>

					<option ui-value={CompanyType.governmentCompany}>
						Government Company (Govcom)
					</option>

					<option ui-value={CompanyType.department}>
						Government Department
					</option>
				</select>
			</ui-field>

			<ui-field>
				<label>Description</label>

				<ui-hint>
					Work offerings and employees will automatically be created and assigend based on this description.
					The owner(s) will automatically be assigned too.
				</ui-hint>

				<textarea
					$ui-value={this.description}
					rows='5'
				/>
			</ui-field>

			<ui-field>
				<label>Initial Employee Count</label>

				<input
					$ui-value={this.capacity}
					type='number'
				/>
			</ui-field>

			<ui-action ui-click={async () => {
				const tag = await new CompanyOfficeService().register(
					this.name,
					this.description,
					this.type,
					this.firstOffice.id,
					this.capacity
				);

				this.navigate(`/company-office/company/${tag}`);
			}}>
				Register Company
			</ui-action>
		</ui-register>
	}
}
