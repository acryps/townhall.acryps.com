import { Annotator } from "../../annotate";
import { Article, ItemContextLinkRank } from "../../managed/database";
import { ItemContextFragmentComposer } from "../composer";

export class ArticleReferencesFragmentComposer extends ItemContextFragmentComposer<Article> {
	async compose(item: Article) {
		const annotated = Annotator.annotate(item.body);

		for (let reference of annotated.referencedItems) {
			this.link(1, reference.id, `Referenced in article`);
		}
	}
}
