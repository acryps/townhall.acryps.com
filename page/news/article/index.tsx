import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService } from "../../managed/services";
import { MetaNewsArticle, MetaOrganization } from "@acryps/metadata";
import { AnnotatedTextComponent } from "../../shared/annotaded-text";
import { BannerComponent } from "../../banner";

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

			{!!this.article.images.length && <ui-slideshow>
				{this.article.images.map(image => <ui-slide>
					<ui-image>
						<img src={`/article/image/${image.id}`} />
					</ui-image>

					{image.caption && <ui-caption>
						{image.caption}
					</ui-caption>}
				</ui-slide>)}
			</ui-slideshow>}

			<ui-body>
				{this.content}
			</ui-body>
		</ui-article>;
	}
}
