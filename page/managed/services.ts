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

export class BoroughSummaryModel {
	banner: string;
	bounds: string;
	color: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new BoroughSummaryModel();
		raw.banner === undefined || (item.banner = raw.banner === null ? null : `${raw.banner}`)
		raw.bounds === undefined || (item.bounds = raw.bounds === null ? null : `${raw.bounds}`)
		raw.color === undefined || (item.color = raw.color === null ? null : `${raw.color}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporation === undefined || (item.incorporation = raw.incorporation ? new Date(raw.incorporation) : null)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class BoroughViewModel {
	district: DistrictViewModel;
	banner: string;
	bounds: string;
	color: string;
	description: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new BoroughViewModel();
		raw.district === undefined || (item.district = raw.district ? DistrictViewModel["$build"](raw.district) : null)
		raw.banner === undefined || (item.banner = raw.banner === null ? null : `${raw.banner}`)
		raw.bounds === undefined || (item.bounds = raw.bounds === null ? null : `${raw.bounds}`)
		raw.color === undefined || (item.color = raw.color === null ? null : `${raw.color}`)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporation === undefined || (item.incorporation = raw.incorporation ? new Date(raw.incorporation) : null)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class BridgeViewModel {
	id: string;
	name: string;
	path: string;

	private static $build(raw) {
		const item = new BridgeViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.path === undefined || (item.path = raw.path === null ? null : `${raw.path}`)
		
		return item;
	}
}

export class CompanySummaryModel {
	banner: string;
	id: string;
	name: string;
	purpose: string;
	tag: string;
	type: CompanyType;

	private static $build(raw) {
		const item = new CompanySummaryModel();
		raw.banner === undefined || (item.banner = raw.banner === null ? null : `${raw.banner}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.purpose === undefined || (item.purpose = raw.purpose === null ? null : `${raw.purpose}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		raw.type === undefined || (item.type = raw.type)
		
		return item;
	}
}

export class OfficeSummaryModel {
	property: PropertySummaryModel;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new OfficeSummaryModel();
		raw.property === undefined || (item.property = raw.property ? PropertySummaryModel["$build"](raw.property) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class OfficeCapacityViewModel {
	id: string;
	issued: Date;
	size: number;

	private static $build(raw) {
		const item = new OfficeCapacityViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.issued === undefined || (item.issued = raw.issued ? new Date(raw.issued) : null)
		raw.size === undefined || (item.size = raw.size === null ? null : +raw.size)
		
		return item;
	}
}

export class HistoryEntryViewModel {
	name: string;
	date: Date;

	private static $build(raw) {
		const item = new HistoryEntryViewModel();
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.date === undefined || (item.date = raw.date ? new Date(raw.date) : null)
		
		return item;
	}
}

export class PlayerViewModel {
	id: string;
	username: string;

	private static $build(raw) {
		const item = new PlayerViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.username === undefined || (item.username = raw.username === null ? null : `${raw.username}`)
		
		return item;
	}
}

export class PropertyTypeViewModel {
	code: string;
	color: string;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new PropertyTypeViewModel();
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.color === undefined || (item.color = raw.color === null ? null : `${raw.color}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PropertySummaryModel {
	activePlotBoundary: PlotBoundaryShapeModel;
	borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	type: PropertyTypeViewModel;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new PropertySummaryModel();
		raw.activePlotBoundary === undefined || (item.activePlotBoundary = raw.activePlotBoundary ? PlotBoundaryShapeModel["$build"](raw.activePlotBoundary) : null)
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.historicListingGrade === undefined || (item.historicListingGrade = raw.historicListingGrade ? HistoricListingGradeViewModel["$build"](raw.historicListingGrade) : null)
		raw.type === undefined || (item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PropertyOverviewModel {
	activePlotBoundary: PlotBoundaryShapeModel;
	borough: BoroughSummaryModel;
	type: PropertyTypeViewModel;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new PropertyOverviewModel();
		raw.activePlotBoundary === undefined || (item.activePlotBoundary = raw.activePlotBoundary ? PlotBoundaryShapeModel["$build"](raw.activePlotBoundary) : null)
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.type === undefined || (item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PropertyViewModel {
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

	private static $build(raw) {
		const item = new PropertyViewModel();
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.historicListingGrade === undefined || (item.historicListingGrade = raw.historicListingGrade ? HistoricListingGradeViewModel["$build"](raw.historicListingGrade) : null)
		raw.buildings === undefined || (item.buildings = raw.buildings ? raw.buildings.map(i => BuildingSummaryModel["$build"](i)) : null)
		raw.dwellings === undefined || (item.dwellings = raw.dwellings ? raw.dwellings.map(i => PropertyDwellingViewModel["$build"](i)) : null)
		raw.historicListingModifiers === undefined || (item.historicListingModifiers = raw.historicListingModifiers ? raw.historicListingModifiers.map(i => PropertyHistoricListingModifierViewModel["$build"](i)) : null)
		raw.militaryFacilities === undefined || (item.militaryFacilities = raw.militaryFacilities ? raw.militaryFacilities.map(i => MilitaryFacilityViewModel["$build"](i)) : null)
		raw.offices === undefined || (item.offices = raw.offices ? raw.offices.map(i => OfficeViewModel["$build"](i)) : null)
		raw.owners === undefined || (item.owners = raw.owners ? raw.owners.map(i => PropertyOwnerViewModel["$build"](i)) : null)
		raw.plotBoundaries === undefined || (item.plotBoundaries = raw.plotBoundaries ? raw.plotBoundaries.map(i => PlotBoundarySummaryModel["$build"](i)) : null)
		raw.trainStations === undefined || (item.trainStations = raw.trainStations ? raw.trainStations.map(i => PropertyTrainStationViewModel["$build"](i)) : null)
		raw.type === undefined || (item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null)
		raw.activePlotBoundaryId === undefined || (item.activePlotBoundaryId = raw.activePlotBoundaryId === null ? null : `${raw.activePlotBoundaryId}`)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.deactivated === undefined || (item.deactivated = raw.deactivated ? new Date(raw.deactivated) : null)
		raw.historicListingRegisteredAt === undefined || (item.historicListingRegisteredAt = raw.historicListingRegisteredAt ? new Date(raw.historicListingRegisteredAt) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PropertyOwnerViewModel {
	aquiredValuation: ValuationSummaryModel;
	owner: LegalEntityViewModel;
	aquired: Date;
	id: string;
	share: number;
	sold: Date;

	private static $build(raw) {
		const item = new PropertyOwnerViewModel();
		raw.aquiredValuation === undefined || (item.aquiredValuation = raw.aquiredValuation ? ValuationSummaryModel["$build"](raw.aquiredValuation) : null)
		raw.owner === undefined || (item.owner = raw.owner ? LegalEntityViewModel["$build"](raw.owner) : null)
		raw.aquired === undefined || (item.aquired = raw.aquired ? new Date(raw.aquired) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.share === undefined || (item.share = raw.share === null ? null : +raw.share)
		raw.sold === undefined || (item.sold = raw.sold ? new Date(raw.sold) : null)
		
		return item;
	}
}

export class PropertyDwellingViewModel {
	tenants: TenantViewModel[];
	id: string;

	private static $build(raw) {
		const item = new PropertyDwellingViewModel();
		raw.tenants === undefined || (item.tenants = raw.tenants ? raw.tenants.map(i => TenantViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class TenantViewModel {
	inhabitant: ResidentSummaryModel;
	end: Date;
	id: string;
	start: Date;

	private static $build(raw) {
		const item = new TenantViewModel();
		raw.inhabitant === undefined || (item.inhabitant = raw.inhabitant ? ResidentSummaryModel["$build"](raw.inhabitant) : null)
		raw.end === undefined || (item.end = raw.end ? new Date(raw.end) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.start === undefined || (item.start = raw.start ? new Date(raw.start) : null)
		
		return item;
	}
}

export class SquareViewModel {
	borough: BoroughSummaryModel;
	bounds: string;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new SquareViewModel();
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.bounds === undefined || (item.bounds = raw.bounds === null ? null : `${raw.bounds}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class StreetViewModel {
	routes: StreetRouteSummaryModel[];
	activeRouteId: string;
	id: string;
	name: string;
	shortName: string;
	size: number;

	private static $build(raw) {
		const item = new StreetViewModel();
		raw.routes === undefined || (item.routes = raw.routes ? raw.routes.map(i => StreetRouteSummaryModel["$build"](i)) : null)
		raw.activeRouteId === undefined || (item.activeRouteId = raw.activeRouteId === null ? null : `${raw.activeRouteId}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortName === undefined || (item.shortName = raw.shortName === null ? null : `${raw.shortName}`)
		raw.size === undefined || (item.size = raw.size === null ? null : +raw.size)
		
		return item;
	}
}

export class StreetRouteSummaryModel {
	changeComment: string;
	created: Date;
	id: string;
	path: string;

	private static $build(raw) {
		const item = new StreetRouteSummaryModel();
		raw.changeComment === undefined || (item.changeComment = raw.changeComment === null ? null : `${raw.changeComment}`)
		raw.created === undefined || (item.created = raw.created ? new Date(raw.created) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.path === undefined || (item.path = raw.path === null ? null : `${raw.path}`)
		
		return item;
	}
}

export class WaterBodyViewModel {
	bounds: string;
	id: string;
	name: string;
	namePath: string;

	private static $build(raw) {
		const item = new WaterBodyViewModel();
		raw.bounds === undefined || (item.bounds = raw.bounds === null ? null : `${raw.bounds}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.namePath === undefined || (item.namePath = raw.namePath === null ? null : `${raw.namePath}`)
		
		return item;
	}
}

export class WorkOfferSummaryModel {
	closed: Date;
	count: number;
	id: string;
	title: string;

	private static $build(raw) {
		const item = new WorkOfferSummaryModel();
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.count === undefined || (item.count = raw.count === null ? null : +raw.count)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class WorkContractSummaryModel {
	canceled: Date;
	id: string;
	signed: Date;

	private static $build(raw) {
		const item = new WorkContractSummaryModel();
		raw.canceled === undefined || (item.canceled = raw.canceled ? new Date(raw.canceled) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.signed === undefined || (item.signed = raw.signed ? new Date(raw.signed) : null)
		
		return item;
	}
}

export class ChangeFrameViewModel {
	hash: string;
	captured: Date;

	private static $build(raw) {
		const item = new ChangeFrameViewModel();
		raw.hash === undefined || (item.hash = raw.hash === null ? null : `${raw.hash}`)
		raw.captured === undefined || (item.captured = raw.captured ? new Date(raw.captured) : null)
		
		return item;
	}
}

export class CityViewModel {
	centerX: number;
	centerY: number;
	id: string;
	incorporated: Date;
	mainImpressionId: string;
	name: string;

	private static $build(raw) {
		const item = new CityViewModel();
		raw.centerX === undefined || (item.centerX = raw.centerX === null ? null : +raw.centerX)
		raw.centerY === undefined || (item.centerY = raw.centerY === null ? null : +raw.centerY)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporated === undefined || (item.incorporated = raw.incorporated ? new Date(raw.incorporated) : null)
		raw.mainImpressionId === undefined || (item.mainImpressionId = raw.mainImpressionId === null ? null : `${raw.mainImpressionId}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class EpochTimelineModel {
	end: Date;
	id: string;
	offset: number;
	rate: number;
	start: Date;

	private static $build(raw) {
		const item = new EpochTimelineModel();
		raw.end === undefined || (item.end = raw.end ? new Date(raw.end) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.offset === undefined || (item.offset = raw.offset === null ? null : +raw.offset)
		raw.rate === undefined || (item.rate = raw.rate === null ? null : +raw.rate)
		raw.start === undefined || (item.start = raw.start ? new Date(raw.start) : null)
		
		return item;
	}
}

export class HistoricListingGradeViewModel {
	description: string;
	grade: number;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new HistoricListingGradeViewModel();
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.grade === undefined || (item.grade = raw.grade === null ? null : +raw.grade)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PropertyHistoricListingModifierViewModel {
	historicListingModifier: HistoricListingModifierViewModel;
	id: string;

	private static $build(raw) {
		const item = new PropertyHistoricListingModifierViewModel();
		raw.historicListingModifier === undefined || (item.historicListingModifier = raw.historicListingModifier ? HistoricListingModifierViewModel["$build"](raw.historicListingModifier) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class HistoricListingModifierViewModel {
	description: string;
	id: string;
	name: string;
	shortName: string;

	private static $build(raw) {
		const item = new HistoricListingModifierViewModel();
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.shortName === undefined || (item.shortName = raw.shortName === null ? null : `${raw.shortName}`)
		
		return item;
	}
}

export class ImpressionViewModel {
	id: string;
	title: string;

	private static $build(raw) {
		const item = new ImpressionViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class ItemContextSummaryModel {
	id: string;
	itemId: string;
	name: string;
	tagline: string;

	private static $build(raw) {
		const item = new ItemContextSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.itemId === undefined || (item.itemId = raw.itemId === null ? null : `${raw.itemId}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tagline === undefined || (item.tagline = raw.tagline === null ? null : `${raw.tagline}`)
		
		return item;
	}
}

export class ItemContextLinkViewModel {
	target: ItemContextSummaryModel;
	connection: string;
	id: string;

	private static $build(raw) {
		const item = new ItemContextLinkViewModel();
		raw.target === undefined || (item.target = raw.target ? ItemContextSummaryModel["$build"](raw.target) : null)
		raw.connection === undefined || (item.connection = raw.connection === null ? null : `${raw.connection}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class ItemContextFragmentViewModel {
	content: string;
	id: string;
	rank: ItemContextLinkRank;
	title: string;

	private static $build(raw) {
		const item = new ItemContextFragmentViewModel();
		raw.content === undefined || (item.content = raw.content === null ? null : `${raw.content}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.rank === undefined || (item.rank = raw.rank)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class LawHouseSessionSummaryModel {
	scope: DistrictViewModel;
	ended: Date;
	id: string;
	started: Date;

	private static $build(raw) {
		const item = new LawHouseSessionSummaryModel();
		raw.scope === undefined || (item.scope = raw.scope ? DistrictViewModel["$build"](raw.scope) : null)
		raw.ended === undefined || (item.ended = raw.ended ? new Date(raw.ended) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.started === undefined || (item.started = raw.started ? new Date(raw.started) : null)
		
		return item;
	}
}

export class LawHouseSessionaryViewModel {
	resident: ResidentSummaryModel;
	id: string;

	private static $build(raw) {
		const item = new LawHouseSessionaryViewModel();
		raw.resident === undefined || (item.resident = raw.resident ? ResidentSummaryModel["$build"](raw.resident) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class LawHouseSessionProtocolViewModel {
	person: ResidentSummaryModel;
	id: string;
	message: string;
	said: Date;

	private static $build(raw) {
		const item = new LawHouseSessionProtocolViewModel();
		raw.person === undefined || (item.person = raw.person ? ResidentSummaryModel["$build"](raw.person) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.message === undefined || (item.message = raw.message === null ? null : `${raw.message}`)
		raw.said === undefined || (item.said = raw.said ? new Date(raw.said) : null)
		
		return item;
	}
}

export class LegalEntityViewModel {
	borough: BoroughSummaryModel;
	company: CompanySummaryModel;
	resident: ResidentSummaryModel;
	id: string;
	state: boolean;

	private static $build(raw) {
		const item = new LegalEntityViewModel();
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.company === undefined || (item.company = raw.company ? CompanySummaryModel["$build"](raw.company) : null)
		raw.resident === undefined || (item.resident = raw.resident ? ResidentSummaryModel["$build"](raw.resident) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.state === undefined || (item.state = !!raw.state)
		
		return item;
	}
}

export class NameFrequencyViewModel {
	name: string;
	count: number;

	private static $build(raw) {
		const item = new NameFrequencyViewModel();
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.count === undefined || (item.count = raw.count === null ? null : +raw.count)
		
		return item;
	}
}

export class ResidentSummaryModel {
	birthday: Date;
	familyName: string;
	givenName: string;
	id: string;
	tag: string;

	private static $build(raw) {
		const item = new ResidentSummaryModel();
		raw.birthday === undefined || (item.birthday = raw.birthday ? new Date(raw.birthday) : null)
		raw.familyName === undefined || (item.familyName = raw.familyName === null ? null : `${raw.familyName}`)
		raw.givenName === undefined || (item.givenName = raw.givenName === null ? null : `${raw.givenName}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class ResidentViewModel {
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

	private static $build(raw) {
		const item = new ResidentViewModel();
		raw.mainTenancy === undefined || (item.mainTenancy = raw.mainTenancy ? TenancyViewModel["$build"](raw.mainTenancy) : null)
		raw.workContracts === undefined || (item.workContracts = raw.workContracts ? raw.workContracts.map(i => WorkContractEmploymentModel["$build"](i)) : null)
		raw.biography === undefined || (item.biography = raw.biography === null ? null : `${raw.biography}`)
		raw.birthday === undefined || (item.birthday = raw.birthday ? new Date(raw.birthday) : null)
		raw.compassEconomic === undefined || (item.compassEconomic = raw.compassEconomic === null ? null : +raw.compassEconomic)
		raw.compassSocial === undefined || (item.compassSocial = raw.compassSocial === null ? null : +raw.compassSocial)
		raw.familyName === undefined || (item.familyName = raw.familyName === null ? null : `${raw.familyName}`)
		raw.givenName === undefined || (item.givenName = raw.givenName === null ? null : `${raw.givenName}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class ResidentRelationViewModel {
	initiator: ResidentSummaryModel;
	peer: ResidentSummaryModel;
	bonded: Date;
	conflict: string;
	connection: string;
	ended: Date;
	id: string;
	purpose: string;

	private static $build(raw) {
		const item = new ResidentRelationViewModel();
		raw.initiator === undefined || (item.initiator = raw.initiator ? ResidentSummaryModel["$build"](raw.initiator) : null)
		raw.peer === undefined || (item.peer = raw.peer ? ResidentSummaryModel["$build"](raw.peer) : null)
		raw.bonded === undefined || (item.bonded = raw.bonded ? new Date(raw.bonded) : null)
		raw.conflict === undefined || (item.conflict = raw.conflict === null ? null : `${raw.conflict}`)
		raw.connection === undefined || (item.connection = raw.connection === null ? null : `${raw.connection}`)
		raw.ended === undefined || (item.ended = raw.ended ? new Date(raw.ended) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.purpose === undefined || (item.purpose = raw.purpose === null ? null : `${raw.purpose}`)
		
		return item;
	}
}

export class DwellingViewModel {
	property: PropertySummaryModel;
	id: string;

	private static $build(raw) {
		const item = new DwellingViewModel();
		raw.property === undefined || (item.property = raw.property ? PropertySummaryModel["$build"](raw.property) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class TenancyViewModel {
	dwelling: DwellingViewModel;
	end: Date;
	id: string;
	start: Date;

	private static $build(raw) {
		const item = new TenancyViewModel();
		raw.dwelling === undefined || (item.dwelling = raw.dwelling ? DwellingViewModel["$build"](raw.dwelling) : null)
		raw.end === undefined || (item.end = raw.end ? new Date(raw.end) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.start === undefined || (item.start = raw.start ? new Date(raw.start) : null)
		
		return item;
	}
}

export class ResidentEventViewModel {
	id: string;
	timestamp: Date;
	action: string;
	detail: string;

	private static $build(raw) {
		const item = new ResidentEventViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.timestamp === undefined || (item.timestamp = raw.timestamp ? new Date(raw.timestamp) : null)
		raw.action === undefined || (item.action = raw.action === null ? null : `${raw.action}`)
		raw.detail === undefined || (item.detail = raw.detail === null ? null : `${raw.detail}`)
		
		return item;
	}
}

export class ResidentTickerModel {
	id: string;
	timestamp: Date;
	primaryResidentId: string;
	action: string;

	private static $build(raw) {
		const item = new ResidentTickerModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.timestamp === undefined || (item.timestamp = raw.timestamp ? new Date(raw.timestamp) : null)
		raw.primaryResidentId === undefined || (item.primaryResidentId = raw.primaryResidentId === null ? null : `${raw.primaryResidentId}`)
		raw.action === undefined || (item.action = raw.action === null ? null : `${raw.action}`)
		
		return item;
	}
}

export class MetricViewModel {
	description: string;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new MetricViewModel();
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class MetricValueViewModel {
	elapsed: number;
	formatted: string;
	id: string;
	updated: Date;
	value: number;

	private static $build(raw) {
		const item = new MetricValueViewModel();
		raw.elapsed === undefined || (item.elapsed = raw.elapsed === null ? null : +raw.elapsed)
		raw.formatted === undefined || (item.formatted = raw.formatted === null ? null : `${raw.formatted}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.updated === undefined || (item.updated = raw.updated ? new Date(raw.updated) : null)
		raw.value === undefined || (item.value = raw.value === null ? null : +raw.value)
		
		return item;
	}
}

export class MilitaryUnitSummaryModel {
	banner: string;
	code: string;
	disbanded: Date;
	id: string;
	name: string;
	parentId: string;

	private static $build(raw) {
		const item = new MilitaryUnitSummaryModel();
		raw.banner === undefined || (item.banner = raw.banner === null ? null : `${raw.banner}`)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.disbanded === undefined || (item.disbanded = raw.disbanded ? new Date(raw.disbanded) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.parentId === undefined || (item.parentId = raw.parentId === null ? null : `${raw.parentId}`)
		
		return item;
	}
}

export class OracleProposalSummaryModel {
	id: string;
	lore: string;

	private static $build(raw) {
		const item = new OracleProposalSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.lore === undefined || (item.lore = raw.lore === null ? null : `${raw.lore}`)
		
		return item;
	}
}

export class PlanSummaryModel {
	author: LegalEntityViewModel;
	id: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PlanSummaryModel();
		raw.author === undefined || (item.author = raw.author ? LegalEntityViewModel["$build"](raw.author) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class PlanShapeViewModel {
	archived: Date;
	closed: boolean;
	fill: string;
	id: string;
	label: string;
	path: string;
	stroke: string;

	private static $build(raw) {
		const item = new PlanShapeViewModel();
		raw.archived === undefined || (item.archived = raw.archived ? new Date(raw.archived) : null)
		raw.closed === undefined || (item.closed = !!raw.closed)
		raw.fill === undefined || (item.fill = raw.fill === null ? null : `${raw.fill}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.label === undefined || (item.label = raw.label === null ? null : `${raw.label}`)
		raw.path === undefined || (item.path = raw.path === null ? null : `${raw.path}`)
		raw.stroke === undefined || (item.stroke = raw.stroke === null ? null : `${raw.stroke}`)
		
		return item;
	}
}

export class BuildingShapeModel {
	boundary: string;
	id: string;

	private static $build(raw) {
		const item = new BuildingShapeModel();
		raw.boundary === undefined || (item.boundary = raw.boundary === null ? null : `${raw.boundary}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class MilitaryFacilityViewModel {
	property: PropertySummaryModel;
	unit: MilitaryUnitSummaryModel;
	closed: Date;
	id: string;
	name: string;
	opened: Date;

	private static $build(raw) {
		const item = new MilitaryFacilityViewModel();
		raw.property === undefined || (item.property = raw.property ? PropertySummaryModel["$build"](raw.property) : null)
		raw.unit === undefined || (item.unit = raw.unit ? MilitaryUnitSummaryModel["$build"](raw.unit) : null)
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		
		return item;
	}
}

export class PlotBoundaryShapeModel {
	id: string;
	shape: string;

	private static $build(raw) {
		const item = new PlotBoundaryShapeModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.shape === undefined || (item.shape = raw.shape === null ? null : `${raw.shape}`)
		
		return item;
	}
}

export class ArticleNewstickerModel {
	id: string;
	published: Date;
	title: string;

	private static $build(raw) {
		const item = new ArticleNewstickerModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.published === undefined || (item.published = raw.published ? new Date(raw.published) : null)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class ArticlePreviewModel {
	images: ArticleImageViewModel[];
	oracleProposal: OracleProposalSummaryModel;
	publication: PublicationSummaryModel;
	body: string;
	id: string;
	published: Date;
	title: string;

	private static $build(raw) {
		const item = new ArticlePreviewModel();
		raw.images === undefined || (item.images = raw.images ? raw.images.map(i => ArticleImageViewModel["$build"](i)) : null)
		raw.oracleProposal === undefined || (item.oracleProposal = raw.oracleProposal ? OracleProposalSummaryModel["$build"](raw.oracleProposal) : null)
		raw.publication === undefined || (item.publication = raw.publication ? PublicationSummaryModel["$build"](raw.publication) : null)
		raw.body === undefined || (item.body = raw.body === null ? null : `${raw.body}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.published === undefined || (item.published = raw.published ? new Date(raw.published) : null)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class ArticleOpinionViewModel {
	author: ResidentSummaryModel;
	comment: string;
	commented: Date;
	id: string;

	private static $build(raw) {
		const item = new ArticleOpinionViewModel();
		raw.author === undefined || (item.author = raw.author ? ResidentSummaryModel["$build"](raw.author) : null)
		raw.comment === undefined || (item.comment = raw.comment === null ? null : `${raw.comment}`)
		raw.commented === undefined || (item.commented = raw.commented ? new Date(raw.commented) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class ArticleImageViewModel {
	caption: string;
	id: string;

	private static $build(raw) {
		const item = new ArticleImageViewModel();
		raw.caption === undefined || (item.caption = raw.caption === null ? null : `${raw.caption}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class PublicationSummaryModel {
	company: CompanySummaryModel;
	description: string;
	id: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PublicationSummaryModel();
		raw.company === undefined || (item.company = raw.company ? CompanySummaryModel["$build"](raw.company) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class ChatInteractionViewModel {
	containsInformationRequest: boolean;
	id: string;
	question: string;
	responded: Date;
	response: string;

	private static $build(raw) {
		const item = new ChatInteractionViewModel();
		raw.containsInformationRequest === undefined || (item.containsInformationRequest = !!raw.containsInformationRequest)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.question === undefined || (item.question = raw.question === null ? null : `${raw.question}`)
		raw.responded === undefined || (item.responded = raw.responded ? new Date(raw.responded) : null)
		raw.response === undefined || (item.response = raw.response === null ? null : `${raw.response}`)
		
		return item;
	}
}

export class AssetViewModel {
	id: string;
	name: string;
	value: number;

	private static $build(raw) {
		const item = new AssetViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.value === undefined || (item.value = raw.value === null ? null : +raw.value)
		
		return item;
	}
}

export class ValuationSummaryModel {
	id: string;
	price: number;

	private static $build(raw) {
		const item = new ValuationSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.price === undefined || (item.price = raw.price === null ? null : +raw.price)
		
		return item;
	}
}

export class TrainStationExitViewModel {
	station: TrainStationViewModel;
	id: string;
	inbound: boolean;
	position: string;

	private static $build(raw) {
		const item = new TrainStationExitViewModel();
		raw.station === undefined || (item.station = raw.station ? TrainStationViewModel["$build"](raw.station) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.inbound === undefined || (item.inbound = !!raw.inbound)
		raw.position === undefined || (item.position = raw.position === null ? null : `${raw.position}`)
		
		return item;
	}
}

export class TrainRouteSummaryModel {
	closed: Date;
	code: string;
	color: string;
	id: string;
	name: string;
	opened: Date;
	textColor: string;

	private static $build(raw) {
		const item = new TrainRouteSummaryModel();
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.color === undefined || (item.color = raw.color === null ? null : `${raw.color}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		raw.textColor === undefined || (item.textColor = raw.textColor === null ? null : `${raw.textColor}`)
		
		return item;
	}
}

export class TrainRoutePathViewModel {
	id: string;
	path: string;

	private static $build(raw) {
		const item = new TrainRoutePathViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.path === undefined || (item.path = raw.path === null ? null : `${raw.path}`)
		
		return item;
	}
}

export class TrainStationViewModel {
	property: PropertySummaryModel;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new TrainStationViewModel();
		raw.property === undefined || (item.property = raw.property ? PropertySummaryModel["$build"](raw.property) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PropertyTrainStationViewModel {
	stops: StationTrainStopViewModel[];
	id: string;
	name: string;

	private static $build(raw) {
		const item = new PropertyTrainStationViewModel();
		raw.stops === undefined || (item.stops = raw.stops ? raw.stops.map(i => StationTrainStopViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class TrainStopViewModel {
	closed: Date;
	id: string;
	name: string;
	opened: Date;
	stationId: string;
	trackPosition: string;

	private static $build(raw) {
		const item = new TrainStopViewModel();
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		raw.stationId === undefined || (item.stationId = raw.stationId === null ? null : `${raw.stationId}`)
		raw.trackPosition === undefined || (item.trackPosition = raw.trackPosition === null ? null : `${raw.trackPosition}`)
		
		return item;
	}
}

export class StationTrainStopViewModel {
	route: TrainRouteViewModel;
	closed: Date;
	downPlatform: string;
	id: string;
	name: string;
	opened: Date;
	upPlatform: string;

	private static $build(raw) {
		const item = new StationTrainStopViewModel();
		raw.route === undefined || (item.route = raw.route ? TrainRouteViewModel["$build"](raw.route) : null)
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.downPlatform === undefined || (item.downPlatform = raw.downPlatform === null ? null : `${raw.downPlatform}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		raw.upPlatform === undefined || (item.upPlatform = raw.upPlatform === null ? null : `${raw.upPlatform}`)
		
		return item;
	}
}

export class BillViewModel {
	honestiums: HonestiumViewModel[];
	scope: DistrictViewModel;
	certified: Date;
	description: string;
	id: string;
	pro: boolean;
	summary: string;
	tag: string;
	title: string;

	private static $build(raw) {
		const item = new BillViewModel();
		raw.honestiums === undefined || (item.honestiums = raw.honestiums ? raw.honestiums.map(i => HonestiumViewModel["$build"](i)) : null)
		raw.scope === undefined || (item.scope = raw.scope ? DistrictViewModel["$build"](raw.scope) : null)
		raw.certified === undefined || (item.certified = raw.certified ? new Date(raw.certified) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.pro === undefined || (item.pro = !!raw.pro)
		raw.summary === undefined || (item.summary = raw.summary === null ? null : `${raw.summary}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class HonestiumViewModel {
	answer: string;
	answered: Date;
	id: string;
	pro: boolean;
	question: string;

	private static $build(raw) {
		const item = new HonestiumViewModel();
		raw.answer === undefined || (item.answer = raw.answer === null ? null : `${raw.answer}`)
		raw.answered === undefined || (item.answered = raw.answered ? new Date(raw.answered) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.pro === undefined || (item.pro = !!raw.pro)
		raw.question === undefined || (item.question = raw.question === null ? null : `${raw.question}`)
		
		return item;
	}
}

export class DistrictViewModel {
	id: string;
	name: string;
	parentId: string;

	private static $build(raw) {
		const item = new DistrictViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.parentId === undefined || (item.parentId = raw.parentId === null ? null : `${raw.parentId}`)
		
		return item;
	}
}

export class OpenHonestiumViewModel {
	bill: BillViewModel;
	answer: string;
	id: string;
	pro: boolean;
	question: string;

	private static $build(raw) {
		const item = new OpenHonestiumViewModel();
		raw.bill === undefined || (item.bill = raw.bill ? BillViewModel["$build"](raw.bill) : null)
		raw.answer === undefined || (item.answer = raw.answer === null ? null : `${raw.answer}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.pro === undefined || (item.pro = !!raw.pro)
		raw.question === undefined || (item.question = raw.question === null ? null : `${raw.question}`)
		
		return item;
	}
}

export class VoteViewModel {
	id: string;
	pro: boolean;
	reason: string;
	submitted: Date;

	private static $build(raw) {
		const item = new VoteViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.pro === undefined || (item.pro = !!raw.pro)
		raw.reason === undefined || (item.reason = raw.reason === null ? null : `${raw.reason}`)
		raw.submitted === undefined || (item.submitted = raw.submitted ? new Date(raw.submitted) : null)
		
		return item;
	}
}

export class VoteTickerViewModel {
	pro: boolean;
	submitted: Date;

	private static $build(raw) {
		const item = new VoteTickerViewModel();
		raw.pro === undefined || (item.pro = !!raw.pro)
		raw.submitted === undefined || (item.submitted = raw.submitted ? new Date(raw.submitted) : null)
		
		return item;
	}
}

export class CompanyViewModel {
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

	private static $build(raw) {
		const item = new CompanyViewModel();
		raw.offices === undefined || (item.offices = raw.offices ? raw.offices.map(i => OfficeSummaryModel["$build"](i)) : null)
		raw.banner === undefined || (item.banner = raw.banner === null ? null : `${raw.banner}`)
		raw.created === undefined || (item.created = raw.created ? new Date(raw.created) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporated === undefined || (item.incorporated = raw.incorporated ? new Date(raw.incorporated) : null)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.purpose === undefined || (item.purpose = raw.purpose === null ? null : `${raw.purpose}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		raw.type === undefined || (item.type = raw.type)
		
		return item;
	}
}

export class OfficeViewModel {
	company: CompanySummaryModel;
	capacityGrants: OfficeCapacityViewModel[];
	workOffers: WorkOfferSummaryModel[];
	property: PropertySummaryModel;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new OfficeViewModel();
		raw.company === undefined || (item.company = raw.company ? CompanySummaryModel["$build"](raw.company) : null)
		raw.capacityGrants === undefined || (item.capacityGrants = raw.capacityGrants ? raw.capacityGrants.map(i => OfficeCapacityViewModel["$build"](i)) : null)
		raw.workOffers === undefined || (item.workOffers = raw.workOffers ? raw.workOffers.map(i => WorkOfferSummaryModel["$build"](i)) : null)
		raw.property === undefined || (item.property = raw.property ? PropertySummaryModel["$build"](raw.property) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class OfficeEmployeeModel {
	company: CompanySummaryModel;
	property: PropertySummaryModel;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new OfficeEmployeeModel();
		raw.company === undefined || (item.company = raw.company ? CompanySummaryModel["$build"](raw.company) : null)
		raw.property === undefined || (item.property = raw.property ? PropertySummaryModel["$build"](raw.property) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class WorkOfferEmplymentModel {
	office: OfficeEmployeeModel;
	closed: Date;
	count: number;
	id: string;
	title: string;

	private static $build(raw) {
		const item = new WorkOfferEmplymentModel();
		raw.office === undefined || (item.office = raw.office ? OfficeEmployeeModel["$build"](raw.office) : null)
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.count === undefined || (item.count = raw.count === null ? null : +raw.count)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class WorkOfferViewModel {
	workContracts: WorkContractViewModel[];
	office: OfficeViewModel;
	closed: Date;
	count: number;
	id: string;
	offered: Date;
	task: string;
	title: string;

	private static $build(raw) {
		const item = new WorkOfferViewModel();
		raw.workContracts === undefined || (item.workContracts = raw.workContracts ? raw.workContracts.map(i => WorkContractViewModel["$build"](i)) : null)
		raw.office === undefined || (item.office = raw.office ? OfficeViewModel["$build"](raw.office) : null)
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.count === undefined || (item.count = raw.count === null ? null : +raw.count)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.offered === undefined || (item.offered = raw.offered ? new Date(raw.offered) : null)
		raw.task === undefined || (item.task = raw.task === null ? null : `${raw.task}`)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class WorkContractViewModel {
	worker: ResidentSummaryModel;
	canceled: Date;
	id: string;
	match: string;
	signed: Date;

	private static $build(raw) {
		const item = new WorkContractViewModel();
		raw.worker === undefined || (item.worker = raw.worker ? ResidentSummaryModel["$build"](raw.worker) : null)
		raw.canceled === undefined || (item.canceled = raw.canceled ? new Date(raw.canceled) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.match === undefined || (item.match = raw.match === null ? null : `${raw.match}`)
		raw.signed === undefined || (item.signed = raw.signed ? new Date(raw.signed) : null)
		
		return item;
	}
}

export class WorkContractEmploymentModel {
	offer: WorkOfferEmplymentModel;
	canceled: Date;
	id: string;
	signed: Date;

	private static $build(raw) {
		const item = new WorkContractEmploymentModel();
		raw.offer === undefined || (item.offer = raw.offer ? WorkOfferEmplymentModel["$build"](raw.offer) : null)
		raw.canceled === undefined || (item.canceled = raw.canceled ? new Date(raw.canceled) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.signed === undefined || (item.signed = raw.signed ? new Date(raw.signed) : null)
		
		return item;
	}
}

export class EpochViewModel {
	description: string;
	end: Date;
	id: string;
	name: string;
	offset: number;
	rate: number;
	start: Date;

	private static $build(raw) {
		const item = new EpochViewModel();
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.end === undefined || (item.end = raw.end ? new Date(raw.end) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.offset === undefined || (item.offset = raw.offset === null ? null : +raw.offset)
		raw.rate === undefined || (item.rate = raw.rate === null ? null : +raw.rate)
		raw.start === undefined || (item.start = raw.start ? new Date(raw.start) : null)
		
		return item;
	}
}

export class ItemContextViewModel {
	links: ItemContextLinkViewModel[];
	id: string;
	itemId: string;
	name: string;
	summary: string;
	tagline: string;
	updated: Date;

	private static $build(raw) {
		const item = new ItemContextViewModel();
		raw.links === undefined || (item.links = raw.links ? raw.links.map(i => ItemContextLinkViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.itemId === undefined || (item.itemId = raw.itemId === null ? null : `${raw.itemId}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.summary === undefined || (item.summary = raw.summary === null ? null : `${raw.summary}`)
		raw.tagline === undefined || (item.tagline = raw.tagline === null ? null : `${raw.tagline}`)
		raw.updated === undefined || (item.updated = raw.updated ? new Date(raw.updated) : null)
		
		return item;
	}
}

export class ItemContextBacklinkViewModel {
	source: ItemContextSummaryModel;
	target: ItemContextSummaryModel;
	connection: string;
	id: string;

	private static $build(raw) {
		const item = new ItemContextBacklinkViewModel();
		raw.source === undefined || (item.source = raw.source ? ItemContextSummaryModel["$build"](raw.source) : null)
		raw.target === undefined || (item.target = raw.target ? ItemContextSummaryModel["$build"](raw.target) : null)
		raw.connection === undefined || (item.connection = raw.connection === null ? null : `${raw.connection}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		
		return item;
	}
}

export class LawHouseSessionViewModel {
	scope: DistrictViewModel;
	protocol: LawHouseSessionProtocolViewModel[];
	sessionaries: LawHouseSessionaryViewModel[];
	ended: Date;
	id: string;
	started: Date;

	private static $build(raw) {
		const item = new LawHouseSessionViewModel();
		raw.scope === undefined || (item.scope = raw.scope ? DistrictViewModel["$build"](raw.scope) : null)
		raw.protocol === undefined || (item.protocol = raw.protocol ? raw.protocol.map(i => LawHouseSessionProtocolViewModel["$build"](i)) : null)
		raw.sessionaries === undefined || (item.sessionaries = raw.sessionaries ? raw.sessionaries.map(i => LawHouseSessionaryViewModel["$build"](i)) : null)
		raw.ended === undefined || (item.ended = raw.ended ? new Date(raw.ended) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.started === undefined || (item.started = raw.started ? new Date(raw.started) : null)
		
		return item;
	}
}

export class MilitaryUnitViewModel {
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

	private static $build(raw) {
		const item = new MilitaryUnitViewModel();
		raw.parent === undefined || (item.parent = raw.parent ? MilitaryUnitSummaryModel["$build"](raw.parent) : null)
		raw.subunits === undefined || (item.subunits = raw.subunits ? raw.subunits.map(i => MilitaryUnitSummaryModel["$build"](i)) : null)
		raw.facilities === undefined || (item.facilities = raw.facilities ? raw.facilities.map(i => MilitaryFacilityViewModel["$build"](i)) : null)
		raw.banner === undefined || (item.banner = raw.banner === null ? null : `${raw.banner}`)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.created === undefined || (item.created = raw.created ? new Date(raw.created) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.disbanded === undefined || (item.disbanded = raw.disbanded ? new Date(raw.disbanded) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.parentId === undefined || (item.parentId = raw.parentId === null ? null : `${raw.parentId}`)
		
		return item;
	}
}

export class OracleProposalViewModel {
	entity: LegalEntityViewModel;
	id: string;
	lore: string;

	private static $build(raw) {
		const item = new OracleProposalViewModel();
		raw.entity === undefined || (item.entity = raw.entity ? LegalEntityViewModel["$build"](raw.entity) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.lore === undefined || (item.lore = raw.lore === null ? null : `${raw.lore}`)
		
		return item;
	}
}

export class PlanViewModel {
	author: LegalEntityViewModel;
	shapes: PlanShapeViewModel[];
	description: string;
	id: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PlanViewModel();
		raw.author === undefined || (item.author = raw.author ? LegalEntityViewModel["$build"](raw.author) : null)
		raw.shapes === undefined || (item.shapes = raw.shapes ? raw.shapes.map(i => PlanShapeViewModel["$build"](i)) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class BuildingSummaryModel {
	archived: Date;
	boundary: string;
	created: Date;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new BuildingSummaryModel();
		raw.archived === undefined || (item.archived = raw.archived ? new Date(raw.archived) : null)
		raw.boundary === undefined || (item.boundary = raw.boundary === null ? null : `${raw.boundary}`)
		raw.created === undefined || (item.created = raw.created ? new Date(raw.created) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
		return item;
	}
}

export class PlotBoundarySummaryModel {
	changeComment: string;
	created: Date;
	id: string;
	shape: string;

	private static $build(raw) {
		const item = new PlotBoundarySummaryModel();
		raw.changeComment === undefined || (item.changeComment = raw.changeComment === null ? null : `${raw.changeComment}`)
		raw.created === undefined || (item.created = raw.created ? new Date(raw.created) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.shape === undefined || (item.shape = raw.shape === null ? null : `${raw.shape}`)
		
		return item;
	}
}

export class ArticleViewModel {
	images: ArticleImageViewModel[];
	opinions: ArticleOpinionViewModel[];
	oracleProposal: OracleProposalSummaryModel;
	publication: PublicationSummaryModel;
	body: string;
	id: string;
	published: Date;
	title: string;

	private static $build(raw) {
		const item = new ArticleViewModel();
		raw.images === undefined || (item.images = raw.images ? raw.images.map(i => ArticleImageViewModel["$build"](i)) : null)
		raw.opinions === undefined || (item.opinions = raw.opinions ? raw.opinions.map(i => ArticleOpinionViewModel["$build"](i)) : null)
		raw.oracleProposal === undefined || (item.oracleProposal = raw.oracleProposal ? OracleProposalSummaryModel["$build"](raw.oracleProposal) : null)
		raw.publication === undefined || (item.publication = raw.publication ? PublicationSummaryModel["$build"](raw.publication) : null)
		raw.body === undefined || (item.body = raw.body === null ? null : `${raw.body}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.published === undefined || (item.published = raw.published ? new Date(raw.published) : null)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
		return item;
	}
}

export class PublicationViewModel {
	company: CompanySummaryModel;
	articles: ArticlePreviewModel[];
	description: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PublicationViewModel();
		raw.company === undefined || (item.company = raw.company ? CompanySummaryModel["$build"](raw.company) : null)
		raw.articles === undefined || (item.articles = raw.articles ? raw.articles.map(i => ArticlePreviewModel["$build"](i)) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporation === undefined || (item.incorporation = raw.incorporation ? new Date(raw.incorporation) : null)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class ValuationViewModel {
	issuer: LegalEntityViewModel;
	description: string;
	estimated: Date;
	id: string;
	item: string;
	price: number;

	private static $build(raw) {
		const item = new ValuationViewModel();
		raw.issuer === undefined || (item.issuer = raw.issuer ? LegalEntityViewModel["$build"](raw.issuer) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.estimated === undefined || (item.estimated = raw.estimated ? new Date(raw.estimated) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.item === undefined || (item.item = raw.item === null ? null : `${raw.item}`)
		raw.price === undefined || (item.price = raw.price === null ? null : +raw.price)
		
		return item;
	}
}

export class TrainRouteViewModel {
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

	private static $build(raw) {
		const item = new TrainRouteViewModel();
		raw.activePath === undefined || (item.activePath = raw.activePath ? TrainRoutePathViewModel["$build"](raw.activePath) : null)
		raw.operator === undefined || (item.operator = raw.operator ? LegalEntityViewModel["$build"](raw.operator) : null)
		raw.stops === undefined || (item.stops = raw.stops ? raw.stops.map(i => TrainStopViewModel["$build"](i)) : null)
		raw.closed === undefined || (item.closed = raw.closed ? new Date(raw.closed) : null)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.color === undefined || (item.color = raw.color === null ? null : `${raw.color}`)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.looping === undefined || (item.looping = !!raw.looping)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.opened === undefined || (item.opened = raw.opened ? new Date(raw.opened) : null)
		raw.textColor === undefined || (item.textColor = raw.textColor === null ? null : `${raw.textColor}`)
		
		return item;
	}
}

export class Service {
	static baseUrl = "";

	static toURL(request) {
		return `${this.baseUrl}${request}`;
	}
	
	static stringify(object) {
		if (Array.isArray(object)) {
			return '[' + object.map(item => this.stringify(item)).join(',') + ']';
		}
	
		return JSON.stringify(object, (key, value) => {
			if (value instanceof Date) {
				return value.toISOString();
			}
			
			if (value === null) {
				return null;
			}
			
			if (typeof value === 'object' && key !== '') {
				if (value && 'id' in value) {
					return {
						id: value.id
					};
				}
			
				return undefined;
			}
			
			return value;
		});
	}
}

export class MapService {
	async reviewNext(): Promise<PropertyViewModel> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("BkMD4zdnRzMTk1N3N0M3hsc3E3MHFwNz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PropertyViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getBoroughs(): Promise<Array<BoroughViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("R2M2Z2Yjx4aGM4MzR1ZzcxdjI5Zzprbm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : BoroughViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getProperties(page: number): Promise<Array<PropertyOverviewModel>> {
		const $data = new FormData();
		$data.append("IxYWZhMjR6Y3cwM2Q1cGRpb3A4YzFqaW", Service.stringify(page))

		return await fetch(Service.toURL("h1cnYwOHM0amNneXFtbHQ2M3NvYTU1am"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PropertyOverviewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getStreets(): Promise<Array<StreetViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("k1M2B2amlvbmR4OGRvcnJ2Zn55OGcybG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : StreetViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getSquares(): Promise<Array<SquareViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("hpejphODJldWo2b2NxaWVxdzx3c2V3bm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : SquareViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getWaterBodies(): Promise<Array<WaterBodyViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("luMjgwbmc0MDFmNGEzZDNkbDcxOH04NG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : WaterBodyViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getBridges(): Promise<Array<BridgeViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("k3M2I0czloYWQzZT93N3pzemFzaGRiaW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : BridgeViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getLastChangeLocation(): Promise<string> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("YzdX1xaXlicD5la2kycXdvZ3dyYm03bz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getHistory(): Promise<Array<HistoryEntryViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("oyOTdvb2V4aXw3eHhsNXdyZnp4aGk1bD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : HistoryEntryViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getTubes(): Promise<Array<number>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("MwNT15bTI5ZDNubmZ5dW96Nj9qeGVwd3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : +d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getPropertyTypes(): Promise<Array<PropertyTypeViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("U2eWZwcW41MGJxZGVndzdjNnhmZXFhMT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PropertyTypeViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getProperty(id: string): Promise<PropertyViewModel> {
		const $data = new FormData();
		$data.append("VjYnVwc3k5aToyb3FtcDN4c3pnM2RlMW", Service.stringify(id))

		return await fetch(Service.toURL("d1NTdqcWBiMWE5ZHg3ZndyM2UzNnMwNm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PropertyViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async createProperty(shape: string): Promise<string> {
		const $data = new FormData();
		$data.append("B2aHdob3JiN2VpcXc2Y2NnbnhyMXI1b3", Service.stringify(shape))

		return await fetch(Service.toURL("tzNGZjM2B3Z3Z5dGp2bWRoY2VqcWF3YW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async createBorough(boroughViewModel: BoroughViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("Mya2ltZGltbjcyeHdjdGcydGVpZDgyNT", Service.stringify(boroughViewModel))

		return await fetch(Service.toURL("J2c3hyNDQwNTdjeDs4c3htbWh2MWVnaG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async createStreet(streetViewModel: StreetViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("YwNnJhZnZycjNzNGU3emQ0Y2RtNnhmZG", Service.stringify(streetViewModel))

		return await fetch(Service.toURL("VsbndnaTI4bTllbnh0endpaHdkM3w1MD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async createSquare(squareViewModel: SquareViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("FwZXk2OGVmcWRxeHdiZW9ucjhxcGE5cG", Service.stringify(squareViewModel))

		return await fetch(Service.toURL("RhZGo0ejpmdnJhZ3lla3I4bzB2M2F5cn"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async createWaterBody(waterBodyViewModel: WaterBodyViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("hnMjgxamVveGk2czR6YjQ2aHdxaGJsaG", Service.stringify(waterBodyViewModel))

		return await fetch(Service.toURL("A1bX53enB1cHV0cmQzNTYxdDgzaH10an"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async saveProperty(propertyViewModel: PropertyViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("pvYjBwMX5xNGhpb2FwYWRpeWJ6OHFteT", Service.stringify(propertyViewModel))

		return await fetch(Service.toURL("F5djUwdW03bmAxcTlneDxoYXZiemU3Ym"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async archiveProperty(propertyViewModel: PropertyViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("E0M2J3Ymt5cDY5ZWJnMHU1ZHo2YzUyc2", Service.stringify(propertyViewModel))

		return await fetch(Service.toURL("dta2hmZGV4dHdhZnJ4YzVnZWp2djV2Y2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class BoroughService {
	async get(tag: string): Promise<BoroughViewModel> {
		const $data = new FormData();
		$data.append("M5endlbjBxeGJtZHIwdzBudX12c3lrdG", Service.stringify(tag))

		return await fetch(Service.toURL("ZsMjFkanx6MGp3OHl0Z2hmcGdnMXQ1cj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : BoroughViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async register(bounds: string, name: string, description: string, districtId: string): Promise<string> {
		const $data = new FormData();
		$data.append("lqaTR5bWd5aXl1bXlvbmN3ZjIxNGQwMn", Service.stringify(bounds))
		$data.append("BsZmUxZ3lvdmhpbGtleHgxN3FkMGFrcj", Service.stringify(name))
		$data.append("h2cTNqeWQ2NWY5ZHI5NWxsMzB6ZXR0em", Service.stringify(description))
		$data.append("0xOTYybDBpMDgzaHgxbWJ2ZjR6bzIyYW", Service.stringify(districtId))

		return await fetch(Service.toURL("pwcTdkZWRzZnswcWY4cjgzZGR4b2NpN2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async list(): Promise<Array<BoroughSummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("J4amhucmNzdWdkM3gybmlvZjV4NnFodX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : BoroughSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async listDistricts(): Promise<Array<DistrictViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("hxczcwaDlrb2Jmc3k4MHRzOTc5cGY4dT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : DistrictViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async residentCount(id: string): Promise<number> {
		const $data = new FormData();
		$data.append("ppbnl3ZnRkZ2Y5ZzN6MzBveXQ0NnA2Yn", Service.stringify(id))

		return await fetch(Service.toURL("F0c3JlYTJ0bmlmOH9ndmc1bzdncWp3bz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : +d;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async officeCount(id: string): Promise<number> {
		const $data = new FormData();
		$data.append("ZwOGlmdXxqZGwwcGZnMmFwZGNjMGhscD", Service.stringify(id))

		return await fetch(Service.toURL("g2cTFyMzs4dGFlc28zNDFhcmEwM2RwNX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : +d;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async propertyCount(id: string): Promise<number> {
		const $data = new FormData();
		$data.append("hoY3FwZXBtcnJvcDRsNmdlY2c3N2x6ZD", Service.stringify(id))

		return await fetch(Service.toURL("ZhY2Jia2JwZnQweWl0cTNoN2hzajJscW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : +d;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class ChangeService {
	async getChanges(minX: number, minY: number, maxX: number, maxY: number): Promise<Array<ChangeFrameViewModel>> {
		const $data = new FormData();
		$data.append("JyMHZwbWcyNDBiZWE0anE3N21xeXRkNT", Service.stringify(minX))
		$data.append("ZpNXF0Zmh4Yn1sYz00bDhkdXRzZHY0ZW", Service.stringify(minY))
		$data.append("VydzRiNXZoNjdhb3luM3RjcmQwOXc5az", Service.stringify(maxX))
		$data.append("1lcWRjbGY3aXB6OXh6cGFlbmc2bzd6eT", Service.stringify(maxY))

		return await fetch(Service.toURL("Y5d2dmMjM4MHNyNng4bXJya3BjdTZjbm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ChangeFrameViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class CityService {
	async getCities(): Promise<Array<CityViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("JtamdiOHlyZH9lNmlhcz8zZXpiMmd3Ym"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : CityViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class CompanyOfficeService {
	async find(tag: string): Promise<CompanyViewModel> {
		const $data = new FormData();
		$data.append("FodnMycHpnOHlsbmVqbzdwa2BsbHl3M3", Service.stringify(tag))

		return await fetch(Service.toURL("hpNW0waHBsMDdnNGdkZmVhMHhuaTJlb3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : CompanyViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getOffice(id: string): Promise<OfficeViewModel> {
		const $data = new FormData();
		$data.append("lpOWp4Z3Rzenc1YWdzejttZGZmcnI5Zz", Service.stringify(id))

		return await fetch(Service.toURL("Y4ZDhseWFuYXZib3g2cjgycjQ4aD91Nz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : OfficeViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getWorkOffer(id: string): Promise<WorkOfferViewModel> {
		const $data = new FormData();
		$data.append("M1dmQ1MWM4dDFqOTVjYTVzd2ZzcXhvbX", Service.stringify(id))

		return await fetch(Service.toURL("VyOGRxMXZndXV6Mj1vN2lqZ2U2dGllMz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : WorkOfferViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getCompanies(): Promise<Array<CompanySummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("Eydzl2b3hvZWY2OTNzb3g4bmYzMjNsZ3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : CompanySummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async register(name: string, description: string, type: string, firstOfficeId: string, capacity: number): Promise<string> {
		const $data = new FormData();
		$data.append("RsdmF1OWVzeXo5MnllMmhmczlocDp1cX", Service.stringify(name))
		$data.append("JiZWBkZnAwZ2ljZHE0YmZmYnlpeW9xcT", Service.stringify(description))
		$data.append("RzdmQ4NT8xem1rbWJueXIxcWR0OX5yc2", Service.stringify(type))
		$data.append("s1bGF2azVqaWBwazhwZmI1Z2E2Z3Jjcz", Service.stringify(firstOfficeId))
		$data.append("oxa3VqZjprbmJtcmlrdjAzNTswYmhmdm", Service.stringify(capacity))

		return await fetch(Service.toURL("NnM21sNXg2b3dxeXtoN2l4bTNubGcxN2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async registerOffice(name: string, companyId: string, propertyId: string, capacity: number): Promise<string> {
		const $data = new FormData();
		$data.append("ZyNGVpZWlsNWB2eWBjb3VqNHt2aGl4dD", Service.stringify(name))
		$data.append("l3YzB6dWcycDFoeWFseWdha2RhMzptcT", Service.stringify(companyId))
		$data.append("dodHJhcWgxYzd4eDF4ejNva2d6Mzl3OX", Service.stringify(propertyId))
		$data.append("kxZTQ1eDJuMGM4NWh6ZH1vMzM3NjZpM2", Service.stringify(capacity))

		return await fetch(Service.toURL("tqa350NGZlOHptNTZna2lnc2FoazpxaW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class EpochService {
	async timeline(): Promise<Array<EpochTimelineModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("ZocWgzc2BueXhqbGVtZTYyc2E3b3Zwem"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : EpochTimelineModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getEpochs(): Promise<Array<EpochViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("NtYmVpcjM3eWZ4OWczaHVsMWVpbmN0cW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : EpochViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class GameService {
	async getPlayers(): Promise<Array<PlayerViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("pkYWNsZmA2MWVzdXhmYXF0ODVscjV0ZW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PlayerViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getOnlinePlayers(): Promise<Array<PlayerViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("FxanB4eTFwbHRmYTFxaGw4dWA5Z2wzYj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PlayerViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class HistoricListingService {
	async getGrades(): Promise<Array<HistoricListingGradeViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("pzazpkdHZiZTFlcHVqYTZhZ2puM2kyZ2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : HistoricListingGradeViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getModifiers(): Promise<Array<HistoricListingModifierViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("h5dHl6dTNxOHtnbGZ6YWNsYzdlYWBxNX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : HistoricListingModifierViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async addListing(propertyViewModel: PropertyViewModel, grade: HistoricListingGradeViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("QzZTg0Y3Jza2VxY3E5azlvdzVoaDkyMj", Service.stringify(propertyViewModel))
		$data.append("Y5aHJ4b2UwZ2pkZ3R1N285MDkxZnV2c3", Service.stringify(grade))

		return await fetch(Service.toURL("YzcjNuOWlqM3VzYWJpdT5lN39xYmZzNz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async addModifier(propertyId: string, modifierId: string): Promise<PropertyHistoricListingModifierViewModel> {
		const $data = new FormData();
		$data.append("FyMXVia29sNjN3ZG1naT1teHZzdWN0ej", Service.stringify(propertyId))
		$data.append("M2MTNoNWFqbWAybGxrb3M0Z2U0azF4cG", Service.stringify(modifierId))

		return await fetch(Service.toURL("hmc3RueXJneWJ1MnB1Zzd3cmx5aWZsc2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PropertyHistoricListingModifierViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async removeModifier(linkId: string): Promise<void> {
		const $data = new FormData();
		$data.append("kzaWBqZmJtMjV6bTRjaDNoMWQ2Z2dxZn", Service.stringify(linkId))

		return await fetch(Service.toURL("IwaWRoOGpwcTdjb3NxeWpxaWtwZTY3M3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class ImpressionService {
	async list(): Promise<Array<ImpressionViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("FpMHF2ZmRrN215Y2xuMmU0cmgza2hscT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ImpressionViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class ItemContextService {
	async getContext(id: string): Promise<ItemContextViewModel> {
		const $data = new FormData();
		$data.append("hzeXR4aGQzc3JlcW82OWVnZWZodWE5N2", Service.stringify(id))

		return await fetch(Service.toURL("oxeGFxaTJud290OTFmYnZpZ3lqajIwa3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : ItemContextViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async annotateContext(id: string): Promise<string> {
		const $data = new FormData();
		$data.append("tsYXRpeGVsYXhzcnJnd3BrenExc3g0Mz", Service.stringify(id))

		return await fetch(Service.toURL("E1cWFsczY0Mzp3MHNnMHloaDdwb29vd3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getFragments(id: string): Promise<Array<ItemContextFragmentViewModel>> {
		const $data = new FormData();
		$data.append("QwcWFycm5ibnZuaTE2c3FncDR2MTFsOH", Service.stringify(id))

		return await fetch(Service.toURL("ZzNWdiZHV2aWg0ZzY3aDVkaXI3ZWg5MT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ItemContextFragmentViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getBacklinks(id: string): Promise<Array<ItemContextBacklinkViewModel>> {
		const $data = new FormData();
		$data.append("ZxbWl0bnh5ZGE3NjFzbGk1ZzpzN3ExeG", Service.stringify(id))

		return await fetch(Service.toURL("FqNDJjNzZ5NmJlb2Y0cTEzZTAwcDNrbT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ItemContextBacklinkViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class LawHouseService {
	async getSessions(): Promise<Array<LawHouseSessionSummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("FhNmk4YT9mdGlwem83b2U2MW04NWdudW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : LawHouseSessionSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getSession(id: string): Promise<LawHouseSessionViewModel> {
		const $data = new FormData();
		$data.append("BoeXUxZGZka3ZvMGI1ZX1yZThzdmZ0NX", Service.stringify(id))

		return await fetch(Service.toURL("FjemcwbHIxaTVub2c1aDozOTNmeDduYz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : LawHouseSessionViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class LegalEntityService {
	async find(search: string): Promise<Array<LegalEntityViewModel>> {
		const $data = new FormData();
		$data.append("JocWczYmk0MHJtYWNvcHN1ZjJ0bGZoeT", Service.stringify(search))

		return await fetch(Service.toURL("NjbGJtbzE1cmRqdmdmaTR4cnhlZXN1Mz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : LegalEntityViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async findById(id: string): Promise<LegalEntityViewModel> {
		const $data = new FormData();
		$data.append("Z2enBhaH54eDQ5NHxrZGM2ZWpkMWozcD", Service.stringify(id))

		return await fetch(Service.toURL("Q3dTc1ODxpNGRreWlxemV2Mj5qcHZ4Mm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : LegalEntityViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async listFeatured(): Promise<Array<LegalEntityViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("lvYjBpYWJzd2Joajozd3VkazdhZjBobz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : LegalEntityViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class LifeService {
	async ticker(): Promise<Array<ResidentTickerModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("htaGJyZ2pqM3hzM2NxMzl4aDJ3c2Nsbz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ResidentTickerModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getResident(tag: string): Promise<ResidentViewModel> {
		const $data = new FormData();
		$data.append("g5bmNiODV3dmF5N2JmY3JjY2dvZ3ZveD", Service.stringify(tag))

		return await fetch(Service.toURL("B6eWMwaDNkZ3NvOWNjdnRmdHx6anJrOD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : ResidentViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getEventHistory(id: string): Promise<Array<ResidentEventViewModel>> {
		const $data = new FormData();
		$data.append("5pOHt2NGU2ZzJxenFrcDQwZHlsOWQ2bG", Service.stringify(id))

		return await fetch(Service.toURL("FyYXcxZ2hocDg2dmUxeX1vN25jZGU1YT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ResidentEventViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getRelations(id: string): Promise<Array<ResidentRelationViewModel>> {
		const $data = new FormData();
		$data.append("IxaD93ajg4aWx5eWBwc3ZkOHVlejU2Zm", Service.stringify(id))

		return await fetch(Service.toURL("huZ2F0ODhpb2VuajhyZ31oMmFrY2Y0b3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ResidentRelationViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async listResidents(page: number): Promise<Array<ResidentSummaryModel>> {
		const $data = new FormData();
		$data.append("J1aTRnbHQ4YmMxdWQwZzUycDlheHMydX", Service.stringify(page))

		return await fetch(Service.toURL("huMGxqZmMyZD16eHtmaXIxOTo0aTVqeT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ResidentSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async search(query: string): Promise<Array<ResidentViewModel>> {
		const $data = new FormData();
		$data.append("c2cWYybjR0ZjdramJraXF2d2N0MnZmNX", Service.stringify(query))

		return await fetch(Service.toURL("c3bHdmNmN1bGNyd28yMXF1b2M1YmdyNX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ResidentViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async listGivenNameFrequencies(): Promise<Array<NameFrequencyViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("kwd2V1ZzBubGRrbndoc2B5djU4OGNtbj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : NameFrequencyViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async listFamilyNameFrequencies(): Promise<Array<NameFrequencyViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("N4YmRoODs3MWk5dmI1NWpiNTc1Z2I4MD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : NameFrequencyViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class MetricService {
	async list(): Promise<Array<MetricViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("JobTc2MmQwODI1YWFhbndodHVlZ2VtMX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : MetricViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async plot(id: string, start: Date): Promise<Array<MetricValueViewModel>> {
		const $data = new FormData();
		$data.append("NvNjYzd3V0MDV4ZWlxaHQ5YndjZHl2cG", Service.stringify(id))
		$data.append("ZoNHI0aD8zbTl2bmAyY3c2ZTU5aWBibj", Service.stringify(start))

		return await fetch(Service.toURL("V4d2kxM3N6aHtqNHc3YTkydGlmaGBtaj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : MetricValueViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class MiliatryService {
	async getUnit(id: string): Promise<MilitaryUnitViewModel> {
		const $data = new FormData();
		$data.append("52MjhhM2pvZ21vMm9rcnViYWA3NmA1Mm", Service.stringify(id))

		return await fetch(Service.toURL("IxbGhidGxjcnZ5djQzZzRsZ3M4dDNybD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : MilitaryUnitViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getUnits(): Promise<Array<MilitaryUnitSummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("5reGQ1NH1qMWlxNzcyZDF0MHh1ZHs0Y2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : MilitaryUnitSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async assignFacility(propertyId: string): Promise<MilitaryFacilityViewModel> {
		const $data = new FormData();
		$data.append("Vwdm5kZjRpMTdsdWNpYWZ3MmJxNmB4c2", Service.stringify(propertyId))

		return await fetch(Service.toURL("B6dXczd3FkMj12YT53NmVsMXYzYWE2Z2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : MilitaryFacilityViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async updateFacility(facilityId: string, name: string, unitId: string): Promise<void> {
		const $data = new FormData();
		$data.append("RnaGZ6Znd1YXE0ZHhrdjdzNWhzcGhlZm", Service.stringify(facilityId))
		$data.append("czNzlzaTZraXJ0dDZ1NWQ2cDlkbHUxan", Service.stringify(name))
		$data.append("w4eWx3bWI1aGE3bWgzMXljMH94czRzMj", Service.stringify(unitId))

		return await fetch(Service.toURL("Rkb2JpMWJ2NG94cWliMnl1aXk2ZXM1Nz"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async closeFacility(facilityId: string): Promise<void> {
		const $data = new FormData();
		$data.append("ZvN29ybmdhZTRtMGFrbXJkZW9oeXV6Z3", Service.stringify(facilityId))

		return await fetch(Service.toURL("NmNzhpNjA0NWkxemZ6bWp2ZHowanBzYT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class OracleService {
	async nextProposal(): Promise<OracleProposalViewModel> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("JseDtianR6Z3dkZ2RpNnFrcWdjeTFieX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : OracleProposalViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async review(id: string, realistic: boolean): Promise<void> {
		const $data = new FormData();
		$data.append("JiMXRuNDI4MzI2ZGFpdXN1amZ5eDBwYW", Service.stringify(id))
		$data.append("Zqb3A0bWU0c3c4d3didTY1ZW45dmd6aW", Service.stringify(realistic))

		return await fetch(Service.toURL("c1M3BrenZva2ZjaXBjcGZrYj5uMTZ2bm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async discardArticle(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("kzOWdxdWF6ZWRjZmB1cWQ1NTg2ank0Yn", Service.stringify(id))

		return await fetch(Service.toURL("F6bzczaH5iZGNqNWtsNDltaGtla245NG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async about(id: string): Promise<string> {
		const $data = new FormData();
		$data.append("N4NzU2OXtwMjhmOWZ6cHgwaXdpbjU1NT", Service.stringify(id))

		return await fetch(Service.toURL("M4N2ZjaWNsdWByOHxidTdpOTlib3loOG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class PlanService {
	async list(): Promise<Array<PlanViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("Q3bXdrZmpqaThtZ2ZvcGkxZ21qN3p1a2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PlanViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getPlan(tag: string): Promise<PlanViewModel> {
		const $data = new FormData();
		$data.append("w5c2gweHR6cWM4NDZ4c3gwNGN1amVpcD", Service.stringify(tag))

		return await fetch(Service.toURL("I3dGZwNmE3NHV5MXg4ZGZmd2dvbmxncj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PlanViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async create(name: string, description: string, authorId: string): Promise<string> {
		const $data = new FormData();
		$data.append("NpND85dGFtY3F1NnMxaH5kbHB0N3ZuM2", Service.stringify(name))
		$data.append("dpcTIwdnk3a2Fid3kweHU3dWVjMmR2bH", Service.stringify(description))
		$data.append("dyOTJoeXM4andscmhzMnNoYXN2dmE5Nz", Service.stringify(authorId))

		return await fetch(Service.toURL("d4MmlrOHM3c3QwMHR0N3dnZHI5em01aG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async save(id: string, name: string, description: string): Promise<void> {
		const $data = new FormData();
		$data.append("42bzJud35ycmFoNTNnZH8yYnNkMHV1dD", Service.stringify(id))
		$data.append("F6aWA4OGI1bDlldng0MXZwdD03a3NucG", Service.stringify(name))
		$data.append("RlYXFxMjkwOWBqczdqbjk3cngzcThsdD", Service.stringify(description))

		return await fetch(Service.toURL("Jrajx1bjg5ejQ4dWR2bGlucmAwNXYxc2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async setAuthor(id: string, authorId: string): Promise<void> {
		const $data = new FormData();
		$data.append("9qN2BnenYzcGFlbmI0eHZscndlZ3pjdX", Service.stringify(id))
		$data.append("hhNjQ2ZWZ5ejZ0cHljd2NydnR2bmdhNG", Service.stringify(authorId))

		return await fetch(Service.toURL("Bqb2dpaHVvNDZvNzpvOHUxOTFib25xZ2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async addShape(tag: string, path: string): Promise<void> {
		const $data = new FormData();
		$data.append("Z6aGZxMXJxMXxqZmRzM2AzOWZxbjZ6dG", Service.stringify(tag))
		$data.append("h1NHhleTFvOWNsYzN2OX5keHFlcjUzY3", Service.stringify(path))

		return await fetch(Service.toURL("w5YWlzbGg1cmp1cXd0MGwzaHV0OTF3N3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async saveShape(id: string, label: string, stroke: string, fill: string, close: boolean): Promise<void> {
		const $data = new FormData();
		$data.append("FpOXI1dXxrYWhjc3J0cX03MThpbX9kb2", Service.stringify(id))
		$data.append("1scTgxdTZhZTo3MWkyYWFqZT5meDtodW", Service.stringify(label))
		$data.append("Jsd2RrcHJxZTQwOWhrZGN1bmNubTQ5c3", Service.stringify(stroke))
		$data.append("lqdWh1YnRkbTt5NzVwMWlvcHFvNGJyY2", Service.stringify(fill))
		$data.append("FmNDJxa3N0M2JxYWloenlpbmdmZ2k3OD", Service.stringify(close))

		return await fetch(Service.toURL("Jka3kxbW53NG1uej13OW9iZ3hrM35hNG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async archiveShape(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("x2bzozdmBnaTZ5ND8wcn1vbnVidn9ob3", Service.stringify(id))

		return await fetch(Service.toURL("J0YWB2bWxvYWM0dmNrb2lzd3l5eHc0OX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async unarchiveShape(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("hrcXEydXZ4dzs4ZjkxMDZiZDlwYnRjZn", Service.stringify(id))

		return await fetch(Service.toURL("p0NzVieGxuN28zOGFkentucjs1Z3g1en"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class PropertyService {
	async createDwellings(propertyId: string, count: number): Promise<Array<PropertyDwellingViewModel>> {
		const $data = new FormData();
		$data.append("9ndGVpMzF2eXQ3OWNlOGtpeHRiMml1N3", Service.stringify(propertyId))
		$data.append("l5Z3JiZ2J2MTN2dDdxMnEzZ2F5c3BjZm", Service.stringify(count))

		return await fetch(Service.toURL("55OHRoMmdoY2Q3c2Rzb3JvZGF3NWRkMG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PropertyDwellingViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async createBuilding(propertyId: string, boundary: string): Promise<BuildingSummaryModel> {
		const $data = new FormData();
		$data.append("YyZXJidGMzOGBieWEwMTJweDVnaGc1bD", Service.stringify(propertyId))
		$data.append("NxNDIwaWU4aXRya3V0aXJxdXVkbGkzNW", Service.stringify(boundary))

		return await fetch(Service.toURL("Y2YWVmY2lsZDZ5amIxMGRubHl5bT5rcD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : BuildingSummaryModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async findTouchingBoroughs(propertyId: string): Promise<Array<BoroughSummaryModel>> {
		const $data = new FormData();
		$data.append("x4Zml2emh6bmZ4dzVyMD85a3VybDNhZT", Service.stringify(propertyId))

		return await fetch(Service.toURL("I1Y2VpcmdnOGUwcWFuOTc2bWQ1NHhud3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : BoroughSummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async assignSoleOwner(propertyId: string, entityId: string): Promise<PropertyOwnerViewModel> {
		const $data = new FormData();
		$data.append("xxNnpkOXJiZ2dkNjJjdGBpdzgxcDtrY2", Service.stringify(propertyId))
		$data.append("ZybDVoNDkydzlyY3p6b2Vydn91MWVpY3", Service.stringify(entityId))

		return await fetch(Service.toURL("hzbzE0dDd1MmRhZnw1Z3c0dWFwa2Yzcj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PropertyOwnerViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async assignValuation(propertyId: string, plotAreaPrice: number, buildingAreaPrice: number): Promise<void> {
		const $data = new FormData();
		$data.append("EwMmpvdnhlZ35xd3BpczhydWFsc2JzeD", Service.stringify(propertyId))
		$data.append("QycjQ2N3M1MX54bW1iYmFoaG53aTQ5bn", Service.stringify(plotAreaPrice))
		$data.append("p5NWZtNHJqMTd2OGIybWllZX9xeD8wem", Service.stringify(buildingAreaPrice))

		return await fetch(Service.toURL("k5NWY1dmQ4cGVvb2UyOWRrOGpvNDFvdj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async saveBuilding(viewModel: BuildingSummaryModel): Promise<void> {
		const $data = new FormData();
		$data.append("Q0amZyeDdwbzlqZ3I5ZmtmbnVxZGM1dG", Service.stringify(viewModel))

		return await fetch(Service.toURL("JzbzZkYm5pcmNheXl3aTJrYXR1ZnMwbn"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async archiveBuilding(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("9zNmQxaHQ3M3F0MTAwamRvcnlzZjduZW", Service.stringify(id))

		return await fetch(Service.toURL("N0c3d6cDB3eGN3aXQ0bHlybntjMH9za2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async editPlotBoundary(propertyId: string, boundary: string): Promise<PlotBoundarySummaryModel> {
		const $data = new FormData();
		$data.append("dwbmRjbWR1bGE2NjFndzJ1enw0b2VyMX", Service.stringify(propertyId))
		$data.append("I4NmJpenJib2hzcWhoOXgxMX53bHlvdD", Service.stringify(boundary))

		return await fetch(Service.toURL("BtamlqZDJobHc3OXluMmd0bWZ2Y3FhYm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PlotBoundarySummaryModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class PublicationService {
	async getPublication(tag: string): Promise<PublicationViewModel> {
		const $data = new FormData();
		$data.append("Y0amFoNTk2dWxiZHB2NWV6azF6NTZ6NX", Service.stringify(tag))

		return await fetch(Service.toURL("h6NmRpZnF3eHBhemx2am50a3Ftd2ZrZH"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PublicationViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getArticle(id: string): Promise<ArticleViewModel> {
		const $data = new FormData();
		$data.append("JhZ3kwamJnYWVyYWB6ZWYxbGRoZXB1a3", Service.stringify(id))

		return await fetch(Service.toURL("drMjJ0Nm40YWV2b3F6dzt4ZXdremBvMm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : ArticleViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getArticleContent(id: string): Promise<string> {
		const $data = new FormData();
		$data.append("IxdjlzOHlheGNtZmN1cGE0ZnV2YTZsM2", Service.stringify(id))

		return await fetch(Service.toURL("N5ZjNjamYyZTBodXNqbmlpemR1dTcwbj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getNewsticker(): Promise<Array<ArticleNewstickerModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("FsZGx5dTMzY20wcTh3ajh5YmRueHJ6NH"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ArticleNewstickerModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async listNewestArticles(page: number, publication: string): Promise<Array<ArticlePreviewModel>> {
		const $data = new FormData();
		$data.append("dzdXMydWI2ZmE4a3Vya2Q4NTpjeWc1bz", Service.stringify(page))
		$data.append("FzenJlNHNwNmh4c2ZhaHtmejswaDVqaj", Service.stringify(publication))

		return await fetch(Service.toURL("NoMX80NmgxNTFyZTB4dzB3eDBzZHFtd3"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ArticlePreviewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async createArticle(publicationId: string): Promise<string> {
		const $data = new FormData();
		$data.append("BsdT10cmlhMDtwangxNHF2cTZ0aTMyd2", Service.stringify(publicationId))

		return await fetch(Service.toURL("9naWs5bzEzaWUxNmR2MTU1cj1vbWljaD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async saveArticle(id: string, title: string, body: string): Promise<void> {
		const $data = new FormData();
		$data.append("YycTYxbmI3Yn55dzdid39lYTAyY3d2am", Service.stringify(id))
		$data.append("doMHx0emR6cHR4aDw0eXl6NWthaHp4aG", Service.stringify(title))
		$data.append("FpbWFvNmZlMj5mNHdhbGE3dm12MWdzNn", Service.stringify(body))

		return await fetch(Service.toURL("JraWlqZDJhbmd1YnU5d3wzMHVuYj9ydX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async uploadImage(id: string, data: Blob): Promise<ArticleImageViewModel> {
		const $data = new FormData();
		$data.append("t4eGZoNHJuZzV0NXV0b2FuN3U3Ymk2NG", Service.stringify(id))
		$data.append("FnNWR0eXFuYTQ4OWl4N3NsdjoyYzdkMn", data)

		return await fetch(Service.toURL("cxa2RvMHp1aGg3ZDJiaGp1YmZqZjY1eH"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : ArticleImageViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async captionImage(id: string, caption: string): Promise<void> {
		const $data = new FormData();
		$data.append("RrOHZhY2x5OGczenZic3hrcG93dGNiMz", Service.stringify(id))
		$data.append("NhMW1ibDQ1M21iZ3Z3c3t3OWdsb2xvaW", Service.stringify(caption))

		return await fetch(Service.toURL("R6Mng4aGRzc3kxNGVyMmQxcGRtMGc3bm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async removeImage(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("duZnhpOWVwandzY3pxaXVxem9nc2VwcT", Service.stringify(id))

		return await fetch(Service.toURL("p0MHJzNGV4bTh3MG1nMWJ6bD00bHBmY2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async publish(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("loc2IzMGQxdzliYzhrZ3NwYjlrNHp4Ym", Service.stringify(id))

		return await fetch(Service.toURL("V6M2k2b2I2cD1maWM0NHV0eD45eDBxbm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class ChatService {
	async start(tag: string): Promise<string> {
		const $data = new FormData();
		$data.append("g1aGFnaGE4aGhta2RicnJxdzdqOT1sN2", Service.stringify(tag))

		return await fetch(Service.toURL("k4NXU5azV0bnB6NDVyeGl4ZWUybXM3MH"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async read(chatTag: string): Promise<Array<ChatInteractionViewModel>> {
		const $data = new FormData();
		$data.append("Rkd3VxNGFuaWMyN3RvdzJjaGlrZWRjbG", Service.stringify(chatTag))

		return await fetch(Service.toURL("g4c2I5ZjkxcWE1bGE2cjB5aWYyM2oyaG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ChatInteractionViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async send(chatTag: string, message: string): Promise<Array<ChatInteractionViewModel>> {
		const $data = new FormData();
		$data.append("prbXM3dnU2aTAyNDYxdWs5aWdtbnRsZn", Service.stringify(chatTag))
		$data.append("J2ZXFweXFuNGd1cmQ1enFsaG14NTA5c3", Service.stringify(message))

		return await fetch(Service.toURL("F5ZTIxMn00a2h0MWhuZXVlZGBvMWhieX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : ChatInteractionViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class StreetService {
	async getStreet(id: string): Promise<StreetViewModel> {
		const $data = new FormData();
		$data.append("dkY3R1cnN0eDFybWVyaWg3cXxnMWJscG", Service.stringify(id))

		return await fetch(Service.toURL("Z0Zzg2ZmYzaHl1YWVuOHdlczRtMj9rdm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : StreetViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getPeerPlots(id: string): Promise<Array<PlotBoundaryShapeModel>> {
		const $data = new FormData();
		$data.append("Ztejp0b2lkNGRxM21rczN3d2YwbTF1NW", Service.stringify(id))

		return await fetch(Service.toURL("JzamMxc2JrZjlvMjttaWF1aXVybXRiZD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PlotBoundaryShapeModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async createStreet(path: string): Promise<string> {
		const $data = new FormData();
		$data.append("Ribj40ZmZsMm1xdm10ZTdtMXR3MzZlb2", Service.stringify(path))

		return await fetch(Service.toURL("RqZ3hwc3I2a3Bhem9qZ35wYzdrcmdyYX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : `${d}`;
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async rename(id: string, name: string): Promise<void> {
		const $data = new FormData();
		$data.append("RhNGJhMnZvOG51Y2FtcnBrMWlqcWg0bz", Service.stringify(id))
		$data.append("tqNmhkZmY2ajFrYWY1NWA5bGBjd2NzcD", Service.stringify(name))

		return await fetch(Service.toURL("FycnI1bWhvOHF1bmA4eD9oZWZ4eXZzYW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async setWidth(id: string, width: number): Promise<void> {
		const $data = new FormData();
		$data.append("JzeHs0bDh0NG54cGRodm04cWN6MXViam", Service.stringify(id))
		$data.append("w5OXc3ZGhoeWZpdDF2NjN3NGl2dzR3OG", Service.stringify(width))

		return await fetch(Service.toURL("JicXZkOXJkMjU4dzFhN3NkNWpndXNocG"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async editRoute(id: string, path: string): Promise<void> {
		const $data = new FormData();
		$data.append("JpbDFwdmVjZmF4MHgyMmcwbXBoZ2J3NH", Service.stringify(id))
		$data.append("NsN302NXZ4dzJiNWd4M2EwdWNiaTd5a2", Service.stringify(path))

		return await fetch(Service.toURL("JuODM4Znd0cjhmdT4xdnpzcnBqeDcxMm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async archive(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("5jM250bjp0Z3Y0b2YzZH41aGR6bGtka3", Service.stringify(id))

		return await fetch(Service.toURL("VlbjRmY2JldGYydjdna2o0NXVzZT9jZH"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}

export class TradeService {
	async getValuation(id: string): Promise<ValuationViewModel> {
		const $data = new FormData();
		$data.append("hpOGF4ZDZiY2lhOTo3eGowM2V1dGhvbG", Service.stringify(id))

		return await fetch(Service.toURL("loMWA3dmBqbG1hNTE2MjR2ajZvNzUxM2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : ValuationViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async overwriteValuation(id: string, price: number): Promise<void> {
		const $data = new FormData();
		$data.append("d1ejZldmVzNnV2ejQzYnBnaWlkOW9ubn", Service.stringify(id))
		$data.append("NneWRjbzNpbnY5azhka382ZDgwdjd0dT", Service.stringify(price))

		return await fetch(Service.toURL("EwbDZndWloZHl2bmIzZGIwcmNpbGRzNn"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async compileAssets(id: string): Promise<Array<AssetViewModel>> {
		const $data = new FormData();
		$data.append("l6NWV2Y2FrNzo0bmI2bTduNmBic3E3aX", Service.stringify(id))

		return await fetch(Service.toURL("k0bXJoZmdpOHdpYTc4ZWUwZTozMTNhcW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : AssetViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class TrainService {
	async getRoute(code: string): Promise<TrainRouteViewModel> {
		const $data = new FormData();
		$data.append("1vbXJxM3FsajRzOHE4Y3h3azc3dXM0Ym", Service.stringify(code))

		return await fetch(Service.toURL("ZjcnJibH5xZzpjMD5tYWFxbjJzdWk5Zj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : TrainRouteViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getRoutes(): Promise<Array<TrainRouteViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("hsZXxsa2h0eG50MnVjazg1eHMyY3NiNW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : TrainRouteViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async saveRoute(route: TrainRouteViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("k4dXhnbnd3aGRhNnRsZmlwZGlvMTU5cm", Service.stringify(route))

		return await fetch(Service.toURL("U2anMzaDB2dndnNjM0Zjg1cX84c2tjYn"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async saveRoutePath(routeId: string, path: string): Promise<void> {
		const $data = new FormData();
		$data.append("RqY3M1b2NsbGdyZnZhZ2pibGl6NGRkeW", Service.stringify(routeId))
		$data.append("BnN2twZGo5ZmBmZTJpcGFwYmc3bTZ5MX", Service.stringify(path))

		return await fetch(Service.toURL("FpZHU4NWUwbTJlNGkzdGNtdjhwd2l3Zj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async setOperator(routeId: string, operatorId: string): Promise<void> {
		const $data = new FormData();
		$data.append("IxZHhlem0yOWYwOWV2MnZrYm85YmRhcX", Service.stringify(routeId))
		$data.append("E0cWN0cHRhczh1YXVycmc1MjJycXRtb2", Service.stringify(operatorId))

		return await fetch(Service.toURL("lmNThhdDtzaHxwb3FnM3poMWJkMXRlbW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async register(path: string, code: string, color: string, textColor: string, name: string): Promise<void> {
		const $data = new FormData();
		$data.append("EwanloangzanlyZWg1YTNwdzJjcWg3eT", Service.stringify(path))
		$data.append("hnMXdzZWg0NXJqdjlkaDY0cnl3d3R2NH", Service.stringify(code))
		$data.append("54ZWt0OTE1a2lmaW1ya3VsMWBmbTY1eW", Service.stringify(color))
		$data.append("ZvZnNiaWdpZmNtejpsODg0dmkwa3VkdT", Service.stringify(textColor))
		$data.append("J5c2Fob3Z0eGRxZGZmc3M4aWQ4ZGJmc2", Service.stringify(name))

		return await fetch(Service.toURL("l3Y2JsdHpocTpya3xpaDVkdDN4ZnczbT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async registerStation(id: string): Promise<PropertyTrainStationViewModel> {
		const $data = new FormData();
		$data.append("U1YWt6MjY0aW02aGhjbW9scX4wYXkxbW", Service.stringify(id))

		return await fetch(Service.toURL("FrcWg1YmdrMWZkaWZsMDI4YntmcHJwbX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PropertyTrainStationViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async addStop(routeId: string, stationId: string): Promise<void> {
		const $data = new FormData();
		$data.append("A4MXx3Z3podXVycjRqdmhuZWF1cDhpem", Service.stringify(routeId))
		$data.append("QzOTEzaGlsdTMyZ2JnZDIydnR5NjU5Y3", Service.stringify(stationId))

		return await fetch(Service.toURL("Q4ejpmY2hkeXA1bnlodHNjaTd2eX03a2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async removeStop(stopId: string): Promise<void> {
		const $data = new FormData();
		$data.append("VvMmZ4N3F6Y253dmRuMTJxMWA2cGV0cn", Service.stringify(stopId))

		return await fetch(Service.toURL("BicGs0M39ub2JqNDFndTN0cWl6ZmRxZ2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async getStations(): Promise<Array<TrainStationViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("N2YnloZWZwdGJ3M2pjZ3JidnM2eDE1d2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : TrainStationViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}

export class VoteService {
	async propse(title: string, description: string, scopeId: string): Promise<void> {
		const $data = new FormData();
		$data.append("NvNTIza3xkcng5NmJtYjEyNDdyeXY4YW", Service.stringify(title))
		$data.append("poejUyZzFjZzZzazt0ZTp3MWR2cGw4a2", Service.stringify(description))
		$data.append("ZucHVmaT11a3Y5Y3djZ2k5bWtiMTlsOG", Service.stringify(scopeId))

		return await fetch(Service.toURL("I0OWJncGF1dj1jbTozOXVkMjFxcmFua2"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async getScopes(): Promise<Array<DistrictViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("JqcXhvb2FydTNjeHE2ZWZhdWVrZjhiMm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : DistrictViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getBills(): Promise<Array<BillViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("pvbjJ4Ym91ZG00M3VrbWJqNGZnam5pdT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : BillViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getBill(tag: string): Promise<BillViewModel> {
		const $data = new FormData();
		$data.append("Fib2NuZnZkNmZtYWFrNXQ0c3YycWRvZm", Service.stringify(tag))

		return await fetch(Service.toURL("lvYzVhcjphcH5zdWR4dTd0ZWgyMmBtem"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : BillViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getTicker(id: string): Promise<Array<VoteTickerViewModel>> {
		const $data = new FormData();
		$data.append("hycXx5eXl3dTJ4dH0xYjVvemlqYjZtOH", Service.stringify(id))

		return await fetch(Service.toURL("Eyc2NzMHxxY2IyaGR6YTE4bmM5Mmwwcj"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : VoteTickerViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getImpression(id: string, pro: boolean): Promise<VoteViewModel> {
		const $data = new FormData();
		$data.append("5uYnR5djpvMWNnYTFjNDJ3d2JxNjc1Z3", Service.stringify(id))
		$data.append("E3eXV1aXhyaXd5Zz16Z2s2azJuMWkyc2", Service.stringify(pro))

		return await fetch(Service.toURL("VqbGQ2eTNiNWVxOHdhZXBwNHczZGUzcW"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : VoteViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getOpenHonestium(): Promise<OpenHonestiumViewModel> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("ZnMX5maWdxbWJyMnx5NnM0M2FoczdmYm"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : OpenHonestiumViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async saveHonestium(id: string, answer: string): Promise<void> {
		const $data = new FormData();
		$data.append("NpY3hlNzVnbjk0MW0wM3M4ZjVlaTluNn", Service.stringify(id))
		$data.append("JkbjNpOTRqbmN6dH82NTdiZW5qbXc3cX", Service.stringify(answer))

		return await fetch(Service.toURL("dzZz52YnI1Mn5nZjFscHl0Z2dqbDhhYX"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async submitHonestium(id: string): Promise<void> {
		const $data = new FormData();
		$data.append("JsMjxrNWRqNGZ4ZXViaGFxaWZwOWhncG", Service.stringify(id))

		return await fetch(Service.toURL("k0djR0dHRmbTN4ZzkxaWg5bzdjeXJqMT"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}
}