export enum CompanyType {
	company = "company",
	department = "department",
	governmentCompany = "government_company",
	guild = "guild",
	nonProfit = "non_profit"
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
	borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	type: PropertyTypeViewModel;
	bounds: string;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new PropertySummaryModel();
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.historicListingGrade === undefined || (item.historicListingGrade = raw.historicListingGrade ? HistoricListingGradeViewModel["$build"](raw.historicListingGrade) : null)
		raw.type === undefined || (item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null)
		raw.bounds === undefined || (item.bounds = raw.bounds === null ? null : `${raw.bounds}`)
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

	private static $build(raw) {
		const item = new PropertyViewModel();
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.historicListingGrade === undefined || (item.historicListingGrade = raw.historicListingGrade ? HistoricListingGradeViewModel["$build"](raw.historicListingGrade) : null)
		raw.owner === undefined || (item.owner = raw.owner ? PlayerViewModel["$build"](raw.owner) : null)
		raw.buildings === undefined || (item.buildings = raw.buildings ? raw.buildings.map(i => BuildingSummaryModel["$build"](i)) : null)
		raw.dwellings === undefined || (item.dwellings = raw.dwellings ? raw.dwellings.map(i => PropertyDwellingViewModel["$build"](i)) : null)
		raw.historicListingModifiers === undefined || (item.historicListingModifiers = raw.historicListingModifiers ? raw.historicListingModifiers.map(i => PropertyHistoricListingModifierViewModel["$build"](i)) : null)
		raw.offices === undefined || (item.offices = raw.offices ? raw.offices.map(i => OfficeViewModel["$build"](i)) : null)
		raw.plotBoundaries === undefined || (item.plotBoundaries = raw.plotBoundaries ? raw.plotBoundaries.map(i => PlotBoundarySummaryModel["$build"](i)) : null)
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
	biography: string;
	birthday: Date;
	familyName: string;
	givenName: string;
	id: string;
	tag: string;

	private static $build(raw) {
		const item = new ResidentViewModel();
		raw.mainTenancy === undefined || (item.mainTenancy = raw.mainTenancy ? TenancyViewModel["$build"](raw.mainTenancy) : null)
		raw.biography === undefined || (item.biography = raw.biography === null ? null : `${raw.biography}`)
		raw.birthday === undefined || (item.birthday = raw.birthday ? new Date(raw.birthday) : null)
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

export class ArticleViewModel {
	images: ArticleImageViewModel[];
	publication: PublicationSummaryModel;
	body: string;
	id: string;
	published: Date;
	title: string;

	private static $build(raw) {
		const item = new ArticleViewModel();
		raw.images === undefined || (item.images = raw.images ? raw.images.map(i => ArticleImageViewModel["$build"](i)) : null)
		raw.publication === undefined || (item.publication = raw.publication ? PublicationSummaryModel["$build"](raw.publication) : null)
		raw.body === undefined || (item.body = raw.body === null ? null : `${raw.body}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.published === undefined || (item.published = raw.published ? new Date(raw.published) : null)
		raw.title === undefined || (item.title = raw.title === null ? null : `${raw.title}`)
		
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

export class TrainRouteViewModel {
	stops: TrainStopViewModel[];
	color: string;
	id: string;
	name: string;
	path: string;

	private static $build(raw) {
		const item = new TrainRouteViewModel();
		raw.stops === undefined || (item.stops = raw.stops ? raw.stops.map(i => TrainStopViewModel["$build"](i)) : null)
		raw.color === undefined || (item.color = raw.color === null ? null : `${raw.color}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.path === undefined || (item.path = raw.path === null ? null : `${raw.path}`)
		
		return item;
	}
}

export class TrainStationViewModel {
	id: string;
	name: string;
	position: string;

	private static $build(raw) {
		const item = new TrainStationViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.position === undefined || (item.position = raw.position === null ? null : `${raw.position}`)
		
		return item;
	}
}

export class TrainStopViewModel {
	id: string;
	name: string;
	stationId: string;
	trackPosition: string;

	private static $build(raw) {
		const item = new TrainStopViewModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.stationId === undefined || (item.stationId = raw.stationId === null ? null : `${raw.stationId}`)
		raw.trackPosition === undefined || (item.trackPosition = raw.trackPosition === null ? null : `${raw.trackPosition}`)
		
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

export class PublicationViewModel {
	company: CompanySummaryModel;
	articles: ArticleViewModel[];
	description: string;
	id: string;
	incorporation: Date;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PublicationViewModel();
		raw.company === undefined || (item.company = raw.company ? CompanySummaryModel["$build"](raw.company) : null)
		raw.articles === undefined || (item.articles = raw.articles ? raw.articles.map(i => ArticleViewModel["$build"](i)) : null)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporation === undefined || (item.incorporation = raw.incorporation ? new Date(raw.incorporation) : null)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
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

	async saveProperty(propertyViewModel: PropertySummaryModel): Promise<void> {
		const $data = new FormData();
		$data.append("NycXNhenFjaGhvZDhsdWtlYzNtd2x4d3", Service.stringify(propertyViewModel))

		return await fetch(Service.toURL("dzb2prZ3QwYT8xZ2ZicXc5ZnN1cGFwZj"), {
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
}

export class PropertyService {
	async createDwelling(propertyId: string): Promise<PropertyDwellingViewModel> {
		const $data = new FormData();
		$data.append("p2dHJxa2BodTR6NDZodDIxYWEyejlia2", Service.stringify(propertyId))

		return await fetch(Service.toURL("l3OGBvenJyc3lvbzZleWFmbzFpZ2g5cD"), {
			method: "post",
			credentials: "include",
			body: $data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d === null ? null : PropertyDwellingViewModel["$build"](d);
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async reviewed(propertyId: string): Promise<void> {
		const $data = new FormData();
		$data.append("M4Y2lkeW12Yj4yZWVjNnI2dWM2cH5ybD", Service.stringify(propertyId))

		return await fetch(Service.toURL("9sZ3czbGMxcm00NHJpaXQya2Z1MGRkbW"), {
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

	async listNewestArticles(page: number, publication: string): Promise<Array<ArticleViewModel>> {
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

				return d.map(d => d === null ? null : ArticleViewModel["$build"](d));
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
}

export class TrainService {
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