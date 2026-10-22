import { DbContext } from "../../managed/database";
import { ContextCatalogProvider } from "./provider";

export class CommodityContextCatalogProvider extends ContextCatalogProvider {
	type = 'commodity';

	async search(database: DbContext, text: string) {
		const commodities = await database.commodity
			.where(commodity => commodity.name.lowercase().includes(text.toLowerCase()))
			.toArray();

		return commodities.map(commodity => ({ id: commodity.id, label: `${commodity.name} (${commodity.symbol})` }));
	}
}
