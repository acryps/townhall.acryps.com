import { Component } from "@acryps/page";
import { CompanyOfficeService, CompanyType, CompanyViewModel } from "../../managed/services";

export class CompanyPage extends Component {
	declare parameters: { tag };

	company: CompanyViewModel;

	async onload() {
		this.company = await new CompanyOfficeService().find(this.parameters.tag);
	}

	render() {
		return <ui-company>
			<ui-title>
				{this.company.name}
			</ui-title>

			{this.renderType()}
		</ui-company>;
	}

	renderType() {
		switch (this.company.type) {
			case CompanyType.company: {
				return <ui-type>
					Private Company
				</ui-type>
			}

			case CompanyType.company: {
				return <ui-type>
					Government Company
				</ui-type>
			}
		}
	}
}
