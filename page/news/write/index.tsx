import { Component } from "@acryps/page";
import { ArticlePreviewModel, PublicationService } from "../../managed/services";
import { ArticleMediaEditorComponent } from "./media";

export class WriteArticlePage extends Component {
	declare parameters: { id: string };

	article: ArticlePreviewModel;

	async onload() {
		this.article = await new PublicationService().getArticle(this.parameters.id);
	}

	render() {
		return <ui-write-article>
			<ui-guide>
				Write an article for {this.article.publication.name}.
				Any changes will automatically be saved.
				Articles cannot be edited once published.
			</ui-guide>

			<input
				$ui-value={this.article.title}
				ui-change={() => this.save()}
			/>

			<textarea
				$ui-value={this.article.body}
				ui-change={() => this.save()}
				rows={40}
			/>

			{new ArticleMediaEditorComponent(this.article)}

			<ui-actions>
				<ui-action ui-click={async () => {
					await new PublicationService().publish(this.article.id);

					this.navigate(`../../article/${this.article.id}`);
				}}>
					Publish in {this.article.publication.name}
				</ui-action>
			</ui-actions>
		</ui-write-article>;
	}

	save() {
		new PublicationService().saveArticle(this.article.id, this.article.title, this.article.body);
	}
}
