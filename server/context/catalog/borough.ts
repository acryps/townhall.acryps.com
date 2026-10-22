import { DbContext } from "../../managed/database";
import { ContextCatalogProvider } from "./provider";

export class BoroughContextCatalogProvider extends ContextCatalogProvider {
	type = 'borough';
	listed = true;

	async list(database: DbContext) {
		const boroughs = await database.borough
			.orderByAscending(borough => borough.name)
			.toArray();

		return boroughs.map(borough => ({ id: borough.id, label: borough.name }));
	}

	async search(database: DbContext, text: string) {
		const boroughs = await database.borough
			.where(borough => borough.name.lowercase().includes(text.toLowerCase()))
			.toArray();

		return boroughs.map(borough => ({ id: borough.id, label: borough.name }));
	}
}
