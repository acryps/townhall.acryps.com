import { DbContext } from "../../managed/database";

export type ContextCatalogItem = { id: string, label: string };

export abstract class ContextCatalogProvider {
	abstract type: string;
	listed = false;

	async list(database: DbContext): Promise<ContextCatalogItem[]> {
		return [];
	}

	abstract search(database: DbContext, text: string): Promise<ContextCatalogItem[]>;
}
