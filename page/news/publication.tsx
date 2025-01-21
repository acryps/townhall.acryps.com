import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService, PublicationViewModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { ArticleListComponent } from "./list";

export class PublicationPage extends Component {
	declare parameters: { tag };

	publication: PublicationViewModel;

	async onload() {
		this.publication = await new PublicationService().getPublication(this.parameters.tag);
	}

	render() {
		return <ui-publication>
			{BannerComponent.unpack(this.publication.banner)}

			<ui-name>
				{this.publication.name}
			</ui-name>

			<ui-legal-name>
				{this.publication.legalName}
			</ui-legal-name>

			<ui-description>
				{this.publication.description}
			</ui-description>

			<ui-actions>
				<ui-action ui-office ui-href={`/property/${this.publication.mainOfficeId}`}>
					View Office
				</ui-action>
			</ui-actions>

			{new ArticleListComponent(this.publication.articles)}
		</ui-publication>;
	}
}
