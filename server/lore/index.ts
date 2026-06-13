import { Service } from "vlserver";
import { DbContext, Lore, LoreProposal, LoreQuery, LoreQuerySource } from "../managed/database";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../life/interpreter";
import { Time } from "../../interface/time";
import { OpenAiInterpreterProvider } from "../life/interpreter/provider/openai";
import { LoreSummaryViewModel, LoreViewModel } from "./lore";
import { LoreQueryViewModel } from "./query";
import { LoreProposalViewModel } from "./proposal";

export class LoreService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	getTimeline(cutoff: Date) {
		const lore = this.database.lore
			.where(lore => lore.timestamp.isBefore(cutoff))
			.orderByDescending(lore => lore.timestamp)
			.limit(50);

		return LoreSummaryViewModel.from(lore);
	}

	async getLore(id: string) {
		return new LoreViewModel(await this.database.lore.find(id));
	}

	async getAnswer(id: string) {
		const query = await this.database.loreQuery.find(id);

		return new LoreQueryViewModel(query);
	}

	async getProposal(id: string) {
		const proposal = await this.database.loreProposal.find(id);

		return new LoreProposalViewModel(proposal);
	}

	async prepareNext() {
		const lore = await this.database.lore.first(lore => lore.facts == null);

		if (!lore) {
			return;
		}

		const sponsor = await this.database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([new SystemMessage([
			`You are managing the lore of our virtual world`,
			`We will provide you with lots of information about our virtual world`,
			`Make sure to only base your responses on the information provided here`,
			'',
			`This is a entirely virtual world, mayor real life events did not happen here`
		].join('\n'))]);

		interpreter.addTool('respond', [{ name: 'facts', type: String }], async (facts: string) => {
			if (facts.length > lore.context.length) {
				throw new ToolError(`Facts are too long. Remove details`);
			}

			lore.facts = facts;

			await lore.update();
		});

		interpreter.remember([new SystemMessage([
			`Your job is to summarize the following context into a facts list.`,
			`Remove all the clutter, stating the important facts.`,
			'',
			'Here are some examples'
		].join('\n'))]);

		const examples = await this.database.lore
			.where(lore => lore.facts != null)
			.limit(3)
			.toArray();

		for (let example of examples) {
			interpreter.remember([
				new UserMessage(example.context),
				new UserMessage(example.facts)
			]);
		}

		await interpreter.execute(new SystemMessage([
			`Respond by calling the 'respond' tool.`,
			'',
			`Keep sentences as short as possible`,
			'This should be a fact list, not a nice text to read',
			'Absolute minimalist list',
			'Remove irrelevant facts',
			'The list must be shorter than the provided context',
			'',
			'When listing things, combine them',
			'',
			lore.context
		].join('\n')));

		return lore.facts;
	}

	async answer(question: string) {
		const sponsor = await this.database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([new SystemMessage([
			`You are managing the lore of our virtual world`,
			`We will provide you with lots of information about our virtual world`,
			`Make sure to only base your responses on the information provided here`,
			'',
			`This is a entirely virtual world, mayor real life events did not happen here`
		].join('\n'))]);

		const timeline = await this.database.lore
			.orderByAscending(lore => lore.timestamp)
			.toArray();

		for (let lore of timeline) {
			interpreter.remember([
				new UserMessage([
					`# ${lore.id.split('-')[0]} ${new Time(lore.timestamp).toDateString()}: ${lore.title}`,
					lore.facts ?? lore.context
				].join('\n'))
			]);
		}

		const query = new LoreQuery();
		query.asked = new Date();
		query.question = question;

		await query.create();

		interpreter.addTool('respond', [{ name: 'answer', type: String }], response => query.answer = response);

		interpreter.addTool('cite', [
			{ name: 'source', type: String },
			{ name: 'relation', type: String }
		], async (source: string, relation: string) => {
			const lore = timeline.find(lore => lore.id.split('-')[0] == source);

			if (lore) {
				const citation = new LoreQuerySource();
				citation.relation = relation;
				citation.queryId = query.id;
				citation.sourceId = lore.id;

				await citation.create();
			}
		});

		interpreter.execute(new SystemMessage([
			`Current time: ${Time.now().toString()}`,
			'',
			`Your job is to answer the following question based on what you know from here`,
			question,
			'',
			`Respond by calling the 'respond' tool.`,
			`If you are not sure about a fact, say that you are not sure`,
			`Try to answer as much as possible, but declare if something is not in your knowledge`,
			'',
			`If you are referring to something in the timeline, call the 'cite' tool.`,
			`Mention the relation to that lore item, as well as its id`,
			'',
			`Keep the answers short`
		].join('\n'))).then(async () => {
			await query.update();
		});

		return query.id;
	}

	async propose(title: string, context: string) {
		const proposal = new LoreProposal();
		proposal.submitted = new Date();
		proposal.title = title;
		proposal.context = context;

		await proposal.create();

		const sponsor = await this.database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([new SystemMessage([
			`You are managing the lore of our virtual world`,
			`We will provide you with lots of information about our virtual world`,
			`Make sure to only base your responses on the information provided here`,
			'',
			`This is a entirely virtual world, mayor real life events did not happen here`
		].join('\n'))]);

		const timeline = await this.database.lore
			.orderByAscending(lore => lore.timestamp)
			.toArray();

		for (let lore of timeline) {
			interpreter.remember([
				new UserMessage([
					`# ${lore.id.split('-')[0]} ${new Time(lore.timestamp).toDateString()}: ${lore.title}`,
					lore.facts ?? lore.context
				].join('\n'))
			]);
		}

		interpreter.addTool('verify', [
			{ name: 'valid', type: Number },
			{ name: 'reason', type: String }
		], (valid: number, reason: string) => {
			proposal.valid = valid > 0.8;
			proposal.validation = reason;
		});

		interpreter.execute(new SystemMessage([
			`Current time: ${Time.now().toString()}`,
			'',
			`We would like to add something to the timeline, but we need to make sure that it makes sense`,
			'',
			`The proposed lore update:`,
			title,
			context,
			'',
			`Does that make sense, or is there something in the timeline that would conflict with this?`,
			`Call the 'verify' tool when you are ready, provide a reason why you reached your verdict.`,
			`If the new lore is valid, provide 1, if not 0`,
			'Be critical'
		].join('\n'))).then(async () => {
			await proposal.update();
		});

		return proposal.id;
	}

	async expand(baseId: string) {
		const base = await this.database.lore.find(baseId);
		const proposals = await base.proposals.toArray();

		const sponsor = await this.database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		interpreter.remember([new SystemMessage([
			`You are managing the lore of our virtual world`,
			`We will provide you with lots of information about our virtual world`,
			`Make sure to only base your responses on the information provided here`,
			'',
			`This is a entirely virtual world, mayor real life events did not happen here`
		].join('\n'))]);

		const timeline = await this.database.lore
			.orderByAscending(lore => lore.timestamp)
			.toArray();

		for (let lore of timeline) {
			interpreter.remember([
				new UserMessage([
					`# ${lore.id.split('-')[0]} ${new Time(lore.timestamp).toDateString()}: ${lore.title}`,
					lore.facts ?? lore.context
				].join('\n'))
			]);
		}

		interpreter.addTool('propose', [
			{ name: 'title', type: String },
			{ name: 'description', type: String }
		], async (title: string, description: string) => {
			const proposal = new LoreProposal();
			proposal.baseLoreId = base.id;
			proposal.submitted = new Date();
			proposal.title = title;
			proposal.context = description;

			await proposal.create();

			proposals.push(proposal);
		});

		await interpreter.execute(new SystemMessage([
			`Current time: ${Time.now().toString()}`,
			'',
			`This is our current timeline.`,
			'We would like to extend it',
			'',
			`You are inventing new lore now`,
			`We have talked about '${base.title}'.`,
			`Something happened related to that lore detail.`,
			'',
			`Make three proposals of what could be happening now.`,
			`Call the 'propose' tool with a title and description.`
		].join('\n')));

		return LoreProposalViewModel.from(proposals);
	}

	async acceptProposal(id: string) {
		const proposal = await this.database.loreProposal.find(id);

		const lore = new Lore();
		lore.timestamp = new Date();
		lore.proposalId = proposal.id;

		lore.title = proposal.title;
		lore.context = proposal.context;

		await lore.create();

		this.prepareNext();

		return lore.id;
	}
}
