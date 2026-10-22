import { ArticleDraftAnswer, ArticleDraftQuestion, ArticleReference, DbContext } from "../../managed/database";
import { Context } from "../../context/catalog";
import { Interpreter, SystemMessage, UserMessage } from "../../life/interpreter";
import { OpenAiInterpreterProvider } from "../../life/interpreter/provider/openai";

export class ArticleDraftInterpreter {
	static persona = [
		`You are a journalist writing for a newspaper in our virtual world.`,
		`We will provide you with a rough draft idea for a news article, it may contain typos or unclear references.`,
		`Only base your responses on the information we provide here.`,
		'',
		`This is an entirely virtual world, mayor real life events did not happen here.`
	].join('\n');

	static async interpret(database: DbContext, articleId: string) {
		const article = await database.article.find(articleId);

		const sponsor = await database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([new SystemMessage(this.persona)]);
		interpreter.remember([new UserMessage(`# Draft idea\n${article.draft}`)]);

		const catalog = await Context.compile(database);
		interpreter.remember([new UserMessage(`# Known items\n${catalog}`)]);

		const references: { type: string, itemId: string }[] = [];
		const lookups: string[] = [];

		interpreter.addTool('reference', [
			{ name: 'type', type: String },
			{ name: 'itemId', type: String }
		], (type: string, itemId: string) => {
			if (!references.find(reference => reference.itemId == itemId)) {
				references.push({ type, itemId });
			}
		});

		interpreter.addTool('lookup', [
			{ name: 'text', type: String }
		], (text: string) => {
			if (!lookups.includes(text)) {
				lookups.push(text);
			}
		});

		await interpreter.execute(new SystemMessage([
			`Look at the draft idea and the known items above.`,
			`Call 'reference' once for every known item that the draft is actually about.`,
			`If the draft mentions something that is not in the known items list (for example a commodity, or a name that might be misspelled), call 'lookup' with the relevant search text instead.`,
			`You can call both tools multiple times in this response.`,
			`If nothing is relevant, do not call anything.`
		].join('\n')));

		if (lookups.length) {
			for (let text of lookups) {
				const results = await Context.search(database, text);

				interpreter.remember([new UserMessage(`# Search results for '${text}'\n${results || 'No matches found.'}`)]);
			}

			await interpreter.execute(new SystemMessage([
				`Using the search results above, call 'reference' once for every item that is actually relevant to the draft.`,
				`If nothing matches, do not call anything.`
			].join('\n')));
		}

		for (let reference of references) {
			const articleReference = new ArticleReference();
			articleReference.articleId = articleId;
			articleReference.type = reference.type;
			articleReference.itemId = reference.itemId;

			await articleReference.create();
		}

		for (let reference of references) {
			const detail = await Context.describe(database, reference.itemId);

			if (detail) {
				interpreter.remember([new UserMessage(`# Context: ${reference.type}\n${detail}`)]);
			}
		}

		const questions: { question: string, detail: string, answers: string[] }[] = [];

		interpreter.addTool('question', [
			{ name: 'question', type: String },
			{ name: 'detail', type: String },
			{ name: 'answerA', type: String },
			{ name: 'answerB', type: String },
			{ name: 'answerC', type: String }
		], (question: string, detail: string, answerA: string, answerB: string, answerC: string) => {
			questions.push({ question, detail, answers: [answerA, answerB, answerC] });
		});

		await interpreter.execute(new SystemMessage([
			`Prepare exactly 5 short, concrete questions that will help you write this article accurately.`,
			`Almost all questions must be about missing facts and content - what actually happened, concrete details, numbers, consequences.`,
			`Do not ask about writing style, tone, structure, headline wording, or how the article should be written - at most 1 of the 5 questions may be about that, and only if it is genuinely necessary.`,
			`Keep questions concise, no fluffy language. Example: 'Will Mekle employ more people now?'`,
			`For each question, also write a 1-2 sentence detail explaining what the question is about, using the draft and context, so someone reading only the question would otherwise be confused. Example: 'Mekle Iron is expanding its factory in Kittenhill. This affects how many workers the expanded factory will need.'`,
			`For each question, propose exactly 3 short answer options. Example: 'Yes, a few', 'Yes, a lot', 'No'`,
			`Call the 'question' tool exactly 5 times, once per question.`
		].join('\n')));

		for (let index = 0; index < questions.length; index++) {
			const question = new ArticleDraftQuestion();
			question.articleId = articleId;
			question.orderIndex = index;
			question.question = questions[index].question;
			question.detail = questions[index].detail;

			await question.create();

			for (let answerIndex = 0; answerIndex < questions[index].answers.length; answerIndex++) {
				const answer = new ArticleDraftAnswer();
				answer.questionId = question.id;
				answer.orderIndex = answerIndex;
				answer.content = questions[index].answers[answerIndex];

				await answer.create();
			}
		}

		article.interpreted = new Date();
		await article.update();

		// nothing to ask - go straight to writing so the draft doesn't get stuck
		if (!questions.length) {
			await this.write(database, articleId);
		}
	}

	static async write(database: DbContext, articleId: string) {
		const article = await database.article.find(articleId);

		const sponsor = await database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([new SystemMessage(this.persona)]);
		interpreter.remember([new UserMessage(`# Draft idea\n${article.draft}`)]);

		const references = await database.articleReference
			.where(reference => reference.articleId == articleId)
			.toArray();

		for (let reference of references) {
			const detail = await Context.describe(database, reference.itemId);

			if (detail) {
				interpreter.remember([new UserMessage(`# Context: ${reference.type}\n${detail}`)]);
			}
		}

		const questions = await database.articleDraftQuestion
			.where(question => question.articleId == articleId)
			.orderByAscending(question => question.orderIndex)
			.toArray();

		for (let question of questions) {
			const answer = await question.answer.fetch();

			if (answer) {
				interpreter.remember([new UserMessage(`Q: ${question.question}\nA: ${answer.content}`)]);
			}
		}

		const publication = await article.publication.fetch();

		if (publication.writingStyle) {
			interpreter.remember([new UserMessage(`# Writing style for ${publication.name}\n${publication.writingStyle}`)]);
		}

		interpreter.addTool('respond', [
			{ name: 'title', type: String },
			{ name: 'body', type: String }
		], (title: string, body: string) => {
			article.title = title;
			article.body = body;
		});

		await interpreter.execute(new SystemMessage([
			`Write the news article now.`,
			`Only use information provided above (the draft idea, context, and question answers). Do not invent any new facts.`,
			publication.writingStyle ? `Follow the writing style described above.` : null,
			`Call 'respond' with the title and the full article body.`
		].filter(line => line != null).join('\n')));

		interpreter.addTool('summarize', [
			{ name: 'summary', type: String }
		], (summary: string) => {
			article.generatedSummary = summary;
		});

		await interpreter.execute(new SystemMessage([
			`Now write a super short summary of the article.`,
			`Only facts, no fluffy language - basically just the draft idea plus the answers, condensed.`,
			`Call 'summarize' with the summary.`
		].join('\n')));

		article.published = new Date();
		await article.update();
	}
}
