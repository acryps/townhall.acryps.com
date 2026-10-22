import { DbContext } from "../../managed/database";
import { ItemContextTracker } from "..";
import { ArticleContextCatalogProvider } from "./article";
import { BoroughContextCatalogProvider } from "./borough";
import { CommodityContextCatalogProvider } from "./commodity";
import { CompanyContextCatalogProvider } from "./company";
import { ContextCatalogItem, ContextCatalogProvider } from "./provider";

export class Context {
	static providers: ContextCatalogProvider[] = [
		new CompanyContextCatalogProvider(),
		new BoroughContextCatalogProvider(),
		new ArticleContextCatalogProvider(),
		new CommodityContextCatalogProvider()
	];

	private static section(type: string, items: ContextCatalogItem[]) {
		return `## ${type}\n${items.map(item => `- ${item.id}: ${item.label}`).join('\n')}`;
	}

	// full catalog of the listable providers (company, borough, article) - shown to the interpreter up front
	static async compile(database: DbContext) {
		const sections: string[] = [];

		for (let provider of this.providers.filter(provider => provider.listed)) {
			const items = await provider.list(database);

			if (items.length) {
				sections.push(this.section(provider.type, items));
			}
		}

		return sections.join('\n\n');
	}

	// text relevance search across every provider, including ones not fully listed (e.g. commodity)
	static async search(database: DbContext, text: string) {
		const sections: string[] = [];

		for (let provider of this.providers) {
			const items = await provider.search(database, text);

			if (items.length) {
				sections.push(this.section(provider.type, items));
			}
		}

		return sections.join('\n\n');
	}

	// detail text for one chosen item, reusing the cached item_context composition
	static async describe(database: DbContext, itemId: string) {
		await ItemContextTracker.instance.find(itemId);

		const item = await database.itemContext.first(context => context.itemId == itemId);

		return item?.context ?? item?.summary ?? '';
	}
}
