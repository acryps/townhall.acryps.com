import { A } from "ollama/dist/shared/ollama.7cdb1e15";
import { toSimulatedAge, toSimulatedTime } from "../../../interface/time";
import { Interpreter, SystemMessage, UserMessage } from "../../life/interpreter";
import { Article, ArticleOpinion, DbContext } from "../../managed/database";

export class ArticleOpinionGenerator {
	constructor(
		private database: DbContext
	) {}

	schedule() {
		const commentNext = async () => {
			const articles = await this.database.article
				.where(article => article.published != null)
				.orderByAscending(article => article.id)
				.toArray();

			for (let article of articles) {
				const opinions = await article.opinions.count();

				// use first id letter for count, to make it determenistically random
				const targetCount = parseInt(article.id[0], 16) / 2 + 2;

				if (opinions < targetCount) {
					await this.comment(article);

					break;
				}
			}

			setTimeout(() => commentNext(), 1000 * 10);
		};

		commentNext();
	}

	async comment(article: Article) {
		console.log(`commenting on ${article.title}`);

		const residentQuery = () => this.database.resident
			.where(resident => resident.deceased == null);

		const residentIndex = Math.floor(Math.random() * (await residentQuery().count()));
		const resident = await residentQuery().skip(residentIndex).first();

		const existingOpinions = await article.opinions.toArray();
		const publication = await article.publication.fetch();

		return await new Promise(async done => {
			const interpreter = new Interpreter();

			interpreter.addTool('comment', [{ type: String, name: 'comment' }], async comment => {
				const opinion = new ArticleOpinion();
				opinion.article = article;
				opinion.author = resident;
				opinion.comment = comment;
				opinion.commented = new Date();

				await opinion.create();

				done(opinion);
			});

			interpreter.remember([
				new UserMessage(`# ${article.title}`),
				new UserMessage(`Published at ${toSimulatedTime(article.published).toLocaleString()} by ${publication.name}`),
				new UserMessage(article.body)
			]);

			for (let opinion of existingOpinions) {
				const author = await opinion.author.fetch();

				interpreter.remember([
					new UserMessage(`
						Comment by ${author.givenName} ${author.familyName} written at ${toSimulatedTime(opinion.commented).toLocaleString()}:
						"${opinion.comment}"
					`)
				]);
			}

			interpreter.remember([
				new UserMessage(`
					# ${resident.givenName} ${resident.familyName}
					Born ${toSimulatedTime(resident.birthday)}, aged ${toSimulatedAge(resident.birthday)}

					${resident.biography}
				`)
			]);

			interpreter.execute(new SystemMessage(`
				We are in a fictional world, it is currently ${toSimulatedTime(new Date()).toLocaleString()}.
				Pretend that you are ${resident.givenName} ${resident.familyName}, writing a comment about this article.
				I have appended the article, other comments and your biography.
				The comments are allowed to be positive or critical, people can even be mad, estatic or even out right rude.
				A couple sentences are perfect, the comment should not be too long.
				Call the 'comment' with the comment.
			`));
		});
	}
}
