import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?0ea36d0381d4', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?31abe6b223fb', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?5befe306aade', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?643888cd999e', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?bef18281a8be', 'woff2');

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
	style('[ui-flip]').before('\f10b'),
	style('[ui-go]').before('\f10c'),
	style('[ui-home]').before('\f10d'),
	style('[ui-item-context]').before('\f10e'),
	style('[ui-law]').before('\f10f'),
	style('[ui-map]').before('\f110'),
	style('[ui-metric]').before('\f111'),
	style('[ui-military]').before('\f112'),
	style('[ui-movement]').before('\f113'),
	style('[ui-oracle]').before('\f114'),
	style('[ui-plan]').before('\f115'),
	style('[ui-price]').before('\f116'),
	style('[ui-property-register]').before('\f117'),
	style('[ui-publication]').before('\f118'),
	style('[ui-relation-graph]').before('\f119'),
	style('[ui-relation]').before('\f11a'),
	style('[ui-resident]').before('\f11b'),
	style('[ui-route-interchange]').before('\f11c'),
	style('[ui-speak]').before('\f11d'),
	style('[ui-state]').before('\f11e'),
	style('[ui-street]').before('\f11f'),
	style('[ui-time-machine]').before('\f120'),
	style('[ui-train]').before('\f121'),
	style('[ui-undo]').before('\f122'),
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
export const flipIcon = () => createIconElement('flip');
export const goIcon = () => createIconElement('go');
export const homeIcon = () => createIconElement('home');
export const itemContextIcon = () => createIconElement('item-context');
export const lawIcon = () => createIconElement('law');
export const mapIcon = () => createIconElement('map');
export const metricIcon = () => createIconElement('metric');
export const militaryIcon = () => createIconElement('military');
export const movementIcon = () => createIconElement('movement');
export const oracleIcon = () => createIconElement('oracle');
export const planIcon = () => createIconElement('plan');
export const priceIcon = () => createIconElement('price');
export const propertyRegisterIcon = () => createIconElement('property-register');
export const publicationIcon = () => createIconElement('publication');
export const relationGraphIcon = () => createIconElement('relation-graph');
export const relationIcon = () => createIconElement('relation');
export const residentIcon = () => createIconElement('resident');
export const routeInterchangeIcon = () => createIconElement('route-interchange');
export const speakIcon = () => createIconElement('speak');
export const stateIcon = () => createIconElement('state');
export const streetIcon = () => createIconElement('street');
export const timeMachineIcon = () => createIconElement('time-machine');
export const trainIcon = () => createIconElement('train');
export const undoIcon = () => createIconElement('undo');
