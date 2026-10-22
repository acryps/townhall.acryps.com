import { MarketCycleGeneratorStep } from ".";
import { SystemMessage, UserMessage } from "../../../life/interpreter";
import { Commodity, MarketSegment, MarketSegmentCycle } from "../../../managed/database";
import { Time } from "../../../../interface/time";
import { MarketSegmentResolver } from "../../segment";
import { convertToCurrency } from "../../../../interface/currency";
import { formatTradingUnit, parseTradingUnitValue } from "../../../../interface/trading-unit";

export class MarketSegmentCycleGeneratorStep extends MarketCycleGeneratorStep {
	async generate() {
		const segments = await this.database.marketSegment.toArray();

		if (!segments.length) {
			this.logger.log(`no market segments defined yet, skipping`);

			return;
		}

		const commoditiesBySegmentId = await MarketSegmentResolver.groupCommoditiesBySegment(this.database);

		for (let segment of segments) {
			const commodities = commoditiesBySegmentId.get(segment.id) ?? [];

			if (!commodities.length) {
				this.logger.log(`segment '${segment.name}' has no commodities assigned, skipping`);

				continue;
			}

			await this.advance(segment, commodities);
		}
	}

	private async advance(segment: MarketSegment, commodities: Commodity[]) {
		this.logger.log(`advancing segment '${segment.name}' (${commodities.length} commodities)`);

		const segmentCycle = new MarketSegmentCycle();
		segmentCycle.segment = segment;
		segmentCycle.cycle = this.cycle;
		segmentCycle.opened = new Date();

		await segmentCycle.create();

		const interpreter = this.getInterpreter();

		interpreter.remember([new SystemMessage(`
			You are the desk responsible for the '${segment.name}' segment.
			${segment.description ?? ''}

			It is currently ${Time.now().toString()} in the simulation. Judge the news and your notes against this date, not the real world's.

			Your job is to review the recent news and decide whether anything changes the price of the commodities you track.
			Weigh the broader market situation and context given above (outlook, confidence, risk appetite, ...) alongside the news - a calm, confident market should mean smaller, more hesitant moves even on real news.

			Write your reasoning as a short, narrative style, like a desk note passed between traders.
			Only commodities genuinely affected by the news should move - most cycles, most commodities stay flat.

			For commodities that already have a price, call 'priceChange' with its tag and the percentage change (eg. 2.5 for +2.5%, -1.2 for -1.2%).
			Never invent an absolute price yourself, only the percentage move - we compute the resulting price from it.
			Small, gradual moves are the norm, well under 1% most cycles. Large moves should only happen on major news (supply shocks, demand collapses, legislation, disasters).

			Some commodities below have no price yet. For those, call 'initialPrice' instead, picking a sensible starting price from your own knowledge of what such a good costs.
			Always state both a quantity and the price for that exact quantity, eg. quantity: '1t', price: 450 - never give a price without saying what quantity it is for, and always use the same unit shown for that commodity below. This is not a move, just establishing where it starts.

			Prices are in E, this world's currency.

			Once you've reasoned through the news, call 'context' with your updated internal memory for next cycle (what you're watching, what you expect next, open questions).
			Then call 'summary' with a three sentence summary of the current state and movements in this segment, written for a public market report.
		`)]);

		if (segment.context) {
			interpreter.remember([new UserMessage(`
				# Your notes from last cycle
				${segment.context}
			`)]);
		}

		for (let article of this.news) {
			const publication = await article.publication.fetch();

			interpreter.remember([new UserMessage(`
				# ${article.title}
				Published ${new Time(article.published).toDateString()} in ${publication.name}

				${article.generatedSummary ?? article.body}
			`)]);
		}

		const commodityContexts = await Promise.all(commodities.map(async commodity => {
			const unit = await commodity.tradingUnit.fetch();
			const baselineRaw = 10 ** commodity.tradingUnitRetailBaseline;
			const baseline = formatTradingUnit(unit, baselineRaw);

			return { commodity, unit, baselineRaw, baseline, price: this.currentPrice(commodity) };
		}));

		const marketContext = await this.randomMarketContext(new Set(commodities.map(commodity => commodity.id)));

		if (marketContext.length) {
			interpreter.remember([new UserMessage(`
				# Rest of the market (read only)
				Other desks handle these - you cannot move their price, they're only here so you can judge the overall mood (inflationary, panicked, calm, ...).

				${marketContext.map(entry => `- ${entry.commodity.name}: ${convertToCurrency(entry.price)} per ${entry.baseline}`).join('\n')}
			`)]);
		}

		interpreter.remember([new UserMessage(`
			# Commodities you track
			${commodityContexts.map(entry => entry.price == null
				? `- ${entry.commodity.tag}: ${entry.commodity.name} (priced per ${entry.baseline}), no price set yet - establish an initial price. ${entry.commodity.description ?? ''}`
				: `- ${entry.commodity.tag}: ${entry.commodity.name} (priced per ${entry.baseline}), currently ${convertToCurrency(entry.price)}`
			).join('\n')}
		`)]);

		let context: string;
		let summary: string;

		// a bad call (eg. a tag from the read-only market context above) is skipped rather than
		// retried - one desk's mistake shouldn't throw away every other price move in the same batch
		const findEntry = (tag: string) => commodityContexts.find(entry => entry.commodity.tag == tag);

		// handed to the tracker, which is the only thing that writes commodity_rating
		const setPrice = (entry: typeof commodityContexts[number], price: number) => {
			entry.price = price;

			this.tracker.pendingPrices.set(entry.commodity.id, price);
		};

		interpreter.addTool('priceChange', [
			{ name: 'tag', type: String },
			{ name: 'percent', type: Number }
		], (tag, percent) => {
			const entry = findEntry(tag);

			if (!entry) {
				this.logger.log(`skipping priceChange('${tag}'), not tracked by this desk`);

				return;
			}

			if (entry.price == null) {
				this.logger.log(`skipping priceChange('${tag}'), has no price yet, should've called 'initialPrice' instead`);

				return;
			}

			// no rounding - the move is computed from the full precision price, not a display-rounded one
			const price = entry.price * (1 + percent / 100);

			if (!(price > 0)) {
				this.logger.log(`skipping priceChange('${tag}'), resulting price would not be greater than zero`);

				return;
			}

			this.logger.log(`'${tag}' price: ${entry.price} E ${percent >= 0 ? '+' : ''}${percent}% -> ${price} E per ${entry.baseline}`);

			setPrice(entry, price);
		});

		interpreter.addTool('initialPrice', [
			{ name: 'tag', type: String },
			{ name: 'quantity', type: String },
			{ name: 'price', type: Number }
		], (tag, quantity, price) => {
			const entry = findEntry(tag);

			if (!entry) {
				this.logger.log(`skipping initialPrice('${tag}'), not tracked by this desk`);

				return;
			}

			if (entry.price != null) {
				this.logger.log(`skipping initialPrice('${tag}'), already has a price, should've called 'priceChange' instead`);

				return;
			}

			if (!(price > 0)) {
				this.logger.log(`skipping initialPrice('${tag}'), price must be greater than zero`);

				return;
			}

			let rawQuantity: number;

			try {
				rawQuantity = parseTradingUnitValue(entry.unit, quantity);
			} catch (error) {
				this.logger.log(`skipping initialPrice('${tag}'), '${quantity}' is not a valid quantity for this commodity's unit, valid example: '${entry.baseline}'`);

				return;
			}

			// scale the stated price (for the stated quantity) to the price per the commodity's baseline unit
			const scaledPrice = price * (entry.baselineRaw / rawQuantity);

			this.logger.log(`'${tag}' initial price: ${price} E per ${quantity} -> ${scaledPrice} E per ${entry.baseline}`);

			setPrice(entry, scaledPrice);
		});

		interpreter.addTool('context', [
			{ name: 'context', type: String }
		], value => context = value);

		interpreter.addTool('summary', [
			{ name: 'summary', type: String }
		], value => summary = value);

		await interpreter.execute(new SystemMessage(`Review the news, decide on price moves, then call 'context' and 'summary'.`));

		this.logger.log(`prices after update:`);

		for (let entry of commodityContexts) {
			this.logger.log(`  ${entry.commodity.tag}: ${entry.price ?? 'unset'} E per ${entry.baseline}`);
		}

		segmentCycle.context = context;
		segmentCycle.summary = summary;
		segmentCycle.closed = new Date();

		await segmentCycle.update();

		segment.context = context;
		await segment.update();

		this.logger.log(`segment '${segment.name}': ${summary}`);
	}

	private currentPrice(commodity: Commodity) {
		return this.tracker.find(commodity)?.rating.price;
	}

	// a handful of priced commodities from outside this segment, so the desk can gauge the
	// overall market mood instead of reasoning about its own commodities in isolation
	private async randomMarketContext(excludeIds: Set<string>, count = 6) {
		const commodities = await this.database.commodity.toArray();

		const candidates = commodities
			.filter(commodity => !excludeIds.has(commodity.id))
			.map(commodity => ({ commodity, price: this.currentPrice(commodity) }))
			.filter(entry => entry.price != null);

		candidates.sort(() => Math.random() > 0.5 ? 1 : -1);

		return Promise.all(candidates.slice(0, count).map(async entry => {
			const unit = await entry.commodity.tradingUnit.fetch();
			const baseline = formatTradingUnit(unit, 10 ** entry.commodity.tradingUnitRetailBaseline);

			return { commodity: entry.commodity, price: entry.price, baseline };
		}));
	}
}
