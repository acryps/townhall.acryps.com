import { Logger } from "@acryps/log";
import { Borough, Company, DbContext, MarketCycle, TokenSponsor } from "../../managed/database";
import { MarketTracker } from "../tracker";
import { MarketCycleGeneratorStep } from "./step";
import { StockSeedRuleMarketCycleGeneratorStep } from "./step/1-stock-seed";
import { Time } from "../../../interface/time";
import { ResidentialDemandMarketCycleGeneratorStep } from "./step/2-residential-demand";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../life/interpreter";
import { OpenAiInterpreterProvider } from "../../life/interpreter/provider/openai";
import { Point } from "../../../interface/point";
import { convertToLegalCompanyName } from "../../../interface/company";
import { MarketSituationParameter } from "./situation";

export class MarketCycleGenerator {
	steps = () => ({
		'residential demand': ResidentialDemandMarketCycleGeneratorStep,
		'stock seed rule': StockSeedRuleMarketCycleGeneratorStep,
	});

	situation = [
		new MarketSituationParameter('outlook', 'pessimistic', 'optimistic'),
		new MarketSituationParameter('riskAppetite', 'defensive', 'risk-seeking'),
		new MarketSituationParameter('confidence', 'unsure', 'certain'),
		new MarketSituationParameter('uncertainty', 'predictable', 'unpredictable'),
		new MarketSituationParameter('speculation', 'fundamental', 'speculative')
	];

	constructor(
		public database: DbContext,
		public tracker: MarketTracker
	) {}

	async advance() {
		const sponsor = await this.database.tokenSponsor.first();

		const lastCycle = await this.database.marketCycle
			.where(cycle => cycle.closed != null)
			.orderByDescending(cycle => cycle.closed)
			.first();

		const cycle = new MarketCycle();
		cycle.sponsor = sponsor;
		cycle.opened = new Date();

		// prepare situation
		for (let parameter of this.situation) {
			(cycle as any)[parameter.property] = lastCycle[parameter.property];
		}

		await cycle.create();

		const logger = new Logger('market cycle').child(cycle.id.split('-')[0]);
		logger.log(`cycle opened ${new Time(cycle.opened).toString()}: ${this.situation.join(', ')}`);

		cycle.context = await this.compileContext(cycle, sponsor);
		logger.log(`context: ${cycle.context}`);
		await cycle.update();

		const steps = this.steps();

		for (let name in steps) {
			const generator = new steps[name](
				this.database,
				this.tracker,
				cycle,
				this.situation,

				sponsor,
				logger,
				name
			) as MarketCycleGeneratorStep;

			await generator.generate();
		}

		cycle.closed = new Date();
		await cycle.update();

		logger.log(`cycle closed`);
	}

	private async compileContext(cycle: MarketCycle, sponsor: TokenSponsor) {
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([
			new SystemMessage(`
				We are running a market simulation.
				This is all fictional, events that occurred in real life did not happen in this world.

				It is currently ${Time.now().toString()}.

				I will provide some recent articles, note referenced companies and boroughs.
				The context from the last few cycles will be included too.
			`)
		]);

		const recentNews = await this.database.article
			.where(article => article.published != null)
			.orderByDescending(article => article.published)
			.include(article => article.publication)
			.include(article => article.opinions)
			.limit(5)
			.toArray();

		const boroughs = await this.database.borough
			.orderByDescending(borough => borough.name.length())
			.toArray();

		const mentionedBoroughs = new Set<Borough>();

		const companies = await this.database.company
			.orderByDescending(borough => borough.name.length())
			.toArray();

		const mentionedCompanies = new Set<Company>();

		for (let article of recentNews) {
			const publication = await article.publication.fetch();

			interpreter.remember([new UserMessage(`
				# ${article.title}
				Article published at ${new Time(article.published).toDateString()} in ${publication.name}.
				About ${publication.name}: ${publication.description}

				${article.generatedSummary ?? article.body}
			`)]);

			for (let borough of boroughs) {
				if (article.body.includes(borough.name)) {
					mentionedBoroughs.add(borough);
				}
			}

			for (let company of companies) {
				if (article.body.includes(company.name)) {
					mentionedCompanies.add(company);
				}
			}

			for (let opinion of await article.opinions.toArray()) {
				const author = await opinion.author.fetch();

				interpreter.remember([new UserMessage(`
					## Opinion by ${author.givenName} ${author.familyName}:
					${opinion.comment}
				`)]);
			}
		}

		for (let borough of mentionedBoroughs) {
			const center = Point.center(Point.unpack(borough.bounds));

			interpreter.remember([new UserMessage(`
				# Borough ${borough.name}
				Located at ${center.toContextString()}

				${borough.description}
			`)]);
		}

		for (let company of mentionedCompanies) {
			interpreter.remember([new UserMessage(`
				# Company ${convertToLegalCompanyName(company)}
				${company.description}
			`)]);
		}

		const recentCycles = await this.database.marketCycle
			.orderByDescending(cycle => cycle.opened)
			.where(peer => peer.id != cycle.id)
			.where(cycle => cycle.context != null)
			.where(cycle => cycle.closed != null)
			.limit(10)
			.toArray();

		for (let cycle of recentCycles) {
			interpreter.remember([new UserMessage(`
				# Market Cycle ${cycle.id.split('-')[0]}
				Opened ${new Time(cycle.opened).toString()}, closed ${new Time(cycle.closed).toString()}
				Situation: ${MarketSituationParameter.toSituationString(this.situation, cycle)}

				${cycle.context}
			`)]);
		}

		const sections = [];

		interpreter.addTool(
			'context',
			[
				{ name: 'context', type: String }
			],
			context => sections.push(context)
		);

		interpreter.addTool(
			'reference',
			[
				{ name: 'name', type: String },
				{ name: 'summary', type: String },
			],
			(name, summary) => sections.push(`${name}: ${summary}`)
		);

		for (let parameter of this.situation) {
			interpreter.addTool(
				parameter.property,
				[
					{ name: 'value', type: Number }
				],
				value => {
					if (value > 1 || value < 0) {
						throw new ToolError(`Parameter ${parameter.property} out of bounds, must be between 0 - 1`);
					}

					(cycle as any)[parameter.property] = value;
				}
			);
		}

		await interpreter.execute(new SystemMessage(`
			Summarize the current context from a market perspective.
			Ignore details about unrelated events.
			Keep it short, skip details.
			One text section, no headers.

			Write this like a executive summary, something sent to people subscribed to a economy news feed, like the UBS House View Daily.

			Call the 'context' tool.

			Do not list the relevant players.
			For the items mentioned in your summary, reference them using the 'reference' tool, and give a one sentence summary.

			In light of the context, do you think one of the following parameters changed?
			Gradual changes are very welcome, be as accurate as you can.
			If so, call the respective tool with the new value from 0.00 - 1.00.
			${this.situation.map(
				parameter => `${parameter.property} (0.00 = ${parameter.toSituationString(0)}, 1.00 = ${parameter.toSituationString(1)})`
			).join('\n')}
		`));

		return sections.join('\n');
	}
}
