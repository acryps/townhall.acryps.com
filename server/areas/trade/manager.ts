import { Manager } from "vlserver";
import { DbContext, LegalEntity, Property, Valuation } from "../../managed/database";

export class TradeManager extends Manager {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async valueateProperty(property: Property, issuer?: LegalEntity) {

	}
}
