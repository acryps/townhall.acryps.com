interface TradingUnit {
	format: string;

	baseUnit: string;
	shorthands: string;
	whole: boolean;
}

const valueToken = '${value}';
const unitToken = '${unit}';

const collectShorthands = (unit: TradingUnit) => {
	const units = [
		{ exponent: 0, unit: unit.baseUnit }
	];

	if (unit.shorthands) {
		for (let shorthand of unit.shorthands.split(',')) {
			const parts = shorthand.split('=');

			units.push({
				exponent: +parts[0],
				unit: parts[1],
			});
		}
	}

	units.sort((a, b) => b.exponent - a.exponent);

	return units;
};

export const parseTradingUnitValue = (unit: TradingUnit, source: string) => {
	// remove separators between the template tokens
	const separators = unit.format.split(unitToken).flatMap(part => part.split(valueToken));

	for (let separator of separators) {
		source = source.replace(separator, '');
	}

	// find longest matching shorthand
	const shorthands = collectShorthands(unit);
	shorthands.sort((a, b) => b.unit.length - a.unit.length);

	const shorthand = shorthands.find(shorthand => source.includes(shorthand.unit));
	const value = source.replace(shorthand.unit, '');

	if (!value.match(/^[0-9\.]+$/)) {
		throw new Error('Invalid unit format');
	}

	return +value * Math.pow(10, shorthand.exponent);
};

export const formatTradingUnit = (unit: TradingUnit, value: number, decimals = 2) => {
	const shorthands = collectShorthands(unit);
	const absolute = Math.abs(value);

	// Choose the largest unit producing a value >= 1.
	let selected = shorthands[shorthands.length - 1];
	for (const candidate of shorthands) {
		const scaled = absolute / Math.pow(10, candidate.exponent);
		if (scaled >= 1) {
			selected = candidate;

			break;
		}
	}

	const scaledValue = value / Math.pow(10, selected.exponent);

	const formattedValue = Number(scaledValue.toFixed(unit.whole ? 0 : decimals)).toString();

	return unit.format
		.replace(valueToken, formattedValue)
		.replace(unitToken, selected.unit);
}
