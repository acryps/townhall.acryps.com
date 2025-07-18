import { Component } from "@acryps/page";
import { CompanyOfficeService, CompanyType, CompanyViewModel } from "../../managed/services";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { convertToCompanyTypeName } from "../../../interface/company";
import { BannerComponent } from "../../banner";
import { Banner } from "../../../interface/banner";
import { AboutComponent } from "../../shared/about";
import { Time } from "../../../interface/time";
import { MetaOrganization } from "@acryps/metadata";

export class CompanyPage extends Component {
	declare parameters: { tag };

	company: CompanyViewModel;

	async onload() {
		this.company = await new CompanyOfficeService().find(this.parameters.tag);

		new MetaOrganization({
			name: this.company.name,
			description: this.company.description
		}).apply();
	}

	render() {
		return <ui-company>
			{!this.company.incorporated && <ui-alert>
				Company has not been legally incorporated yet.
				The next law house session for the main office should do this automatically.
			</ui-alert>}

			{this.company.banner && new BannerComponent(Banner.unpack(this.company.banner))}

			<ui-name>
				{this.company.name}
			</ui-name>

			<ui-type>
				{convertToCompanyTypeName(this.company)}
			</ui-type>

			{this.company.purpose && <ui-purpose>
				{this.company.purpose}
			</ui-purpose>}

			<ui-founding>
				Founded {this.company.created.toLocaleDateString()}, {new Time(this.company.created).age()} years ago.
			</ui-founding>

			<ui-description>
				{this.company.description}
			</ui-description>

			<ui-actions>
				<ui-action ui-href={`/trade/assets/${this.company.id}`}>
					View Assets
				</ui-action>
			</ui-actions>

			<ui-offices>
				{this.company.offices.map(office => <ui-office ui-href={`../../office/${office.id}`}>
					{new MapComponent().highlight(Point.unpack(office.property.activePlotBoundary.shape))}

					<ui-name>
						{office.name}
					</ui-name>
				</ui-office>)}
			</ui-offices>
		</ui-company>;
	}
}
