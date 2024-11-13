import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?a2da0b155332', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?e5d5906017dd', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?e51c1420304a', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?1bce2c72fb44', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?dd34f45b0957', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-delete]').before('\f101'),
	style('[ui-explore]').before('\f102'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const deleteIcon = () => createIconElement('delete');
export const exploreIcon = () => createIconElement('explore');
