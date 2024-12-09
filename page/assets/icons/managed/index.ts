import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?a8870788dd27', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?7ef02e0d8a53', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?06ad61b8ece2', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?a6e0324e3b09', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?350f06cd3b8c', 'woff2');

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
	style('[ui-resident]').before('\f10c'),
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
export const residentIcon = () => createIconElement('resident');
