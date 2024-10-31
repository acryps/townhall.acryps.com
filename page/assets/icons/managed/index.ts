import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?3230ea1a0aff', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?826fb9f0280b', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?907e3c3511d7', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?a185c4efcdb8', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?8fa0e92c7f3f', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-explore]').before('\f101'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const exploreIcon = () => createIconElement('explore');
