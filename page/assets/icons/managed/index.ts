import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?fdab9e33e449', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?f70356eb8c42', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?ac61c547538d', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?61cb37e90379', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?c3bdddbae665', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-building-code]').before('\f101'),
	style('[ui-chat]').before('\f102'),
	style('[ui-company-office]').before('\f103'),
	style('[ui-delete]').before('\f104'),
	style('[ui-election]').before('\f105'),
	style('[ui-home]').before('\f106'),
	style('[ui-law]').before('\f107'),
	style('[ui-map]').before('\f108'),
	style('[ui-property-register]').before('\f109'),
	style('[ui-publication]').before('\f10a'),
	style('[ui-relation-graph]').before('\f10b'),
	style('[ui-relation]').before('\f10c'),
	style('[ui-resident]').before('\f10d'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const buildingCodeIcon = () => createIconElement('building-code');
export const chatIcon = () => createIconElement('chat');
export const companyOfficeIcon = () => createIconElement('company-office');
export const deleteIcon = () => createIconElement('delete');
export const electionIcon = () => createIconElement('election');
export const homeIcon = () => createIconElement('home');
export const lawIcon = () => createIconElement('law');
export const mapIcon = () => createIconElement('map');
export const propertyRegisterIcon = () => createIconElement('property-register');
export const publicationIcon = () => createIconElement('publication');
export const relationGraphIcon = () => createIconElement('relation-graph');
export const relationIcon = () => createIconElement('relation');
export const residentIcon = () => createIconElement('resident');
