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
    borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	type: PropertyTypeViewModel;
	bounds: string;
	id: string;
	name: string;
}

export interface PropertyViewModel {
    borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	owner: PlayerViewModel;
	dwellings: PropertyDwellingViewModel[];
	historicListingModifiers: PropertyHistoricListingModifierViewModel[];
	type: PropertyTypeViewModel;
	bounds: string;
	code: string;
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
    bridges: BridgeViewModel[];
	id: string;
	name: string;
	path: string;
	shortName: string;
	size: number;
}

export interface WaterBodyViewModel {
    bounds: string;
	id: string;
	name: string;
	namePath: string;
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
    banner: string;
	description: string;
	id: string;
	name: string;
	tag: string;
}

export interface PublicationViewModel {
    articles: ArticleViewModel[];
	banner: string;
	description: string;
	id: string;
	incorporation: Date;
	legalName: string;
	mainOfficeId: string;
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