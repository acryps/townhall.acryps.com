import { CompanySummaryModel, CompanyType } from "../../managed/services"

export const convertToLegalCompanyName = (company: CompanySummaryModel) => ({
	[CompanyType.company]: `${company.name} Company`,
	[CompanyType.nonProfit]: `${company.name} Non Profit`,
	[CompanyType.guild]: `${company.name} Guild`,
	[CompanyType.governmentCompany]: `${company.name} Govcom`,
	[CompanyType.department]: company.name
})[company.type];

export const convertToCompanyTypeName = (company: CompanySummaryModel) => ({
	[CompanyType.company]: 'Company',
	[CompanyType.nonProfit]: 'Non Profit',
	[CompanyType.guild]: 'Guild',
	[CompanyType.governmentCompany]: 'Govcom',
	[CompanyType.department]: 'Department'
})[company.type];
