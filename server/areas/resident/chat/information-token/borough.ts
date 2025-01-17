import { InformationToken } from ".";
import { DbContext } from "../../../../managed/database";

export const boroughInformationToken = (database: DbContext) => new InformationToken(
	'borough',
	'BOROUGH',
	async name => {
		const borough = await database.borough
			.first(borough => borough.name.includes(name));

		return borough?.description;
	}
);
