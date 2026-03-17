import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from ".";
import { Interpreter, InterpreterMessage, SystemMessage, ToolError, UserMessage } from "../../life/interpreter";
import { Publication, Commodity, StockSeed, Article, DbContext } from "../../managed/database";
import { TradingEntity } from "../entity";
import { Language } from "../../life/language";
import { MarketTracker } from "../tracker";

export class MarketReporter extends MarketIterationGenerator {
	logger = new Logger('report');

	constructor(
		public publication: Publication,
		public innovations: Commodity[],

		public database: DbContext,
		public tracker: MarketTracker,
	) {
		super(database, tracker);
	}

	async generate() {
		this.logger.log(`reporting as ${this.publication.name}`);

		const situation = await this.compileMarketSituation('Market Situation');
		const news = await this.getNews();

		const context = [
			new SystemMessage('Here are some news, market rates and newly tradeable commodities'),
			new UserMessage(situation),
			new UserMessage(await this.compileCommoditiesList('New Commodities / Innovations', this.innovations)),
			new UserMessage(await this.compileNews('Recently in the News', news)),
		];

		if (!await this.matchesReportingStandpoint(context)) {
			return;
		}

		const article = await this.writeArticle(context);

		await this.summarize(article);
		article.published = new Date();

		await article.update();

		return article;
	}

	matchesReportingStandpoint(context: InterpreterMessage[]) {
		return new Promise<Boolean>(async done => {
			const interpreter = new Interpreter('smart');

			interpreter.addTool('report', [
				{ name: 'confidence', type: Number }
			], async (confidence) => {
				this.logger.log(`report match confidence: ${confidence}`);

				done(confidence > 0.7);
			});

			await interpreter.execute(
				new SystemMessage(`
					# Situation
					You are an author working for the ${this.publication.name} publication.
					You write reports on market updates.
					In this first step, you must review the current market news, and check, if you should report on this.

					Your publication, ${this.publication.name}, has the following standpoint:
					${this.publication.marketReportStandpoint}

					Here are some recent news, and the current market situation.
				`),

				...context,

				new SystemMessage(`
					# Task
					You must now decide, wether it makes sense to write an article about the current situation in ${this.publication.name}.
					Articles should only be written, if relevant.

					Call the 'report' function, with a confidence score if you would write.

					# Examples
					Publication reports on market rate updates, market rates changed: 0.9
					Publication reports only on stuff happening in the "Kensington" borough, news mention new company in "Kensington" making bread: 0.7
					Same as above, but bread price is rising: 0.9
					Writes about innovations, market rates changed but no reports of new products: 0.2
				`)
			);
		});
	}

	writeArticle(context: InterpreterMessage[]) {
		return new Promise<Article>(async done => {
			const interpreter = new Interpreter('smart');

			const article = new Article();
			article.publication = this.publication;

			const sections: string[] = [];

			interpreter.addTool('title', [
				{ name: 'title', type: String }
			], async (title, body) => {
				article.title = title;
			});

			interpreter.addTool('section', [
				{ name: 'section', type: String }
			], async (section) => {
				sections.push(section);
			});

			await interpreter.execute(
				new SystemMessage(`
					# Situation
					You are an author working for the ${this.publication.name} publication.
					You write reports on market updates.

					Your publication, ${this.publication.name}, has the following standpoint:
					${this.publication.marketReportStandpoint}
				`),

				...context,

				new SystemMessage(`
					# Task
					Write an article, in the style described in the publications standpoint.

					Call the 'title' tool when you have a title.
					Call the 'section' tool for each section.
					Write about ${Math.floor(Math.random() * 5) + 2} sections of text.
					Keep the text plain, no headers or formatting.
				`)
			);

			article.body = sections.join('\n\n');

			await article.create();

			done(article);
		});
	}

	async summarize(article: Article) {
		article.generatedSummary = await new Language('smart').summarize(article.body);
	}
}
