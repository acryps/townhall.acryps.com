import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?883229a70478', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?09ca060e0d67', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?32ebdcc73357', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?6bdfd579fa87', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?34294970670f', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-add]').before('\f101'),
	style('[ui-borough]').before('\f102'),
	style('[ui-building-code]').before('\f103'),
	style('[ui-capture]').before('\f104'),
	style('[ui-chat]').before('\f105'),
	style('[ui-company-office]').before('\f106'),
	style('[ui-day]').before('\f107'),
	style('[ui-delete]').before('\f108'),
	style('[ui-draw]').before('\f109'),
	style('[ui-election]').before('\f10a'),
	style('[ui-home]').before('\f10b'),
	style('[ui-law]').before('\f10c'),
	style('[ui-map]').before('\f10d'),
	style('[ui-movement]').before('\f10e'),
	style('[ui-property-register]').before('\f10f'),
	style('[ui-publication]').before('\f110'),
	style('[ui-relation-graph]').before('\f111'),
	style('[ui-relation]').before('\f112'),
	style('[ui-resident]').before('\f113'),
	style('[ui-street]').before('\f114'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const addIcon = () => createIconElement('add');
export const boroughIcon = () => createIconElement('borough');
export const buildingCodeIcon = () => createIconElement('building-code');
export const captureIcon = () => createIconElement('capture');
export const chatIcon = () => createIconElement('chat');
export const companyOfficeIcon = () => createIconElement('company-office');
export const dayIcon = () => createIconElement('day');
export const deleteIcon = () => createIconElement('delete');
export const drawIcon = () => createIconElement('draw');
export const electionIcon = () => createIconElement('election');
export const homeIcon = () => createIconElement('home');
export const lawIcon = () => createIconElement('law');
export const mapIcon = () => createIconElement('map');
export const movementIcon = () => createIconElement('movement');
export const propertyRegisterIcon = () => createIconElement('property-register');
export const publicationIcon = () => createIconElement('publication');
export const relationGraphIcon = () => createIconElement('relation-graph');
export const relationIcon = () => createIconElement('relation');
export const residentIcon = () => createIconElement('resident');
export const streetIcon = () => createIconElement('street');
