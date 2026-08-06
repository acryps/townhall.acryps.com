interface TradingUnit {
	format: string;

	baseUnit: string;
	shorthands: string;
	whole: boolean;
}

export const formatTradingUnit = (unit: TradingUnit, value: number, decimals = 2) => {
	const units = [
		{ exponent: 0, unit: unit.baseUnit },
		...unit.shorthands
			.split(',')
			.map(shorthand => {
				const parts = shorthand.split('=');

				return {
					exponent: +parts[0],
					unit: parts[1],
				};
			}),
	].sort((a, b) => b.exponent - a.exponent);

	const absolute = Math.abs(value);

	// Choose the largest unit producing a value >= 1.
	let selected = units[units.length - 1];
	for (const candidate of units) {
		const scaled = absolute / Math.pow(10, candidate.exponent);
		if (scaled >= 1) {
			selected = candidate;

			break;
		}
	}

	const scaledValue = value / Math.pow(10, selected.exponent);

	const formattedValue = Number(scaledValue.toFixed(unit.whole ? 0 : decimals)).toString();

	return unit.format
		.replace('${value}', formattedValue)
		.replace('${unit}', selected.unit);
}
