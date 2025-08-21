import { Annotator } from "../../annotate";
import { ItemContextFragment, ItemContextLinkRank } from "../../managed/database";
import { ItemContextComposeable, ItemContextFragmentComposer } from "../composer";

export class ArticleReferenceContextFragment<ItemType extends ItemContextComposeable> extends ItemContextFragmentComposer<ItemType> {
	constructor(
		private distance: number,
		private targetId: string
	) {
		super();
	}

	async compose(item: ItemType) {
		for (let article of await this.database.article.where(article => article.published != null).toArray()) {
			const annotated = Annotator.annotate(article.body);

			for (let item of annotated.referencedItems) {
				if (item.id == this.targetId) {
					this.link(this.distance, article.id, 'Mentioned in article');
				}
			}
		}
	}
}
