import { Component } from "@acryps/page";
import { ArticleImageViewModel, ArticlePreviewModel, ArticleViewModel, OracleService, PublicationService } from "../../managed/services";
import { MetaNewsArticle, MetaOrganization } from "@acryps/metadata";
import { AnnotatedTextComponent } from "../../shared/annotaded-text";
import { BannerComponent } from "../../banner";
import { ResidentBadgeListComponent } from "../../shared/resident-badge-list";
import { Time } from "../../../interface/time";
import { itemContextIcon } from "../../assets/icons/managed";

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

			<ui-opinions>
				{this.article.opinions.map(opinion => <ui-opinion>
					<ui-meta>
						<ui-name ui-href={`/resident/${opinion.author.tag}`}>
							{opinion.author.givenName} {opinion.author.familyName}
						</ui-name>

						<ui-date>
							{opinion.commented.toLocaleDateString()}, {new Time(opinion.commented).age()} years ago.
						</ui-date>
					</ui-meta>

					<ui-comment>
						{opinion.comment}
					</ui-comment>
				</ui-opinion>)}
			</ui-opinions>

			{this.article.oracleProposal && <ui-oracle>
				<ui-guide>
					This article was written by the oracle based on this lore update.
					The lore has been rated as 'realistic' by one of us.
				</ui-guide>

				<ui-lore>
					{this.article.oracleProposal.lore}
				</ui-lore>

				<ui-actions>
					<ui-action ui-click={async () => {
						if (confirm('Are you sure? This will delete this article and make the oracle create a replacement. It might take some time to generate the new article')) {
							await new OracleService().discardArticle(this.article.id);

							this.navigate('/news');
						}
					}}>
						Regenerate Article
					</ui-action>
				</ui-actions>
			</ui-oracle>}

			<ui-actions>
				<ui-action ui-href={`/item-context/${this.article.id}`}>
					{itemContextIcon()} View Context
				</ui-action>
			</ui-actions>
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
