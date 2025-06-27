import { Entity } from "vlquery";
import { convertToLegalCompanyName } from "../../../interface/company";
import { toSimulatedAge, toSimulatedTime } from "../../../interface/time";
import { Annotator } from "../../annotate";
import { Article, DbContext, LegalEntity, OracleProposal } from "../../managed/database";
import { LegalEntityManager } from "../legal-entity/manager";
import { Interpreter, SystemMessage, UserMessage } from "../../life/interpreter";

export class Oracle {
	readonly targetUnreviewedPropsoalsCount = 10;

	constructor(
		private database: DbContext,
		private legalEntityManager: LegalEntityManager
	) {}

	schedule() {
		setInterval(async () => {
			const count = await this.database.oracleProposal
				.where(proposal => proposal.reviewed == null)
				.count();

			if (count < this.targetUnreviewedPropsoalsCount) {
				this.propose();
			}
		}, 1000 * 60);

		const expandNext = async () => {
			const reviewed = await this.database.oracleProposal
				.where(proposal => proposal.reviewed != null)
				.where(proposal => proposal.realistic == true)
				.toArray();

			for (let proposal of reviewed) {
				const articles = await proposal.articles.count();

				if (!articles) {
					await this.expand(proposal);

					break;
				}
			}

			setTimeout(() => expandNext(), 1000 * 60);
		};

		expandNext();
	}

	async propose() {
		const item = await this.pull();

		const interpreter = new Interpreter();

		return new Promise<OracleProposal>(done => {
			interpreter.addTool('lore', [{ type: String, name: 'body' }], async lore => {
				const proposal = new OracleProposal();
				proposal.proposed = new Date();
				proposal.lore = lore;
				proposal.entity = item.legalEntity;

				await proposal.create();

				done(proposal);
			});

			interpreter.remember(item.context);

			interpreter.execute(new SystemMessage(`
				We are in a fictional world.
				Your goal is to come up with changes to the lore based on a certain item.
				Do not repeat what already happened, come up with new ideas.

				Today ${toSimulatedTime(new Date()).toDateString()}, ${item.name} is doing something ${Math.random() > 0.3 ? 'positively' : 'negatively'} newsworthy.
				Invent something that they did, for example: ${item.actions.join(', ')}...

				I have provided extra context so you can make a realistic lore update.
				When you have an idea of what they did, call 'lore'.
				Do not mention todays date, or that this is today.
			`));
		});
	}

	async expand(proposal: OracleProposal) {
		if (!proposal.realistic) {
			return;
		}

		const context = [];

		if (proposal.entityId) {
			const entity = await proposal.entity.fetch();
			context.push(...await this.findModelContext(entity));
		}

		return new Promise(async done => {
			const publications = await this.database.publication.toArray();

			const interpreter = new Interpreter();

			interpreter.addTool('publish', [{ type: String, name: 'publication' }, { type: String, name: 'title' }, { type: String, name: 'body' }], async (publicationId, title, body) => {
				const publication = publications.find(publication => publication.id == publicationId);

				if (!publication) {
					throw new Error('The publication does not exist. You must provide the id of the publication, not the name');
				}

				const article = new Article();
				article.publication = publication;
				article.title = title;
				article.body = body;
				article.oracleProposal = proposal;
				article.published = new Date();

				await article.create();

				done(article);
			});

			interpreter.remember(context);

			interpreter.execute(new SystemMessage(`
				We are in a fictional world, current date: ${toSimulatedTime(new Date()).toDateString()}.
				Something just happened:
				${proposal.lore}

				Your job is to write an article about this and publish it.
				I have provided all the context I have about this above.
				Only write about stuff provided in the context, do not invent new facts.
				Make multiple sections, maybe explain some background / context to get readers up to speed.
				Do not add section headers or any formatting (like bold text).

				Please pick a suitable publication for the article, the following can be picked:
				${publications.map(publication => `- ${publication.name} (id=${publication.id}): "${publication.description}"`).join('\n')}

				When you are ready, call 'publish', pass the publications id, the title and the body of the article.
				Do not mention todays date, or that this is today.
			`));
		});
	}

	// pulls a random item from the database
	private async pull() {
		let dig = Math.random();

		if ((dig -= 0.5) < 0) {
			const companiesQuery = () => this.database.company;
			const index = Math.floor(Math.random() * await companiesQuery().count());
			const company = await companiesQuery().skip(index).first();
			const legalEntity = await this.legalEntityManager.findCompany(company.id);

			return {
				legalEntity,
				name: convertToLegalCompanyName(company),
				actions: [
					'new invention',
					'major business decision',
					'important project',
					'bankrupcy',
					'major funding',
					'scandal'
				],
				context: await this.findModelContext(legalEntity)
			};
		}

		if ((dig -= 0.5) < 0) {
			const boroughsQuery = () => this.database.borough;
			const index = Math.floor(Math.random() * await boroughsQuery().count());
			const borough = await boroughsQuery().skip(index).first();
			const legalEntity = await this.legalEntityManager.findBorough(borough.id);

			return {
				legalEntity,
				name: borough.name,
				actions: [
					'new policy'
				],
				context: await this.findModelContext(legalEntity)
			};
		}
	}

	async findContext(entity: LegalEntity) {
		const id = LegalEntityManager.getItemId(entity);

		if (!id) {
			return [];
		}

		const context: { title: string, body: string }[] = [];

		if (entity.boroughId) {
			const borough = await entity.borough.fetch();

			context.push({
				title: `About ${borough.name}`,
				body: borough.description
			});
		}

		if (entity.companyId) {
			const company = await entity.company.fetch();

			context.push(
				{
					title: `Registered purpose of ${convertToLegalCompanyName(company)}`,
					body: company.description
				},
				{
					title: `Founding of ${convertToLegalCompanyName(company)}`,
					body: toSimulatedTime(company.created).toDateString()
				}
			);
		}

		if (entity.residentId) {
			const resident = await entity.resident.fetch();

			context.push({
				title: `About ${resident.givenName} ${resident.familyName}`,
				body: resident.biography
			});

			const workContracts = await resident.workContracts.toArray();

			for (let contract of workContracts) {
				const offer = await contract.offer.fetch();
				const office = await offer.office.fetch();
				const company = await office.company.fetch();

				const old = contract.canceled;

				context.push({
					title: `${resident.givenName} ${resident.familyName} ${old ? 'worked' : 'works'} as ${offer.title} at ${convertToLegalCompanyName(company)}`,
					body: offer.task
				});
			}
		}

		const articles = await this.database.article
			.where(article => article.published != null)
			.orderByDescending(article => article.published)
			.include(article => article.publication)
			.toArray();

		const contextArticles: Article[] = [];

		for (let article of articles) {
			// check if the item is referenced in the article
			const annotated = Annotator.annotate(article.body);

			for (let item of annotated.referencedItems) {
				if (item && 'id' in item && item.id == id) {
					contextArticles.push(article);

					break;
				}
			}

			// randomly add articles to provide more context
			// will stop after some articles have been added
			// will make sure to use more recent articles more often
			if (article.id[0] == entity.id[0] && contextArticles.length < 5) {
				contextArticles.push(article);
			}
		}

		for (let article of contextArticles) {
			context.push({
				title: `Article by ${(await article.publication.fetch()).name} (${toSimulatedTime(article.published).toDateString()}): ${article.title}`,
				body: article.body
			});
		}

		return context;
	}

	async findModelContext(entity: LegalEntity) {
		const context = await this.findContext(entity);
		console.log(context);

		return context.map(item => new UserMessage(`# ${item.title}\n${item.body}`));
	}
}
