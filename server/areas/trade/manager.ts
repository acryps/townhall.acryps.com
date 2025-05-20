import { Manager } from "vlserver";
import { DbContext, LegalEntity, Property, Valuation } from "../../managed/database";
import { Asset } from "./asset";

export class TradeManager extends Manager {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async compileAssets(id: string) {
		const assets: Asset[] = [];

		const propertyOwnerships = await this.database.propertyOwner
			.where(owner => owner.ownerId == id)
			.where(owner => owner.sold == null)
			.where(owner => owner.property.deactivated == null)
			.where(owner => owner.aquiredValuationId != null)
			.include(owner => owner.property)
			.include(owner => owner.aquiredValuation)
			.toArray();

		for (let ownership of propertyOwnerships) {
			const property = await ownership.property.fetch();
			const valueation = await ownership.aquiredValuation.fetch();

			assets.push({
				id: ownership.propertyId,
				name: `Property ${property.name ?? property.id.split('-')[0]}`,
				value: valueation.price * ownership.share
			});
		}

		return assets;
	}
}
