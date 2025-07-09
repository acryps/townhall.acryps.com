import { backgroundColor, border, child, display, height, hex, left, Length, Number, padding, percentage, Percentage, position, px, rem, Rem, rgb, rotate, StaticLength, StyleSelectorBody, top, transform, translate, turn, Variable, width } from "@acryps/style";
import { posix } from "path";

export const compassEconomic = new Variable<Number>('compass-economic');
export const compassSocial = new Variable<Number>('compass-social');

const spacing = rem(2);
const dot = rem(0.25);
const dotBorder = px(2);

export const politicalCompassStyle = (size: Rem, ...custom: StyleSelectorBody[]) => child('ui-political-compass',
	display('block'),
	position('relative'),
	padding(spacing),

	width(size),
	height(size),

	custom,

	child('ui-row',
		display('flex'),
		height(percentage(50)),

		child('ui-quadrant',
			display('block'),
			width(percentage(50))
		)
			.attribute('ui-authoritarian-left', backgroundColor(rgb(224, 135, 127)))
			.attribute('ui-authoritarian-right', backgroundColor(rgb(113, 171, 243)))
			.attribute('ui-liberal-left', backgroundColor(rgb(185, 228, 163)))
			.attribute('ui-liberal-right', backgroundColor(rgb(245, 239, 143)))
	),

	child('ui-cursor',
		position('absolute'),
		left(percentage(50).add(percentage(50).multiply(compassEconomic)).subtract(dot.divide(2)).subtract(dotBorder)),
		top(percentage(50).add(percentage(50).multiply(compassSocial)).subtract(dot.divide(2)).subtract(dotBorder)),

		width(dot),
		height(dot),

		border(dotBorder, 'solid', 'currentColor'),
	),

	child('ui-label',
		position('absolute'),
		left(percentage(50)),
		top(percentage(50))
	)
		.attribute('ui-authoritarian', top(0), transform(translate(percentage(-50))))
		.attribute('ui-liberal', top(percentage(100)), transform(translate(percentage(-50), percentage(-100))))
		.attribute('ui-left', left(0), transform(translate(percentage(-25), percentage(-50)), rotate(turn(-0.25))))
		.attribute('ui-right', left(percentage(100)), transform(translate(percentage(-75), percentage(-50)), rotate(turn(0.25))))
);
