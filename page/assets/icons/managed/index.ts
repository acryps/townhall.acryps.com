import { select, style, content, Font, fontFamily, fontWeight, fontStyle } from '@acryps/style';


export const iconFont = new Font('icons', fontWeight('normal'), fontStyle('normal'))
	.addSource('/assets/icons/managed/font/index.eot?6777ac79eebd', 'embedded-opentype')
	.addSource('/assets/icons/managed/font/index.svg?a1b282ceff44', 'svg')
	.addSource('/assets/icons/managed/font/index.ttf?1f6d9844cafb', 'truetype')
	.addSource('/assets/icons/managed/font/index.woff?c86219e9db25', 'woff')
	.addSource('/assets/icons/managed/font/index.woff2?71eb1109e8fb', 'woff2');

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
	style('[ui-resident]').before('\f109'),
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
export const residentIcon = () => createIconElement('resident');
