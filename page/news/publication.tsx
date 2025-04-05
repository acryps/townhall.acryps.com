import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService, PublicationViewModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { ArticleListComponent } from "./list";
import { convertToLegalCompanyName } from "../company-office/company/type";

export class PublicationPage extends Component {
	declare parameters: { tag };

	publication: PublicationViewModel;

	async onload() {
		this.publication = await new PublicationService().getPublication(this.parameters.tag);
	}

	render() {
		return <ui-publication>
			{BannerComponent.unpack(this.publication.company.banner)}

			<ui-name>
				{this.publication.name}
			</ui-name>

			<ui-legal-name>
				{convertToLegalCompanyName(this.publication.company)}
			</ui-legal-name>

			<ui-description>
				{this.publication.description}
			</ui-description>

			<ui-actions>
				<ui-action ui-href={`/company-office/company/${this.publication.company.tag}`}>
					View Company
				</ui-action>

				<ui-action ui-click={async () => {
					const id = await new PublicationService().createArticle(this.publication.id);

					this.navigate(`../../write/${id}`);
				}}>
					Write Article
				</ui-action>
			</ui-actions>

			{new ArticleListComponent(this.publication.articles)}
		</ui-publication>;
	}
}
