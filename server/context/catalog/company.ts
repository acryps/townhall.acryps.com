import { DbContext } from "../../managed/database";
import { ContextCatalogProvider } from "./provider";

export class CompanyContextCatalogProvider extends ContextCatalogProvider {
	type = 'company';
	listed = true;

	async list(database: DbContext) {
		const companies = await database.company
			.orderByAscending(company => company.name)
			.toArray();

		return companies.map(company => ({ id: company.id, label: `${company.name} (${company.tag})` }));
	}

	async search(database: DbContext, text: string) {
		const companies = await database.company
			.where(company => company.name.lowercase().includes(text.toLowerCase()))
			.toArray();

		return companies.map(company => ({ id: company.id, label: `${company.name} (${company.tag})` }));
	}
}
