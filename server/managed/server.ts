import { BaseServer, ViewModel, Inject } from "vlserver";

import { Borough } from "././database";
import { DbContext } from "././database";
import { PlotBoundary } from "././database";
import { Property } from "././database";
import { Proxy } from "././../proxy";
import { BoroughViewModel } from "././../areas/borough.view";
import { BridgeViewModel } from "././../areas/bridge.view";
import { HistoryEntryViewModel } from "././../areas/history.view";
import { PropertyTypeViewModel } from "././../areas/property-type.view";
import { PropertySummaryModel } from "././../areas/property.summary";
import { PropertyOverviewModel } from "././../areas/property.view";
import { PropertyViewModel } from "././../areas/property.view";
import { SquareViewModel } from "././../areas/squre.view";
import { StreetViewModel } from "././../areas/street.view";
import { WaterBodyViewModel } from "././../areas/water-body.view";
import { Point } from "././../../interface/point";
import { PropertyManager } from "././../areas/property/manager";
import { mapBaseTileSize } from "././../../interface/tile";
import { MapService } from "././../areas/map.service";
import { BoroughSummaryModel } from "././../areas/borough.summary";
import { DistrictViewModel } from "././../areas/vote/district";
import { BoroughService } from "././../areas/borough/service";
import { MapType } from "././database";
import { ChangeFrame } from "././../areas/change/frame";
import { ChangeFrameViewModel } from "././../areas/change/frame";
import { ChangeService } from "././../areas/change/index";
import { CityViewModel } from "././../areas/city/city";
import { CityService } from "././../areas/city/service";
import { Company } from "././database";
import { CompanyType } from "././database";
import { Office } from "././database";
import { OfficeCapacity } from "././database";
import { CompanySummaryModel } from "././../areas/company.view";
import { CompanyViewModel } from "././../areas/company.view";
import { OfficeViewModel } from "././../areas/company.view";
import { WorkOfferViewModel } from "././../areas/work";
import { CompanyOfficeService } from "././../areas/company-office/service";
import { EpochTimelineModel } from "././../areas/epoch/epoch";
import { EpochViewModel } from "././../areas/epoch/epoch";
import { EpochService } from "././../areas/epoch/index";
import { PlayerViewModel } from "././../areas/player.view";
import { GameService } from "././../areas/game/game.service";
import { PropertyHistoricListingModifier } from "././database";
import { HistoricListingGradeViewModel } from "././../areas/history-listing/grade.view";
import { PropertyHistoricListingModifierViewModel } from "././../areas/history-listing/link.view";
import { HistoricListingModifierViewModel } from "././../areas/history-listing/modifier.view";
import { HistoricListingService } from "././../areas/history-listing/listing.service";
import { ImpressionViewModel } from "././../areas/impressions/impression";
import { ImpressionService } from "././../areas/impressions/service";
import { LawHouseSessionSummaryModel } from "././../areas/law-house/session";
import { LawHouseSessionViewModel } from "././../areas/law-house/session";
import { LawHouseService } from "././../areas/law-house/service";
import { LegalEntityManager } from "././../areas/legal-entity/manager";
import { LegalEntityViewModel } from "././../areas/legal-entity";
import { LegalEntityReferenceCounter } from "././../areas/legal-entity/reference-counter";
import { LegalEntityService } from "././../areas/legal-entity/service";
import { Life } from "././../life";
import { ResidentEventViewModel } from "././../areas/life/resident";
import { ResidentRelationViewModel } from "././../areas/life/resident";
import { ResidentSummaryModel } from "././../areas/life/resident";
import { ResidentViewModel } from "././../areas/life/resident";
import { ResidentEventView } from "././database";
import { ResidentTickerModel } from "././../areas/life/ticker";
import { NameFrequency } from "././../areas/life/name-frequency";
import { NameFrequencyViewModel } from "././../areas/life/name-frequency";
import { LifeService } from "././../areas/life/service";
import { MetricTracker } from "././../areas/metrics/tracker";
import { MetricValueViewModel } from "././../areas/metrics/view";
import { MetricViewModel } from "././../areas/metrics/view";
import { MetricService } from "././../areas/metrics/service";
import { Oracle } from "././../areas/oracle/generator";
import { Interpreter } from "././../life/interpreter";
import { SystemMessage } from "././../life/interpreter";
import { Language } from "././../life/language";
import { OracleProposalViewModel } from "././../areas/oracle/proposal";
import { OracleService } from "././../areas/oracle/index";
import { Plan } from "././database";
import { PlanShape } from "././database";
import { PlanViewModel } from "././../areas/plan/plan";
import { PlanService } from "././../areas/plan/index";
import { Building } from "././database";
import { Dwelling } from "././database";
import { PropertyOwner } from "././database";
import { Valuation } from "././database";
import { DwellingViewModel } from "././../areas/life/resident";
import { PropertyDwellingViewModel } from "././../areas/property.view";
import { PropertyOwnerViewModel } from "././../areas/property.view";
import { BuildingSummaryModel } from "././../areas/property/building";
import { PlotBoundarySummaryModel } from "././../areas/property/plot";
import { Shape } from "././../../interface/shape";
import { TradeManager } from "././../areas/trade/manager";
import { PropertyValueator } from "././../areas/trade/valuation/property";
import { PropertyService } from "././../areas/property/service";
import { Article } from "././database";
import { ArticleImage } from "././database";
import { Publication } from "././database";
import { ArticleImageViewModel } from "././../areas/publication/article";
import { ArticleNewstickerModel } from "././../areas/publication/article";
import { ArticlePreviewModel } from "././../areas/publication/article";
import { ArticleViewModel } from "././../areas/publication/article";
import { PublicationViewModel } from "././../areas/publication/publication";
import { Annotator } from "././../annotate";
import { PublicationService } from "././../areas/publication/service";
import { ChatManager } from "././../areas/resident/chat/manager";
import { ChatInteractionViewModel } from "././../areas/resident/chat/interaction";
import { ChatService } from "././../areas/resident/chat/service";
import { Street } from "././database";
import { StreetRoute } from "././database";
import { PlotBoundaryShapeModel } from "././../areas/property/plot";
import { StreetService } from "././../areas/street/service";
import { ValuationViewModel } from "././../areas/trade/valuation.view";
import { AssetViewModel } from "././../areas/trade/asset";
import { TradeService } from "././../areas/trade/service";
import { TrainRoute } from "././database";
import { TrainRoutePath } from "././database";
import { TrainStation } from "././database";
import { TrainStop } from "././database";
import { TrainRouteViewModel } from "././../areas/train/route.view";
import { TrainStationViewModel } from "././../areas/train/station.view";
import { TrainService } from "././../areas/train/train.service";
import { Bill } from "././database";
import { OpenHonestiumViewModel } from "././../areas/vote/honestium";
import { BillViewModel } from "././../areas/vote/bill";
import { VoteTickerViewModel } from "././../areas/vote/vote";
import { VoteViewModel } from "././../areas/vote/vote";
import { VoteService } from "././../areas/vote/service";
import { OfficeSummaryModel } from "./../areas/company.view";
import { OfficeCapacityViewModel } from "./../areas/company.view";
import { TenantViewModel } from "./../areas/property.view";
import { StreetRouteSummaryModel } from "./../areas/street.view";
import { WorkOfferSummaryModel } from "./../areas/work";
import { WorkContractSummaryModel } from "./../areas/work";
import { LawHouseSessionaryViewModel } from "./../areas/law-house/session";
import { LawHouseSessionProtocolViewModel } from "./../areas/law-house/session";
import { TenancyViewModel } from "./../areas/life/resident";
import { OracleProposalSummaryModel } from "./../areas/oracle/proposal";
import { PlanSummaryModel } from "./../areas/plan/plan";
import { PlanShapeViewModel } from "./../areas/plan/plan";
import { BuildingShapeModel } from "./../areas/property/building";
import { ArticleOpinionViewModel } from "./../areas/publication/article";
import { PublicationSummaryModel } from "./../areas/publication/publication";
import { ValuationSummaryModel } from "./../areas/trade/valuation.view";
import { TrainStationExitViewModel } from "./../areas/train/exit.view";
import { TrainRouteSummaryModel } from "./../areas/train/route.view";
import { TrainRoutePathViewModel } from "./../areas/train/route.view";
import { PropertyTrainStationViewModel } from "./../areas/train/station.view";
import { TrainStopViewModel } from "./../areas/train/stop.view";
import { StationTrainStopViewModel } from "./../areas/train/stop.view";
import { HonestiumViewModel } from "./../areas/vote/bill";
import { OfficeEmployeeModel } from "./../areas/company.view";
import { WorkOfferEmplymentModel } from "./../areas/work";
import { WorkContractViewModel } from "./../areas/work";
import { WorkContractEmploymentModel } from "./../areas/work";
import { Bridge } from "./../managed/database";
import { HistoryEntry } from "./../history";
import { Player } from "./../managed/database";
import { PropertyType } from "./../managed/database";
import { Tenancy } from "./../managed/database";
import { Square } from "./../managed/database";
import { WaterBody } from "./../managed/database";
import { WorkOffer } from "./../managed/database";
import { WorkContract } from "./../managed/database";
import { City } from "./../managed/database";
import { Epoch } from "./../managed/database";
import { HistoricListingGrade } from "./../managed/database";
import { HistoricListingModifier } from "./../managed/database";
import { Impression } from "./../managed/database";
import { LawHouseSession } from "./../managed/database";
import { LawHouseSessionary } from "./../managed/database";
import { LawHouseSessionProtocol } from "./../managed/database";
import { LegalEntity } from "./../managed/database";
import { Resident } from "./../managed/database";
import { ResidentRelationship } from "./../managed/database";
import { Metric } from "./../managed/database";
import { MetricValue } from "./../managed/database";
import { OracleProposal } from "./../managed/database";
import { ArticleOpinion } from "./../managed/database";
import { ChatInteraction } from "./../managed/database";
import { Asset } from "./../areas/trade/asset";
import { TrainStationExit } from "./../managed/database";
import { BillHonestium } from "./../managed/database";
import { District } from "./../managed/database";
import { Vote } from "./../managed/database";

Inject.mappings = {
	"MapService": {
		objectConstructor: MapService,
		parameters: ["DbContext","PropertyManager"]
	},
	"DbContext": {
		objectConstructor: DbContext,
		parameters: ["RunContext"]
	},
	"PropertyManager": {
		objectConstructor: PropertyManager,
		parameters: ["DbContext"]
	},
	"BoroughService": {
		objectConstructor: BoroughService,
		parameters: ["DbContext"]
	},
	"ChangeService": {
		objectConstructor: ChangeService,
		parameters: ["DbContext"]
	},
	"CityService": {
		objectConstructor: CityService,
		parameters: ["DbContext"]
	},
	"CompanyOfficeService": {
		objectConstructor: CompanyOfficeService,
		parameters: ["DbContext"]
	},
	"EpochService": {
		objectConstructor: EpochService,
		parameters: ["DbContext"]
	},
	"GameService": {
		objectConstructor: GameService,
		parameters: ["DbContext"]
	},
	"HistoricListingService": {
		objectConstructor: HistoricListingService,
		parameters: ["DbContext"]
	},
	"ImpressionService": {
		objectConstructor: ImpressionService,
		parameters: ["DbContext"]
	},
	"LawHouseService": {
		objectConstructor: LawHouseService,
		parameters: ["DbContext"]
	},
	"LegalEntityService": {
		objectConstructor: LegalEntityService,
		parameters: ["LegalEntityManager"]
	},
	"LegalEntityManager": {
		objectConstructor: LegalEntityManager,
		parameters: ["DbContext"]
	},
	"LifeService": {
		objectConstructor: LifeService,
		parameters: ["DbContext"]
	},
	"MetricService": {
		objectConstructor: MetricService,
		parameters: ["DbContext"]
	},
	"OracleService": {
		objectConstructor: OracleService,
		parameters: ["DbContext","LegalEntityManager"]
	},
	"PlanService": {
		objectConstructor: PlanService,
		parameters: ["DbContext"]
	},
	"PropertyService": {
		objectConstructor: PropertyService,
		parameters: ["DbContext","PropertyManager","TradeManager","LegalEntityManager"]
	},
	"TradeManager": {
		objectConstructor: TradeManager,
		parameters: ["DbContext"]
	},
	"PublicationService": {
		objectConstructor: PublicationService,
		parameters: ["DbContext"]
	},
	"ChatService": {
		objectConstructor: ChatService,
		parameters: ["ChatManager"]
	},
	"ChatManager": {
		objectConstructor: ChatManager,
		parameters: ["DbContext","Life"]
	},
	"StreetService": {
		objectConstructor: StreetService,
		parameters: ["DbContext"]
	},
	"TradeService": {
		objectConstructor: TradeService,
		parameters: ["DbContext","TradeManager"]
	},
	"TrainService": {
		objectConstructor: TrainService,
		parameters: ["DbContext"]
	},
	"VoteService": {
		objectConstructor: VoteService,
		parameters: ["DbContext"]
	}
};

export class ManagedServer extends BaseServer {
	prepareRoutes() {
		this.expose(
			"BkMD4zdnRzMTk1N3N0M3hsc3E3MHFwNz",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.reviewNext(
				
			)
		);

		this.expose(
			"R2M2Z2Yjx4aGM4MzR1ZzcxdjI5Zzprbm",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getBoroughs(
				
			)
		);

		this.expose(
			"h1cnYwOHM0amNneXFtbHQ2M3NvYTU1am",
			{
			"IxYWZhMjR6Y3cwM2Q1cGRpb3A4YzFqaW": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.getProperties(
				params["IxYWZhMjR6Y3cwM2Q1cGRpb3A4YzFqaW"]
			)
		);

		this.expose(
			"k1M2B2amlvbmR4OGRvcnJ2Zn55OGcybG",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getStreets(
				
			)
		);

		this.expose(
			"hpejphODJldWo2b2NxaWVxdzx3c2V3bm",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getSquares(
				
			)
		);

		this.expose(
			"luMjgwbmc0MDFmNGEzZDNkbDcxOH04NG",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getWaterBodies(
				
			)
		);

		this.expose(
			"k3M2I0czloYWQzZT93N3pzemFzaGRiaW",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getBridges(
				
			)
		);

		this.expose(
			"YzdX1xaXlicD5la2kycXdvZ3dyYm03bz",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getLastChangeLocation(
				
			)
		);

		this.expose(
			"oyOTdvb2V4aXw3eHhsNXdyZnp4aGk1bD",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getHistory(
				
			)
		);

		this.expose(
			"MwNT15bTI5ZDNubmZ5dW96Nj9qeGVwd3",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getTubes(
				
			)
		);

		this.expose(
			"U2eWZwcW41MGJxZGVndzdjNnhmZXFhMT",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getPropertyTypes(
				
			)
		);

		this.expose(
			"d1NTdqcWBiMWE5ZHg3ZndyM2UzNnMwNm",
			{
			"VjYnVwc3k5aToyb3FtcDN4c3pnM2RlMW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.getProperty(
				params["VjYnVwc3k5aToyb3FtcDN4c3pnM2RlMW"]
			)
		);

		this.expose(
			"tzNGZjM2B3Z3Z5dGp2bWRoY2VqcWF3YW",
			{
			"B2aHdob3JiN2VpcXc2Y2NnbnhyMXI1b3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createProperty(
				params["B2aHdob3JiN2VpcXc2Y2NnbnhyMXI1b3"]
			)
		);

		this.expose(
			"J2c3hyNDQwNTdjeDs4c3htbWh2MWVnaG",
			{
			"Mya2ltZGltbjcyeHdjdGcydGVpZDgyNT": { type: BoroughViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createBorough(
				params["Mya2ltZGltbjcyeHdjdGcydGVpZDgyNT"]
			)
		);

		this.expose(
			"VsbndnaTI4bTllbnh0endpaHdkM3w1MD",
			{
			"YwNnJhZnZycjNzNGU3emQ0Y2RtNnhmZG": { type: StreetViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createStreet(
				params["YwNnJhZnZycjNzNGU3emQ0Y2RtNnhmZG"]
			)
		);

		this.expose(
			"RhZGo0ejpmdnJhZ3lla3I4bzB2M2F5cn",
			{
			"FwZXk2OGVmcWRxeHdiZW9ucjhxcGE5cG": { type: SquareViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createSquare(
				params["FwZXk2OGVmcWRxeHdiZW9ucjhxcGE5cG"]
			)
		);

		this.expose(
			"A1bX53enB1cHV0cmQzNTYxdDgzaH10an",
			{
			"hnMjgxamVveGk2czR6YjQ2aHdxaGJsaG": { type: WaterBodyViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createWaterBody(
				params["hnMjgxamVveGk2czR6YjQ2aHdxaGJsaG"]
			)
		);

		this.expose(
			"F5djUwdW03bmAxcTlneDxoYXZiemU3Ym",
			{
			"pvYjBwMX5xNGhpb2FwYWRpeWJ6OHFteT": { type: PropertyViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.saveProperty(
				params["pvYjBwMX5xNGhpb2FwYWRpeWJ6OHFteT"]
			)
		);

		this.expose(
			"dta2hmZGV4dHdhZnJ4YzVnZWp2djV2Y2",
			{
			"E0M2J3Ymt5cDY5ZWJnMHU1ZHo2YzUyc2": { type: PropertyViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.archiveProperty(
				params["E0M2J3Ymt5cDY5ZWJnMHU1ZHo2YzUyc2"]
			)
		);

		this.expose(
			"ZsMjFkanx6MGp3OHl0Z2hmcGdnMXQ1cj",
			{
			"M5endlbjBxeGJtZHIwdzBudX12c3lrdG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.get(
				params["M5endlbjBxeGJtZHIwdzBudX12c3lrdG"]
			)
		);

		this.expose(
			"pwcTdkZWRzZnswcWY4cjgzZGR4b2NpN2",
			{
			"lqaTR5bWd5aXl1bXlvbmN3ZjIxNGQwMn": { type: "string", isArray: false, isOptional: false },
				"BsZmUxZ3lvdmhpbGtleHgxN3FkMGFrcj": { type: "string", isArray: false, isOptional: false },
				"h2cTNqeWQ2NWY5ZHI5NWxsMzB6ZXR0em": { type: "string", isArray: false, isOptional: false },
				"0xOTYybDBpMDgzaHgxbWJ2ZjR6bzIyYW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.register(
				params["lqaTR5bWd5aXl1bXlvbmN3ZjIxNGQwMn"],
				params["BsZmUxZ3lvdmhpbGtleHgxN3FkMGFrcj"],
				params["h2cTNqeWQ2NWY5ZHI5NWxsMzB6ZXR0em"],
				params["0xOTYybDBpMDgzaHgxbWJ2ZjR6bzIyYW"]
			)
		);

		this.expose(
			"J4amhucmNzdWdkM3gybmlvZjV4NnFodX",
			{},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.list(
				
			)
		);

		this.expose(
			"hxczcwaDlrb2Jmc3k4MHRzOTc5cGY4dT",
			{},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.listDistricts(
				
			)
		);

		this.expose(
			"F0c3JlYTJ0bmlmOH9ndmc1bzdncWp3bz",
			{
			"ppbnl3ZnRkZ2Y5ZzN6MzBveXQ0NnA2Yn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.residentCount(
				params["ppbnl3ZnRkZ2Y5ZzN6MzBveXQ0NnA2Yn"]
			)
		);

		this.expose(
			"g2cTFyMzs4dGFlc28zNDFhcmEwM2RwNX",
			{
			"ZwOGlmdXxqZGwwcGZnMmFwZGNjMGhscD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.officeCount(
				params["ZwOGlmdXxqZGwwcGZnMmFwZGNjMGhscD"]
			)
		);

		this.expose(
			"ZhY2Jia2JwZnQweWl0cTNoN2hzajJscW",
			{
			"hoY3FwZXBtcnJvcDRsNmdlY2c3N2x6ZD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.propertyCount(
				params["hoY3FwZXBtcnJvcDRsNmdlY2c3N2x6ZD"]
			)
		);

		this.expose(
			"Y5d2dmMjM4MHNyNng4bXJya3BjdTZjbm",
			{
			"JyMHZwbWcyNDBiZWE0anE3N21xeXRkNT": { type: "number", isArray: false, isOptional: false },
				"ZpNXF0Zmh4Yn1sYz00bDhkdXRzZHY0ZW": { type: "number", isArray: false, isOptional: false },
				"VydzRiNXZoNjdhb3luM3RjcmQwOXc5az": { type: "number", isArray: false, isOptional: false },
				"1lcWRjbGY3aXB6OXh6cGFlbmc2bzd6eT": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(ChangeService),
			(controller, params) => controller.getChanges(
				params["JyMHZwbWcyNDBiZWE0anE3N21xeXRkNT"],
				params["ZpNXF0Zmh4Yn1sYz00bDhkdXRzZHY0ZW"],
				params["VydzRiNXZoNjdhb3luM3RjcmQwOXc5az"],
				params["1lcWRjbGY3aXB6OXh6cGFlbmc2bzd6eT"]
			)
		);

		this.expose(
			"JtamdiOHlyZH9lNmlhcz8zZXpiMmd3Ym",
			{},
			inject => inject.construct(CityService),
			(controller, params) => controller.getCities(
				
			)
		);

		this.expose(
			"hpNW0waHBsMDdnNGdkZmVhMHhuaTJlb3",
			{
			"FodnMycHpnOHlsbmVqbzdwa2BsbHl3M3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyOfficeService),
			(controller, params) => controller.find(
				params["FodnMycHpnOHlsbmVqbzdwa2BsbHl3M3"]
			)
		);

		this.expose(
			"Y4ZDhseWFuYXZib3g2cjgycjQ4aD91Nz",
			{
			"lpOWp4Z3Rzenc1YWdzejttZGZmcnI5Zz": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyOfficeService),
			(controller, params) => controller.getOffice(
				params["lpOWp4Z3Rzenc1YWdzejttZGZmcnI5Zz"]
			)
		);

		this.expose(
			"VyOGRxMXZndXV6Mj1vN2lqZ2U2dGllMz",
			{
			"M1dmQ1MWM4dDFqOTVjYTVzd2ZzcXhvbX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyOfficeService),
			(controller, params) => controller.getWorkOffer(
				params["M1dmQ1MWM4dDFqOTVjYTVzd2ZzcXhvbX"]
			)
		);

		this.expose(
			"Eydzl2b3hvZWY2OTNzb3g4bmYzMjNsZ3",
			{},
			inject => inject.construct(CompanyOfficeService),
			(controller, params) => controller.getCompanies(
				
			)
		);

		this.expose(
			"NnM21sNXg2b3dxeXtoN2l4bTNubGcxN2",
			{
			"RsdmF1OWVzeXo5MnllMmhmczlocDp1cX": { type: "string", isArray: false, isOptional: false },
				"JiZWBkZnAwZ2ljZHE0YmZmYnlpeW9xcT": { type: "string", isArray: false, isOptional: false },
				"RzdmQ4NT8xem1rbWJueXIxcWR0OX5yc2": { type: "string", isArray: false, isOptional: false },
				"s1bGF2azVqaWBwazhwZmI1Z2E2Z3Jjcz": { type: "string", isArray: false, isOptional: false },
				"oxa3VqZjprbmJtcmlrdjAzNTswYmhmdm": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyOfficeService),
			(controller, params) => controller.register(
				params["RsdmF1OWVzeXo5MnllMmhmczlocDp1cX"],
				params["JiZWBkZnAwZ2ljZHE0YmZmYnlpeW9xcT"],
				params["RzdmQ4NT8xem1rbWJueXIxcWR0OX5yc2"],
				params["s1bGF2azVqaWBwazhwZmI1Z2E2Z3Jjcz"],
				params["oxa3VqZjprbmJtcmlrdjAzNTswYmhmdm"]
			)
		);

		this.expose(
			"tqa350NGZlOHptNTZna2lnc2FoazpxaW",
			{
			"ZyNGVpZWlsNWB2eWBjb3VqNHt2aGl4dD": { type: "string", isArray: false, isOptional: false },
				"l3YzB6dWcycDFoeWFseWdha2RhMzptcT": { type: "string", isArray: false, isOptional: false },
				"dodHJhcWgxYzd4eDF4ejNva2d6Mzl3OX": { type: "string", isArray: false, isOptional: false },
				"kxZTQ1eDJuMGM4NWh6ZH1vMzM3NjZpM2": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(CompanyOfficeService),
			(controller, params) => controller.registerOffice(
				params["ZyNGVpZWlsNWB2eWBjb3VqNHt2aGl4dD"],
				params["l3YzB6dWcycDFoeWFseWdha2RhMzptcT"],
				params["dodHJhcWgxYzd4eDF4ejNva2d6Mzl3OX"],
				params["kxZTQ1eDJuMGM4NWh6ZH1vMzM3NjZpM2"]
			)
		);

		this.expose(
			"ZocWgzc2BueXhqbGVtZTYyc2E3b3Zwem",
			{},
			inject => inject.construct(EpochService),
			(controller, params) => controller.timeline(
				
			)
		);

		this.expose(
			"NtYmVpcjM3eWZ4OWczaHVsMWVpbmN0cW",
			{},
			inject => inject.construct(EpochService),
			(controller, params) => controller.getEpochs(
				
			)
		);

		this.expose(
			"pkYWNsZmA2MWVzdXhmYXF0ODVscjV0ZW",
			{},
			inject => inject.construct(GameService),
			(controller, params) => controller.getPlayers(
				
			)
		);

		this.expose(
			"FxanB4eTFwbHRmYTFxaGw4dWA5Z2wzYj",
			{},
			inject => inject.construct(GameService),
			(controller, params) => controller.getOnlinePlayers(
				
			)
		);

		this.expose(
			"pzazpkdHZiZTFlcHVqYTZhZ2puM2kyZ2",
			{},
			inject => inject.construct(HistoricListingService),
			(controller, params) => controller.getGrades(
				
			)
		);

		this.expose(
			"h5dHl6dTNxOHtnbGZ6YWNsYzdlYWBxNX",
			{},
			inject => inject.construct(HistoricListingService),
			(controller, params) => controller.getModifiers(
				
			)
		);

		this.expose(
			"YzcjNuOWlqM3VzYWJpdT5lN39xYmZzNz",
			{
			"QzZTg0Y3Jza2VxY3E5azlvdzVoaDkyMj": { type: PropertyViewModel, isArray: false, isOptional: false },
				"Y5aHJ4b2UwZ2pkZ3R1N285MDkxZnV2c3": { type: HistoricListingGradeViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(HistoricListingService),
			(controller, params) => controller.addListing(
				params["QzZTg0Y3Jza2VxY3E5azlvdzVoaDkyMj"],
				params["Y5aHJ4b2UwZ2pkZ3R1N285MDkxZnV2c3"]
			)
		);

		this.expose(
			"hmc3RueXJneWJ1MnB1Zzd3cmx5aWZsc2",
			{
			"FyMXVia29sNjN3ZG1naT1teHZzdWN0ej": { type: "string", isArray: false, isOptional: false },
				"M2MTNoNWFqbWAybGxrb3M0Z2U0azF4cG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(HistoricListingService),
			(controller, params) => controller.addModifier(
				params["FyMXVia29sNjN3ZG1naT1teHZzdWN0ej"],
				params["M2MTNoNWFqbWAybGxrb3M0Z2U0azF4cG"]
			)
		);

		this.expose(
			"IwaWRoOGpwcTdjb3NxeWpxaWtwZTY3M3",
			{
			"kzaWBqZmJtMjV6bTRjaDNoMWQ2Z2dxZn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(HistoricListingService),
			(controller, params) => controller.removeModifier(
				params["kzaWBqZmJtMjV6bTRjaDNoMWQ2Z2dxZn"]
			)
		);

		this.expose(
			"FpMHF2ZmRrN215Y2xuMmU0cmgza2hscT",
			{},
			inject => inject.construct(ImpressionService),
			(controller, params) => controller.list(
				
			)
		);

		this.expose(
			"FhNmk4YT9mdGlwem83b2U2MW04NWdudW",
			{},
			inject => inject.construct(LawHouseService),
			(controller, params) => controller.getSessions(
				
			)
		);

		this.expose(
			"FjemcwbHIxaTVub2c1aDozOTNmeDduYz",
			{
			"BoeXUxZGZka3ZvMGI1ZX1yZThzdmZ0NX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LawHouseService),
			(controller, params) => controller.getSession(
				params["BoeXUxZGZka3ZvMGI1ZX1yZThzdmZ0NX"]
			)
		);

		this.expose(
			"NjbGJtbzE1cmRqdmdmaTR4cnhlZXN1Mz",
			{
			"JocWczYmk0MHJtYWNvcHN1ZjJ0bGZoeT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LegalEntityService),
			(controller, params) => controller.find(
				params["JocWczYmk0MHJtYWNvcHN1ZjJ0bGZoeT"]
			)
		);

		this.expose(
			"Q3dTc1ODxpNGRreWlxemV2Mj5qcHZ4Mm",
			{
			"Z2enBhaH54eDQ5NHxrZGM2ZWpkMWozcD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LegalEntityService),
			(controller, params) => controller.findById(
				params["Z2enBhaH54eDQ5NHxrZGM2ZWpkMWozcD"]
			)
		);

		this.expose(
			"lvYjBpYWJzd2Joajozd3VkazdhZjBobz",
			{},
			inject => inject.construct(LegalEntityService),
			(controller, params) => controller.listFeatured(
				
			)
		);

		this.expose(
			"htaGJyZ2pqM3hzM2NxMzl4aDJ3c2Nsbz",
			{},
			inject => inject.construct(LifeService),
			(controller, params) => controller.ticker(
				
			)
		);

		this.expose(
			"B6eWMwaDNkZ3NvOWNjdnRmdHx6anJrOD",
			{
			"g5bmNiODV3dmF5N2JmY3JjY2dvZ3ZveD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LifeService),
			(controller, params) => controller.getResident(
				params["g5bmNiODV3dmF5N2JmY3JjY2dvZ3ZveD"]
			)
		);

		this.expose(
			"FyYXcxZ2hocDg2dmUxeX1vN25jZGU1YT",
			{
			"5pOHt2NGU2ZzJxenFrcDQwZHlsOWQ2bG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LifeService),
			(controller, params) => controller.getEventHistory(
				params["5pOHt2NGU2ZzJxenFrcDQwZHlsOWQ2bG"]
			)
		);

		this.expose(
			"huZ2F0ODhpb2VuajhyZ31oMmFrY2Y0b3",
			{
			"IxaD93ajg4aWx5eWBwc3ZkOHVlejU2Zm": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LifeService),
			(controller, params) => controller.getRelations(
				params["IxaD93ajg4aWx5eWBwc3ZkOHVlejU2Zm"]
			)
		);

		this.expose(
			"huMGxqZmMyZD16eHtmaXIxOTo0aTVqeT",
			{
			"J1aTRnbHQ4YmMxdWQwZzUycDlheHMydX": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(LifeService),
			(controller, params) => controller.listResidents(
				params["J1aTRnbHQ4YmMxdWQwZzUycDlheHMydX"]
			)
		);

		this.expose(
			"c3bHdmNmN1bGNyd28yMXF1b2M1YmdyNX",
			{
			"c2cWYybjR0ZjdramJraXF2d2N0MnZmNX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(LifeService),
			(controller, params) => controller.search(
				params["c2cWYybjR0ZjdramJraXF2d2N0MnZmNX"]
			)
		);

		this.expose(
			"kwd2V1ZzBubGRrbndoc2B5djU4OGNtbj",
			{},
			inject => inject.construct(LifeService),
			(controller, params) => controller.listGivenNameFrequencies(
				
			)
		);

		this.expose(
			"N4YmRoODs3MWk5dmI1NWpiNTc1Z2I4MD",
			{},
			inject => inject.construct(LifeService),
			(controller, params) => controller.listFamilyNameFrequencies(
				
			)
		);

		this.expose(
			"JobTc2MmQwODI1YWFhbndodHVlZ2VtMX",
			{},
			inject => inject.construct(MetricService),
			(controller, params) => controller.list(
				
			)
		);

		this.expose(
			"V4d2kxM3N6aHtqNHc3YTkydGlmaGBtaj",
			{
			"NvNjYzd3V0MDV4ZWlxaHQ5YndjZHl2cG": { type: "string", isArray: false, isOptional: false },
				"ZoNHI0aD8zbTl2bmAyY3c2ZTU5aWBibj": { type: "date", isArray: false, isOptional: false }
			},
			inject => inject.construct(MetricService),
			(controller, params) => controller.plot(
				params["NvNjYzd3V0MDV4ZWlxaHQ5YndjZHl2cG"],
				params["ZoNHI0aD8zbTl2bmAyY3c2ZTU5aWBibj"]
			)
		);

		this.expose(
			"JseDtianR6Z3dkZ2RpNnFrcWdjeTFieX",
			{},
			inject => inject.construct(OracleService),
			(controller, params) => controller.nextProposal(
				
			)
		);

		this.expose(
			"c1M3BrenZva2ZjaXBjcGZrYj5uMTZ2bm",
			{
			"JiMXRuNDI4MzI2ZGFpdXN1amZ5eDBwYW": { type: "string", isArray: false, isOptional: false },
				"Zqb3A0bWU0c3c4d3didTY1ZW45dmd6aW": { type: "boolean", isArray: false, isOptional: false }
			},
			inject => inject.construct(OracleService),
			(controller, params) => controller.review(
				params["JiMXRuNDI4MzI2ZGFpdXN1amZ5eDBwYW"],
				params["Zqb3A0bWU0c3c4d3didTY1ZW45dmd6aW"]
			)
		);

		this.expose(
			"F6bzczaH5iZGNqNWtsNDltaGtla245NG",
			{
			"kzOWdxdWF6ZWRjZmB1cWQ1NTg2ank0Yn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(OracleService),
			(controller, params) => controller.discardArticle(
				params["kzOWdxdWF6ZWRjZmB1cWQ1NTg2ank0Yn"]
			)
		);

		this.expose(
			"M4N2ZjaWNsdWByOHxidTdpOTlib3loOG",
			{
			"N4NzU2OXtwMjhmOWZ6cHgwaXdpbjU1NT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(OracleService),
			(controller, params) => controller.about(
				params["N4NzU2OXtwMjhmOWZ6cHgwaXdpbjU1NT"]
			)
		);

		this.expose(
			"Q3bXdrZmpqaThtZ2ZvcGkxZ21qN3p1a2",
			{},
			inject => inject.construct(PlanService),
			(controller, params) => controller.list(
				
			)
		);

		this.expose(
			"I3dGZwNmE3NHV5MXg4ZGZmd2dvbmxncj",
			{
			"w5c2gweHR6cWM4NDZ4c3gwNGN1amVpcD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.getPlan(
				params["w5c2gweHR6cWM4NDZ4c3gwNGN1amVpcD"]
			)
		);

		this.expose(
			"d4MmlrOHM3c3QwMHR0N3dnZHI5em01aG",
			{
			"NpND85dGFtY3F1NnMxaH5kbHB0N3ZuM2": { type: "string", isArray: false, isOptional: false },
				"dpcTIwdnk3a2Fid3kweHU3dWVjMmR2bH": { type: "string", isArray: false, isOptional: false },
				"dyOTJoeXM4andscmhzMnNoYXN2dmE5Nz": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.create(
				params["NpND85dGFtY3F1NnMxaH5kbHB0N3ZuM2"],
				params["dpcTIwdnk3a2Fid3kweHU3dWVjMmR2bH"],
				params["dyOTJoeXM4andscmhzMnNoYXN2dmE5Nz"]
			)
		);

		this.expose(
			"Jrajx1bjg5ejQ4dWR2bGlucmAwNXYxc2",
			{
			"42bzJud35ycmFoNTNnZH8yYnNkMHV1dD": { type: "string", isArray: false, isOptional: false },
				"F6aWA4OGI1bDlldng0MXZwdD03a3NucG": { type: "string", isArray: false, isOptional: false },
				"RlYXFxMjkwOWBqczdqbjk3cngzcThsdD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.save(
				params["42bzJud35ycmFoNTNnZH8yYnNkMHV1dD"],
				params["F6aWA4OGI1bDlldng0MXZwdD03a3NucG"],
				params["RlYXFxMjkwOWBqczdqbjk3cngzcThsdD"]
			)
		);

		this.expose(
			"Bqb2dpaHVvNDZvNzpvOHUxOTFib25xZ2",
			{
			"9qN2BnenYzcGFlbmI0eHZscndlZ3pjdX": { type: "string", isArray: false, isOptional: false },
				"hhNjQ2ZWZ5ejZ0cHljd2NydnR2bmdhNG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.setAuthor(
				params["9qN2BnenYzcGFlbmI0eHZscndlZ3pjdX"],
				params["hhNjQ2ZWZ5ejZ0cHljd2NydnR2bmdhNG"]
			)
		);

		this.expose(
			"w5YWlzbGg1cmp1cXd0MGwzaHV0OTF3N3",
			{
			"Z6aGZxMXJxMXxqZmRzM2AzOWZxbjZ6dG": { type: "string", isArray: false, isOptional: false },
				"h1NHhleTFvOWNsYzN2OX5keHFlcjUzY3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.addShape(
				params["Z6aGZxMXJxMXxqZmRzM2AzOWZxbjZ6dG"],
				params["h1NHhleTFvOWNsYzN2OX5keHFlcjUzY3"]
			)
		);

		this.expose(
			"Jka3kxbW53NG1uej13OW9iZ3hrM35hNG",
			{
			"FpOXI1dXxrYWhjc3J0cX03MThpbX9kb2": { type: "string", isArray: false, isOptional: false },
				"1scTgxdTZhZTo3MWkyYWFqZT5meDtodW": { type: "string", isArray: false, isOptional: false },
				"Jsd2RrcHJxZTQwOWhrZGN1bmNubTQ5c3": { type: "string", isArray: false, isOptional: false },
				"lqdWh1YnRkbTt5NzVwMWlvcHFvNGJyY2": { type: "string", isArray: false, isOptional: false },
				"FmNDJxa3N0M2JxYWloenlpbmdmZ2k3OD": { type: "boolean", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.saveShape(
				params["FpOXI1dXxrYWhjc3J0cX03MThpbX9kb2"],
				params["1scTgxdTZhZTo3MWkyYWFqZT5meDtodW"],
				params["Jsd2RrcHJxZTQwOWhrZGN1bmNubTQ5c3"],
				params["lqdWh1YnRkbTt5NzVwMWlvcHFvNGJyY2"],
				params["FmNDJxa3N0M2JxYWloenlpbmdmZ2k3OD"]
			)
		);

		this.expose(
			"J0YWB2bWxvYWM0dmNrb2lzd3l5eHc0OX",
			{
			"x2bzozdmBnaTZ5ND8wcn1vbnVidn9ob3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.archiveShape(
				params["x2bzozdmBnaTZ5ND8wcn1vbnVidn9ob3"]
			)
		);

		this.expose(
			"p0NzVieGxuN28zOGFkentucjs1Z3g1en",
			{
			"hrcXEydXZ4dzs4ZjkxMDZiZDlwYnRjZn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PlanService),
			(controller, params) => controller.unarchiveShape(
				params["hrcXEydXZ4dzs4ZjkxMDZiZDlwYnRjZn"]
			)
		);

		this.expose(
			"55OHRoMmdoY2Q3c2Rzb3JvZGF3NWRkMG",
			{
			"9ndGVpMzF2eXQ3OWNlOGtpeHRiMml1N3": { type: "string", isArray: false, isOptional: false },
				"l5Z3JiZ2J2MTN2dDdxMnEzZ2F5c3BjZm": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.createDwellings(
				params["9ndGVpMzF2eXQ3OWNlOGtpeHRiMml1N3"],
				params["l5Z3JiZ2J2MTN2dDdxMnEzZ2F5c3BjZm"]
			)
		);

		this.expose(
			"Y2YWVmY2lsZDZ5amIxMGRubHl5bT5rcD",
			{
			"YyZXJidGMzOGBieWEwMTJweDVnaGc1bD": { type: "string", isArray: false, isOptional: false },
				"NxNDIwaWU4aXRya3V0aXJxdXVkbGkzNW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.createBuilding(
				params["YyZXJidGMzOGBieWEwMTJweDVnaGc1bD"],
				params["NxNDIwaWU4aXRya3V0aXJxdXVkbGkzNW"]
			)
		);

		this.expose(
			"I1Y2VpcmdnOGUwcWFuOTc2bWQ1NHhud3",
			{
			"x4Zml2emh6bmZ4dzVyMD85a3VybDNhZT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.findTouchingBoroughs(
				params["x4Zml2emh6bmZ4dzVyMD85a3VybDNhZT"]
			)
		);

		this.expose(
			"hzbzE0dDd1MmRhZnw1Z3c0dWFwa2Yzcj",
			{
			"xxNnpkOXJiZ2dkNjJjdGBpdzgxcDtrY2": { type: "string", isArray: false, isOptional: false },
				"ZybDVoNDkydzlyY3p6b2Vydn91MWVpY3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.assignSoleOwner(
				params["xxNnpkOXJiZ2dkNjJjdGBpdzgxcDtrY2"],
				params["ZybDVoNDkydzlyY3p6b2Vydn91MWVpY3"]
			)
		);

		this.expose(
			"k5NWY1dmQ4cGVvb2UyOWRrOGpvNDFvdj",
			{
			"EwMmpvdnhlZ35xd3BpczhydWFsc2JzeD": { type: "string", isArray: false, isOptional: false },
				"QycjQ2N3M1MX54bW1iYmFoaG53aTQ5bn": { type: "number", isArray: false, isOptional: false },
				"p5NWZtNHJqMTd2OGIybWllZX9xeD8wem": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.assignValuation(
				params["EwMmpvdnhlZ35xd3BpczhydWFsc2JzeD"],
				params["QycjQ2N3M1MX54bW1iYmFoaG53aTQ5bn"],
				params["p5NWZtNHJqMTd2OGIybWllZX9xeD8wem"]
			)
		);

		this.expose(
			"JzbzZkYm5pcmNheXl3aTJrYXR1ZnMwbn",
			{
			"Q0amZyeDdwbzlqZ3I5ZmtmbnVxZGM1dG": { type: BuildingSummaryModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.saveBuilding(
				params["Q0amZyeDdwbzlqZ3I5ZmtmbnVxZGM1dG"]
			)
		);

		this.expose(
			"N0c3d6cDB3eGN3aXQ0bHlybntjMH9za2",
			{
			"9zNmQxaHQ3M3F0MTAwamRvcnlzZjduZW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.archiveBuilding(
				params["9zNmQxaHQ3M3F0MTAwamRvcnlzZjduZW"]
			)
		);

		this.expose(
			"BtamlqZDJobHc3OXluMmd0bWZ2Y3FhYm",
			{
			"dwbmRjbWR1bGE2NjFndzJ1enw0b2VyMX": { type: "string", isArray: false, isOptional: false },
				"I4NmJpenJib2hzcWhoOXgxMX53bHlvdD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.editPlotBoundary(
				params["dwbmRjbWR1bGE2NjFndzJ1enw0b2VyMX"],
				params["I4NmJpenJib2hzcWhoOXgxMX53bHlvdD"]
			)
		);

		this.expose(
			"h6NmRpZnF3eHBhemx2am50a3Ftd2ZrZH",
			{
			"Y0amFoNTk2dWxiZHB2NWV6azF6NTZ6NX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.getPublication(
				params["Y0amFoNTk2dWxiZHB2NWV6azF6NTZ6NX"]
			)
		);

		this.expose(
			"drMjJ0Nm40YWV2b3F6dzt4ZXdremBvMm",
			{
			"JhZ3kwamJnYWVyYWB6ZWYxbGRoZXB1a3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.getArticle(
				params["JhZ3kwamJnYWVyYWB6ZWYxbGRoZXB1a3"]
			)
		);

		this.expose(
			"N5ZjNjamYyZTBodXNqbmlpemR1dTcwbj",
			{
			"IxdjlzOHlheGNtZmN1cGE0ZnV2YTZsM2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.getArticleContent(
				params["IxdjlzOHlheGNtZmN1cGE0ZnV2YTZsM2"]
			)
		);

		this.expose(
			"FsZGx5dTMzY20wcTh3ajh5YmRueHJ6NH",
			{},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.getNewsticker(
				
			)
		);

		this.expose(
			"NoMX80NmgxNTFyZTB4dzB3eDBzZHFtd3",
			{
			"dzdXMydWI2ZmE4a3Vya2Q4NTpjeWc1bz": { type: "number", isArray: false, isOptional: false },
				"FzenJlNHNwNmh4c2ZhaHtmejswaDVqaj": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.listNewestArticles(
				params["dzdXMydWI2ZmE4a3Vya2Q4NTpjeWc1bz"],
				params["FzenJlNHNwNmh4c2ZhaHtmejswaDVqaj"]
			)
		);

		this.expose(
			"9naWs5bzEzaWUxNmR2MTU1cj1vbWljaD",
			{
			"BsdT10cmlhMDtwangxNHF2cTZ0aTMyd2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.createArticle(
				params["BsdT10cmlhMDtwangxNHF2cTZ0aTMyd2"]
			)
		);

		this.expose(
			"JraWlqZDJhbmd1YnU5d3wzMHVuYj9ydX",
			{
			"YycTYxbmI3Yn55dzdid39lYTAyY3d2am": { type: "string", isArray: false, isOptional: false },
				"doMHx0emR6cHR4aDw0eXl6NWthaHp4aG": { type: "string", isArray: false, isOptional: false },
				"FpbWFvNmZlMj5mNHdhbGE3dm12MWdzNn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.saveArticle(
				params["YycTYxbmI3Yn55dzdid39lYTAyY3d2am"],
				params["doMHx0emR6cHR4aDw0eXl6NWthaHp4aG"],
				params["FpbWFvNmZlMj5mNHdhbGE3dm12MWdzNn"]
			)
		);

		this.expose(
			"cxa2RvMHp1aGg3ZDJiaGp1YmZqZjY1eH",
			{
			"t4eGZoNHJuZzV0NXV0b2FuN3U3Ymk2NG": { type: "string", isArray: false, isOptional: false },
				"FnNWR0eXFuYTQ4OWl4N3NsdjoyYzdkMn": { type: "buffer", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.uploadImage(
				params["t4eGZoNHJuZzV0NXV0b2FuN3U3Ymk2NG"],
				params["FnNWR0eXFuYTQ4OWl4N3NsdjoyYzdkMn"]
			)
		);

		this.expose(
			"R6Mng4aGRzc3kxNGVyMmQxcGRtMGc3bm",
			{
			"RrOHZhY2x5OGczenZic3hrcG93dGNiMz": { type: "string", isArray: false, isOptional: false },
				"NhMW1ibDQ1M21iZ3Z3c3t3OWdsb2xvaW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.captionImage(
				params["RrOHZhY2x5OGczenZic3hrcG93dGNiMz"],
				params["NhMW1ibDQ1M21iZ3Z3c3t3OWdsb2xvaW"]
			)
		);

		this.expose(
			"p0MHJzNGV4bTh3MG1nMWJ6bD00bHBmY2",
			{
			"duZnhpOWVwandzY3pxaXVxem9nc2VwcT": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.removeImage(
				params["duZnhpOWVwandzY3pxaXVxem9nc2VwcT"]
			)
		);

		this.expose(
			"V6M2k2b2I2cD1maWM0NHV0eD45eDBxbm",
			{
			"loc2IzMGQxdzliYzhrZ3NwYjlrNHp4Ym": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.publish(
				params["loc2IzMGQxdzliYzhrZ3NwYjlrNHp4Ym"]
			)
		);

		this.expose(
			"k4NXU5azV0bnB6NDVyeGl4ZWUybXM3MH",
			{
			"g1aGFnaGE4aGhta2RicnJxdzdqOT1sN2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(ChatService),
			(controller, params) => controller.start(
				params["g1aGFnaGE4aGhta2RicnJxdzdqOT1sN2"]
			)
		);

		this.expose(
			"g4c2I5ZjkxcWE1bGE2cjB5aWYyM2oyaG",
			{
			"Rkd3VxNGFuaWMyN3RvdzJjaGlrZWRjbG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(ChatService),
			(controller, params) => controller.read(
				params["Rkd3VxNGFuaWMyN3RvdzJjaGlrZWRjbG"]
			)
		);

		this.expose(
			"F5ZTIxMn00a2h0MWhuZXVlZGBvMWhieX",
			{
			"prbXM3dnU2aTAyNDYxdWs5aWdtbnRsZn": { type: "string", isArray: false, isOptional: false },
				"J2ZXFweXFuNGd1cmQ1enFsaG14NTA5c3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(ChatService),
			(controller, params) => controller.send(
				params["prbXM3dnU2aTAyNDYxdWs5aWdtbnRsZn"],
				params["J2ZXFweXFuNGd1cmQ1enFsaG14NTA5c3"]
			)
		);

		this.expose(
			"Z0Zzg2ZmYzaHl1YWVuOHdlczRtMj9rdm",
			{
			"dkY3R1cnN0eDFybWVyaWg3cXxnMWJscG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.getStreet(
				params["dkY3R1cnN0eDFybWVyaWg3cXxnMWJscG"]
			)
		);

		this.expose(
			"JzamMxc2JrZjlvMjttaWF1aXVybXRiZD",
			{
			"Ztejp0b2lkNGRxM21rczN3d2YwbTF1NW": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.getPeerPlots(
				params["Ztejp0b2lkNGRxM21rczN3d2YwbTF1NW"]
			)
		);

		this.expose(
			"RqZ3hwc3I2a3Bhem9qZ35wYzdrcmdyYX",
			{
			"Ribj40ZmZsMm1xdm10ZTdtMXR3MzZlb2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.createStreet(
				params["Ribj40ZmZsMm1xdm10ZTdtMXR3MzZlb2"]
			)
		);

		this.expose(
			"FycnI1bWhvOHF1bmA4eD9oZWZ4eXZzYW",
			{
			"RhNGJhMnZvOG51Y2FtcnBrMWlqcWg0bz": { type: "string", isArray: false, isOptional: false },
				"tqNmhkZmY2ajFrYWY1NWA5bGBjd2NzcD": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.rename(
				params["RhNGJhMnZvOG51Y2FtcnBrMWlqcWg0bz"],
				params["tqNmhkZmY2ajFrYWY1NWA5bGBjd2NzcD"]
			)
		);

		this.expose(
			"JicXZkOXJkMjU4dzFhN3NkNWpndXNocG",
			{
			"JzeHs0bDh0NG54cGRodm04cWN6MXViam": { type: "string", isArray: false, isOptional: false },
				"w5OXc3ZGhoeWZpdDF2NjN3NGl2dzR3OG": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.setWidth(
				params["JzeHs0bDh0NG54cGRodm04cWN6MXViam"],
				params["w5OXc3ZGhoeWZpdDF2NjN3NGl2dzR3OG"]
			)
		);

		this.expose(
			"JuODM4Znd0cjhmdT4xdnpzcnBqeDcxMm",
			{
			"JpbDFwdmVjZmF4MHgyMmcwbXBoZ2J3NH": { type: "string", isArray: false, isOptional: false },
				"NsN302NXZ4dzJiNWd4M2EwdWNiaTd5a2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.editRoute(
				params["JpbDFwdmVjZmF4MHgyMmcwbXBoZ2J3NH"],
				params["NsN302NXZ4dzJiNWd4M2EwdWNiaTd5a2"]
			)
		);

		this.expose(
			"VlbjRmY2JldGYydjdna2o0NXVzZT9jZH",
			{
			"5jM250bjp0Z3Y0b2YzZH41aGR6bGtka3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(StreetService),
			(controller, params) => controller.archive(
				params["5jM250bjp0Z3Y0b2YzZH41aGR6bGtka3"]
			)
		);

		this.expose(
			"loMWA3dmBqbG1hNTE2MjR2ajZvNzUxM2",
			{
			"hpOGF4ZDZiY2lhOTo3eGowM2V1dGhvbG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TradeService),
			(controller, params) => controller.getValuation(
				params["hpOGF4ZDZiY2lhOTo3eGowM2V1dGhvbG"]
			)
		);

		this.expose(
			"EwbDZndWloZHl2bmIzZGIwcmNpbGRzNn",
			{
			"d1ejZldmVzNnV2ejQzYnBnaWlkOW9ubn": { type: "string", isArray: false, isOptional: false },
				"NneWRjbzNpbnY5azhka382ZDgwdjd0dT": { type: "number", isArray: false, isOptional: false }
			},
			inject => inject.construct(TradeService),
			(controller, params) => controller.overwriteValuation(
				params["d1ejZldmVzNnV2ejQzYnBnaWlkOW9ubn"],
				params["NneWRjbzNpbnY5azhka382ZDgwdjd0dT"]
			)
		);

		this.expose(
			"k0bXJoZmdpOHdpYTc4ZWUwZTozMTNhcW",
			{
			"l6NWV2Y2FrNzo0bmI2bTduNmBic3E3aX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TradeService),
			(controller, params) => controller.compileAssets(
				params["l6NWV2Y2FrNzo0bmI2bTduNmBic3E3aX"]
			)
		);

		this.expose(
			"ZjcnJibH5xZzpjMD5tYWFxbjJzdWk5Zj",
			{
			"1vbXJxM3FsajRzOHE4Y3h3azc3dXM0Ym": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getRoute(
				params["1vbXJxM3FsajRzOHE4Y3h3azc3dXM0Ym"]
			)
		);

		this.expose(
			"hsZXxsa2h0eG50MnVjazg1eHMyY3NiNW",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getRoutes(
				
			)
		);

		this.expose(
			"U2anMzaDB2dndnNjM0Zjg1cX84c2tjYn",
			{
			"k4dXhnbnd3aGRhNnRsZmlwZGlvMTU5cm": { type: TrainRouteViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.saveRoute(
				params["k4dXhnbnd3aGRhNnRsZmlwZGlvMTU5cm"]
			)
		);

		this.expose(
			"FpZHU4NWUwbTJlNGkzdGNtdjhwd2l3Zj",
			{
			"RqY3M1b2NsbGdyZnZhZ2pibGl6NGRkeW": { type: "string", isArray: false, isOptional: false },
				"BnN2twZGo5ZmBmZTJpcGFwYmc3bTZ5MX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.saveRoutePath(
				params["RqY3M1b2NsbGdyZnZhZ2pibGl6NGRkeW"],
				params["BnN2twZGo5ZmBmZTJpcGFwYmc3bTZ5MX"]
			)
		);

		this.expose(
			"lmNThhdDtzaHxwb3FnM3poMWJkMXRlbW",
			{
			"IxZHhlem0yOWYwOWV2MnZrYm85YmRhcX": { type: "string", isArray: false, isOptional: false },
				"E0cWN0cHRhczh1YXVycmc1MjJycXRtb2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.setOperator(
				params["IxZHhlem0yOWYwOWV2MnZrYm85YmRhcX"],
				params["E0cWN0cHRhczh1YXVycmc1MjJycXRtb2"]
			)
		);

		this.expose(
			"l3Y2JsdHpocTpya3xpaDVkdDN4ZnczbT",
			{
			"EwanloangzanlyZWg1YTNwdzJjcWg3eT": { type: "string", isArray: false, isOptional: false },
				"hnMXdzZWg0NXJqdjlkaDY0cnl3d3R2NH": { type: "string", isArray: false, isOptional: false },
				"54ZWt0OTE1a2lmaW1ya3VsMWBmbTY1eW": { type: "string", isArray: false, isOptional: false },
				"ZvZnNiaWdpZmNtejpsODg0dmkwa3VkdT": { type: "string", isArray: false, isOptional: false },
				"J5c2Fob3Z0eGRxZGZmc3M4aWQ4ZGJmc2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.register(
				params["EwanloangzanlyZWg1YTNwdzJjcWg3eT"],
				params["hnMXdzZWg0NXJqdjlkaDY0cnl3d3R2NH"],
				params["54ZWt0OTE1a2lmaW1ya3VsMWBmbTY1eW"],
				params["ZvZnNiaWdpZmNtejpsODg0dmkwa3VkdT"],
				params["J5c2Fob3Z0eGRxZGZmc3M4aWQ4ZGJmc2"]
			)
		);

		this.expose(
			"RlMmhtd3Q2cndiYzJ2M3c2c2N6bnV6c2",
			{
			"91eXg3MnBkejd1Z3Y3aDFveDNmdWgwaj": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.registerStation(
				params["91eXg3MnBkejd1Z3Y3aDFveDNmdWgwaj"]
			)
		);

		this.expose(
			"Q4ejpmY2hkeXA1bnlodHNjaTd2eX03a2",
			{
			"A4MXx3Z3podXVycjRqdmhuZWF1cDhpem": { type: "string", isArray: false, isOptional: false },
				"QzOTEzaGlsdTMyZ2JnZDIydnR5NjU5Y3": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.addStop(
				params["A4MXx3Z3podXVycjRqdmhuZWF1cDhpem"],
				params["QzOTEzaGlsdTMyZ2JnZDIydnR5NjU5Y3"]
			)
		);

		this.expose(
			"BicGs0M39ub2JqNDFndTN0cWl6ZmRxZ2",
			{
			"VvMmZ4N3F6Y253dmRuMTJxMWA2cGV0cn": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(TrainService),
			(controller, params) => controller.removeStop(
				params["VvMmZ4N3F6Y253dmRuMTJxMWA2cGV0cn"]
			)
		);

		this.expose(
			"N2YnloZWZwdGJ3M2pjZ3JidnM2eDE1d2",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getStations(
				
			)
		);

		this.expose(
			"I0OWJncGF1dj1jbTozOXVkMjFxcmFua2",
			{
			"NvNTIza3xkcng5NmJtYjEyNDdyeXY4YW": { type: "string", isArray: false, isOptional: false },
				"poejUyZzFjZzZzazt0ZTp3MWR2cGw4a2": { type: "string", isArray: false, isOptional: false },
				"ZucHVmaT11a3Y5Y3djZ2k5bWtiMTlsOG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(VoteService),
			(controller, params) => controller.propse(
				params["NvNTIza3xkcng5NmJtYjEyNDdyeXY4YW"],
				params["poejUyZzFjZzZzazt0ZTp3MWR2cGw4a2"],
				params["ZucHVmaT11a3Y5Y3djZ2k5bWtiMTlsOG"]
			)
		);

		this.expose(
			"JqcXhvb2FydTNjeHE2ZWZhdWVrZjhiMm",
			{},
			inject => inject.construct(VoteService),
			(controller, params) => controller.getScopes(
				
			)
		);

		this.expose(
			"pvbjJ4Ym91ZG00M3VrbWJqNGZnam5pdT",
			{},
			inject => inject.construct(VoteService),
			(controller, params) => controller.getBills(
				
			)
		);

		this.expose(
			"lvYzVhcjphcH5zdWR4dTd0ZWgyMmBtem",
			{
			"Fib2NuZnZkNmZtYWFrNXQ0c3YycWRvZm": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(VoteService),
			(controller, params) => controller.getBill(
				params["Fib2NuZnZkNmZtYWFrNXQ0c3YycWRvZm"]
			)
		);

		this.expose(
			"Eyc2NzMHxxY2IyaGR6YTE4bmM5Mmwwcj",
			{
			"hycXx5eXl3dTJ4dH0xYjVvemlqYjZtOH": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(VoteService),
			(controller, params) => controller.getTicker(
				params["hycXx5eXl3dTJ4dH0xYjVvemlqYjZtOH"]
			)
		);

		this.expose(
			"VqbGQ2eTNiNWVxOHdhZXBwNHczZGUzcW",
			{
			"5uYnR5djpvMWNnYTFjNDJ3d2JxNjc1Z3": { type: "string", isArray: false, isOptional: false },
				"E3eXV1aXhyaXd5Zz16Z2s2azJuMWkyc2": { type: "boolean", isArray: false, isOptional: false }
			},
			inject => inject.construct(VoteService),
			(controller, params) => controller.getImpression(
				params["5uYnR5djpvMWNnYTFjNDJ3d2JxNjc1Z3"],
				params["E3eXV1aXhyaXd5Zz16Z2s2azJuMWkyc2"]
			)
		);

		this.expose(
			"ZnMX5maWdxbWJyMnx5NnM0M2FoczdmYm",
			{},
			inject => inject.construct(VoteService),
			(controller, params) => controller.getOpenHonestium(
				
			)
		);

		this.expose(
			"dzZz52YnI1Mn5nZjFscHl0Z2dqbDhhYX",
			{
			"NpY3hlNzVnbjk0MW0wM3M4ZjVlaTluNn": { type: "string", isArray: false, isOptional: false },
				"JkbjNpOTRqbmN6dH82NTdiZW5qbXc3cX": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(VoteService),
			(controller, params) => controller.saveHonestium(
				params["NpY3hlNzVnbjk0MW0wM3M4ZjVlaTluNn"],
				params["JkbjNpOTRqbmN6dH82NTdiZW5qbXc3cX"]
			)
		);

		this.expose(
			"k0djR0dHRmbTN4ZzkxaWg5bzdjeXJqMT",
			{
			"JsMjxrNWRqNGZ4ZXViaGFxaWZwOWhncG": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(VoteService),
			(controller, params) => controller.submitHonestium(
				params["JsMjxrNWRqNGZ4ZXViaGFxaWZwOWhncG"]
			)
		)
	}
}

ViewModel.mappings = {
	[BoroughSummaryModel.name]: class ComposedBoroughSummaryModel extends BoroughSummaryModel {
		async map() {
			return {
				banner: this.$$model.banner,
				bounds: this.$$model.bounds,
				color: this.$$model.color,
				id: this.$$model.id,
				incorporation: this.$$model.incorporation,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				banner: true,
				bounds: true,
				color: true,
				id: true,
				incorporation: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new BoroughSummaryModel(null);
			"banner" in data && (item.banner = data.banner === null ? null : `${data.banner}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"incorporation" in data && (item.incorporation = data.incorporation === null ? null : new Date(data.incorporation));
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: BoroughSummaryModel) {
			let model: Borough;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Borough).find(viewModel.id)
			} else {
				model = new Borough();
			}
			
			"banner" in viewModel && (model.banner = viewModel.banner === null ? null : `${viewModel.banner}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporation" in viewModel && (model.incorporation = viewModel.incorporation === null ? null : new Date(viewModel.incorporation));
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[BoroughViewModel.name]: class ComposedBoroughViewModel extends BoroughViewModel {
		async map() {
			return {
				district: new DistrictViewModel(await BaseServer.unwrap(this.$$model.district)),
				banner: this.$$model.banner,
				bounds: this.$$model.bounds,
				color: this.$$model.color,
				description: this.$$model.description,
				id: this.$$model.id,
				incorporation: this.$$model.incorporation,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get district() {
					return ViewModel.mappings[DistrictViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "district-BoroughViewModel"]
					);
				},
				banner: true,
				bounds: true,
				color: true,
				description: true,
				id: true,
				incorporation: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new BoroughViewModel(null);
			"district" in data && (item.district = data.district && ViewModel.mappings[DistrictViewModel.name].toViewModel(data.district));
			"banner" in data && (item.banner = data.banner === null ? null : `${data.banner}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"incorporation" in data && (item.incorporation = data.incorporation === null ? null : new Date(data.incorporation));
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: BoroughViewModel) {
			let model: Borough;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Borough).find(viewModel.id)
			} else {
				model = new Borough();
			}
			
			"district" in viewModel && (model.district.id = viewModel.district ? viewModel.district.id : null);
			"banner" in viewModel && (model.banner = viewModel.banner === null ? null : `${viewModel.banner}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporation" in viewModel && (model.incorporation = viewModel.incorporation === null ? null : new Date(viewModel.incorporation));
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[BridgeViewModel.name]: class ComposedBridgeViewModel extends BridgeViewModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
				path: this.$$model.path
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				name: true,
				path: true
			};
		};

		static toViewModel(data) {
			const item = new BridgeViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);

			return item;
		}

		static async toModel(viewModel: BridgeViewModel) {
			let model: Bridge;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Bridge).find(viewModel.id)
			} else {
				model = new Bridge();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);

			return model;
		}
	},
	[CompanySummaryModel.name]: class ComposedCompanySummaryModel extends CompanySummaryModel {
		async map() {
			return {
				banner: this.$$model.banner,
				id: this.$$model.id,
				name: this.$$model.name,
				purpose: this.$$model.purpose,
				tag: this.$$model.tag,
				type: this.$$model.type
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				banner: true,
				id: true,
				name: true,
				purpose: true,
				tag: true,
				type: true
			};
		};

		static toViewModel(data) {
			const item = new CompanySummaryModel(null);
			"banner" in data && (item.banner = data.banner === null ? null : `${data.banner}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"purpose" in data && (item.purpose = data.purpose === null ? null : `${data.purpose}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);
			"type" in data && (item.type = data.type === null ? null : data.type);

			return item;
		}

		static async toModel(viewModel: CompanySummaryModel) {
			let model: Company;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Company).find(viewModel.id)
			} else {
				model = new Company();
			}
			
			"banner" in viewModel && (model.banner = viewModel.banner === null ? null : `${viewModel.banner}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"purpose" in viewModel && (model.purpose = viewModel.purpose === null ? null : `${viewModel.purpose}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);
			"type" in viewModel && (model.type = viewModel.type === null ? null : viewModel.type);

			return model;
		}
	},
	[OfficeSummaryModel.name]: class ComposedOfficeSummaryModel extends OfficeSummaryModel {
		async map() {
			return {
				property: new PropertySummaryModel(await BaseServer.unwrap(this.$$model.property)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get property() {
					return ViewModel.mappings[PropertySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "property-OfficeSummaryModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new OfficeSummaryModel(null);
			"property" in data && (item.property = data.property && ViewModel.mappings[PropertySummaryModel.name].toViewModel(data.property));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: OfficeSummaryModel) {
			let model: Office;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Office).find(viewModel.id)
			} else {
				model = new Office();
			}
			
			"property" in viewModel && (model.property.id = viewModel.property ? viewModel.property.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[OfficeCapacityViewModel.name]: class ComposedOfficeCapacityViewModel extends OfficeCapacityViewModel {
		async map() {
			return {
				id: this.$$model.id,
				issued: this.$$model.issued,
				size: this.$$model.size
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				issued: true,
				size: true
			};
		};

		static toViewModel(data) {
			const item = new OfficeCapacityViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"issued" in data && (item.issued = data.issued === null ? null : new Date(data.issued));
			"size" in data && (item.size = data.size === null ? null : +data.size);

			return item;
		}

		static async toModel(viewModel: OfficeCapacityViewModel) {
			let model: OfficeCapacity;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(OfficeCapacity).find(viewModel.id)
			} else {
				model = new OfficeCapacity();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"issued" in viewModel && (model.issued = viewModel.issued === null ? null : new Date(viewModel.issued));
			"size" in viewModel && (model.size = viewModel.size === null ? null : +viewModel.size);

			return model;
		}
	},
	[HistoryEntryViewModel.name]: class ComposedHistoryEntryViewModel extends HistoryEntryViewModel {
		async map() {
			return {
				name: this.$$model.name,
				date: this.$$model.date
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				name: true,
				date: true
			};
		};

		static toViewModel(data) {
			const item = new HistoryEntryViewModel(null);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"date" in data && (item.date = data.date === null ? null : new Date(data.date));

			return item;
		}

		static async toModel(viewModel: HistoryEntryViewModel) {
			const model = new HistoryEntry();
			
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"date" in viewModel && (model.date = viewModel.date === null ? null : new Date(viewModel.date));

			return model;
		}
	},
	[PlayerViewModel.name]: class ComposedPlayerViewModel extends PlayerViewModel {
		async map() {
			return {
				id: this.$$model.id,
				username: this.$$model.username
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				username: true
			};
		};

		static toViewModel(data) {
			const item = new PlayerViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"username" in data && (item.username = data.username === null ? null : `${data.username}`);

			return item;
		}

		static async toModel(viewModel: PlayerViewModel) {
			let model: Player;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Player).find(viewModel.id)
			} else {
				model = new Player();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"username" in viewModel && (model.username = viewModel.username === null ? null : `${viewModel.username}`);

			return model;
		}
	},
	[PropertyTypeViewModel.name]: class ComposedPropertyTypeViewModel extends PropertyTypeViewModel {
		async map() {
			return {
				code: this.$$model.code,
				color: this.$$model.color,
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				code: true,
				color: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyTypeViewModel(null);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: PropertyTypeViewModel) {
			let model: PropertyType;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PropertyType).find(viewModel.id)
			} else {
				model = new PropertyType();
			}
			
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PropertySummaryModel.name]: class ComposedPropertySummaryModel extends PropertySummaryModel {
		async map() {
			return {
				activePlotBoundary: new PlotBoundaryShapeModel(await BaseServer.unwrap(this.$$model.activePlotBoundary)),
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.$$model.borough)),
				historicListingGrade: new HistoricListingGradeViewModel(await BaseServer.unwrap(this.$$model.historicListingGrade)),
				type: new PropertyTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get activePlotBoundary() {
					return ViewModel.mappings[PlotBoundaryShapeModel.name].getPrefetchingProperties(
						level,
						[...parents, "activePlotBoundary-PropertySummaryModel"]
					);
				},
				get borough() {
					return ViewModel.mappings[BoroughSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "borough-PropertySummaryModel"]
					);
				},
				get historicListingGrade() {
					return ViewModel.mappings[HistoricListingGradeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "historicListingGrade-PropertySummaryModel"]
					);
				},
				get type() {
					return ViewModel.mappings[PropertyTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-PropertySummaryModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertySummaryModel(null);
			"activePlotBoundary" in data && (item.activePlotBoundary = data.activePlotBoundary && ViewModel.mappings[PlotBoundaryShapeModel.name].toViewModel(data.activePlotBoundary));
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"historicListingGrade" in data && (item.historicListingGrade = data.historicListingGrade && ViewModel.mappings[HistoricListingGradeViewModel.name].toViewModel(data.historicListingGrade));
			"type" in data && (item.type = data.type && ViewModel.mappings[PropertyTypeViewModel.name].toViewModel(data.type));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: PropertySummaryModel) {
			let model: Property;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Property).find(viewModel.id)
			} else {
				model = new Property();
			}
			
			"activePlotBoundary" in viewModel && (model.activePlotBoundary.id = viewModel.activePlotBoundary ? viewModel.activePlotBoundary.id : null);
			"borough" in viewModel && (model.borough.id = viewModel.borough ? viewModel.borough.id : null);
			"historicListingGrade" in viewModel && (model.historicListingGrade.id = viewModel.historicListingGrade ? viewModel.historicListingGrade.id : null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PropertyOverviewModel.name]: class ComposedPropertyOverviewModel extends PropertyOverviewModel {
		async map() {
			return {
				activePlotBoundary: new PlotBoundaryShapeModel(await BaseServer.unwrap(this.$$model.activePlotBoundary)),
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.$$model.borough)),
				type: new PropertyTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get activePlotBoundary() {
					return ViewModel.mappings[PlotBoundaryShapeModel.name].getPrefetchingProperties(
						level,
						[...parents, "activePlotBoundary-PropertyOverviewModel"]
					);
				},
				get borough() {
					return ViewModel.mappings[BoroughSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "borough-PropertyOverviewModel"]
					);
				},
				get type() {
					return ViewModel.mappings[PropertyTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-PropertyOverviewModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyOverviewModel(null);
			"activePlotBoundary" in data && (item.activePlotBoundary = data.activePlotBoundary && ViewModel.mappings[PlotBoundaryShapeModel.name].toViewModel(data.activePlotBoundary));
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"type" in data && (item.type = data.type && ViewModel.mappings[PropertyTypeViewModel.name].toViewModel(data.type));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: PropertyOverviewModel) {
			let model: Property;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Property).find(viewModel.id)
			} else {
				model = new Property();
			}
			
			"activePlotBoundary" in viewModel && (model.activePlotBoundary.id = viewModel.activePlotBoundary ? viewModel.activePlotBoundary.id : null);
			"borough" in viewModel && (model.borough.id = viewModel.borough ? viewModel.borough.id : null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PropertyViewModel.name]: class ComposedPropertyViewModel extends PropertyViewModel {
		async map() {
			return {
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.$$model.borough)),
				historicListingGrade: new HistoricListingGradeViewModel(await BaseServer.unwrap(this.$$model.historicListingGrade)),
				buildings: (await this.$$model.buildings.includeTree(ViewModel.mappings[BuildingSummaryModel.name].items).toArray()).map(item => new BuildingSummaryModel(item)),
				dwellings: (await this.$$model.dwellings.includeTree(ViewModel.mappings[PropertyDwellingViewModel.name].items).toArray()).map(item => new PropertyDwellingViewModel(item)),
				historicListingModifiers: (await this.$$model.historicListingModifiers.includeTree(ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].items).toArray()).map(item => new PropertyHistoricListingModifierViewModel(item)),
				offices: (await this.$$model.offices.includeTree(ViewModel.mappings[OfficeViewModel.name].items).toArray()).map(item => new OfficeViewModel(item)),
				owners: (await this.$$model.owners.includeTree(ViewModel.mappings[PropertyOwnerViewModel.name].items).toArray()).map(item => new PropertyOwnerViewModel(item)),
				plotBoundaries: (await this.$$model.plotBoundaries.includeTree(ViewModel.mappings[PlotBoundarySummaryModel.name].items).toArray()).map(item => new PlotBoundarySummaryModel(item)),
				trainStations: (await this.$$model.trainStations.includeTree(ViewModel.mappings[PropertyTrainStationViewModel.name].items).toArray()).map(item => new PropertyTrainStationViewModel(item)),
				type: new PropertyTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				activePlotBoundaryId: this.$$model.activePlotBoundaryId,
				code: this.$$model.code,
				deactivated: this.$$model.deactivated,
				historicListingRegisteredAt: this.$$model.historicListingRegisteredAt,
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get borough() {
					return ViewModel.mappings[BoroughSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "borough-PropertyViewModel"]
					);
				},
				get historicListingGrade() {
					return ViewModel.mappings[HistoricListingGradeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "historicListingGrade-PropertyViewModel"]
					);
				},
				get buildings() {
					return ViewModel.mappings[BuildingSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "buildings-PropertyViewModel"]
					);
				},
				get dwellings() {
					return ViewModel.mappings[PropertyDwellingViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "dwellings-PropertyViewModel"]
					);
				},
				get historicListingModifiers() {
					return ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "historicListingModifiers-PropertyViewModel"]
					);
				},
				get offices() {
					return ViewModel.mappings[OfficeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "offices-PropertyViewModel"]
					);
				},
				get owners() {
					return ViewModel.mappings[PropertyOwnerViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "owners-PropertyViewModel"]
					);
				},
				get plotBoundaries() {
					return ViewModel.mappings[PlotBoundarySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "plotBoundaries-PropertyViewModel"]
					);
				},
				get trainStations() {
					return ViewModel.mappings[PropertyTrainStationViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "trainStations-PropertyViewModel"]
					);
				},
				get type() {
					return ViewModel.mappings[PropertyTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-PropertyViewModel"]
					);
				},
				activePlotBoundaryId: true,
				code: true,
				deactivated: true,
				historicListingRegisteredAt: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyViewModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"historicListingGrade" in data && (item.historicListingGrade = data.historicListingGrade && ViewModel.mappings[HistoricListingGradeViewModel.name].toViewModel(data.historicListingGrade));
			"buildings" in data && (item.buildings = data.buildings && [...data.buildings].map(i => ViewModel.mappings[BuildingSummaryModel.name].toViewModel(i)));
			"dwellings" in data && (item.dwellings = data.dwellings && [...data.dwellings].map(i => ViewModel.mappings[PropertyDwellingViewModel.name].toViewModel(i)));
			"historicListingModifiers" in data && (item.historicListingModifiers = data.historicListingModifiers && [...data.historicListingModifiers].map(i => ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].toViewModel(i)));
			"offices" in data && (item.offices = data.offices && [...data.offices].map(i => ViewModel.mappings[OfficeViewModel.name].toViewModel(i)));
			"owners" in data && (item.owners = data.owners && [...data.owners].map(i => ViewModel.mappings[PropertyOwnerViewModel.name].toViewModel(i)));
			"plotBoundaries" in data && (item.plotBoundaries = data.plotBoundaries && [...data.plotBoundaries].map(i => ViewModel.mappings[PlotBoundarySummaryModel.name].toViewModel(i)));
			"trainStations" in data && (item.trainStations = data.trainStations && [...data.trainStations].map(i => ViewModel.mappings[PropertyTrainStationViewModel.name].toViewModel(i)));
			"type" in data && (item.type = data.type && ViewModel.mappings[PropertyTypeViewModel.name].toViewModel(data.type));
			"activePlotBoundaryId" in data && (item.activePlotBoundaryId = data.activePlotBoundaryId === null ? null : `${data.activePlotBoundaryId}`);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"deactivated" in data && (item.deactivated = data.deactivated === null ? null : new Date(data.deactivated));
			"historicListingRegisteredAt" in data && (item.historicListingRegisteredAt = data.historicListingRegisteredAt === null ? null : new Date(data.historicListingRegisteredAt));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: PropertyViewModel) {
			let model: Property;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Property).find(viewModel.id)
			} else {
				model = new Property();
			}
			
			"borough" in viewModel && (model.borough.id = viewModel.borough ? viewModel.borough.id : null);
			"historicListingGrade" in viewModel && (model.historicListingGrade.id = viewModel.historicListingGrade ? viewModel.historicListingGrade.id : null);
			"buildings" in viewModel && (null);
			"dwellings" in viewModel && (null);
			"historicListingModifiers" in viewModel && (null);
			"offices" in viewModel && (null);
			"owners" in viewModel && (null);
			"plotBoundaries" in viewModel && (null);
			"trainStations" in viewModel && (null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"activePlotBoundaryId" in viewModel && (model.activePlotBoundaryId = viewModel.activePlotBoundaryId === null ? null : `${viewModel.activePlotBoundaryId}`);
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"deactivated" in viewModel && (model.deactivated = viewModel.deactivated === null ? null : new Date(viewModel.deactivated));
			"historicListingRegisteredAt" in viewModel && (model.historicListingRegisteredAt = viewModel.historicListingRegisteredAt === null ? null : new Date(viewModel.historicListingRegisteredAt));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PropertyOwnerViewModel.name]: class ComposedPropertyOwnerViewModel extends PropertyOwnerViewModel {
		async map() {
			return {
				aquiredValuation: new ValuationSummaryModel(await BaseServer.unwrap(this.$$model.aquiredValuation)),
				owner: new LegalEntityViewModel(await BaseServer.unwrap(this.$$model.owner)),
				aquired: this.$$model.aquired,
				id: this.$$model.id,
				share: this.$$model.share,
				sold: this.$$model.sold
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get aquiredValuation() {
					return ViewModel.mappings[ValuationSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "aquiredValuation-PropertyOwnerViewModel"]
					);
				},
				get owner() {
					return ViewModel.mappings[LegalEntityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "owner-PropertyOwnerViewModel"]
					);
				},
				aquired: true,
				id: true,
				share: true,
				sold: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyOwnerViewModel(null);
			"aquiredValuation" in data && (item.aquiredValuation = data.aquiredValuation && ViewModel.mappings[ValuationSummaryModel.name].toViewModel(data.aquiredValuation));
			"owner" in data && (item.owner = data.owner && ViewModel.mappings[LegalEntityViewModel.name].toViewModel(data.owner));
			"aquired" in data && (item.aquired = data.aquired === null ? null : new Date(data.aquired));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"share" in data && (item.share = data.share === null ? null : +data.share);
			"sold" in data && (item.sold = data.sold === null ? null : new Date(data.sold));

			return item;
		}

		static async toModel(viewModel: PropertyOwnerViewModel) {
			let model: PropertyOwner;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PropertyOwner).find(viewModel.id)
			} else {
				model = new PropertyOwner();
			}
			
			"aquiredValuation" in viewModel && (model.aquiredValuation.id = viewModel.aquiredValuation ? viewModel.aquiredValuation.id : null);
			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"aquired" in viewModel && (model.aquired = viewModel.aquired === null ? null : new Date(viewModel.aquired));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"share" in viewModel && (model.share = viewModel.share === null ? null : +viewModel.share);
			"sold" in viewModel && (model.sold = viewModel.sold === null ? null : new Date(viewModel.sold));

			return model;
		}
	},
	[PropertyDwellingViewModel.name]: class ComposedPropertyDwellingViewModel extends PropertyDwellingViewModel {
		async map() {
			return {
				tenants: (await this.$$model.tenants.includeTree(ViewModel.mappings[TenantViewModel.name].items).toArray()).map(item => new TenantViewModel(item)),
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get tenants() {
					return ViewModel.mappings[TenantViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "tenants-PropertyDwellingViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyDwellingViewModel(null);
			"tenants" in data && (item.tenants = data.tenants && [...data.tenants].map(i => ViewModel.mappings[TenantViewModel.name].toViewModel(i)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: PropertyDwellingViewModel) {
			let model: Dwelling;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Dwelling).find(viewModel.id)
			} else {
				model = new Dwelling();
			}
			
			"tenants" in viewModel && (null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[TenantViewModel.name]: class ComposedTenantViewModel extends TenantViewModel {
		async map() {
			return {
				inhabitant: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.inhabitant)),
				end: this.$$model.end,
				id: this.$$model.id,
				start: this.$$model.start
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get inhabitant() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "inhabitant-TenantViewModel"]
					);
				},
				end: true,
				id: true,
				start: true
			};
		};

		static toViewModel(data) {
			const item = new TenantViewModel(null);
			"inhabitant" in data && (item.inhabitant = data.inhabitant && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.inhabitant));
			"end" in data && (item.end = data.end === null ? null : new Date(data.end));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"start" in data && (item.start = data.start === null ? null : new Date(data.start));

			return item;
		}

		static async toModel(viewModel: TenantViewModel) {
			let model: Tenancy;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Tenancy).find(viewModel.id)
			} else {
				model = new Tenancy();
			}
			
			"inhabitant" in viewModel && (model.inhabitant.id = viewModel.inhabitant ? viewModel.inhabitant.id : null);
			"end" in viewModel && (model.end = viewModel.end === null ? null : new Date(viewModel.end));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"start" in viewModel && (model.start = viewModel.start === null ? null : new Date(viewModel.start));

			return model;
		}
	},
	[SquareViewModel.name]: class ComposedSquareViewModel extends SquareViewModel {
		async map() {
			return {
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.$$model.borough)),
				bounds: this.$$model.bounds,
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get borough() {
					return ViewModel.mappings[BoroughSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "borough-SquareViewModel"]
					);
				},
				bounds: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new SquareViewModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: SquareViewModel) {
			let model: Square;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Square).find(viewModel.id)
			} else {
				model = new Square();
			}
			
			"borough" in viewModel && (model.borough.id = viewModel.borough ? viewModel.borough.id : null);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[StreetViewModel.name]: class ComposedStreetViewModel extends StreetViewModel {
		async map() {
			return {
				routes: (await this.$$model.routes.includeTree(ViewModel.mappings[StreetRouteSummaryModel.name].items).toArray()).map(item => new StreetRouteSummaryModel(item)),
				activeRouteId: this.$$model.activeRouteId,
				id: this.$$model.id,
				name: this.$$model.name,
				shortName: this.$$model.shortName,
				size: this.$$model.size
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get routes() {
					return ViewModel.mappings[StreetRouteSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "routes-StreetViewModel"]
					);
				},
				activeRouteId: true,
				id: true,
				name: true,
				shortName: true,
				size: true
			};
		};

		static toViewModel(data) {
			const item = new StreetViewModel(null);
			"routes" in data && (item.routes = data.routes && [...data.routes].map(i => ViewModel.mappings[StreetRouteSummaryModel.name].toViewModel(i)));
			"activeRouteId" in data && (item.activeRouteId = data.activeRouteId === null ? null : `${data.activeRouteId}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortName" in data && (item.shortName = data.shortName === null ? null : `${data.shortName}`);
			"size" in data && (item.size = data.size === null ? null : +data.size);

			return item;
		}

		static async toModel(viewModel: StreetViewModel) {
			let model: Street;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Street).find(viewModel.id)
			} else {
				model = new Street();
			}
			
			"routes" in viewModel && (null);
			"activeRouteId" in viewModel && (model.activeRouteId = viewModel.activeRouteId === null ? null : `${viewModel.activeRouteId}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortName" in viewModel && (model.shortName = viewModel.shortName === null ? null : `${viewModel.shortName}`);
			"size" in viewModel && (model.size = viewModel.size === null ? null : +viewModel.size);

			return model;
		}
	},
	[StreetRouteSummaryModel.name]: class ComposedStreetRouteSummaryModel extends StreetRouteSummaryModel {
		async map() {
			return {
				changeComment: this.$$model.changeComment,
				created: this.$$model.created,
				id: this.$$model.id,
				path: this.$$model.path
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				changeComment: true,
				created: true,
				id: true,
				path: true
			};
		};

		static toViewModel(data) {
			const item = new StreetRouteSummaryModel(null);
			"changeComment" in data && (item.changeComment = data.changeComment === null ? null : `${data.changeComment}`);
			"created" in data && (item.created = data.created === null ? null : new Date(data.created));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);

			return item;
		}

		static async toModel(viewModel: StreetRouteSummaryModel) {
			let model: StreetRoute;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(StreetRoute).find(viewModel.id)
			} else {
				model = new StreetRoute();
			}
			
			"changeComment" in viewModel && (model.changeComment = viewModel.changeComment === null ? null : `${viewModel.changeComment}`);
			"created" in viewModel && (model.created = viewModel.created === null ? null : new Date(viewModel.created));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);

			return model;
		}
	},
	[WaterBodyViewModel.name]: class ComposedWaterBodyViewModel extends WaterBodyViewModel {
		async map() {
			return {
				bounds: this.$$model.bounds,
				id: this.$$model.id,
				name: this.$$model.name,
				namePath: this.$$model.namePath
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				bounds: true,
				id: true,
				name: true,
				namePath: true
			};
		};

		static toViewModel(data) {
			const item = new WaterBodyViewModel(null);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"namePath" in data && (item.namePath = data.namePath === null ? null : `${data.namePath}`);

			return item;
		}

		static async toModel(viewModel: WaterBodyViewModel) {
			let model: WaterBody;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WaterBody).find(viewModel.id)
			} else {
				model = new WaterBody();
			}
			
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"namePath" in viewModel && (model.namePath = viewModel.namePath === null ? null : `${viewModel.namePath}`);

			return model;
		}
	},
	[WorkOfferSummaryModel.name]: class ComposedWorkOfferSummaryModel extends WorkOfferSummaryModel {
		async map() {
			return {
				closed: this.$$model.closed,
				count: this.$$model.count,
				id: this.$$model.id,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				closed: true,
				count: true,
				id: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new WorkOfferSummaryModel(null);
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"count" in data && (item.count = data.count === null ? null : +data.count);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: WorkOfferSummaryModel) {
			let model: WorkOffer;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WorkOffer).find(viewModel.id)
			} else {
				model = new WorkOffer();
			}
			
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"count" in viewModel && (model.count = viewModel.count === null ? null : +viewModel.count);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[WorkContractSummaryModel.name]: class ComposedWorkContractSummaryModel extends WorkContractSummaryModel {
		async map() {
			return {
				canceled: this.$$model.canceled,
				id: this.$$model.id,
				signed: this.$$model.signed
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				canceled: true,
				id: true,
				signed: true
			};
		};

		static toViewModel(data) {
			const item = new WorkContractSummaryModel(null);
			"canceled" in data && (item.canceled = data.canceled === null ? null : new Date(data.canceled));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"signed" in data && (item.signed = data.signed === null ? null : new Date(data.signed));

			return item;
		}

		static async toModel(viewModel: WorkContractSummaryModel) {
			let model: WorkContract;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WorkContract).find(viewModel.id)
			} else {
				model = new WorkContract();
			}
			
			"canceled" in viewModel && (model.canceled = viewModel.canceled === null ? null : new Date(viewModel.canceled));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"signed" in viewModel && (model.signed = viewModel.signed === null ? null : new Date(viewModel.signed));

			return model;
		}
	},
	[ChangeFrameViewModel.name]: class ComposedChangeFrameViewModel extends ChangeFrameViewModel {
		async map() {
			return {
				hash: this.$$model.hash,
				captured: this.$$model.captured
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				hash: true,
				captured: true
			};
		};

		static toViewModel(data) {
			const item = new ChangeFrameViewModel(null);
			"hash" in data && (item.hash = data.hash === null ? null : `${data.hash}`);
			"captured" in data && (item.captured = data.captured === null ? null : new Date(data.captured));

			return item;
		}

		static async toModel(viewModel: ChangeFrameViewModel) {
			const model = new ChangeFrame();
			
			"hash" in viewModel && (model.hash = viewModel.hash === null ? null : `${viewModel.hash}`);
			"captured" in viewModel && (model.captured = viewModel.captured === null ? null : new Date(viewModel.captured));

			return model;
		}
	},
	[CityViewModel.name]: class ComposedCityViewModel extends CityViewModel {
		async map() {
			return {
				centerX: this.$$model.centerX,
				centerY: this.$$model.centerY,
				id: this.$$model.id,
				incorporated: this.$$model.incorporated,
				mainImpressionId: this.$$model.mainImpressionId,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				centerX: true,
				centerY: true,
				id: true,
				incorporated: true,
				mainImpressionId: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new CityViewModel(null);
			"centerX" in data && (item.centerX = data.centerX === null ? null : +data.centerX);
			"centerY" in data && (item.centerY = data.centerY === null ? null : +data.centerY);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"incorporated" in data && (item.incorporated = data.incorporated === null ? null : new Date(data.incorporated));
			"mainImpressionId" in data && (item.mainImpressionId = data.mainImpressionId === null ? null : `${data.mainImpressionId}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: CityViewModel) {
			let model: City;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(City).find(viewModel.id)
			} else {
				model = new City();
			}
			
			"centerX" in viewModel && (model.centerX = viewModel.centerX === null ? null : +viewModel.centerX);
			"centerY" in viewModel && (model.centerY = viewModel.centerY === null ? null : +viewModel.centerY);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporated" in viewModel && (model.incorporated = viewModel.incorporated === null ? null : new Date(viewModel.incorporated));
			"mainImpressionId" in viewModel && (model.mainImpressionId = viewModel.mainImpressionId === null ? null : `${viewModel.mainImpressionId}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[EpochTimelineModel.name]: class ComposedEpochTimelineModel extends EpochTimelineModel {
		async map() {
			return {
				end: this.$$model.end,
				id: this.$$model.id,
				offset: this.$$model.offset,
				rate: this.$$model.rate,
				start: this.$$model.start
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				end: true,
				id: true,
				offset: true,
				rate: true,
				start: true
			};
		};

		static toViewModel(data) {
			const item = new EpochTimelineModel(null);
			"end" in data && (item.end = data.end === null ? null : new Date(data.end));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"offset" in data && (item.offset = data.offset === null ? null : +data.offset);
			"rate" in data && (item.rate = data.rate === null ? null : +data.rate);
			"start" in data && (item.start = data.start === null ? null : new Date(data.start));

			return item;
		}

		static async toModel(viewModel: EpochTimelineModel) {
			let model: Epoch;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Epoch).find(viewModel.id)
			} else {
				model = new Epoch();
			}
			
			"end" in viewModel && (model.end = viewModel.end === null ? null : new Date(viewModel.end));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"offset" in viewModel && (model.offset = viewModel.offset === null ? null : +viewModel.offset);
			"rate" in viewModel && (model.rate = viewModel.rate === null ? null : +viewModel.rate);
			"start" in viewModel && (model.start = viewModel.start === null ? null : new Date(viewModel.start));

			return model;
		}
	},
	[HistoricListingGradeViewModel.name]: class ComposedHistoricListingGradeViewModel extends HistoricListingGradeViewModel {
		async map() {
			return {
				description: this.$$model.description,
				grade: this.$$model.grade,
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				description: true,
				grade: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new HistoricListingGradeViewModel(null);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"grade" in data && (item.grade = data.grade === null ? null : +data.grade);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: HistoricListingGradeViewModel) {
			let model: HistoricListingGrade;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(HistoricListingGrade).find(viewModel.id)
			} else {
				model = new HistoricListingGrade();
			}
			
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"grade" in viewModel && (model.grade = viewModel.grade === null ? null : +viewModel.grade);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PropertyHistoricListingModifierViewModel.name]: class ComposedPropertyHistoricListingModifierViewModel extends PropertyHistoricListingModifierViewModel {
		async map() {
			return {
				historicListingModifier: new HistoricListingModifierViewModel(await BaseServer.unwrap(this.$$model.historicListingModifier)),
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get historicListingModifier() {
					return ViewModel.mappings[HistoricListingModifierViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "historicListingModifier-PropertyHistoricListingModifierViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyHistoricListingModifierViewModel(null);
			"historicListingModifier" in data && (item.historicListingModifier = data.historicListingModifier && ViewModel.mappings[HistoricListingModifierViewModel.name].toViewModel(data.historicListingModifier));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: PropertyHistoricListingModifierViewModel) {
			let model: PropertyHistoricListingModifier;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PropertyHistoricListingModifier).find(viewModel.id)
			} else {
				model = new PropertyHistoricListingModifier();
			}
			
			"historicListingModifier" in viewModel && (model.historicListingModifier.id = viewModel.historicListingModifier ? viewModel.historicListingModifier.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[HistoricListingModifierViewModel.name]: class ComposedHistoricListingModifierViewModel extends HistoricListingModifierViewModel {
		async map() {
			return {
				description: this.$$model.description,
				id: this.$$model.id,
				name: this.$$model.name,
				shortName: this.$$model.shortName
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				description: true,
				id: true,
				name: true,
				shortName: true
			};
		};

		static toViewModel(data) {
			const item = new HistoricListingModifierViewModel(null);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortName" in data && (item.shortName = data.shortName === null ? null : `${data.shortName}`);

			return item;
		}

		static async toModel(viewModel: HistoricListingModifierViewModel) {
			let model: HistoricListingModifier;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(HistoricListingModifier).find(viewModel.id)
			} else {
				model = new HistoricListingModifier();
			}
			
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortName" in viewModel && (model.shortName = viewModel.shortName === null ? null : `${viewModel.shortName}`);

			return model;
		}
	},
	[ImpressionViewModel.name]: class ComposedImpressionViewModel extends ImpressionViewModel {
		async map() {
			return {
				id: this.$$model.id,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new ImpressionViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: ImpressionViewModel) {
			let model: Impression;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Impression).find(viewModel.id)
			} else {
				model = new Impression();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[LawHouseSessionSummaryModel.name]: class ComposedLawHouseSessionSummaryModel extends LawHouseSessionSummaryModel {
		async map() {
			return {
				scope: new DistrictViewModel(await BaseServer.unwrap(this.$$model.scope)),
				ended: this.$$model.ended,
				id: this.$$model.id,
				started: this.$$model.started
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get scope() {
					return ViewModel.mappings[DistrictViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "scope-LawHouseSessionSummaryModel"]
					);
				},
				ended: true,
				id: true,
				started: true
			};
		};

		static toViewModel(data) {
			const item = new LawHouseSessionSummaryModel(null);
			"scope" in data && (item.scope = data.scope && ViewModel.mappings[DistrictViewModel.name].toViewModel(data.scope));
			"ended" in data && (item.ended = data.ended === null ? null : new Date(data.ended));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"started" in data && (item.started = data.started === null ? null : new Date(data.started));

			return item;
		}

		static async toModel(viewModel: LawHouseSessionSummaryModel) {
			let model: LawHouseSession;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(LawHouseSession).find(viewModel.id)
			} else {
				model = new LawHouseSession();
			}
			
			"scope" in viewModel && (model.scope.id = viewModel.scope ? viewModel.scope.id : null);
			"ended" in viewModel && (model.ended = viewModel.ended === null ? null : new Date(viewModel.ended));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"started" in viewModel && (model.started = viewModel.started === null ? null : new Date(viewModel.started));

			return model;
		}
	},
	[LawHouseSessionaryViewModel.name]: class ComposedLawHouseSessionaryViewModel extends LawHouseSessionaryViewModel {
		async map() {
			return {
				resident: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.resident)),
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get resident() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "resident-LawHouseSessionaryViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new LawHouseSessionaryViewModel(null);
			"resident" in data && (item.resident = data.resident && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.resident));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: LawHouseSessionaryViewModel) {
			let model: LawHouseSessionary;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(LawHouseSessionary).find(viewModel.id)
			} else {
				model = new LawHouseSessionary();
			}
			
			"resident" in viewModel && (model.resident.id = viewModel.resident ? viewModel.resident.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[LawHouseSessionProtocolViewModel.name]: class ComposedLawHouseSessionProtocolViewModel extends LawHouseSessionProtocolViewModel {
		async map() {
			return {
				person: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.person)),
				id: this.$$model.id,
				message: this.$$model.message,
				said: this.$$model.said
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get person() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "person-LawHouseSessionProtocolViewModel"]
					);
				},
				id: true,
				message: true,
				said: true
			};
		};

		static toViewModel(data) {
			const item = new LawHouseSessionProtocolViewModel(null);
			"person" in data && (item.person = data.person && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.person));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"message" in data && (item.message = data.message === null ? null : `${data.message}`);
			"said" in data && (item.said = data.said === null ? null : new Date(data.said));

			return item;
		}

		static async toModel(viewModel: LawHouseSessionProtocolViewModel) {
			let model: LawHouseSessionProtocol;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(LawHouseSessionProtocol).find(viewModel.id)
			} else {
				model = new LawHouseSessionProtocol();
			}
			
			"person" in viewModel && (model.person.id = viewModel.person ? viewModel.person.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"message" in viewModel && (model.message = viewModel.message === null ? null : `${viewModel.message}`);
			"said" in viewModel && (model.said = viewModel.said === null ? null : new Date(viewModel.said));

			return model;
		}
	},
	[LegalEntityViewModel.name]: class ComposedLegalEntityViewModel extends LegalEntityViewModel {
		async map() {
			return {
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.$$model.borough)),
				company: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.company)),
				resident: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.resident)),
				id: this.$$model.id,
				state: this.$$model.state
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get borough() {
					return ViewModel.mappings[BoroughSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "borough-LegalEntityViewModel"]
					);
				},
				get company() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "company-LegalEntityViewModel"]
					);
				},
				get resident() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "resident-LegalEntityViewModel"]
					);
				},
				id: true,
				state: true
			};
		};

		static toViewModel(data) {
			const item = new LegalEntityViewModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"company" in data && (item.company = data.company && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.company));
			"resident" in data && (item.resident = data.resident && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.resident));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"state" in data && (item.state = !!data.state);

			return item;
		}

		static async toModel(viewModel: LegalEntityViewModel) {
			let model: LegalEntity;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(LegalEntity).find(viewModel.id)
			} else {
				model = new LegalEntity();
			}
			
			"borough" in viewModel && (model.borough.id = viewModel.borough ? viewModel.borough.id : null);
			"company" in viewModel && (model.company.id = viewModel.company ? viewModel.company.id : null);
			"resident" in viewModel && (model.resident.id = viewModel.resident ? viewModel.resident.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"state" in viewModel && (model.state = !!viewModel.state);

			return model;
		}
	},
	[NameFrequencyViewModel.name]: class ComposedNameFrequencyViewModel extends NameFrequencyViewModel {
		async map() {
			return {
				name: this.$$model.name,
				count: this.$$model.count
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				name: true,
				count: true
			};
		};

		static toViewModel(data) {
			const item = new NameFrequencyViewModel(null);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"count" in data && (item.count = data.count === null ? null : +data.count);

			return item;
		}

		static async toModel(viewModel: NameFrequencyViewModel) {
			const model = new NameFrequency();
			
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"count" in viewModel && (model.count = viewModel.count === null ? null : +viewModel.count);

			return model;
		}
	},
	[ResidentSummaryModel.name]: class ComposedResidentSummaryModel extends ResidentSummaryModel {
		async map() {
			return {
				birthday: this.$$model.birthday,
				familyName: this.$$model.familyName,
				givenName: this.$$model.givenName,
				id: this.$$model.id,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				birthday: true,
				familyName: true,
				givenName: true,
				id: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new ResidentSummaryModel(null);
			"birthday" in data && (item.birthday = data.birthday === null ? null : new Date(data.birthday));
			"familyName" in data && (item.familyName = data.familyName === null ? null : `${data.familyName}`);
			"givenName" in data && (item.givenName = data.givenName === null ? null : `${data.givenName}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: ResidentSummaryModel) {
			let model: Resident;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Resident).find(viewModel.id)
			} else {
				model = new Resident();
			}
			
			"birthday" in viewModel && (model.birthday = viewModel.birthday === null ? null : new Date(viewModel.birthday));
			"familyName" in viewModel && (model.familyName = viewModel.familyName === null ? null : `${viewModel.familyName}`);
			"givenName" in viewModel && (model.givenName = viewModel.givenName === null ? null : `${viewModel.givenName}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[ResidentViewModel.name]: class ComposedResidentViewModel extends ResidentViewModel {
		async map() {
			return {
				mainTenancy: new TenancyViewModel(await BaseServer.unwrap(this.$$model.mainTenancy)),
				workContracts: (await this.$$model.workContracts.includeTree(ViewModel.mappings[WorkContractEmploymentModel.name].items).toArray()).map(item => new WorkContractEmploymentModel(item)),
				biography: this.$$model.biography,
				birthday: this.$$model.birthday,
				compassEconomic: this.$$model.compassEconomic,
				compassSocial: this.$$model.compassSocial,
				familyName: this.$$model.familyName,
				givenName: this.$$model.givenName,
				id: this.$$model.id,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get mainTenancy() {
					return ViewModel.mappings[TenancyViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "mainTenancy-ResidentViewModel"]
					);
				},
				get workContracts() {
					return ViewModel.mappings[WorkContractEmploymentModel.name].getPrefetchingProperties(
						level,
						[...parents, "workContracts-ResidentViewModel"]
					);
				},
				biography: true,
				birthday: true,
				compassEconomic: true,
				compassSocial: true,
				familyName: true,
				givenName: true,
				id: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new ResidentViewModel(null);
			"mainTenancy" in data && (item.mainTenancy = data.mainTenancy && ViewModel.mappings[TenancyViewModel.name].toViewModel(data.mainTenancy));
			"workContracts" in data && (item.workContracts = data.workContracts && [...data.workContracts].map(i => ViewModel.mappings[WorkContractEmploymentModel.name].toViewModel(i)));
			"biography" in data && (item.biography = data.biography === null ? null : `${data.biography}`);
			"birthday" in data && (item.birthday = data.birthday === null ? null : new Date(data.birthday));
			"compassEconomic" in data && (item.compassEconomic = data.compassEconomic === null ? null : +data.compassEconomic);
			"compassSocial" in data && (item.compassSocial = data.compassSocial === null ? null : +data.compassSocial);
			"familyName" in data && (item.familyName = data.familyName === null ? null : `${data.familyName}`);
			"givenName" in data && (item.givenName = data.givenName === null ? null : `${data.givenName}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: ResidentViewModel) {
			let model: Resident;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Resident).find(viewModel.id)
			} else {
				model = new Resident();
			}
			
			"mainTenancy" in viewModel && (model.mainTenancy.id = viewModel.mainTenancy ? viewModel.mainTenancy.id : null);
			"workContracts" in viewModel && (null);
			"biography" in viewModel && (model.biography = viewModel.biography === null ? null : `${viewModel.biography}`);
			"birthday" in viewModel && (model.birthday = viewModel.birthday === null ? null : new Date(viewModel.birthday));
			"compassEconomic" in viewModel && (model.compassEconomic = viewModel.compassEconomic === null ? null : +viewModel.compassEconomic);
			"compassSocial" in viewModel && (model.compassSocial = viewModel.compassSocial === null ? null : +viewModel.compassSocial);
			"familyName" in viewModel && (model.familyName = viewModel.familyName === null ? null : `${viewModel.familyName}`);
			"givenName" in viewModel && (model.givenName = viewModel.givenName === null ? null : `${viewModel.givenName}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[ResidentRelationViewModel.name]: class ComposedResidentRelationViewModel extends ResidentRelationViewModel {
		async map() {
			return {
				initiator: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.initiator)),
				peer: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.peer)),
				bonded: this.$$model.bonded,
				conflict: this.$$model.conflict,
				connection: this.$$model.connection,
				ended: this.$$model.ended,
				id: this.$$model.id,
				purpose: this.$$model.purpose
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get initiator() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "initiator-ResidentRelationViewModel"]
					);
				},
				get peer() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "peer-ResidentRelationViewModel"]
					);
				},
				bonded: true,
				conflict: true,
				connection: true,
				ended: true,
				id: true,
				purpose: true
			};
		};

		static toViewModel(data) {
			const item = new ResidentRelationViewModel(null);
			"initiator" in data && (item.initiator = data.initiator && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.initiator));
			"peer" in data && (item.peer = data.peer && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.peer));
			"bonded" in data && (item.bonded = data.bonded === null ? null : new Date(data.bonded));
			"conflict" in data && (item.conflict = data.conflict === null ? null : `${data.conflict}`);
			"connection" in data && (item.connection = data.connection === null ? null : `${data.connection}`);
			"ended" in data && (item.ended = data.ended === null ? null : new Date(data.ended));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"purpose" in data && (item.purpose = data.purpose === null ? null : `${data.purpose}`);

			return item;
		}

		static async toModel(viewModel: ResidentRelationViewModel) {
			let model: ResidentRelationship;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(ResidentRelationship).find(viewModel.id)
			} else {
				model = new ResidentRelationship();
			}
			
			"initiator" in viewModel && (model.initiator.id = viewModel.initiator ? viewModel.initiator.id : null);
			"peer" in viewModel && (model.peer.id = viewModel.peer ? viewModel.peer.id : null);
			"bonded" in viewModel && (model.bonded = viewModel.bonded === null ? null : new Date(viewModel.bonded));
			"conflict" in viewModel && (model.conflict = viewModel.conflict === null ? null : `${viewModel.conflict}`);
			"connection" in viewModel && (model.connection = viewModel.connection === null ? null : `${viewModel.connection}`);
			"ended" in viewModel && (model.ended = viewModel.ended === null ? null : new Date(viewModel.ended));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"purpose" in viewModel && (model.purpose = viewModel.purpose === null ? null : `${viewModel.purpose}`);

			return model;
		}
	},
	[DwellingViewModel.name]: class ComposedDwellingViewModel extends DwellingViewModel {
		async map() {
			return {
				property: new PropertySummaryModel(await BaseServer.unwrap(this.$$model.property)),
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get property() {
					return ViewModel.mappings[PropertySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "property-DwellingViewModel"]
					);
				},
				id: true
			};
		};

		static toViewModel(data) {
			const item = new DwellingViewModel(null);
			"property" in data && (item.property = data.property && ViewModel.mappings[PropertySummaryModel.name].toViewModel(data.property));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: DwellingViewModel) {
			let model: Dwelling;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Dwelling).find(viewModel.id)
			} else {
				model = new Dwelling();
			}
			
			"property" in viewModel && (model.property.id = viewModel.property ? viewModel.property.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[TenancyViewModel.name]: class ComposedTenancyViewModel extends TenancyViewModel {
		async map() {
			return {
				dwelling: new DwellingViewModel(await BaseServer.unwrap(this.$$model.dwelling)),
				end: this.$$model.end,
				id: this.$$model.id,
				start: this.$$model.start
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get dwelling() {
					return ViewModel.mappings[DwellingViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "dwelling-TenancyViewModel"]
					);
				},
				end: true,
				id: true,
				start: true
			};
		};

		static toViewModel(data) {
			const item = new TenancyViewModel(null);
			"dwelling" in data && (item.dwelling = data.dwelling && ViewModel.mappings[DwellingViewModel.name].toViewModel(data.dwelling));
			"end" in data && (item.end = data.end === null ? null : new Date(data.end));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"start" in data && (item.start = data.start === null ? null : new Date(data.start));

			return item;
		}

		static async toModel(viewModel: TenancyViewModel) {
			let model: Tenancy;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Tenancy).find(viewModel.id)
			} else {
				model = new Tenancy();
			}
			
			"dwelling" in viewModel && (model.dwelling.id = viewModel.dwelling ? viewModel.dwelling.id : null);
			"end" in viewModel && (model.end = viewModel.end === null ? null : new Date(viewModel.end));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"start" in viewModel && (model.start = viewModel.start === null ? null : new Date(viewModel.start));

			return model;
		}
	},
	[ResidentEventViewModel.name]: class ComposedResidentEventViewModel extends ResidentEventViewModel {
		async map() {
			return {
				id: this.$$model.id,
				timestamp: this.$$model.timestamp,
				action: this.$$model.action,
				detail: this.$$model.detail
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				timestamp: true,
				action: true,
				detail: true
			};
		};

		static toViewModel(data) {
			const item = new ResidentEventViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"timestamp" in data && (item.timestamp = data.timestamp === null ? null : new Date(data.timestamp));
			"action" in data && (item.action = data.action === null ? null : `${data.action}`);
			"detail" in data && (item.detail = data.detail === null ? null : `${data.detail}`);

			return item;
		}

		static async toModel(viewModel: ResidentEventViewModel) {
			let model: ResidentEventView;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(ResidentEventView).find(viewModel.id)
			} else {
				model = new ResidentEventView();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"timestamp" in viewModel && (model.timestamp = viewModel.timestamp === null ? null : new Date(viewModel.timestamp));
			"action" in viewModel && (model.action = viewModel.action === null ? null : `${viewModel.action}`);
			"detail" in viewModel && (model.detail = viewModel.detail === null ? null : `${viewModel.detail}`);

			return model;
		}
	},
	[ResidentTickerModel.name]: class ComposedResidentTickerModel extends ResidentTickerModel {
		async map() {
			return {
				id: this.$$model.id,
				timestamp: this.$$model.timestamp,
				primaryResidentId: this.$$model.primaryResidentId,
				action: this.$$model.action
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				timestamp: true,
				primaryResidentId: true,
				action: true
			};
		};

		static toViewModel(data) {
			const item = new ResidentTickerModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"timestamp" in data && (item.timestamp = data.timestamp === null ? null : new Date(data.timestamp));
			"primaryResidentId" in data && (item.primaryResidentId = data.primaryResidentId === null ? null : `${data.primaryResidentId}`);
			"action" in data && (item.action = data.action === null ? null : `${data.action}`);

			return item;
		}

		static async toModel(viewModel: ResidentTickerModel) {
			let model: ResidentEventView;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(ResidentEventView).find(viewModel.id)
			} else {
				model = new ResidentEventView();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"timestamp" in viewModel && (model.timestamp = viewModel.timestamp === null ? null : new Date(viewModel.timestamp));
			"primaryResidentId" in viewModel && (model.primaryResidentId = viewModel.primaryResidentId === null ? null : `${viewModel.primaryResidentId}`);
			"action" in viewModel && (model.action = viewModel.action === null ? null : `${viewModel.action}`);

			return model;
		}
	},
	[MetricViewModel.name]: class ComposedMetricViewModel extends MetricViewModel {
		async map() {
			return {
				description: this.$$model.description,
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				description: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new MetricViewModel(null);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: MetricViewModel) {
			let model: Metric;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Metric).find(viewModel.id)
			} else {
				model = new Metric();
			}
			
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[MetricValueViewModel.name]: class ComposedMetricValueViewModel extends MetricValueViewModel {
		async map() {
			return {
				elapsed: this.$$model.elapsed,
				formatted: this.$$model.formatted,
				id: this.$$model.id,
				updated: this.$$model.updated,
				value: this.$$model.value
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				elapsed: true,
				formatted: true,
				id: true,
				updated: true,
				value: true
			};
		};

		static toViewModel(data) {
			const item = new MetricValueViewModel(null);
			"elapsed" in data && (item.elapsed = data.elapsed === null ? null : +data.elapsed);
			"formatted" in data && (item.formatted = data.formatted === null ? null : `${data.formatted}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"updated" in data && (item.updated = data.updated === null ? null : new Date(data.updated));
			"value" in data && (item.value = data.value === null ? null : +data.value);

			return item;
		}

		static async toModel(viewModel: MetricValueViewModel) {
			let model: MetricValue;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(MetricValue).find(viewModel.id)
			} else {
				model = new MetricValue();
			}
			
			"elapsed" in viewModel && (model.elapsed = viewModel.elapsed === null ? null : +viewModel.elapsed);
			"formatted" in viewModel && (model.formatted = viewModel.formatted === null ? null : `${viewModel.formatted}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"updated" in viewModel && (model.updated = viewModel.updated === null ? null : new Date(viewModel.updated));
			"value" in viewModel && (model.value = viewModel.value === null ? null : +viewModel.value);

			return model;
		}
	},
	[OracleProposalSummaryModel.name]: class ComposedOracleProposalSummaryModel extends OracleProposalSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				lore: this.$$model.lore
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				lore: true
			};
		};

		static toViewModel(data) {
			const item = new OracleProposalSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"lore" in data && (item.lore = data.lore === null ? null : `${data.lore}`);

			return item;
		}

		static async toModel(viewModel: OracleProposalSummaryModel) {
			let model: OracleProposal;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(OracleProposal).find(viewModel.id)
			} else {
				model = new OracleProposal();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"lore" in viewModel && (model.lore = viewModel.lore === null ? null : `${viewModel.lore}`);

			return model;
		}
	},
	[PlanSummaryModel.name]: class ComposedPlanSummaryModel extends PlanSummaryModel {
		async map() {
			return {
				author: new LegalEntityViewModel(await BaseServer.unwrap(this.$$model.author)),
				id: this.$$model.id,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get author() {
					return ViewModel.mappings[LegalEntityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "author-PlanSummaryModel"]
					);
				},
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PlanSummaryModel(null);
			"author" in data && (item.author = data.author && ViewModel.mappings[LegalEntityViewModel.name].toViewModel(data.author));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: PlanSummaryModel) {
			let model: Plan;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Plan).find(viewModel.id)
			} else {
				model = new Plan();
			}
			
			"author" in viewModel && (model.author.id = viewModel.author ? viewModel.author.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[PlanShapeViewModel.name]: class ComposedPlanShapeViewModel extends PlanShapeViewModel {
		async map() {
			return {
				archived: this.$$model.archived,
				closed: this.$$model.closed,
				fill: this.$$model.fill,
				id: this.$$model.id,
				label: this.$$model.label,
				path: this.$$model.path,
				stroke: this.$$model.stroke
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				archived: true,
				closed: true,
				fill: true,
				id: true,
				label: true,
				path: true,
				stroke: true
			};
		};

		static toViewModel(data) {
			const item = new PlanShapeViewModel(null);
			"archived" in data && (item.archived = data.archived === null ? null : new Date(data.archived));
			"closed" in data && (item.closed = !!data.closed);
			"fill" in data && (item.fill = data.fill === null ? null : `${data.fill}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"label" in data && (item.label = data.label === null ? null : `${data.label}`);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);
			"stroke" in data && (item.stroke = data.stroke === null ? null : `${data.stroke}`);

			return item;
		}

		static async toModel(viewModel: PlanShapeViewModel) {
			let model: PlanShape;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PlanShape).find(viewModel.id)
			} else {
				model = new PlanShape();
			}
			
			"archived" in viewModel && (model.archived = viewModel.archived === null ? null : new Date(viewModel.archived));
			"closed" in viewModel && (model.closed = !!viewModel.closed);
			"fill" in viewModel && (model.fill = viewModel.fill === null ? null : `${viewModel.fill}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"label" in viewModel && (model.label = viewModel.label === null ? null : `${viewModel.label}`);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);
			"stroke" in viewModel && (model.stroke = viewModel.stroke === null ? null : `${viewModel.stroke}`);

			return model;
		}
	},
	[BuildingShapeModel.name]: class ComposedBuildingShapeModel extends BuildingShapeModel {
		async map() {
			return {
				boundary: this.$$model.boundary,
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				boundary: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new BuildingShapeModel(null);
			"boundary" in data && (item.boundary = data.boundary === null ? null : `${data.boundary}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: BuildingShapeModel) {
			let model: Building;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Building).find(viewModel.id)
			} else {
				model = new Building();
			}
			
			"boundary" in viewModel && (model.boundary = viewModel.boundary === null ? null : `${viewModel.boundary}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[PlotBoundaryShapeModel.name]: class ComposedPlotBoundaryShapeModel extends PlotBoundaryShapeModel {
		async map() {
			return {
				id: this.$$model.id,
				shape: this.$$model.shape
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				shape: true
			};
		};

		static toViewModel(data) {
			const item = new PlotBoundaryShapeModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"shape" in data && (item.shape = data.shape === null ? null : `${data.shape}`);

			return item;
		}

		static async toModel(viewModel: PlotBoundaryShapeModel) {
			let model: PlotBoundary;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PlotBoundary).find(viewModel.id)
			} else {
				model = new PlotBoundary();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"shape" in viewModel && (model.shape = viewModel.shape === null ? null : `${viewModel.shape}`);

			return model;
		}
	},
	[ArticleNewstickerModel.name]: class ComposedArticleNewstickerModel extends ArticleNewstickerModel {
		async map() {
			return {
				id: this.$$model.id,
				published: this.$$model.published,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				published: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new ArticleNewstickerModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"published" in data && (item.published = data.published === null ? null : new Date(data.published));
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: ArticleNewstickerModel) {
			let model: Article;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Article).find(viewModel.id)
			} else {
				model = new Article();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"published" in viewModel && (model.published = viewModel.published === null ? null : new Date(viewModel.published));
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[ArticlePreviewModel.name]: class ComposedArticlePreviewModel extends ArticlePreviewModel {
		async map() {
			return {
				images: (await this.$$model.images.includeTree(ViewModel.mappings[ArticleImageViewModel.name].items).toArray()).map(item => new ArticleImageViewModel(item)),
				oracleProposal: new OracleProposalSummaryModel(await BaseServer.unwrap(this.$$model.oracleProposal)),
				publication: new PublicationSummaryModel(await BaseServer.unwrap(this.$$model.publication)),
				body: this.$$model.body,
				id: this.$$model.id,
				published: this.$$model.published,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get images() {
					return ViewModel.mappings[ArticleImageViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "images-ArticlePreviewModel"]
					);
				},
				get oracleProposal() {
					return ViewModel.mappings[OracleProposalSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "oracleProposal-ArticlePreviewModel"]
					);
				},
				get publication() {
					return ViewModel.mappings[PublicationSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "publication-ArticlePreviewModel"]
					);
				},
				body: true,
				id: true,
				published: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new ArticlePreviewModel(null);
			"images" in data && (item.images = data.images && [...data.images].map(i => ViewModel.mappings[ArticleImageViewModel.name].toViewModel(i)));
			"oracleProposal" in data && (item.oracleProposal = data.oracleProposal && ViewModel.mappings[OracleProposalSummaryModel.name].toViewModel(data.oracleProposal));
			"publication" in data && (item.publication = data.publication && ViewModel.mappings[PublicationSummaryModel.name].toViewModel(data.publication));
			"body" in data && (item.body = data.body === null ? null : `${data.body}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"published" in data && (item.published = data.published === null ? null : new Date(data.published));
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: ArticlePreviewModel) {
			let model: Article;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Article).find(viewModel.id)
			} else {
				model = new Article();
			}
			
			"images" in viewModel && (null);
			"oracleProposal" in viewModel && (model.oracleProposal.id = viewModel.oracleProposal ? viewModel.oracleProposal.id : null);
			"publication" in viewModel && (model.publication.id = viewModel.publication ? viewModel.publication.id : null);
			"body" in viewModel && (model.body = viewModel.body === null ? null : `${viewModel.body}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"published" in viewModel && (model.published = viewModel.published === null ? null : new Date(viewModel.published));
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[ArticleOpinionViewModel.name]: class ComposedArticleOpinionViewModel extends ArticleOpinionViewModel {
		async map() {
			return {
				author: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.author)),
				comment: this.$$model.comment,
				commented: this.$$model.commented,
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get author() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "author-ArticleOpinionViewModel"]
					);
				},
				comment: true,
				commented: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new ArticleOpinionViewModel(null);
			"author" in data && (item.author = data.author && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.author));
			"comment" in data && (item.comment = data.comment === null ? null : `${data.comment}`);
			"commented" in data && (item.commented = data.commented === null ? null : new Date(data.commented));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: ArticleOpinionViewModel) {
			let model: ArticleOpinion;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(ArticleOpinion).find(viewModel.id)
			} else {
				model = new ArticleOpinion();
			}
			
			"author" in viewModel && (model.author.id = viewModel.author ? viewModel.author.id : null);
			"comment" in viewModel && (model.comment = viewModel.comment === null ? null : `${viewModel.comment}`);
			"commented" in viewModel && (model.commented = viewModel.commented === null ? null : new Date(viewModel.commented));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[ArticleImageViewModel.name]: class ComposedArticleImageViewModel extends ArticleImageViewModel {
		async map() {
			return {
				caption: this.$$model.caption,
				id: this.$$model.id
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				caption: true,
				id: true
			};
		};

		static toViewModel(data) {
			const item = new ArticleImageViewModel(null);
			"caption" in data && (item.caption = data.caption === null ? null : `${data.caption}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);

			return item;
		}

		static async toModel(viewModel: ArticleImageViewModel) {
			let model: ArticleImage;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(ArticleImage).find(viewModel.id)
			} else {
				model = new ArticleImage();
			}
			
			"caption" in viewModel && (model.caption = viewModel.caption === null ? null : `${viewModel.caption}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);

			return model;
		}
	},
	[PublicationSummaryModel.name]: class ComposedPublicationSummaryModel extends PublicationSummaryModel {
		async map() {
			return {
				company: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.company)),
				description: this.$$model.description,
				id: this.$$model.id,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get company() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "company-PublicationSummaryModel"]
					);
				},
				description: true,
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PublicationSummaryModel(null);
			"company" in data && (item.company = data.company && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.company));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: PublicationSummaryModel) {
			let model: Publication;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Publication).find(viewModel.id)
			} else {
				model = new Publication();
			}
			
			"company" in viewModel && (model.company.id = viewModel.company ? viewModel.company.id : null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[ChatInteractionViewModel.name]: class ComposedChatInteractionViewModel extends ChatInteractionViewModel {
		async map() {
			return {
				containsInformationRequest: this.$$model.containsInformationRequest,
				id: this.$$model.id,
				question: this.$$model.question,
				responded: this.$$model.responded,
				response: this.$$model.response
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				containsInformationRequest: true,
				id: true,
				question: true,
				responded: true,
				response: true
			};
		};

		static toViewModel(data) {
			const item = new ChatInteractionViewModel(null);
			"containsInformationRequest" in data && (item.containsInformationRequest = !!data.containsInformationRequest);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"question" in data && (item.question = data.question === null ? null : `${data.question}`);
			"responded" in data && (item.responded = data.responded === null ? null : new Date(data.responded));
			"response" in data && (item.response = data.response === null ? null : `${data.response}`);

			return item;
		}

		static async toModel(viewModel: ChatInteractionViewModel) {
			let model: ChatInteraction;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(ChatInteraction).find(viewModel.id)
			} else {
				model = new ChatInteraction();
			}
			
			"containsInformationRequest" in viewModel && (model.containsInformationRequest = !!viewModel.containsInformationRequest);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"question" in viewModel && (model.question = viewModel.question === null ? null : `${viewModel.question}`);
			"responded" in viewModel && (model.responded = viewModel.responded === null ? null : new Date(viewModel.responded));
			"response" in viewModel && (model.response = viewModel.response === null ? null : `${viewModel.response}`);

			return model;
		}
	},
	[AssetViewModel.name]: class ComposedAssetViewModel extends AssetViewModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
				value: this.$$model.value
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				name: true,
				value: true
			};
		};

		static toViewModel(data) {
			const item = new AssetViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"value" in data && (item.value = data.value === null ? null : +data.value);

			return item;
		}

		static async toModel(viewModel: AssetViewModel) {
			let model: Asset;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Asset).find(viewModel.id)
			} else {
				model = new Asset();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"value" in viewModel && (model.value = viewModel.value === null ? null : +viewModel.value);

			return model;
		}
	},
	[ValuationSummaryModel.name]: class ComposedValuationSummaryModel extends ValuationSummaryModel {
		async map() {
			return {
				id: this.$$model.id,
				price: this.$$model.price
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				price: true
			};
		};

		static toViewModel(data) {
			const item = new ValuationSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"price" in data && (item.price = data.price === null ? null : +data.price);

			return item;
		}

		static async toModel(viewModel: ValuationSummaryModel) {
			let model: Valuation;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Valuation).find(viewModel.id)
			} else {
				model = new Valuation();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"price" in viewModel && (model.price = viewModel.price === null ? null : +viewModel.price);

			return model;
		}
	},
	[TrainStationExitViewModel.name]: class ComposedTrainStationExitViewModel extends TrainStationExitViewModel {
		async map() {
			return {
				station: new TrainStationViewModel(await BaseServer.unwrap(this.$$model.station)),
				id: this.$$model.id,
				inbound: this.$$model.inbound,
				position: this.$$model.position
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get station() {
					return ViewModel.mappings[TrainStationViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "station-TrainStationExitViewModel"]
					);
				},
				id: true,
				inbound: true,
				position: true
			};
		};

		static toViewModel(data) {
			const item = new TrainStationExitViewModel(null);
			"station" in data && (item.station = data.station && ViewModel.mappings[TrainStationViewModel.name].toViewModel(data.station));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"inbound" in data && (item.inbound = !!data.inbound);
			"position" in data && (item.position = data.position === null ? null : `${data.position}`);

			return item;
		}

		static async toModel(viewModel: TrainStationExitViewModel) {
			let model: TrainStationExit;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainStationExit).find(viewModel.id)
			} else {
				model = new TrainStationExit();
			}
			
			"station" in viewModel && (model.station.id = viewModel.station ? viewModel.station.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"inbound" in viewModel && (model.inbound = !!viewModel.inbound);
			"position" in viewModel && (model.position = viewModel.position === null ? null : `${viewModel.position}`);

			return model;
		}
	},
	[TrainRouteSummaryModel.name]: class ComposedTrainRouteSummaryModel extends TrainRouteSummaryModel {
		async map() {
			return {
				closed: this.$$model.closed,
				code: this.$$model.code,
				color: this.$$model.color,
				id: this.$$model.id,
				name: this.$$model.name,
				opened: this.$$model.opened,
				textColor: this.$$model.textColor
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				closed: true,
				code: true,
				color: true,
				id: true,
				name: true,
				opened: true,
				textColor: true
			};
		};

		static toViewModel(data) {
			const item = new TrainRouteSummaryModel(null);
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"opened" in data && (item.opened = data.opened === null ? null : new Date(data.opened));
			"textColor" in data && (item.textColor = data.textColor === null ? null : `${data.textColor}`);

			return item;
		}

		static async toModel(viewModel: TrainRouteSummaryModel) {
			let model: TrainRoute;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainRoute).find(viewModel.id)
			} else {
				model = new TrainRoute();
			}
			
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"opened" in viewModel && (model.opened = viewModel.opened === null ? null : new Date(viewModel.opened));
			"textColor" in viewModel && (model.textColor = viewModel.textColor === null ? null : `${viewModel.textColor}`);

			return model;
		}
	},
	[TrainRoutePathViewModel.name]: class ComposedTrainRoutePathViewModel extends TrainRoutePathViewModel {
		async map() {
			return {
				id: this.$$model.id,
				path: this.$$model.path
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				path: true
			};
		};

		static toViewModel(data) {
			const item = new TrainRoutePathViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);

			return item;
		}

		static async toModel(viewModel: TrainRoutePathViewModel) {
			let model: TrainRoutePath;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainRoutePath).find(viewModel.id)
			} else {
				model = new TrainRoutePath();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);

			return model;
		}
	},
	[TrainStationViewModel.name]: class ComposedTrainStationViewModel extends TrainStationViewModel {
		async map() {
			return {
				property: new PropertySummaryModel(await BaseServer.unwrap(this.$$model.property)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get property() {
					return ViewModel.mappings[PropertySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "property-TrainStationViewModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new TrainStationViewModel(null);
			"property" in data && (item.property = data.property && ViewModel.mappings[PropertySummaryModel.name].toViewModel(data.property));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: TrainStationViewModel) {
			let model: TrainStation;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainStation).find(viewModel.id)
			} else {
				model = new TrainStation();
			}
			
			"property" in viewModel && (model.property.id = viewModel.property ? viewModel.property.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PropertyTrainStationViewModel.name]: class ComposedPropertyTrainStationViewModel extends PropertyTrainStationViewModel {
		async map() {
			return {
				stops: (await this.$$model.stops.includeTree(ViewModel.mappings[StationTrainStopViewModel.name].items).toArray()).map(item => new StationTrainStopViewModel(item)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get stops() {
					return ViewModel.mappings[StationTrainStopViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "stops-PropertyTrainStationViewModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyTrainStationViewModel(null);
			"stops" in data && (item.stops = data.stops && [...data.stops].map(i => ViewModel.mappings[StationTrainStopViewModel.name].toViewModel(i)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: PropertyTrainStationViewModel) {
			let model: TrainStation;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainStation).find(viewModel.id)
			} else {
				model = new TrainStation();
			}
			
			"stops" in viewModel && (null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[TrainStopViewModel.name]: class ComposedTrainStopViewModel extends TrainStopViewModel {
		async map() {
			return {
				closed: this.$$model.closed,
				id: this.$$model.id,
				name: this.$$model.name,
				opened: this.$$model.opened,
				stationId: this.$$model.stationId,
				trackPosition: this.$$model.trackPosition
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				closed: true,
				id: true,
				name: true,
				opened: true,
				stationId: true,
				trackPosition: true
			};
		};

		static toViewModel(data) {
			const item = new TrainStopViewModel(null);
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"opened" in data && (item.opened = data.opened === null ? null : new Date(data.opened));
			"stationId" in data && (item.stationId = data.stationId === null ? null : `${data.stationId}`);
			"trackPosition" in data && (item.trackPosition = data.trackPosition === null ? null : `${data.trackPosition}`);

			return item;
		}

		static async toModel(viewModel: TrainStopViewModel) {
			let model: TrainStop;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainStop).find(viewModel.id)
			} else {
				model = new TrainStop();
			}
			
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"opened" in viewModel && (model.opened = viewModel.opened === null ? null : new Date(viewModel.opened));
			"stationId" in viewModel && (model.stationId = viewModel.stationId === null ? null : `${viewModel.stationId}`);
			"trackPosition" in viewModel && (model.trackPosition = viewModel.trackPosition === null ? null : `${viewModel.trackPosition}`);

			return model;
		}
	},
	[StationTrainStopViewModel.name]: class ComposedStationTrainStopViewModel extends StationTrainStopViewModel {
		async map() {
			return {
				route: new TrainRouteViewModel(await BaseServer.unwrap(this.$$model.route)),
				closed: this.$$model.closed,
				downPlatform: this.$$model.downPlatform,
				id: this.$$model.id,
				name: this.$$model.name,
				opened: this.$$model.opened,
				upPlatform: this.$$model.upPlatform
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get route() {
					return ViewModel.mappings[TrainRouteViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "route-StationTrainStopViewModel"]
					);
				},
				closed: true,
				downPlatform: true,
				id: true,
				name: true,
				opened: true,
				upPlatform: true
			};
		};

		static toViewModel(data) {
			const item = new StationTrainStopViewModel(null);
			"route" in data && (item.route = data.route && ViewModel.mappings[TrainRouteViewModel.name].toViewModel(data.route));
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"downPlatform" in data && (item.downPlatform = data.downPlatform === null ? null : `${data.downPlatform}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"opened" in data && (item.opened = data.opened === null ? null : new Date(data.opened));
			"upPlatform" in data && (item.upPlatform = data.upPlatform === null ? null : `${data.upPlatform}`);

			return item;
		}

		static async toModel(viewModel: StationTrainStopViewModel) {
			let model: TrainStop;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainStop).find(viewModel.id)
			} else {
				model = new TrainStop();
			}
			
			"route" in viewModel && (model.route.id = viewModel.route ? viewModel.route.id : null);
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"downPlatform" in viewModel && (model.downPlatform = viewModel.downPlatform === null ? null : `${viewModel.downPlatform}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"opened" in viewModel && (model.opened = viewModel.opened === null ? null : new Date(viewModel.opened));
			"upPlatform" in viewModel && (model.upPlatform = viewModel.upPlatform === null ? null : `${viewModel.upPlatform}`);

			return model;
		}
	},
	[BillViewModel.name]: class ComposedBillViewModel extends BillViewModel {
		async map() {
			return {
				honestiums: (await this.$$model.honestiums.includeTree(ViewModel.mappings[HonestiumViewModel.name].items).toArray()).map(item => new HonestiumViewModel(item)),
				scope: new DistrictViewModel(await BaseServer.unwrap(this.$$model.scope)),
				certified: this.$$model.certified,
				description: this.$$model.description,
				id: this.$$model.id,
				pro: this.$$model.pro,
				summary: this.$$model.summary,
				tag: this.$$model.tag,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get honestiums() {
					return ViewModel.mappings[HonestiumViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "honestiums-BillViewModel"]
					);
				},
				get scope() {
					return ViewModel.mappings[DistrictViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "scope-BillViewModel"]
					);
				},
				certified: true,
				description: true,
				id: true,
				pro: true,
				summary: true,
				tag: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new BillViewModel(null);
			"honestiums" in data && (item.honestiums = data.honestiums && [...data.honestiums].map(i => ViewModel.mappings[HonestiumViewModel.name].toViewModel(i)));
			"scope" in data && (item.scope = data.scope && ViewModel.mappings[DistrictViewModel.name].toViewModel(data.scope));
			"certified" in data && (item.certified = data.certified === null ? null : new Date(data.certified));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"pro" in data && (item.pro = !!data.pro);
			"summary" in data && (item.summary = data.summary === null ? null : `${data.summary}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: BillViewModel) {
			let model: Bill;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Bill).find(viewModel.id)
			} else {
				model = new Bill();
			}
			
			"honestiums" in viewModel && (null);
			"scope" in viewModel && (model.scope.id = viewModel.scope ? viewModel.scope.id : null);
			"certified" in viewModel && (model.certified = viewModel.certified === null ? null : new Date(viewModel.certified));
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"pro" in viewModel && (model.pro = !!viewModel.pro);
			"summary" in viewModel && (model.summary = viewModel.summary === null ? null : `${viewModel.summary}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[HonestiumViewModel.name]: class ComposedHonestiumViewModel extends HonestiumViewModel {
		async map() {
			return {
				answer: this.$$model.answer,
				answered: this.$$model.answered,
				id: this.$$model.id,
				pro: this.$$model.pro,
				question: this.$$model.question
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				answer: true,
				answered: true,
				id: true,
				pro: true,
				question: true
			};
		};

		static toViewModel(data) {
			const item = new HonestiumViewModel(null);
			"answer" in data && (item.answer = data.answer === null ? null : `${data.answer}`);
			"answered" in data && (item.answered = data.answered === null ? null : new Date(data.answered));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"pro" in data && (item.pro = !!data.pro);
			"question" in data && (item.question = data.question === null ? null : `${data.question}`);

			return item;
		}

		static async toModel(viewModel: HonestiumViewModel) {
			let model: BillHonestium;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(BillHonestium).find(viewModel.id)
			} else {
				model = new BillHonestium();
			}
			
			"answer" in viewModel && (model.answer = viewModel.answer === null ? null : `${viewModel.answer}`);
			"answered" in viewModel && (model.answered = viewModel.answered === null ? null : new Date(viewModel.answered));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"pro" in viewModel && (model.pro = !!viewModel.pro);
			"question" in viewModel && (model.question = viewModel.question === null ? null : `${viewModel.question}`);

			return model;
		}
	},
	[DistrictViewModel.name]: class ComposedDistrictViewModel extends DistrictViewModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
				parentId: this.$$model.parentId
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				name: true,
				parentId: true
			};
		};

		static toViewModel(data) {
			const item = new DistrictViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"parentId" in data && (item.parentId = data.parentId === null ? null : `${data.parentId}`);

			return item;
		}

		static async toModel(viewModel: DistrictViewModel) {
			let model: District;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(District).find(viewModel.id)
			} else {
				model = new District();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"parentId" in viewModel && (model.parentId = viewModel.parentId === null ? null : `${viewModel.parentId}`);

			return model;
		}
	},
	[OpenHonestiumViewModel.name]: class ComposedOpenHonestiumViewModel extends OpenHonestiumViewModel {
		async map() {
			return {
				bill: new BillViewModel(await BaseServer.unwrap(this.$$model.bill)),
				answer: this.$$model.answer,
				id: this.$$model.id,
				pro: this.$$model.pro,
				question: this.$$model.question
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get bill() {
					return ViewModel.mappings[BillViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "bill-OpenHonestiumViewModel"]
					);
				},
				answer: true,
				id: true,
				pro: true,
				question: true
			};
		};

		static toViewModel(data) {
			const item = new OpenHonestiumViewModel(null);
			"bill" in data && (item.bill = data.bill && ViewModel.mappings[BillViewModel.name].toViewModel(data.bill));
			"answer" in data && (item.answer = data.answer === null ? null : `${data.answer}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"pro" in data && (item.pro = !!data.pro);
			"question" in data && (item.question = data.question === null ? null : `${data.question}`);

			return item;
		}

		static async toModel(viewModel: OpenHonestiumViewModel) {
			let model: BillHonestium;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(BillHonestium).find(viewModel.id)
			} else {
				model = new BillHonestium();
			}
			
			"bill" in viewModel && (model.bill.id = viewModel.bill ? viewModel.bill.id : null);
			"answer" in viewModel && (model.answer = viewModel.answer === null ? null : `${viewModel.answer}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"pro" in viewModel && (model.pro = !!viewModel.pro);
			"question" in viewModel && (model.question = viewModel.question === null ? null : `${viewModel.question}`);

			return model;
		}
	},
	[VoteViewModel.name]: class ComposedVoteViewModel extends VoteViewModel {
		async map() {
			return {
				id: this.$$model.id,
				pro: this.$$model.pro,
				reason: this.$$model.reason,
				submitted: this.$$model.submitted
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				id: true,
				pro: true,
				reason: true,
				submitted: true
			};
		};

		static toViewModel(data) {
			const item = new VoteViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"pro" in data && (item.pro = !!data.pro);
			"reason" in data && (item.reason = data.reason === null ? null : `${data.reason}`);
			"submitted" in data && (item.submitted = data.submitted === null ? null : new Date(data.submitted));

			return item;
		}

		static async toModel(viewModel: VoteViewModel) {
			let model: Vote;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Vote).find(viewModel.id)
			} else {
				model = new Vote();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"pro" in viewModel && (model.pro = !!viewModel.pro);
			"reason" in viewModel && (model.reason = viewModel.reason === null ? null : `${viewModel.reason}`);
			"submitted" in viewModel && (model.submitted = viewModel.submitted === null ? null : new Date(viewModel.submitted));

			return model;
		}
	},
	[VoteTickerViewModel.name]: class ComposedVoteTickerViewModel extends VoteTickerViewModel {
		async map() {
			return {
				pro: this.$$model.pro,
				submitted: this.$$model.submitted
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				pro: true,
				submitted: true
			};
		};

		static toViewModel(data) {
			const item = new VoteTickerViewModel(null);
			"pro" in data && (item.pro = !!data.pro);
			"submitted" in data && (item.submitted = data.submitted === null ? null : new Date(data.submitted));

			return item;
		}

		static async toModel(viewModel: VoteTickerViewModel) {
			const model = new Vote();
			
			"pro" in viewModel && (model.pro = !!viewModel.pro);
			"submitted" in viewModel && (model.submitted = viewModel.submitted === null ? null : new Date(viewModel.submitted));

			return model;
		}
	},
	[CompanyViewModel.name]: class ComposedCompanyViewModel extends CompanyViewModel {
		async map() {
			return {
				offices: (await this.$$model.offices.includeTree(ViewModel.mappings[OfficeSummaryModel.name].items).toArray()).map(item => new OfficeSummaryModel(item)),
				banner: this.$$model.banner,
				created: this.$$model.created,
				description: this.$$model.description,
				id: this.$$model.id,
				incorporated: this.$$model.incorporated,
				name: this.$$model.name,
				purpose: this.$$model.purpose,
				tag: this.$$model.tag,
				type: this.$$model.type
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get offices() {
					return ViewModel.mappings[OfficeSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "offices-CompanyViewModel"]
					);
				},
				banner: true,
				created: true,
				description: true,
				id: true,
				incorporated: true,
				name: true,
				purpose: true,
				tag: true,
				type: true
			};
		};

		static toViewModel(data) {
			const item = new CompanyViewModel(null);
			"offices" in data && (item.offices = data.offices && [...data.offices].map(i => ViewModel.mappings[OfficeSummaryModel.name].toViewModel(i)));
			"banner" in data && (item.banner = data.banner === null ? null : `${data.banner}`);
			"created" in data && (item.created = data.created === null ? null : new Date(data.created));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"incorporated" in data && (item.incorporated = data.incorporated === null ? null : new Date(data.incorporated));
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"purpose" in data && (item.purpose = data.purpose === null ? null : `${data.purpose}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);
			"type" in data && (item.type = data.type === null ? null : data.type);

			return item;
		}

		static async toModel(viewModel: CompanyViewModel) {
			let model: Company;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Company).find(viewModel.id)
			} else {
				model = new Company();
			}
			
			"offices" in viewModel && (null);
			"banner" in viewModel && (model.banner = viewModel.banner === null ? null : `${viewModel.banner}`);
			"created" in viewModel && (model.created = viewModel.created === null ? null : new Date(viewModel.created));
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporated" in viewModel && (model.incorporated = viewModel.incorporated === null ? null : new Date(viewModel.incorporated));
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"purpose" in viewModel && (model.purpose = viewModel.purpose === null ? null : `${viewModel.purpose}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);
			"type" in viewModel && (model.type = viewModel.type === null ? null : viewModel.type);

			return model;
		}
	},
	[OfficeViewModel.name]: class ComposedOfficeViewModel extends OfficeViewModel {
		async map() {
			return {
				company: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.company)),
				capacityGrants: (await this.$$model.capacityGrants.includeTree(ViewModel.mappings[OfficeCapacityViewModel.name].items).toArray()).map(item => new OfficeCapacityViewModel(item)),
				workOffers: (await this.$$model.workOffers.includeTree(ViewModel.mappings[WorkOfferSummaryModel.name].items).toArray()).map(item => new WorkOfferSummaryModel(item)),
				property: new PropertySummaryModel(await BaseServer.unwrap(this.$$model.property)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get company() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "company-OfficeViewModel"]
					);
				},
				get capacityGrants() {
					return ViewModel.mappings[OfficeCapacityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "capacityGrants-OfficeViewModel"]
					);
				},
				get workOffers() {
					return ViewModel.mappings[WorkOfferSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "workOffers-OfficeViewModel"]
					);
				},
				get property() {
					return ViewModel.mappings[PropertySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "property-OfficeViewModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new OfficeViewModel(null);
			"company" in data && (item.company = data.company && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.company));
			"capacityGrants" in data && (item.capacityGrants = data.capacityGrants && [...data.capacityGrants].map(i => ViewModel.mappings[OfficeCapacityViewModel.name].toViewModel(i)));
			"workOffers" in data && (item.workOffers = data.workOffers && [...data.workOffers].map(i => ViewModel.mappings[WorkOfferSummaryModel.name].toViewModel(i)));
			"property" in data && (item.property = data.property && ViewModel.mappings[PropertySummaryModel.name].toViewModel(data.property));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: OfficeViewModel) {
			let model: Office;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Office).find(viewModel.id)
			} else {
				model = new Office();
			}
			
			"company" in viewModel && (model.company.id = viewModel.company ? viewModel.company.id : null);
			"capacityGrants" in viewModel && (null);
			"workOffers" in viewModel && (null);
			"property" in viewModel && (model.property.id = viewModel.property ? viewModel.property.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[OfficeEmployeeModel.name]: class ComposedOfficeEmployeeModel extends OfficeEmployeeModel {
		async map() {
			return {
				company: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.company)),
				property: new PropertySummaryModel(await BaseServer.unwrap(this.$$model.property)),
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get company() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "company-OfficeEmployeeModel"]
					);
				},
				get property() {
					return ViewModel.mappings[PropertySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "property-OfficeEmployeeModel"]
					);
				},
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new OfficeEmployeeModel(null);
			"company" in data && (item.company = data.company && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.company));
			"property" in data && (item.property = data.property && ViewModel.mappings[PropertySummaryModel.name].toViewModel(data.property));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: OfficeEmployeeModel) {
			let model: Office;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Office).find(viewModel.id)
			} else {
				model = new Office();
			}
			
			"company" in viewModel && (model.company.id = viewModel.company ? viewModel.company.id : null);
			"property" in viewModel && (model.property.id = viewModel.property ? viewModel.property.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[WorkOfferEmplymentModel.name]: class ComposedWorkOfferEmplymentModel extends WorkOfferEmplymentModel {
		async map() {
			return {
				office: new OfficeEmployeeModel(await BaseServer.unwrap(this.$$model.office)),
				closed: this.$$model.closed,
				count: this.$$model.count,
				id: this.$$model.id,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get office() {
					return ViewModel.mappings[OfficeEmployeeModel.name].getPrefetchingProperties(
						level,
						[...parents, "office-WorkOfferEmplymentModel"]
					);
				},
				closed: true,
				count: true,
				id: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new WorkOfferEmplymentModel(null);
			"office" in data && (item.office = data.office && ViewModel.mappings[OfficeEmployeeModel.name].toViewModel(data.office));
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"count" in data && (item.count = data.count === null ? null : +data.count);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: WorkOfferEmplymentModel) {
			let model: WorkOffer;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WorkOffer).find(viewModel.id)
			} else {
				model = new WorkOffer();
			}
			
			"office" in viewModel && (model.office.id = viewModel.office ? viewModel.office.id : null);
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"count" in viewModel && (model.count = viewModel.count === null ? null : +viewModel.count);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[WorkOfferViewModel.name]: class ComposedWorkOfferViewModel extends WorkOfferViewModel {
		async map() {
			return {
				workContracts: (await this.$$model.workContracts.includeTree(ViewModel.mappings[WorkContractViewModel.name].items).toArray()).map(item => new WorkContractViewModel(item)),
				office: new OfficeViewModel(await BaseServer.unwrap(this.$$model.office)),
				closed: this.$$model.closed,
				count: this.$$model.count,
				id: this.$$model.id,
				offered: this.$$model.offered,
				task: this.$$model.task,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get workContracts() {
					return ViewModel.mappings[WorkContractViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "workContracts-WorkOfferViewModel"]
					);
				},
				get office() {
					return ViewModel.mappings[OfficeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "office-WorkOfferViewModel"]
					);
				},
				closed: true,
				count: true,
				id: true,
				offered: true,
				task: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new WorkOfferViewModel(null);
			"workContracts" in data && (item.workContracts = data.workContracts && [...data.workContracts].map(i => ViewModel.mappings[WorkContractViewModel.name].toViewModel(i)));
			"office" in data && (item.office = data.office && ViewModel.mappings[OfficeViewModel.name].toViewModel(data.office));
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"count" in data && (item.count = data.count === null ? null : +data.count);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"offered" in data && (item.offered = data.offered === null ? null : new Date(data.offered));
			"task" in data && (item.task = data.task === null ? null : `${data.task}`);
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: WorkOfferViewModel) {
			let model: WorkOffer;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WorkOffer).find(viewModel.id)
			} else {
				model = new WorkOffer();
			}
			
			"workContracts" in viewModel && (null);
			"office" in viewModel && (model.office.id = viewModel.office ? viewModel.office.id : null);
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"count" in viewModel && (model.count = viewModel.count === null ? null : +viewModel.count);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"offered" in viewModel && (model.offered = viewModel.offered === null ? null : new Date(viewModel.offered));
			"task" in viewModel && (model.task = viewModel.task === null ? null : `${viewModel.task}`);
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[WorkContractViewModel.name]: class ComposedWorkContractViewModel extends WorkContractViewModel {
		async map() {
			return {
				worker: new ResidentSummaryModel(await BaseServer.unwrap(this.$$model.worker)),
				canceled: this.$$model.canceled,
				id: this.$$model.id,
				match: this.$$model.match,
				signed: this.$$model.signed
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get worker() {
					return ViewModel.mappings[ResidentSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "worker-WorkContractViewModel"]
					);
				},
				canceled: true,
				id: true,
				match: true,
				signed: true
			};
		};

		static toViewModel(data) {
			const item = new WorkContractViewModel(null);
			"worker" in data && (item.worker = data.worker && ViewModel.mappings[ResidentSummaryModel.name].toViewModel(data.worker));
			"canceled" in data && (item.canceled = data.canceled === null ? null : new Date(data.canceled));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"match" in data && (item.match = data.match === null ? null : `${data.match}`);
			"signed" in data && (item.signed = data.signed === null ? null : new Date(data.signed));

			return item;
		}

		static async toModel(viewModel: WorkContractViewModel) {
			let model: WorkContract;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WorkContract).find(viewModel.id)
			} else {
				model = new WorkContract();
			}
			
			"worker" in viewModel && (model.worker.id = viewModel.worker ? viewModel.worker.id : null);
			"canceled" in viewModel && (model.canceled = viewModel.canceled === null ? null : new Date(viewModel.canceled));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"match" in viewModel && (model.match = viewModel.match === null ? null : `${viewModel.match}`);
			"signed" in viewModel && (model.signed = viewModel.signed === null ? null : new Date(viewModel.signed));

			return model;
		}
	},
	[WorkContractEmploymentModel.name]: class ComposedWorkContractEmploymentModel extends WorkContractEmploymentModel {
		async map() {
			return {
				offer: new WorkOfferEmplymentModel(await BaseServer.unwrap(this.$$model.offer)),
				canceled: this.$$model.canceled,
				id: this.$$model.id,
				signed: this.$$model.signed
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get offer() {
					return ViewModel.mappings[WorkOfferEmplymentModel.name].getPrefetchingProperties(
						level,
						[...parents, "offer-WorkContractEmploymentModel"]
					);
				},
				canceled: true,
				id: true,
				signed: true
			};
		};

		static toViewModel(data) {
			const item = new WorkContractEmploymentModel(null);
			"offer" in data && (item.offer = data.offer && ViewModel.mappings[WorkOfferEmplymentModel.name].toViewModel(data.offer));
			"canceled" in data && (item.canceled = data.canceled === null ? null : new Date(data.canceled));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"signed" in data && (item.signed = data.signed === null ? null : new Date(data.signed));

			return item;
		}

		static async toModel(viewModel: WorkContractEmploymentModel) {
			let model: WorkContract;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(WorkContract).find(viewModel.id)
			} else {
				model = new WorkContract();
			}
			
			"offer" in viewModel && (model.offer.id = viewModel.offer ? viewModel.offer.id : null);
			"canceled" in viewModel && (model.canceled = viewModel.canceled === null ? null : new Date(viewModel.canceled));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"signed" in viewModel && (model.signed = viewModel.signed === null ? null : new Date(viewModel.signed));

			return model;
		}
	},
	[EpochViewModel.name]: class ComposedEpochViewModel extends EpochViewModel {
		async map() {
			return {
				description: this.$$model.description,
				end: this.$$model.end,
				id: this.$$model.id,
				name: this.$$model.name,
				offset: this.$$model.offset,
				rate: this.$$model.rate,
				start: this.$$model.start
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				description: true,
				end: true,
				id: true,
				name: true,
				offset: true,
				rate: true,
				start: true
			};
		};

		static toViewModel(data) {
			const item = new EpochViewModel(null);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"end" in data && (item.end = data.end === null ? null : new Date(data.end));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"offset" in data && (item.offset = data.offset === null ? null : +data.offset);
			"rate" in data && (item.rate = data.rate === null ? null : +data.rate);
			"start" in data && (item.start = data.start === null ? null : new Date(data.start));

			return item;
		}

		static async toModel(viewModel: EpochViewModel) {
			let model: Epoch;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Epoch).find(viewModel.id)
			} else {
				model = new Epoch();
			}
			
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"end" in viewModel && (model.end = viewModel.end === null ? null : new Date(viewModel.end));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"offset" in viewModel && (model.offset = viewModel.offset === null ? null : +viewModel.offset);
			"rate" in viewModel && (model.rate = viewModel.rate === null ? null : +viewModel.rate);
			"start" in viewModel && (model.start = viewModel.start === null ? null : new Date(viewModel.start));

			return model;
		}
	},
	[LawHouseSessionViewModel.name]: class ComposedLawHouseSessionViewModel extends LawHouseSessionViewModel {
		async map() {
			return {
				scope: new DistrictViewModel(await BaseServer.unwrap(this.$$model.scope)),
				protocol: (await this.$$model.protocol.includeTree(ViewModel.mappings[LawHouseSessionProtocolViewModel.name].items).toArray()).map(item => new LawHouseSessionProtocolViewModel(item)),
				sessionaries: (await this.$$model.sessionaries.includeTree(ViewModel.mappings[LawHouseSessionaryViewModel.name].items).toArray()).map(item => new LawHouseSessionaryViewModel(item)),
				ended: this.$$model.ended,
				id: this.$$model.id,
				started: this.$$model.started
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get scope() {
					return ViewModel.mappings[DistrictViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "scope-LawHouseSessionViewModel"]
					);
				},
				get protocol() {
					return ViewModel.mappings[LawHouseSessionProtocolViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "protocol-LawHouseSessionViewModel"]
					);
				},
				get sessionaries() {
					return ViewModel.mappings[LawHouseSessionaryViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "sessionaries-LawHouseSessionViewModel"]
					);
				},
				ended: true,
				id: true,
				started: true
			};
		};

		static toViewModel(data) {
			const item = new LawHouseSessionViewModel(null);
			"scope" in data && (item.scope = data.scope && ViewModel.mappings[DistrictViewModel.name].toViewModel(data.scope));
			"protocol" in data && (item.protocol = data.protocol && [...data.protocol].map(i => ViewModel.mappings[LawHouseSessionProtocolViewModel.name].toViewModel(i)));
			"sessionaries" in data && (item.sessionaries = data.sessionaries && [...data.sessionaries].map(i => ViewModel.mappings[LawHouseSessionaryViewModel.name].toViewModel(i)));
			"ended" in data && (item.ended = data.ended === null ? null : new Date(data.ended));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"started" in data && (item.started = data.started === null ? null : new Date(data.started));

			return item;
		}

		static async toModel(viewModel: LawHouseSessionViewModel) {
			let model: LawHouseSession;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(LawHouseSession).find(viewModel.id)
			} else {
				model = new LawHouseSession();
			}
			
			"scope" in viewModel && (model.scope.id = viewModel.scope ? viewModel.scope.id : null);
			"protocol" in viewModel && (null);
			"sessionaries" in viewModel && (null);
			"ended" in viewModel && (model.ended = viewModel.ended === null ? null : new Date(viewModel.ended));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"started" in viewModel && (model.started = viewModel.started === null ? null : new Date(viewModel.started));

			return model;
		}
	},
	[OracleProposalViewModel.name]: class ComposedOracleProposalViewModel extends OracleProposalViewModel {
		async map() {
			return {
				entity: new LegalEntityViewModel(await BaseServer.unwrap(this.$$model.entity)),
				id: this.$$model.id,
				lore: this.$$model.lore
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get entity() {
					return ViewModel.mappings[LegalEntityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "entity-OracleProposalViewModel"]
					);
				},
				id: true,
				lore: true
			};
		};

		static toViewModel(data) {
			const item = new OracleProposalViewModel(null);
			"entity" in data && (item.entity = data.entity && ViewModel.mappings[LegalEntityViewModel.name].toViewModel(data.entity));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"lore" in data && (item.lore = data.lore === null ? null : `${data.lore}`);

			return item;
		}

		static async toModel(viewModel: OracleProposalViewModel) {
			let model: OracleProposal;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(OracleProposal).find(viewModel.id)
			} else {
				model = new OracleProposal();
			}
			
			"entity" in viewModel && (model.entity.id = viewModel.entity ? viewModel.entity.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"lore" in viewModel && (model.lore = viewModel.lore === null ? null : `${viewModel.lore}`);

			return model;
		}
	},
	[PlanViewModel.name]: class ComposedPlanViewModel extends PlanViewModel {
		async map() {
			return {
				author: new LegalEntityViewModel(await BaseServer.unwrap(this.$$model.author)),
				shapes: (await this.$$model.shapes.includeTree(ViewModel.mappings[PlanShapeViewModel.name].items).toArray()).map(item => new PlanShapeViewModel(item)),
				description: this.$$model.description,
				id: this.$$model.id,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get author() {
					return ViewModel.mappings[LegalEntityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "author-PlanViewModel"]
					);
				},
				get shapes() {
					return ViewModel.mappings[PlanShapeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "shapes-PlanViewModel"]
					);
				},
				description: true,
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PlanViewModel(null);
			"author" in data && (item.author = data.author && ViewModel.mappings[LegalEntityViewModel.name].toViewModel(data.author));
			"shapes" in data && (item.shapes = data.shapes && [...data.shapes].map(i => ViewModel.mappings[PlanShapeViewModel.name].toViewModel(i)));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: PlanViewModel) {
			let model: Plan;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Plan).find(viewModel.id)
			} else {
				model = new Plan();
			}
			
			"author" in viewModel && (model.author.id = viewModel.author ? viewModel.author.id : null);
			"shapes" in viewModel && (null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[BuildingSummaryModel.name]: class ComposedBuildingSummaryModel extends BuildingSummaryModel {
		async map() {
			return {
				archived: this.$$model.archived,
				boundary: this.$$model.boundary,
				created: this.$$model.created,
				id: this.$$model.id,
				name: this.$$model.name
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				archived: true,
				boundary: true,
				created: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new BuildingSummaryModel(null);
			"archived" in data && (item.archived = data.archived === null ? null : new Date(data.archived));
			"boundary" in data && (item.boundary = data.boundary === null ? null : `${data.boundary}`);
			"created" in data && (item.created = data.created === null ? null : new Date(data.created));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);

			return item;
		}

		static async toModel(viewModel: BuildingSummaryModel) {
			let model: Building;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Building).find(viewModel.id)
			} else {
				model = new Building();
			}
			
			"archived" in viewModel && (model.archived = viewModel.archived === null ? null : new Date(viewModel.archived));
			"boundary" in viewModel && (model.boundary = viewModel.boundary === null ? null : `${viewModel.boundary}`);
			"created" in viewModel && (model.created = viewModel.created === null ? null : new Date(viewModel.created));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

			return model;
		}
	},
	[PlotBoundarySummaryModel.name]: class ComposedPlotBoundarySummaryModel extends PlotBoundarySummaryModel {
		async map() {
			return {
				changeComment: this.$$model.changeComment,
				created: this.$$model.created,
				id: this.$$model.id,
				shape: this.$$model.shape
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				changeComment: true,
				created: true,
				id: true,
				shape: true
			};
		};

		static toViewModel(data) {
			const item = new PlotBoundarySummaryModel(null);
			"changeComment" in data && (item.changeComment = data.changeComment === null ? null : `${data.changeComment}`);
			"created" in data && (item.created = data.created === null ? null : new Date(data.created));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"shape" in data && (item.shape = data.shape === null ? null : `${data.shape}`);

			return item;
		}

		static async toModel(viewModel: PlotBoundarySummaryModel) {
			let model: PlotBoundary;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PlotBoundary).find(viewModel.id)
			} else {
				model = new PlotBoundary();
			}
			
			"changeComment" in viewModel && (model.changeComment = viewModel.changeComment === null ? null : `${viewModel.changeComment}`);
			"created" in viewModel && (model.created = viewModel.created === null ? null : new Date(viewModel.created));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"shape" in viewModel && (model.shape = viewModel.shape === null ? null : `${viewModel.shape}`);

			return model;
		}
	},
	[ArticleViewModel.name]: class ComposedArticleViewModel extends ArticleViewModel {
		async map() {
			return {
				images: (await this.$$model.images.includeTree(ViewModel.mappings[ArticleImageViewModel.name].items).toArray()).map(item => new ArticleImageViewModel(item)),
				opinions: (await this.$$model.opinions.includeTree(ViewModel.mappings[ArticleOpinionViewModel.name].items).toArray()).map(item => new ArticleOpinionViewModel(item)),
				oracleProposal: new OracleProposalSummaryModel(await BaseServer.unwrap(this.$$model.oracleProposal)),
				publication: new PublicationSummaryModel(await BaseServer.unwrap(this.$$model.publication)),
				body: this.$$model.body,
				id: this.$$model.id,
				published: this.$$model.published,
				title: this.$$model.title
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get images() {
					return ViewModel.mappings[ArticleImageViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "images-ArticleViewModel"]
					);
				},
				get opinions() {
					return ViewModel.mappings[ArticleOpinionViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "opinions-ArticleViewModel"]
					);
				},
				get oracleProposal() {
					return ViewModel.mappings[OracleProposalSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "oracleProposal-ArticleViewModel"]
					);
				},
				get publication() {
					return ViewModel.mappings[PublicationSummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "publication-ArticleViewModel"]
					);
				},
				body: true,
				id: true,
				published: true,
				title: true
			};
		};

		static toViewModel(data) {
			const item = new ArticleViewModel(null);
			"images" in data && (item.images = data.images && [...data.images].map(i => ViewModel.mappings[ArticleImageViewModel.name].toViewModel(i)));
			"opinions" in data && (item.opinions = data.opinions && [...data.opinions].map(i => ViewModel.mappings[ArticleOpinionViewModel.name].toViewModel(i)));
			"oracleProposal" in data && (item.oracleProposal = data.oracleProposal && ViewModel.mappings[OracleProposalSummaryModel.name].toViewModel(data.oracleProposal));
			"publication" in data && (item.publication = data.publication && ViewModel.mappings[PublicationSummaryModel.name].toViewModel(data.publication));
			"body" in data && (item.body = data.body === null ? null : `${data.body}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"published" in data && (item.published = data.published === null ? null : new Date(data.published));
			"title" in data && (item.title = data.title === null ? null : `${data.title}`);

			return item;
		}

		static async toModel(viewModel: ArticleViewModel) {
			let model: Article;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Article).find(viewModel.id)
			} else {
				model = new Article();
			}
			
			"images" in viewModel && (null);
			"opinions" in viewModel && (null);
			"oracleProposal" in viewModel && (model.oracleProposal.id = viewModel.oracleProposal ? viewModel.oracleProposal.id : null);
			"publication" in viewModel && (model.publication.id = viewModel.publication ? viewModel.publication.id : null);
			"body" in viewModel && (model.body = viewModel.body === null ? null : `${viewModel.body}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"published" in viewModel && (model.published = viewModel.published === null ? null : new Date(viewModel.published));
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

			return model;
		}
	},
	[PublicationViewModel.name]: class ComposedPublicationViewModel extends PublicationViewModel {
		async map() {
			return {
				company: new CompanySummaryModel(await BaseServer.unwrap(this.$$model.company)),
				articles: (await this.$$model.articles.includeTree(ViewModel.mappings[ArticlePreviewModel.name].items).toArray()).map(item => new ArticlePreviewModel(item)),
				description: this.$$model.description,
				id: this.$$model.id,
				incorporation: this.$$model.incorporation,
				name: this.$$model.name,
				tag: this.$$model.tag
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get company() {
					return ViewModel.mappings[CompanySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "company-PublicationViewModel"]
					);
				},
				get articles() {
					return ViewModel.mappings[ArticlePreviewModel.name].getPrefetchingProperties(
						level,
						[...parents, "articles-PublicationViewModel"]
					);
				},
				description: true,
				id: true,
				incorporation: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PublicationViewModel(null);
			"company" in data && (item.company = data.company && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.company));
			"articles" in data && (item.articles = data.articles && [...data.articles].map(i => ViewModel.mappings[ArticlePreviewModel.name].toViewModel(i)));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"incorporation" in data && (item.incorporation = data.incorporation === null ? null : new Date(data.incorporation));
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"tag" in data && (item.tag = data.tag === null ? null : `${data.tag}`);

			return item;
		}

		static async toModel(viewModel: PublicationViewModel) {
			let model: Publication;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Publication).find(viewModel.id)
			} else {
				model = new Publication();
			}
			
			"company" in viewModel && (model.company.id = viewModel.company ? viewModel.company.id : null);
			"articles" in viewModel && (null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporation" in viewModel && (model.incorporation = viewModel.incorporation === null ? null : new Date(viewModel.incorporation));
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[ValuationViewModel.name]: class ComposedValuationViewModel extends ValuationViewModel {
		async map() {
			return {
				issuer: new LegalEntityViewModel(await BaseServer.unwrap(this.$$model.issuer)),
				description: this.$$model.description,
				estimated: this.$$model.estimated,
				id: this.$$model.id,
				item: this.$$model.item,
				price: this.$$model.price
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get issuer() {
					return ViewModel.mappings[LegalEntityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "issuer-ValuationViewModel"]
					);
				},
				description: true,
				estimated: true,
				id: true,
				item: true,
				price: true
			};
		};

		static toViewModel(data) {
			const item = new ValuationViewModel(null);
			"issuer" in data && (item.issuer = data.issuer && ViewModel.mappings[LegalEntityViewModel.name].toViewModel(data.issuer));
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"estimated" in data && (item.estimated = data.estimated === null ? null : new Date(data.estimated));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"item" in data && (item.item = data.item === null ? null : `${data.item}`);
			"price" in data && (item.price = data.price === null ? null : +data.price);

			return item;
		}

		static async toModel(viewModel: ValuationViewModel) {
			let model: Valuation;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Valuation).find(viewModel.id)
			} else {
				model = new Valuation();
			}
			
			"issuer" in viewModel && (model.issuer.id = viewModel.issuer ? viewModel.issuer.id : null);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"estimated" in viewModel && (model.estimated = viewModel.estimated === null ? null : new Date(viewModel.estimated));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"item" in viewModel && (model.item = viewModel.item === null ? null : `${viewModel.item}`);
			"price" in viewModel && (model.price = viewModel.price === null ? null : +viewModel.price);

			return model;
		}
	},
	[TrainRouteViewModel.name]: class ComposedTrainRouteViewModel extends TrainRouteViewModel {
		async map() {
			return {
				activePath: new TrainRoutePathViewModel(await BaseServer.unwrap(this.$$model.activePath)),
				operator: new LegalEntityViewModel(await BaseServer.unwrap(this.$$model.operator)),
				stops: (await this.$$model.stops.includeTree(ViewModel.mappings[TrainStopViewModel.name].items).toArray()).map(item => new TrainStopViewModel(item)),
				closed: this.$$model.closed,
				code: this.$$model.code,
				color: this.$$model.color,
				description: this.$$model.description,
				id: this.$$model.id,
				looping: this.$$model.looping,
				name: this.$$model.name,
				opened: this.$$model.opened,
				textColor: this.$$model.textColor
			}
		};

		static get items() {
			return this.getPrefetchingProperties(ViewModel.maximumPrefetchingRecursionDepth, []);
		}

		static getPrefetchingProperties(level: number, parents: string[]) {
			let repeats = false;

			for (let size = 1; size <= parents.length / 2; size++) {
				if (!repeats) {
					for (let index = 0; index < parents.length; index++) {
						if (parents[parents.length - 1 - index] == parents[parents.length - 1 - index - size]) {
							repeats = true;
						}
					}
				}
			}

			if (repeats) {
				level--;
			}

			if (!level) {
				return {};
			}

			return {
				get activePath() {
					return ViewModel.mappings[TrainRoutePathViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "activePath-TrainRouteViewModel"]
					);
				},
				get operator() {
					return ViewModel.mappings[LegalEntityViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "operator-TrainRouteViewModel"]
					);
				},
				get stops() {
					return ViewModel.mappings[TrainStopViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "stops-TrainRouteViewModel"]
					);
				},
				closed: true,
				code: true,
				color: true,
				description: true,
				id: true,
				looping: true,
				name: true,
				opened: true,
				textColor: true
			};
		};

		static toViewModel(data) {
			const item = new TrainRouteViewModel(null);
			"activePath" in data && (item.activePath = data.activePath && ViewModel.mappings[TrainRoutePathViewModel.name].toViewModel(data.activePath));
			"operator" in data && (item.operator = data.operator && ViewModel.mappings[LegalEntityViewModel.name].toViewModel(data.operator));
			"stops" in data && (item.stops = data.stops && [...data.stops].map(i => ViewModel.mappings[TrainStopViewModel.name].toViewModel(i)));
			"closed" in data && (item.closed = data.closed === null ? null : new Date(data.closed));
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"looping" in data && (item.looping = !!data.looping);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"opened" in data && (item.opened = data.opened === null ? null : new Date(data.opened));
			"textColor" in data && (item.textColor = data.textColor === null ? null : `${data.textColor}`);

			return item;
		}

		static async toModel(viewModel: TrainRouteViewModel) {
			let model: TrainRoute;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainRoute).find(viewModel.id)
			} else {
				model = new TrainRoute();
			}
			
			"activePath" in viewModel && (model.activePath.id = viewModel.activePath ? viewModel.activePath.id : null);
			"operator" in viewModel && (model.operator.id = viewModel.operator ? viewModel.operator.id : null);
			"stops" in viewModel && (null);
			"closed" in viewModel && (model.closed = viewModel.closed === null ? null : new Date(viewModel.closed));
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"looping" in viewModel && (model.looping = !!viewModel.looping);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"opened" in viewModel && (model.opened = viewModel.opened === null ? null : new Date(viewModel.opened));
			"textColor" in viewModel && (model.textColor = viewModel.textColor === null ? null : `${viewModel.textColor}`);

			return model;
		}
	}
};