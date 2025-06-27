import { Service } from "vlserver";
import { LegalEntityManager } from "../legal-entity/manager";
import { Oracle } from "./generator";
import { DbContext } from "../../managed/database";
import { Interpreter, SystemMessage } from "../../life/interpreter";
import { Language } from "../../life/language";
import { OracleProposalViewModel } from "./proposal";

export class OracleService extends Service {
	constructor(
		private database: DbContext,
		private legalEntityManager: LegalEntityManager
	) {
		super();
	}

	async nextProposal() {
		return new OracleProposalViewModel(
			await this.database.oracleProposal
				.where(proposal => proposal.reviewed == null)
				.orderByAscending(proposal => proposal.proposed)
				.first()
		);
	}

	async review(id: string, realistic: boolean) {
		const proposal = await this.database.oracleProposal.find(id);

		if (proposal.reviewed) {
			throw 'Proposal already reviewed';
		}

		proposal.reviewed = new Date();
		proposal.realistic = realistic;

		await proposal.update();
	}

	async discardArticle(id: string) {
		const article = await this.database.article.find(id);

		if (!article.oracleProposalId) {
			throw new Error(`Article '${article.title}' was not published by the oracle and cannot be discarded`);
		}

		article.published = null;
		await article.update();
	}

	async about(id: string) {
		const entity = await this.legalEntityManager.findBySourceId(id);

		if (!entity) {
			return '';
		}

		const context = await new Oracle(this.database, this.legalEntityManager).findModelContext(entity);

		return await new Promise<string>(done => {
			const interpreter = new Interpreter();
			interpreter.remember(context);

			interpreter.addTool('summary', [{ type: String, name: 'body' }], summary => {
				done(summary);
			});

			interpreter.execute(new SystemMessage(`
				Summarize the context into a Wikipedia-style intro.
				This text will be displayed at the top of the page about this item
			`));
		});
	}
}
