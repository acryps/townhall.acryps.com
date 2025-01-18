import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?3b5475fa6b0b', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?7f72311ba302', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?5d01a18bb6f3', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?fc5929795bb4', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?468526fb6fdd', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-add]').before('\f101'),
	style('[ui-building-code]').before('\f102'),
	style('[ui-chat]').before('\f103'),
	style('[ui-company-office]').before('\f104'),
	style('[ui-delete]').before('\f105'),
	style('[ui-election]').before('\f106'),
	style('[ui-home]').before('\f107'),
	style('[ui-law]').before('\f108'),
	style('[ui-map]').before('\f109'),
	style('[ui-property-register]').before('\f10a'),
	style('[ui-publication]').before('\f10b'),
	style('[ui-relation-graph]').before('\f10c'),
	style('[ui-relation]').before('\f10d'),
	style('[ui-resident]').before('\f10e'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const addIcon = () => createIconElement('add');
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
