import { Component } from "@acryps/page";
import { ArticleImageViewModel, ArticleViewModel, PublicationService } from "../../managed/services";
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

			{this.article.images.length > 0 && <ui-slideshow>
				{this.article.images.map(image => this.renderSlide(image))}
			</ui-slideshow>}

			<ui-body>
				{this.content}
			</ui-body>
		</ui-article>;
	}

	renderSlide(image: ArticleImageViewModel) {
		const slide: HTMLElement = <ui-slide>
			<ui-image>
				<img src={`/article/image/${image.id}`} ui-click={() => {
					if (slide.hasAttribute('ui-expanded')) {
						slide.removeAttribute('ui-expanded');

						return;
					}

					const bounds = slide.getBoundingClientRect();
					const center = bounds.x > 0 && bounds.x + bounds.width < innerWidth;

					if (center) {
						slide.setAttribute('ui-expanded', '');
					} else {
						slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
					}
				}} />
			</ui-image>

			{image.caption && <ui-caption>
				{image.caption}
			</ui-caption>}
		</ui-slide>;

		return slide;
	}
}
