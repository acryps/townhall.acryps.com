import { CompanyType } from "./models";

type Company = {
	name: string,
	type: keyof typeof CompanyType | any
};

export const convertToLegalCompanyName = (company: Company) => ({
	[CompanyType.company]: `${company.name} Company`,
	[CompanyType.nonProfit]: `${company.name} Non Profit`,
	[CompanyType.guild]: `${company.name} Guild`,
	[CompanyType.governmentCompany]: `${company.name} Govcom`,
	[CompanyType.department]: company.name
})[company.type];

export const convertToCompanyTypeName = (company: Company | CompanyType) => ({
	[CompanyType.company]: 'Company',
	[CompanyType.nonProfit]: 'Non Profit',
	[CompanyType.guild]: 'Guild',
	[CompanyType.governmentCompany]: 'Govcom',
	[CompanyType.department]: 'Department'
})[typeof company == 'object' ? company.type : company];
