import { BoroughDemandRule, CommercialDemandRule, ResidentialDemandRule, StockSeedRule } from "../../managed/database";
import { HashRandom } from "../random";
import { MarketAssessment } from "./assessment";

export type MarketRule = StockSeedRule | ResidentialDemandRule | CommercialDemandRule | BoroughDemandRule;

export class MarketRuleResolution {
	quantity = 0;
	quality = 0;

	sources: string[] = [];
}

export class MarketRuleResolver {
	// randomized per-subject resolution, used to generate what a single entity (resident, company, borough) owns or wants
	// seed must uniquely identify the subject (eg [resident.id, commodity.id]) to stay deterministic across runs
	static generate(rules: MarketRule[], values: MarketAssessment[], seed: string[]) {
		const resolution = new MarketRuleResolution();
		const qualityRules: MarketRule[] = [];

		for (let rule of rules) {
			const value = values.find(value => value.parameterId == rule.parameterId);

			if (!value || value.value < rule.parameterMinimum || value.value >= rule.parameterMaximum) {
				continue;
			}

			if (rule.property == 'quality') {
				qualityRules.push(rule);

				continue;
			}

			const generated = HashRandom.random([...seed, rule.id], rule.valueMinimum, rule.valueMaximum);
			const source = `${generated.toFixed(2)} ${value.value.toFixed(2)} in [${rule.parameterMinimum}, ${rule.parameterMaximum}) (rule #${rule.id.split('-')[0]})`;

			switch (rule.operation) {
				case 'apply': {
					resolution.quantity = generated;
					resolution.sources = [`=${source}`];

					break;
				}

				case 'add': {
					resolution.quantity += generated;
					resolution.sources.push(`+${source}`);

					break;
				}

				case 'subtract': {
					resolution.quantity -= generated;
					resolution.sources.push(`-${source}`);

					break;
				}
			}
		}

		for (let rule of qualityRules) {
			resolution.quality = Math.round(HashRandom.random([...seed, rule.id], rule.valueMinimum, rule.valueMaximum));
		}

		return resolution;
	}

	// population-level aggregate estimate, used by the tracker to rate a commodity across the whole population
	// counts how many subjects match each rule and applies the rule's average value that many times
	static aggregate(rules: MarketRule[], values: MarketAssessment[]) {
		let volume = 0;

		for (let rule of rules) {
			if (rule.property != 'quantity') {
				continue;
			}

			const matchCount = values
				.filter(value => value.parameterId == rule.parameterId)
				.filter(value => value.value >= rule.parameterMinimum && value.value < rule.parameterMaximum)
				.length;

			const size = matchCount * (rule.valueMaximum + rule.valueMinimum) / 2;

			switch (rule.operation) {
				case 'add':
				case 'apply': {
					volume += size;

					break;
				}

				case 'subtract': {
					volume -= size;

					break;
				}
			}
		}

		return Math.max(volume, 0);
	}
}
