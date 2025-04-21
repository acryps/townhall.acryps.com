export enum CompanyType {
	company = "company",
	department = "department",
	governmentCompany = "government_company",
	guild = "guild",
	nonProfit = "non_profit"
}

export interface BoroughSummaryModel {
    banner: string;
	bounds: string;
	color: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;
}

export interface BoroughViewModel {
    district: DistrictViewModel;
	banner: string;
	bounds: string;
	color: string;
	description: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;
}

export interface BridgeViewModel {
    id: string;
	name: string;
	path: string;
}

export interface CompanySummaryModel {
    banner: string;
	id: string;
	name: string;
	purpose: string;
	tag: string;
	type: CompanyType;
}

export interface OfficeSummaryModel {
    property: PropertySummaryModel;
	id: string;
	name: string;
}

export interface OfficeCapacityViewModel {
    id: string;
	issued: Date;
	size: number;
}

export interface HistoryEntryViewModel {
    name: string;
	date: Date;
}

export interface PlayerViewModel {
    id: string;
	username: string;
}

export interface PropertyTypeViewModel {
    code: string;
	color: string;
	id: string;
	name: string;
}

export interface PropertySummaryModel {
    activePlotBoundary: PlotBoundaryShapeModel;
	borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	type: PropertyTypeViewModel;
	id: string;
	name: string;
}

export interface PropertyOverviewModel {
    activePlotBoundary: PlotBoundaryShapeModel;
	borough: BoroughSummaryModel;
	type: PropertyTypeViewModel;
	id: string;
	name: string;
}

export interface PropertyViewModel {
    borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	owner: PlayerViewModel;
	buildings: BuildingSummaryModel[];
	dwellings: PropertyDwellingViewModel[];
	historicListingModifiers: PropertyHistoricListingModifierViewModel[];
	offices: OfficeViewModel[];
	plotBoundaries: PlotBoundarySummaryModel[];
	type: PropertyTypeViewModel;
	activePlotBoundaryId: string;
	code: string;
	deactivated: Date;
	historicListingRegisteredAt: Date;
	id: string;
	name: string;
}

export interface PropertyDwellingViewModel {
    tenants: TenantViewModel[];
	id: string;
}

export interface TenantViewModel {
    inhabitant: ResidentSummaryModel;
	end: Date;
	id: string;
	start: Date;
}

export interface SquareViewModel {
    borough: BoroughSummaryModel;
	bounds: string;
	id: string;
	name: string;
}

export interface StreetViewModel {
    routes: StreetRouteSummaryModel[];
	activeRouteId: string;
	id: string;
	name: string;
	shortName: string;
	size: number;
}

export interface StreetRouteSummaryModel {
    changeComment: string;
	created: Date;
	id: string;
	path: string;
}

export interface WaterBodyViewModel {
    bounds: string;
	id: string;
	name: string;
	namePath: string;
}

export interface WorkOfferSummaryModel {
    closed: Date;
	count: number;
	id: string;
	title: string;
}

export interface WorkContractViewModel {
    worker: ResidentSummaryModel;
	canceled: Date;
	id: string;
	match: string;
	signed: Date;
}

export interface HistoricListingGradeViewModel {
    description: string;
	grade: number;
	id: string;
	name: string;
}

export interface PropertyHistoricListingModifierViewModel {
    historicListingModifier: HistoricListingModifierViewModel;
	id: string;
}

export interface HistoricListingModifierViewModel {
    description: string;
	id: string;
	name: string;
	shortName: string;
}

export interface ImpressionViewModel {
    id: string;
	title: string;
}

export interface LawHouseSessionSummaryModel {
    scope: DistrictViewModel;
	ended: Date;
	id: string;
	started: Date;
}

export interface LawHouseSessionaryViewModel {
    resident: ResidentSummaryModel;
	id: string;
}

export interface LawHouseSessionProtocolViewModel {
    person: ResidentSummaryModel;
	id: string;
	message: string;
	said: Date;
}

export interface LegalEntityViewModel {
    borough: BoroughSummaryModel;
	company: CompanySummaryModel;
	resident: ResidentSummaryModel;
	id: string;
	state: boolean;
}

export interface ResidentSummaryModel {
    birthday: Date;
	familyName: string;
	givenName: string;
	id: string;
	tag: string;
}

export interface ResidentViewModel {
    mainTenancy: TenancyViewModel;
	biography: string;
	birthday: Date;
	familyName: string;
	givenName: string;
	id: string;
	tag: string;
}

export interface ResidentRelationViewModel {
    initiator: ResidentSummaryModel;
	peer: ResidentSummaryModel;
	bonded: Date;
	conflict: string;
	connection: string;
	ended: Date;
	id: string;
	purpose: string;
}

export interface DwellingViewModel {
    property: PropertySummaryModel;
	id: string;
}

export interface TenancyViewModel {
    dwelling: DwellingViewModel;
	end: Date;
	id: string;
	start: Date;
}

export interface ResidentEventViewModel {
    id: string;
	timestamp: Date;
	action: string;
	detail: string;
}

export interface ResidentTickerModel {
    id: string;
	timestamp: Date;
	primaryResidentId: string;
	action: string;
}

export interface BuildingShapeModel {
    boundary: string;
	id: string;
}

export interface PlotBoundaryShapeModel {
    id: string;
	shape: string;
}

export interface ArticleViewModel {
    images: ArticleImageViewModel[];
	publication: PublicationSummaryModel;
	body: string;
	id: string;
	published: Date;
	title: string;
}

export interface ArticleImageViewModel {
    caption: string;
	id: string;
}

export interface PublicationSummaryModel {
    company: CompanySummaryModel;
	description: string;
	id: string;
	name: string;
	tag: string;
}

export interface ChatInteractionViewModel {
    containsInformationRequest: boolean;
	id: string;
	question: string;
	responded: Date;
	response: string;
}

export interface TrainStationExitViewModel {
    station: TrainStationViewModel;
	id: string;
	inbound: boolean;
	position: string;
}

export interface TrainRouteViewModel {
    stops: TrainStopViewModel[];
	color: string;
	id: string;
	name: string;
	path: string;
}

export interface TrainStationViewModel {
    id: string;
	name: string;
	position: string;
}

export interface TrainStopViewModel {
    id: string;
	name: string;
	stationId: string;
	trackPosition: string;
}

export interface BillViewModel {
    honestiums: HonestiumViewModel[];
	scope: DistrictViewModel;
	certified: Date;
	description: string;
	id: string;
	pro: boolean;
	summary: string;
	tag: string;
	title: string;
}

export interface HonestiumViewModel {
    answer: string;
	answered: Date;
	id: string;
	pro: boolean;
	question: string;
}

export interface DistrictViewModel {
    id: string;
	name: string;
	parentId: string;
}

export interface OpenHonestiumViewModel {
    bill: BillViewModel;
	answer: string;
	id: string;
	pro: boolean;
	question: string;
}

export interface VoteViewModel {
    id: string;
	pro: boolean;
	reason: string;
	submitted: Date;
}

export interface VoteTickerViewModel {
    pro: boolean;
	submitted: Date;
}

export interface CompanyViewModel {
    offices: OfficeSummaryModel[];
	banner: string;
	created: Date;
	description: string;
	id: string;
	incorporated: Date;
	name: string;
	purpose: string;
	tag: string;
	type: CompanyType;
}

export interface OfficeViewModel {
    company: CompanySummaryModel;
	capacityGrants: OfficeCapacityViewModel[];
	workOffers: WorkOfferSummaryModel[];
	property: PropertySummaryModel;
	id: string;
	name: string;
}

export interface WorkOfferViewModel {
    workContracts: WorkContractViewModel[];
	office: OfficeViewModel;
	closed: Date;
	count: number;
	id: string;
	offered: Date;
	task: string;
	title: string;
}

export interface LawHouseSessionViewModel {
    scope: DistrictViewModel;
	protocol: LawHouseSessionProtocolViewModel[];
	sessionaries: LawHouseSessionaryViewModel[];
	ended: Date;
	id: string;
	started: Date;
}

export interface BuildingSummaryModel {
    archived: Date;
	boundary: string;
	created: Date;
	id: string;
	name: string;
}

export interface PlotBoundarySummaryModel {
    changeComment: string;
	created: Date;
	id: string;
	shape: string;
}

export interface PublicationViewModel {
    company: CompanySummaryModel;
	articles: ArticleViewModel[];
	description: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;
}