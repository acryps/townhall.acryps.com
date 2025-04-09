import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService } from "../managed/services";
import { linkText } from "../linked-text";
import { MetaNewsArticle, MetaOrganization } from "@acryps/metadata";
import { AnnotatedTextPart } from "../../interface/annotate";
import { AnnotatedTextComponent } from "../shared/annotaded-text";

export class ArticePage extends Component {
	declare parameters: { id };

	article: ArticleViewModel;
	content: AnnotatedTextComponent;

	async onload() {
		this.article = await new PublicationService().getArticle(this.parameters.id);
		this.content = new AnnotatedTextComponent(await new PublicationService().getArticleContent(this.parameters.id));

		new MetaNewsArticle({
			name: this.article.title,
			articleBody: this.article.body,
			datePublished: this.article.published,
			publisher: new MetaOrganization({
				name: this.article.publication.name
			}),
			url: location.href
		}).apply();
	}

	render() {
		return <ui-article>
			<ui-title>
				{this.article.title}
			</ui-title>

			<ui-detail>
				<ui-publication ui-href={`/news/publication/${this.article.publication.tag}`}>
					{this.article.publication.name}
				</ui-publication>

				<ui-date>
					{this.article.published.toLocaleDateString()}
				</ui-date>
			</ui-detail>

			<ui-body>
				{this.content}
			</ui-body>

			{this.article.images.map(image => <ui-image>
				<img src={`/article/image/${image.id}`} />

				{image.caption && <ui-caption>
					{image.caption}
				</ui-caption>}
			</ui-image>)}
		</ui-article>;
	}
}
