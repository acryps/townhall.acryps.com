import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?4e4e99395b58', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?7e161ff6126f', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?02693e18b9b4', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?dc9d9e3264cd', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?c3ada294890a', 'woff2');

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
	style('[ui-down-all]').before('\f109'),
	style('[ui-down]').before('\f10a'),
	style('[ui-draw]').before('\f10b'),
	style('[ui-election]').before('\f10c'),
	style('[ui-flip]').before('\f10d'),
	style('[ui-go]').before('\f10e'),
	style('[ui-home]').before('\f10f'),
	style('[ui-item-context]').before('\f110'),
	style('[ui-law]').before('\f111'),
	style('[ui-map]').before('\f112'),
	style('[ui-market]').before('\f113'),
	style('[ui-metric]').before('\f114'),
	style('[ui-military]').before('\f115'),
	style('[ui-minimap-compass]').before('\f116'),
	style('[ui-movement]').before('\f117'),
	style('[ui-oracle]').before('\f118'),
	style('[ui-plan]').before('\f119'),
	style('[ui-price]').before('\f11a'),
	style('[ui-property-register]').before('\f11b'),
	style('[ui-publication]').before('\f11c'),
	style('[ui-relation-graph]').before('\f11d'),
	style('[ui-relation]').before('\f11e'),
	style('[ui-resident]').before('\f11f'),
	style('[ui-route-interchange]').before('\f120'),
	style('[ui-speak]').before('\f121'),
	style('[ui-state]').before('\f122'),
	style('[ui-street]').before('\f123'),
	style('[ui-time-machine]').before('\f124'),
	style('[ui-train]').before('\f125'),
	style('[ui-undo]').before('\f126'),
	style('[ui-up-all]').before('\f127'),
	style('[ui-up]').before('\f128'),
	style('[ui-water]').before('\f129'),
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
export const downAllIcon = () => createIconElement('down-all');
export const downIcon = () => createIconElement('down');
export const drawIcon = () => createIconElement('draw');
export const electionIcon = () => createIconElement('election');
export const flipIcon = () => createIconElement('flip');
export const goIcon = () => createIconElement('go');
export const homeIcon = () => createIconElement('home');
export const itemContextIcon = () => createIconElement('item-context');
export const lawIcon = () => createIconElement('law');
export const mapIcon = () => createIconElement('map');
export const marketIcon = () => createIconElement('market');
export const metricIcon = () => createIconElement('metric');
export const militaryIcon = () => createIconElement('military');
export const minimapCompassIcon = () => createIconElement('minimap-compass');
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
export const upAllIcon = () => createIconElement('up-all');
export const upIcon = () => createIconElement('up');
export const waterIcon = () => createIconElement('water');
