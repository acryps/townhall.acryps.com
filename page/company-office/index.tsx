import { Component } from "@acryps/page";
import { CompanyOfficeService, CompanySummaryModel, CompanyType } from "../managed/services";
import { companyOfficeIcon } from "../assets/icons/managed";
import { BannerComponent } from "../banner";
import { Banner } from "../../interface/banner";

export class CompanyOfficePage extends Component {
	companies: CompanySummaryModel[];

	async onload() {
		this.companies = await new CompanyOfficeService().getCompanies();
	}

	render(child) {
		if (child) {
			return <ui-company-office>
				<ui-header ui-href='/company-office'>
					{companyOfficeIcon()} Company Office
				</ui-header>

				{child}
			</ui-company-office>
		}

		return <ui-company-office>
			<ui-title>
				Company Office
			</ui-title>

			<ui-guide>
				The Company Office handles registration of companies, offices, work offerings and work contracts.
				Come here if you mean business!
			</ui-guide>

			<ui-guide>
				Open a property in the property register and click on "Create company here" to create a company.
			</ui-guide>

			<ui-companies>
				{this.companies.map(company => <ui-company ui-href={`company/${company.tag}`}>
					<ui-detail>
						<ui-name>
							{company.name}
						</ui-name>

						{company.purpose && <ui-purpose>
							{company.purpose}
						</ui-purpose>}
					</ui-detail>

					{company.banner && new BannerComponent(Banner.unpack(company.banner))}
				</ui-company>)}
			</ui-companies>
		</ui-company-office>
	}
}
