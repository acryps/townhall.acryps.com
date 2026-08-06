import { Logger } from "@acryps/log";
import { convertToLegalCompanyName } from "../../../interface/company";
import { LegalEntityManager } from "../../areas/legal-entity/manager";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../../life/interpreter";
import { OpenAiInterpreterProvider } from "../../life/interpreter/provider/openai";
import { CourtCase, CourtCaseClaim, CourtCaseDefense, CourtCaseReferenceDefinition, CourtCaseReferenceLaw, DbContext, District, Juror, JurorThought, JuryOpinion, JuryVerdict, JuryVerdictVote, Law, LawBook, LegalDefinition, LegalEntity, Resident } from "../../managed/database";
import { Jobs } from "openai/resources/fine-tuning/jobs/jobs";

export class CourtCaseSession {
	static readonly courtCaseFormatIndex = '${index}';

	static readonly lawBookFormatBook = '${book}';
	static readonly lawBookFormatIndexes = new Map<string, string>()
		.set('${index.dot}', '.')
		.set('${index.dash}', '-');

	logger: Logger;

	constructor(
		private database: DbContext,

		private courtCase: CourtCase
	) {
		this.logger = new Logger('court-case').child(courtCase.identifier);
	}

	static async file(
		claimant: LegalEntity,
		claim: string,

		defendant: LegalEntity,
		defense: string,

		jurisdiction: District
	) {
		const courtCase = new CourtCase();
		courtCase.filed = new Date();

		courtCase.identifier = (await this.findDistrictRule(jurisdiction, 'courtCaseFormat') as string)
			.replace(CourtCaseSession.courtCaseFormatIndex, `${await jurisdiction.courtCases.count() + 1}`);

		courtCase.claimant = claimant;
		courtCase.submittedClaim = claim;

		courtCase.defendant = defendant;
		courtCase.submittedDefense = defense;

		courtCase.jurisdiction = jurisdiction;

		await courtCase.create();

		return courtCase;
	}

	async writeDocket() {
		this.logger.log(`writing docket`);

		const interpreter = await this.obtainInterpreter();
		const jurisdiction = await this.courtCase.jurisdiction.fetch();

		interpreter.remember([
			this.meta,
			new SystemMessage([
				'You are acting as a judge.',
				'Your goal is to prepare a docket for the jury.',
				'Both the claimant and the defendant have submitted their statements to our court.',
				'We will provide you with every law that applies in our jurisdiction.',
				'You need to extract the facts for the defendant and claimant, as well as listing all relevant laws.',
				'The jurors will then decide on this case'
			].join('\n')),

			new UserMessage([
				`# Court Case ${this.courtCase.identifier}`,
				`Claimant: ${await this.nameParty(await this.courtCase.claimant.fetch())}`,
				`Defendant: ${await this.nameParty(await this.courtCase.defendant.fetch())}`,
				'',
				'Submitted statement by Claimant:',
				this.courtCase.submittedClaim,
				'',
				'Submitted statement by Defendant:',
				this.courtCase.submittedDefense
			].join('\n'))
		]);

		const laws = (await this.findLaws())
			.sort((a, b) => a.identifier.localeCompare(b.identifier));

		interpreter.remember([
			new UserMessage([
				'# Laws',
				'All applicable law in this jurisdiction:',
				...laws.map(law => `${law.identifier}: ${law.text}`)
			].join('\n'))
		]);

		const definitions = await this.database.legalDefinition
			.orderByAscending(definition => definition.name)
			.toArray();

		interpreter.remember([
			new UserMessage([
				'# Definition',
				'Legal definitions for words:',
				...definitions.map(definition => `${definition.name}: ${definition.definition}`)
			].join('\n'))
		]);

		let exampleLawCode = (await CourtCaseSession.findDistrictRule(jurisdiction, 'lawBookFormat') as string)
			.replace(CourtCaseSession.lawBookFormatBook, 'PBL');

		for (let [template, delimiter] of CourtCaseSession.lawBookFormatIndexes) {
			exampleLawCode = exampleLawCode.replace(template, [1, 2, 3].join(delimiter));
		}

		const claims: string[] = [];
		interpreter.addTool('claim', [{ type: String, name: 'fact' }], fact => {
			this.logger.log(`- claim: ${fact}`);

			claims.push(fact);
		});

		const defense: string[] = [];
		interpreter.addTool('defense', [{ type: String, name: 'fact' }], fact => {
			this.logger.log(`- defense: ${fact}`);

			defense.push(fact);
		});

		const referencedLaws: Law[] = [];
		interpreter.addTool('law', [{ type: String, name: 'identifier' }], identifier => {
			const law = laws.find(law => law.identifier == identifier);

			if (!law) {
				throw new ToolError(`There is no law with the identifier '${identifier}'`);
			}

			this.logger.log(`reference law ${law.identifier}: ${law.text}`);
			referencedLaws.push(law);
		});

		const referencedDefinitions: LegalDefinition[] = [];
		interpreter.addTool('define', [{ type: String, name: 'term' }], term => {
			const definition = definitions.find(law => law.name == term);

			if (!definition) {
				this.logger.warn(`Judge referenced unknown term '${term}'`);

				return;
			}

			this.logger.log(`reference definition ${term}`);
			referencedDefinitions.push(definition);
		});

		await interpreter.execute(new SystemMessage([
			'# Actions',
			'Add a fact to the claimant statement',
			'You must distill the submitted text into a clear list of facts',
			'List facts as a fact, do not mention that it is a statement',
			`claim('Claimant resides at property since 32 years')`,
			'',
			'To add a fact for the defendant, call the other tool',
			`defense('Owns property')`,
			'',
			'The jurors are not law professionals.',
			'You must tell them about the laws that are relevant to this',
			`law('${exampleLawCode}')`,
			'',
			'Reference relevant terms:',
			`define('${definitions[0].name}')`
		].join('\n')));

		this.logger.log('docket completed, saving');

		for (let content of claims) {
			const claim = new CourtCaseClaim();
			claim.content = content;
			claim.courtCase = this.courtCase;

			await claim.create();
		}

		for (let content of defense) {
			const defense = new CourtCaseDefense();
			defense.content = content;
			defense.courtCase = this.courtCase;

			await defense.create();
		}

		for (let source of referencedLaws) {
			const reference = new CourtCaseReferenceLaw();
			reference.law = source;
			reference.courtCase = this.courtCase;

			await reference.create();
		}

		for (let source of referencedDefinitions) {
			const reference = new CourtCaseReferenceDefinition();
			reference.definition = source;
			reference.courtCase = this.courtCase;

			await reference.create();
		}

		this.logger.log('docket saved');
	}

	async compileDocket() {
		const lines = [
			`# Court Case ${this.courtCase.identifier}`,
			`Claimant: ${await this.nameParty(await this.courtCase.claimant.fetch())}`,
			`Defendant: ${await this.nameParty(await this.courtCase.defendant.fetch())}`,
			'',
		];

		lines.push('## Claims:');

		for (let claim of await this.courtCase.claims.toArray()) {
			lines.push(claim.content);
		}

		lines.push('## Defense:');

		for (let defense of await this.courtCase.defenses.toArray()) {
			lines.push(defense.content);
		}

		// add referenced law
		lines.push('## Applicable Law:');

		const laws = await this.courtCase.referencedLaws.toArray();

		if (laws.length) {
			for (let reference of laws) {
				const law = await reference.law.fetch();

				lines.push(`${law.identifier}: ${law.text}`);
			}
		} else {
			lines.push('No laws apply to a case like this, this is legally not defined.');
		}

		// add referenced definitions
		lines.push('## Legal Definitions:');

		const definitions = await this.courtCase.referencedDefinitions.toArray();

		if (definitions.length) {
			for (let reference of definitions) {
				const definition = await reference.definition.fetch();

				lines.push(`${definition.name}: ${definition.definition}`);
			}
		} else {
			lines.push('No legal definitions relevant for this case.');
		}

		return lines.join('\n');
	}

	async summonJury() {
		this.logger.log(`summoning jury`);

		const jurisdiction = await this.courtCase.jurisdiction.fetch();

		const allDistricts = await this.database.district.toArray();
		const districts: District[] = [];

		const collectDistricts = (district: District) => {
			districts.push(district);

			for (let peer of allDistricts) {
				if (peer.parentId == district.id) {
					collectDistricts(peer);
				}
			}
		};

		collectDistricts(jurisdiction);

		const residentPool: Resident[] = [];

		for (let district of districts) {
			residentPool.push(...await this.database.resident
				.where(resident => resident.mainTenancy.dwelling.property.borough.districtId == district.id)
				.toArray()
			);
		}

		const jurySize = await CourtCaseSession.findDistrictRule(jurisdiction, 'jurySize') as number;

		this.logger.log(`summoning pool contains ${residentPool.length} residents, ${jurySize} required`);

		if (residentPool.length < jurySize) {
			throw new Error(`Not enough residents in '${jurisdiction.name}' to summon a jury`);
		}

		residentPool.sort(() => Math.random() > 0.5 ? 1 : -1);

		const residents = residentPool.slice(0, jurySize);
		const jury: Juror[] = [];

		for (let resident of residents) {
			const juror = new Juror();
			juror.courtCase = this.courtCase;
			juror.resident = resident;

			await juror.create();
			jury.push(juror);

			this.logger.log(`summoned ${resident.givenName} ${resident.familyName}`);
		}

		return jury;
	}

	async reviewDocket(juror: Juror, docket: string) {
		const resident = await juror.resident.fetch();

		const logger = this.logger.task(resident.tag);
		logger.log(`reviewing docket`);

		const interpreter = await this.obtainInterpreter();
		const jurisdiction = await this.courtCase.jurisdiction.fetch();

		interpreter.remember([
			this.meta,
			new SystemMessage([
				`You are acting as a juror, ${resident.givenName} ${resident.familyName}.`,
				'You are not a law professional, you are a resident summoned for jury duty.',
				'',
				'The judge has reviewed the statements from the claimant and defendant.',
				'They have compiled a docket containing all the facts, a list of applicable law and definitions for relevant legal terms',
			].join('\n')),

			new UserMessage([
				`# ${resident.givenName} ${resident.familyName}`,
				resident.biography
			].join('\n')),

			new UserMessage([
				'# Docket',
				docket
			].join('\n'))
		]);

		const peerOpinions: JuryOpinion[] = [];
		const peerVerdicts: JuryVerdict[] = [];

		const thoughts: JurorThought[] = [];

		for (let peer of await this.courtCase.jury.toArray()) {
			const opinions = await peer.submittedOpinions.toArray();
			peerOpinions.push(...opinions);

			const verdictProposals = await peer.submittedVerdicts.toArray();
			peerVerdicts.push(...verdictProposals);

			thoughts.push(...await peer.thoughts.include(thought => thought.juror).toArray());
		}

		thoughts.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);

		if (thoughts.length) {
			const messages: string[] = [];

			for (let thought of thoughts) {
				const juror = await thought.juror.fetch();
				const resident = await juror.resident.fetch();

				messages.push(`${resident.givenName} ${resident.familyName}: ${thought.content}`);
			}

			interpreter.remember([
				new UserMessage([
					'# Conversation',
					'What the other jurors said:',
					...messages
				].join('\n'))
			]);
		}

		interpreter.addTool('speak', [{ type: String, name: 'content' }], async content => {
			logger.log(`said: ${content}`);

			const thought = new JurorThought();
			thought.timestamp = new Date();
			thought.juror = juror;
			thought.content = content;

			await thought.create();
		});

		const opinions: string[] = [];
		interpreter.addTool('opinion', [{ type: String, name: 'content' }], content => {
			logger.log(`opinion: ${content}`);

			opinions.push(content);
		});

		interpreter.addTool('supportOpinion', [{ type: String, name: 'id' }], () => {
			logger.log(`supporting existing opinion`);
		});

		const verdictProposals: string[] = [];
		interpreter.addTool('proposeVerdict', [{ type: String, name: 'content' }], content => {
			logger.log(`verdict proposal: ${content}`);

			verdictProposals.push(content);
		});

		// give the llm a easy path out, votes will be cast later
		interpreter.addTool('acceptVerdict', [{ type: String, name: 'id' }], () => {
			logger.log(`accept existing verdict`);
		});

		await interpreter.execute(new SystemMessage([
			'# Actions',
			'Review the docket',
			`Decide what is right based on your description of ${resident.givenName}`,
			`Really get into the role of ${resident.givenName}.`,
			'If the person is weird, act weird; if they are a strict structured person, act as such',
			'Your output must not be formal, live the person you are acting as',
			'Be strong on your morals, on your opinions.',
			'You do not have to agree with everybody else.',
			'Being in a jury is important, this will result in new laws, this will shape society.',
			'Be opinionated, you may even be edgy if it fits the person.',
			'',
			Math.random() > 0.5 ? [
				'Act as a contrarian.',
				'Disagree with the other jurors, bring in new ideas.'
			] : [],
			'',
			'You are in a room with the other jurors',
			'Tell them what you think!',
			'Respond to other people if you want.',
			'Use the speak tool to do so',
			'',
			'Jurors can write opinions',
			'Opinions will be reviewed by the other jurors, and if they agree, become part of the law',
			'A opinion is a proposal for a law, NOT just what the juror thinks to themselves about this case',
			'A judge will make sure they fit in the law books in terms of wording',
			'',
			'Review what the other jurors submitted',
			'Do not mention names or claimant/defendant in a opinion, use the example below as a reference',
			'Call the opinion function when you have a proposal',
			`opinion('Property owners are responsible for making sure their building does not exceed the building height limit')`,
			'',
			...(peerOpinions.length ? [
				'Opinions proposed by other jurors:',
				...peerOpinions.map(opinion => `#${opinion.id.split('-')[0]}: ${opinion.content}`),
				'',
				`If you would propose the same opinion as somebody else proposed, just call supportOpinion('#f94449a') instead.`
			] : []),
			'',
			'The jury must reach a verdict.',
			'Any juror can come up with a verdict proposal.',
			'You then vote on them, and verdicts are eliminated until a clear winner has been picked.',
			`proposeVerdict('The defendant must remove the top floor of the building')`,
			...(peerVerdicts.length ? [
				'Verdicts proposed by other jurors:',
				...peerVerdicts.map(verdict => `#${verdict.id.split('-')[0]}: ${verdict.verdict}`),
				'',
				'If another juror already proposed a verdict that you agree with, call the acceptVerdict function instead of proposing a new verdict',
				`acceptVerdict('#5af4a04')`
			] : [
				'You must write a verdict proposal.'
			])
		].join('\n')));

		for (let content of opinions) {
			const opinion = new JuryOpinion();
			opinion.content = content;
			opinion.submitted = new Date();
			opinion.submitter = juror;

			await opinion.create();
		}

		for (let content of verdictProposals) {
			const proposal = new JuryVerdict();
			proposal.verdict = content;
			proposal.proposed = new Date();
			proposal.submitter = juror;

			await proposal.create();
		}

		logger.finish();
	}

	private static async findDistrictRule(jurisdiction: District, property: keyof District) {
		let district = jurisdiction;

		while (district[property] === null) {
			district = await district.parent.fetch();
		}

		if (!district) {
			throw new Error(`Jurisdiction '${jurisdiction.name}' does not define the required rule '${property}'`);
		}

		return district[property];
	}

	private get meta() {
		return new SystemMessage([
			'This is a fictional world.',
			'We are running a civilization simulation here.'
		].join('\n'))
	}

	private async nameParty(entity: LegalEntity) {
		if (entity.state) {
			return 'The State';
		}

		if (entity.boroughId) {
			return `The Borough of '${(await entity.borough.fetch()).name}'`;
		}

		if (entity.companyId) {
			return `${convertToLegalCompanyName(await entity.company.fetch())}`;
		}

		const resident = await entity.resident.fetch();

		return `${resident.givenName} ${resident.familyName}`;
	}

	private async findLaws() {
		let district = await this.courtCase.jurisdiction.fetch();

		const laws: Law[] = [];

		while (district) {
			for (let rootBook of await district.rootLawBooks.toArray()) {
				for (let book of await this.collectBooks(rootBook)) {
					for (let rootLaw of await book.rootLaws.toArray()) {
						laws.push(...await this.collectLaws(rootLaw));
					}
				}
			}

			district = await district.parent.fetch();
		}

		return laws;
	}

	private async collectBooks(book: LawBook) {
		const children: LawBook[] = [book];

		for (let child of await book.childBooks.toArray()) {
			children.push(...await this.collectBooks(child));
		}

		return children;
	}

	private async collectLaws(law: Law) {
		const children: Law[] = [law];

		for (let child of await law.children.toArray()) {
			children.push(...await this.collectLaws(child));
		}

		return children;
	}

	private async obtainInterpreter() {
		const sponsor = await this.database.tokenSponsor.first();
		const interpreter = new Interpreter(new OpenAiInterpreterProvider(sponsor));

		return interpreter;
	}
}
