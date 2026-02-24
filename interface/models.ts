export enum CompanyType {
	company = "company",
	department = "department",
	governmentCompany = "government_company",
	guild = "guild",
	nonProfit = "non_profit"
}

export enum ItemContextLinkRank {
	far = "far",
	near = "near",
	primary = "primary"
}

export interface BoroughSummaryModel {
    district: DistrictSummaryModel;
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
	buildings: BuildingSummaryModel[];
	dwellings: PropertyDwellingViewModel[];
	historicListingModifiers: PropertyHistoricListingModifierViewModel[];
	militaryFacilities: MilitaryFacilityViewModel[];
	offices: OfficeViewModel[];
	owners: PropertyOwnerViewModel[];
	plotBoundaries: PlotBoundarySummaryModel[];
	trainStations: PropertyTrainStationViewModel[];
	type: PropertyTypeViewModel;
	activePlotBoundaryId: string;
	code: string;
	deactivated: Date;
	historicListingRegisteredAt: Date;
	id: string;
	name: string;
}

export interface PropertyOwnerViewModel {
    aquiredValuation: ValuationSummaryModel;
	owner: LegalEntityViewModel;
	aquired: Date;
	id: string;
	share: number;
	sold: Date;
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
    areas: WaterBodyAreaViewModel[];
	id: string;
	name: string;
	tag: string;
}

export interface WaterBodyAreaViewModel {
    archived: Date;
	created: Date;
	id: string;
	shape: string;
}

export interface WorkOfferSummaryModel {
    closed: Date;
	count: number;
	id: string;
	title: string;
}

export interface WorkContractSummaryModel {
    canceled: Date;
	id: string;
	signed: Date;
}

export interface ChangeFrameViewModel {
    hash: string;
	captured: Date;
}

export interface CityViewModel {
    centerX: number;
	centerY: number;
	id: string;
	incorporated: Date;
	mainImpressionId: string;
	name: string;
}

export interface EpochTimelineModel {
    end: Date;
	id: string;
	offset: number;
	rate: number;
	start: Date;
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

export interface ItemContextSummaryModel {
    id: string;
	itemId: string;
	name: string;
	tagline: string;
}

export interface ItemContextLinkViewModel {
    target: ItemContextSummaryModel;
	connection: string;
	id: string;
}

export interface ItemContextFragmentViewModel {
    content: string;
	id: string;
	rank: ItemContextLinkRank;
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
	referenceCount: number;
	state: boolean;
}

export interface NameFrequencyViewModel {
    name: string;
	count: number;
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
	workContracts: WorkContractEmploymentModel[];
	biography: string;
	birthday: Date;
	compassEconomic: number;
	compassSocial: number;
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

export interface AskViewModel {
    asker: LegalEntityViewModel;
	id: string;
	posted: Date;
	price: number;
	quantity: number;
}

export interface BidViewModel {
    bidder: LegalEntityViewModel;
	id: string;
	posted: Date;
	price: number;
	quantity: number;
}

export interface CommoditySummaryModel {
    id: string;
	name: string;
	tag: string;
	unit: string;
}

export interface CommodityCategorySummaryModel {
    id: string;
	name: string;
}

export interface LiveCommodityTickerResponseModel {
    commodityId: string;
	askLow: number;
	askMedian: number;
	askHigh: number;
	askVolume: number;
	askCapitalization: number;
	bidLow: number;
	bidMedian: number;
	bidHigh: number;
	bidVolume: number;
	bidCapitalization: number;
}

export interface MetricViewModel {
    description: string;
	id: string;
	name: string;
}

export interface MetricValueViewModel {
    elapsed: number;
	formatted: string;
	id: string;
	updated: Date;
	value: number;
}

export interface MilitaryUnitSummaryModel {
    banner: string;
	code: string;
	disbanded: Date;
	id: string;
	name: string;
	parentId: string;
}

export interface OracleProposalSummaryModel {
    id: string;
	lore: string;
}

export interface PlanSummaryModel {
    author: LegalEntityViewModel;
	id: string;
	name: string;
	tag: string;
}

export interface PlanShapeViewModel {
    archived: Date;
	closed: boolean;
	fill: string;
	id: string;
	label: string;
	path: string;
	stroke: string;
}

export interface BuildingShapeModel {
    boundary: string;
	id: string;
}

export interface MilitaryFacilityViewModel {
    property: PropertySummaryModel;
	unit: MilitaryUnitSummaryModel;
	closed: Date;
	id: string;
	name: string;
	opened: Date;
}

export interface PlotBoundaryShapeModel {
    id: string;
	shape: string;
}

export interface ArticleNewstickerModel {
    id: string;
	published: Date;
	title: string;
}

export interface ArticlePreviewModel {
    images: ArticleImageViewModel[];
	oracleProposal: OracleProposalSummaryModel;
	publication: PublicationSummaryModel;
	body: string;
	id: string;
	published: Date;
	title: string;
}

export interface ArticleOpinionViewModel {
    author: ResidentSummaryModel;
	comment: string;
	commented: Date;
	id: string;
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

export interface AssetViewModel {
    id: string;
	name: string;
	value: number;
}

export interface ValuationSummaryModel {
    id: string;
	price: number;
}

export interface TrainStationExitViewModel {
    station: TrainStationViewModel;
	id: string;
	inbound: boolean;
	position: string;
}

export interface TrainRouteSummaryModel {
    closed: Date;
	code: string;
	color: string;
	id: string;
	name: string;
	opened: Date;
	textColor: string;
}

export interface TrainRoutePathViewModel {
    id: string;
	path: string;
}

export interface TrainStationViewModel {
    property: PropertySummaryModel;
	id: string;
	name: string;
}

export interface PropertyTrainStationViewModel {
    stops: StationTrainStopViewModel[];
	id: string;
	name: string;
}

export interface TrainStopViewModel {
    closed: Date;
	id: string;
	name: string;
	opened: Date;
	stationId: string;
	trackPosition: string;
}

export interface StationTrainStopViewModel {
    route: TrainRouteViewModel;
	closed: Date;
	downPlatform: string;
	id: string;
	name: string;
	opened: Date;
	upPlatform: string;
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

export interface DistrictSummaryModel {
    id: string;
	includeInMinimap: boolean;
	name: string;
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

export interface OfficeEmployeeModel {
    company: CompanySummaryModel;
	property: PropertySummaryModel;
	id: string;
	name: string;
}

export interface WorkOfferEmplymentModel {
    office: OfficeEmployeeModel;
	closed: Date;
	count: number;
	id: string;
	title: string;
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

export interface WorkContractViewModel {
    worker: ResidentSummaryModel;
	canceled: Date;
	id: string;
	match: string;
	signed: Date;
}

export interface WorkContractEmploymentModel {
    offer: WorkOfferEmplymentModel;
	canceled: Date;
	id: string;
	signed: Date;
}

export interface EpochViewModel {
    description: string;
	end: Date;
	id: string;
	name: string;
	offset: number;
	rate: number;
	start: Date;
}

export interface ItemContextViewModel {
    links: ItemContextLinkViewModel[];
	id: string;
	itemId: string;
	name: string;
	summary: string;
	tagline: string;
	updated: Date;
}

export interface ItemContextBacklinkViewModel {
    source: ItemContextSummaryModel;
	target: ItemContextSummaryModel;
	connection: string;
	id: string;
}

export interface LawHouseSessionViewModel {
    scope: DistrictViewModel;
	protocol: LawHouseSessionProtocolViewModel[];
	sessionaries: LawHouseSessionaryViewModel[];
	ended: Date;
	id: string;
	started: Date;
}

export interface CommodityViewModel {
    category: CommodityCategorySummaryModel;
	asks: AskViewModel[];
	bids: BidViewModel[];
	id: string;
	innovated: Date;
	name: string;
	tag: string;
	unit: string;
}

export interface MilitaryUnitViewModel {
    parent: MilitaryUnitSummaryModel;
	subunits: MilitaryUnitSummaryModel[];
	facilities: MilitaryFacilityViewModel[];
	banner: string;
	code: string;
	created: Date;
	description: string;
	disbanded: Date;
	id: string;
	name: string;
	parentId: string;
}

export interface OracleProposalViewModel {
    entity: LegalEntityViewModel;
	id: string;
	lore: string;
}

export interface PlanViewModel {
    author: LegalEntityViewModel;
	shapes: PlanShapeViewModel[];
	description: string;
	id: string;
	name: string;
	tag: string;
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

export interface ArticleViewModel {
    images: ArticleImageViewModel[];
	opinions: ArticleOpinionViewModel[];
	oracleProposal: OracleProposalSummaryModel;
	publication: PublicationSummaryModel;
	body: string;
	id: string;
	published: Date;
	title: string;
}

export interface PublicationViewModel {
    company: CompanySummaryModel;
	articles: ArticlePreviewModel[];
	description: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;
}

export interface ValuationViewModel {
    issuer: LegalEntityViewModel;
	description: string;
	estimated: Date;
	id: string;
	item: string;
	price: number;
}

export interface TrainRouteViewModel {
    activePath: TrainRoutePathViewModel;
	operator: LegalEntityViewModel;
	stops: TrainStopViewModel[];
	closed: Date;
	code: string;
	color: string;
	description: string;
	id: string;
	looping: boolean;
	name: string;
	opened: Date;
	textColor: string;
}

export interface DistrictViewModel {
    id: string;
	includeInMinimap: boolean;
	name: string;
	parentId: string;
}