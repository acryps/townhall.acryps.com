import { Component } from "@acryps/page";
import { ArticlePreviewModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { Banner } from "../../interface/banner";
import { oracleIcon } from "../assets/icons/managed";

function articleDateGroup(published: Date) {
	const now = new Date();
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const startOfPublishedDay = new Date(published.getFullYear(), published.getMonth(), published.getDate());

	const days = (+startOfToday - +startOfPublishedDay) / (24 * 60 * 60 * 1000);

	if (days <= 0) {
		return 'Today';
	}

	if (days < 7) {
		return 'This Week';
	}

	if (days < 30) {
		return 'This Month';
	}

	return 'Older';
}

export class ArticleListComponent extends Component {
	articles: ArticlePreviewModel[];

	constructor(
		articles: ArticlePreviewModel[]
	) {
		super();

		this.articles = articles.toSorted((a, b) => b.published > a.published ? 1 : -1);
	}

	render() {
		let lastGroup: string = null;

		return <ui-articles>
			{this.articles.filter(article => article.published).map(article => {
				const element = <ui-article ui-href={`/news/article/${article.id}`}>
					<ui-detail>
						<ui-title>
							{article.title}
						</ui-title>

						<ui-body>
							{article.body.substring(0, 1000)}
						</ui-body>

						<ui-publication>
							{article.oracleProposal && <ui-oracle>
								{oracleIcon()} Oracle
							</ui-oracle>}

							{new BannerComponent(Banner.unpack(article.publication.company.banner))}

							{article.publication.name}
						</ui-publication>
					</ui-detail>

					{article.images.length > 0 && <img src={`/article/image/${article.images[0].id}`} loading="lazy" />}
				</ui-article>;

				const group = articleDateGroup(article.published);

				if (group != lastGroup) {
					lastGroup = group;

					return [
						<ui-date>
							{group}
						</ui-date>,

						element
					];
				}

				return element;
			})}
		</ui-articles>;
	}
}
