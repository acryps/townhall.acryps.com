import { DbContext } from "../managed/database";
import { ArticleContextComposer } from "./article";
import { BoroughContextComposer } from "./borough";
import { CompanyContextComposer } from "./company";

export const itemContextTypes = (database: DbContext) => [
	new BoroughContextComposer(database),
	new ArticleContextComposer(database),
	new CompanyContextComposer(database)
];
