import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?b2cd8373bf99', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?46eadce05d54', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?f2887bd1d133', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?b1108397ea2e', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?5d69a1d52f67', 'woff2');

export const icons = () => select('ui-icon',
	fontFamily(iconFont.name),
	fontWeight('normal'),

	style(':empty').before('?'),

	style('[ui-building-code]').before('\f101'),
	style('[ui-company-office]').before('\f102'),
	style('[ui-delete]').before('\f103'),
	style('[ui-election]').before('\f104'),
	style('[ui-law]').before('\f105'),
	style('[ui-map]').before('\f106'),
	style('[ui-property-register]').before('\f107'),
	style('[ui-publication]').before('\f108'),
);

const createIconElement = (name: string) => {
	const element = document.createElement('ui-icon');
	element.setAttribute(`ui-${name}`, '');

	return element;
};

export const buildingCodeIcon = () => createIconElement('building-code');
export const companyOfficeIcon = () => createIconElement('company-office');
export const deleteIcon = () => createIconElement('delete');
export const electionIcon = () => createIconElement('election');
export const lawIcon = () => createIconElement('law');
export const mapIcon = () => createIconElement('map');
export const propertyRegisterIcon = () => createIconElement('property-register');
export const publicationIcon = () => createIconElement('publication');
