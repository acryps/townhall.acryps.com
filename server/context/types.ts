import { DbContext } from "../managed/database";
import { ArticleContextComposer } from "./article";
import { BoroughContextComposer } from "./borough";

export const itemContextTypes = (database: DbContext) => [
	new BoroughContextComposer(database),
	new ArticleContextComposer(database)
];
