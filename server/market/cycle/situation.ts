import { MarketCycle } from "../../managed/database";

export class MarketSituationParameter {
	constructor(
		public property: keyof MarketCycle,
		public minimum: string,
		public maximum: string
	) {}

	static toSituationString(parameters: MarketSituationParameter[], cycle: MarketCycle) {
		return parameters.map(parameter => parameter.toSituationString(cycle[parameter.property] as any)).join(', ');
	}

	toSituationString(value: number) {
		const expand = (label: string) => [
			`exceptionally ${label}`,
			`strongly ${label}`,
			label,
			`quite ${label}`,
			`slightly ${label}`
		];

		const labels = [
			...expand(this.minimum),
			...expand(this.maximum).reverse()
		];

		return labels[Math.floor((labels.length - 1) * value)];
	}
}
