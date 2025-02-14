import { BaseServer, ViewModel, Inject } from "vlserver";

import { Borough } from "././database";
import { DbContext } from "././database";
import { Property } from "././database";
import { Proxy } from "././../proxy";
import { BoroughViewModel } from "././../areas/borough.view";
import { BridgeViewModel } from "././../areas/bridge.view";
import { HistoryEntryViewModel } from "././../areas/history.view";
import { PropertyTypeViewModel } from "././../areas/property-type.view";
import { PropertySummaryModel } from "././../areas/property.summary";
import { PropertyViewModel } from "././../areas/property.view";
import { SquareViewModel } from "././../areas/squre.view";
import { StreetViewModel } from "././../areas/street.view";
import { WaterBodyViewModel } from "././../areas/water-body.view";
import { Point } from "././../../interface/point";
import { MapService } from "././../areas/map.service";
import { BoroughSummaryModel } from "././../areas/borough.summary";
import { BoroughService } from "././../areas/borough/service";
import { Company } from "././database";
import { CompanyType } from "././database";
import { Office } from "././database";
import { CompanySummaryModel } from "././../areas/company.view";
import { CompanyViewModel } from "././../areas/company.view";
import { CompanyOfficeService } from "././../areas/company-office/service";
import { PlayerViewModel } from "././../areas/player.view";
import { GameService } from "././../areas/game/game.service";
import { PropertyHistoricListingModifier } from "././database";
import { HistoricListingGradeViewModel } from "././../areas/history-listing/grade.view";
import { PropertyHistoricListingModifierViewModel } from "././../areas/history-listing/link.view";
import { HistoricListingModifierViewModel } from "././../areas/history-listing/modifier.view";
import { HistoricListingService } from "././../areas/history-listing/listing.service";
import { LawHouseSessionSummaryModel } from "././../areas/law-house/session";
import { LawHouseSessionViewModel } from "././../areas/law-house/session";
import { LawHouseService } from "././../areas/law-house/service";
import { Life } from "././../life";
import { ResidentEventViewModel } from "././../areas/life/resident";
import { ResidentRelationViewModel } from "././../areas/life/resident";
import { ResidentSummaryModel } from "././../areas/life/resident";
import { ResidentViewModel } from "././../areas/life/resident";
import { ResidentEventView } from "././database";
import { ResidentTickerModel } from "././../areas/life/ticker";
import { LifeService } from "././../areas/life/service";
import { Dwelling } from "././database";
import { DwellingViewModel } from "././../areas/life/resident";
import { PropertyDwellingViewModel } from "././../areas/property.view";
import { PropertyService } from "././../areas/property/service";
import { ArticleViewModel } from "././../areas/publication/article";
import { PublicationViewModel } from "././../areas/publication/publication";
import { PublicationService } from "././../areas/publication/service";
import { ChatManager } from "././../areas/resident/chat/manager";
import { ChatInteractionViewModel } from "././../areas/resident/chat/interaction";
import { ChatService } from "././../areas/resident/chat/service";
import { TrainRouteViewModel } from "././../areas/train/route.view";
import { TrainStationViewModel } from "././../areas/train/station.view";
import { TrainService } from "././../areas/train/train.service";
import { Bill } from "././database";
import { DistrictViewModel } from "././../areas/vote/district";
import { OpenHonestiumViewModel } from "././../areas/vote/honestium";
import { BillViewModel } from "././../areas/vote/bill";
import { VoteTickerViewModel } from "././../areas/vote/vote";
import { VoteViewModel } from "././../areas/vote/vote";
import { VoteService } from "././../areas/vote/service";
import { OfficeSummaryModel } from "./../areas/company.view";
import { TenantViewModel } from "./../areas/property.view";
import { LawHouseSessionaryViewModel } from "./../areas/law-house/session";
import { LawHouseSessionProtocolViewModel } from "./../areas/law-house/session";
import { TenancyViewModel } from "./../areas/life/resident";
import { ArticleImageViewModel } from "./../areas/publication/article";
import { PublicationSummaryModel } from "./../areas/publication/publication";
import { TrainStationExitViewModel } from "./../areas/train/exit.view";
import { TrainStopViewModel } from "./../areas/train/stop.view";
import { HonestiumViewModel } from "./../areas/vote/bill";
import { OfficeViewModel } from "./../areas/company.view";
import { Bridge } from "./../managed/database";
import { HistoryEntry } from "./../history";
import { Player } from "./../managed/database";
import { PropertyType } from "./../managed/database";
import { Tenancy } from "./../managed/database";
import { Square } from "./../managed/database";
import { Street } from "./../managed/database";
import { WaterBody } from "./../managed/database";
import { HistoricListingGrade } from "./../managed/database";
import { HistoricListingModifier } from "./../managed/database";
import { LawHouseSession } from "./../managed/database";
import { LawHouseSessionary } from "./../managed/database";
import { LawHouseSessionProtocol } from "./../managed/database";
import { Resident } from "./../managed/database";
import { ResidentRelationship } from "./../managed/database";
import { Article } from "./../managed/database";
import { ArticleImage } from "./../managed/database";
import { Publication } from "./../managed/database";
import { ChatInteraction } from "./../managed/database";
import { TrainStationExit } from "./../managed/database";
import { TrainRoute } from "./../managed/database";
import { TrainStation } from "./../managed/database";
import { TrainStop } from "./../managed/database";
import { BillHonestium } from "./../managed/database";
import { District } from "./../managed/database";
import { Vote } from "./../managed/database";

Inject.mappings = {
	"MapService": {
		objectConstructor: MapService,
		parameters: ["DbContext"]
	},
	"DbContext": {
		objectConstructor: DbContext,
		parameters: ["RunContext"]
	},
	"BoroughService": {
		objectConstructor: BoroughService,
		parameters: ["DbContext"]
	},
	"CompanyOfficeService": {
		objectConstructor: CompanyOfficeService,
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
	"LawHouseService": {
		objectConstructor: LawHouseService,
		parameters: ["DbContext"]
	},
	"LifeService": {
		objectConstructor: LifeService,
		parameters: ["DbContext"]
	},
	"PropertyService": {
		objectConstructor: PropertyService,
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
			"dzb2prZ3QwYT8xZ2ZicXc5ZnN1cGFwZj",
			{
			"NycXNhenFjaGhvZDhsdWtlYzNtd2x4d3": { type: PropertySummaryModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.saveProperty(
				params["NycXNhenFjaGhvZDhsdWtlYzNtd2x4d3"]
			)
		);

		this.expose(
			"1nbWp4M21wOG1naTNoM3B1bWJvbTx1ej",
			{
			"ExMWt6cHEwZTJ0Y3N2cDs3ajYybXd0Zz": { type: PropertyViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.deleteProperty(
				params["ExMWt6cHEwZTJ0Y3N2cDs3ajYybXd0Zz"]
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
			"J4amhucmNzdWdkM3gybmlvZjV4NnFodX",
			{},
			inject => inject.construct(BoroughService),
			(controller, params) => controller.list(
				
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
			"l3OGBvenJyc3lvbzZleWFmbzFpZ2g5cD",
			{
			"p2dHJxa2BodTR6NDZodDIxYWEyejlia2": { type: "string", isArray: false, isOptional: false }
			},
			inject => inject.construct(PropertyService),
			(controller, params) => controller.createDwelling(
				params["p2dHJxa2BodTR6NDZodDIxYWEyejlia2"]
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
			"F1aXFpZz05eX01dmR2cXd6dGZwdzR2dD",
			{},
			inject => inject.construct(PublicationService),
			(controller, params) => controller.listNewestArticles(
				
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
			"hsZXxsa2h0eG50MnVjazg1eHMyY3NiNW",
			{},
			inject => inject.construct(TrainService),
			(controller, params) => controller.getRoutes(
				
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
				id: true,
				name: true,
				purpose: true,
				tag: true,
				type: true
			};
		};

		static toViewModel(data) {
			const item = new CompanySummaryModel(null);
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
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new OfficeSummaryModel(null);
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
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

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
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.$$model.borough)),
				historicListingGrade: new HistoricListingGradeViewModel(await BaseServer.unwrap(this.$$model.historicListingGrade)),
				type: new PropertyTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
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
				bounds: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertySummaryModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"historicListingGrade" in data && (item.historicListingGrade = data.historicListingGrade && ViewModel.mappings[HistoricListingGradeViewModel.name].toViewModel(data.historicListingGrade));
			"type" in data && (item.type = data.type && ViewModel.mappings[PropertyTypeViewModel.name].toViewModel(data.type));
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
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
			
			"borough" in viewModel && (model.borough.id = viewModel.borough ? viewModel.borough.id : null);
			"historicListingGrade" in viewModel && (model.historicListingGrade.id = viewModel.historicListingGrade ? viewModel.historicListingGrade.id : null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
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
				owner: new PlayerViewModel(await BaseServer.unwrap(this.$$model.owner)),
				dwellings: (await this.$$model.dwellings.includeTree(ViewModel.mappings[PropertyDwellingViewModel.name].items).toArray()).map(item => new PropertyDwellingViewModel(item)),
				historicListingModifiers: (await this.$$model.historicListingModifiers.includeTree(ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].items).toArray()).map(item => new PropertyHistoricListingModifierViewModel(item)),
				offices: (await this.$$model.offices.includeTree(ViewModel.mappings[OfficeViewModel.name].items).toArray()).map(item => new OfficeViewModel(item)),
				type: new PropertyTypeViewModel(await BaseServer.unwrap(this.$$model.type)),
				bounds: this.$$model.bounds,
				code: this.$$model.code,
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
				get owner() {
					return ViewModel.mappings[PlayerViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "owner-PropertyViewModel"]
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
				get type() {
					return ViewModel.mappings[PropertyTypeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "type-PropertyViewModel"]
					);
				},
				bounds: true,
				code: true,
				historicListingRegisteredAt: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new PropertyViewModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings[BoroughSummaryModel.name].toViewModel(data.borough));
			"historicListingGrade" in data && (item.historicListingGrade = data.historicListingGrade && ViewModel.mappings[HistoricListingGradeViewModel.name].toViewModel(data.historicListingGrade));
			"owner" in data && (item.owner = data.owner && ViewModel.mappings[PlayerViewModel.name].toViewModel(data.owner));
			"dwellings" in data && (item.dwellings = data.dwellings && [...data.dwellings].map(i => ViewModel.mappings[PropertyDwellingViewModel.name].toViewModel(i)));
			"historicListingModifiers" in data && (item.historicListingModifiers = data.historicListingModifiers && [...data.historicListingModifiers].map(i => ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].toViewModel(i)));
			"offices" in data && (item.offices = data.offices && [...data.offices].map(i => ViewModel.mappings[OfficeViewModel.name].toViewModel(i)));
			"type" in data && (item.type = data.type && ViewModel.mappings[PropertyTypeViewModel.name].toViewModel(data.type));
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
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
			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"dwellings" in viewModel && (null);
			"historicListingModifiers" in viewModel && (null);
			"offices" in viewModel && (null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"historicListingRegisteredAt" in viewModel && (model.historicListingRegisteredAt = viewModel.historicListingRegisteredAt === null ? null : new Date(viewModel.historicListingRegisteredAt));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

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
				bridges: (await this.$$model.bridges.includeTree(ViewModel.mappings[BridgeViewModel.name].items).toArray()).map(item => new BridgeViewModel(item)),
				id: this.$$model.id,
				name: this.$$model.name,
				path: this.$$model.path,
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
				get bridges() {
					return ViewModel.mappings[BridgeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "bridges-StreetViewModel"]
					);
				},
				id: true,
				name: true,
				path: true,
				shortName: true,
				size: true
			};
		};

		static toViewModel(data) {
			const item = new StreetViewModel(null);
			"bridges" in data && (item.bridges = data.bridges && [...data.bridges].map(i => ViewModel.mappings[BridgeViewModel.name].toViewModel(i)));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);
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
			
			"bridges" in viewModel && (null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);
			"shortName" in viewModel && (model.shortName = viewModel.shortName === null ? null : `${viewModel.shortName}`);
			"size" in viewModel && (model.size = viewModel.size === null ? null : +viewModel.size);

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
				biography: this.$$model.biography,
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
				get mainTenancy() {
					return ViewModel.mappings[TenancyViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "mainTenancy-ResidentViewModel"]
					);
				},
				biography: true,
				birthday: true,
				familyName: true,
				givenName: true,
				id: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new ResidentViewModel(null);
			"mainTenancy" in data && (item.mainTenancy = data.mainTenancy && ViewModel.mappings[TenancyViewModel.name].toViewModel(data.mainTenancy));
			"biography" in data && (item.biography = data.biography === null ? null : `${data.biography}`);
			"birthday" in data && (item.birthday = data.birthday === null ? null : new Date(data.birthday));
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
			"biography" in viewModel && (model.biography = viewModel.biography === null ? null : `${viewModel.biography}`);
			"birthday" in viewModel && (model.birthday = viewModel.birthday === null ? null : new Date(viewModel.birthday));
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
	[ArticleViewModel.name]: class ComposedArticleViewModel extends ArticleViewModel {
		async map() {
			return {
				images: (await this.$$model.images.includeTree(ViewModel.mappings[ArticleImageViewModel.name].items).toArray()).map(item => new ArticleImageViewModel(item)),
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
			"publication" in viewModel && (model.publication.id = viewModel.publication ? viewModel.publication.id : null);
			"body" in viewModel && (model.body = viewModel.body === null ? null : `${viewModel.body}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"published" in viewModel && (model.published = viewModel.published === null ? null : new Date(viewModel.published));
			"title" in viewModel && (model.title = viewModel.title === null ? null : `${viewModel.title}`);

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
				banner: this.$$model.banner,
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
				banner: true,
				description: true,
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PublicationSummaryModel(null);
			"banner" in data && (item.banner = data.banner === null ? null : `${data.banner}`);
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
			
			"banner" in viewModel && (model.banner = viewModel.banner === null ? null : `${viewModel.banner}`);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

			return model;
		}
	},
	[PublicationViewModel.name]: class ComposedPublicationViewModel extends PublicationViewModel {
		async map() {
			return {
				articles: (await this.$$model.articles.includeTree(ViewModel.mappings[ArticleViewModel.name].items).toArray()).map(item => new ArticleViewModel(item)),
				banner: this.$$model.banner,
				description: this.$$model.description,
				id: this.$$model.id,
				incorporation: this.$$model.incorporation,
				legalName: this.$$model.legalName,
				mainOfficeId: this.$$model.mainOfficeId,
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
				get articles() {
					return ViewModel.mappings[ArticleViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "articles-PublicationViewModel"]
					);
				},
				banner: true,
				description: true,
				id: true,
				incorporation: true,
				legalName: true,
				mainOfficeId: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PublicationViewModel(null);
			"articles" in data && (item.articles = data.articles && [...data.articles].map(i => ViewModel.mappings[ArticleViewModel.name].toViewModel(i)));
			"banner" in data && (item.banner = data.banner === null ? null : `${data.banner}`);
			"description" in data && (item.description = data.description === null ? null : `${data.description}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"incorporation" in data && (item.incorporation = data.incorporation === null ? null : new Date(data.incorporation));
			"legalName" in data && (item.legalName = data.legalName === null ? null : `${data.legalName}`);
			"mainOfficeId" in data && (item.mainOfficeId = data.mainOfficeId === null ? null : `${data.mainOfficeId}`);
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
			
			"articles" in viewModel && (null);
			"banner" in viewModel && (model.banner = viewModel.banner === null ? null : `${viewModel.banner}`);
			"description" in viewModel && (model.description = viewModel.description === null ? null : `${viewModel.description}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporation" in viewModel && (model.incorporation = viewModel.incorporation === null ? null : new Date(viewModel.incorporation));
			"legalName" in viewModel && (model.legalName = viewModel.legalName === null ? null : `${viewModel.legalName}`);
			"mainOfficeId" in viewModel && (model.mainOfficeId = viewModel.mainOfficeId === null ? null : `${viewModel.mainOfficeId}`);
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
	[TrainRouteViewModel.name]: class ComposedTrainRouteViewModel extends TrainRouteViewModel {
		async map() {
			return {
				stops: (await this.$$model.stops.includeTree(ViewModel.mappings[TrainStopViewModel.name].items).toArray()).map(item => new TrainStopViewModel(item)),
				color: this.$$model.color,
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
				get stops() {
					return ViewModel.mappings[TrainStopViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "stops-TrainRouteViewModel"]
					);
				},
				color: true,
				id: true,
				name: true,
				path: true
			};
		};

		static toViewModel(data) {
			const item = new TrainRouteViewModel(null);
			"stops" in data && (item.stops = data.stops && [...data.stops].map(i => ViewModel.mappings[TrainStopViewModel.name].toViewModel(i)));
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);

			return item;
		}

		static async toModel(viewModel: TrainRouteViewModel) {
			let model: TrainRoute;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainRoute).find(viewModel.id)
			} else {
				model = new TrainRoute();
			}
			
			"stops" in viewModel && (null);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);

			return model;
		}
	},
	[TrainStationViewModel.name]: class ComposedTrainStationViewModel extends TrainStationViewModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
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
				id: true,
				name: true,
				position: true
			};
		};

		static toViewModel(data) {
			const item = new TrainStationViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"position" in data && (item.position = data.position === null ? null : `${data.position}`);

			return item;
		}

		static async toModel(viewModel: TrainStationViewModel) {
			let model: TrainStation;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(TrainStation).find(viewModel.id)
			} else {
				model = new TrainStation();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"position" in viewModel && (model.position = viewModel.position === null ? null : `${viewModel.position}`);

			return model;
		}
	},
	[TrainStopViewModel.name]: class ComposedTrainStopViewModel extends TrainStopViewModel {
		async map() {
			return {
				id: this.$$model.id,
				name: this.$$model.name,
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
				id: true,
				name: true,
				stationId: true,
				trackPosition: true
			};
		};

		static toViewModel(data) {
			const item = new TrainStopViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
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
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"stationId" in viewModel && (model.stationId = viewModel.stationId === null ? null : `${viewModel.stationId}`);
			"trackPosition" in viewModel && (model.trackPosition = viewModel.trackPosition === null ? null : `${viewModel.trackPosition}`);

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
				offices: (await this.$$model.offices.includeTree(ViewModel.mappings[OfficeViewModel.name].items).toArray()).map(item => new OfficeViewModel(item)),
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
					return ViewModel.mappings[OfficeViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "offices-CompanyViewModel"]
					);
				},
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
			"offices" in data && (item.offices = data.offices && [...data.offices].map(i => ViewModel.mappings[OfficeViewModel.name].toViewModel(i)));
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
				property: new PropertySummaryModel(await BaseServer.unwrap(this.$$model.property)),
				capacity: this.$$model.capacity,
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
				get property() {
					return ViewModel.mappings[PropertySummaryModel.name].getPrefetchingProperties(
						level,
						[...parents, "property-OfficeViewModel"]
					);
				},
				capacity: true,
				id: true,
				name: true
			};
		};

		static toViewModel(data) {
			const item = new OfficeViewModel(null);
			"company" in data && (item.company = data.company && ViewModel.mappings[CompanySummaryModel.name].toViewModel(data.company));
			"property" in data && (item.property = data.property && ViewModel.mappings[PropertySummaryModel.name].toViewModel(data.property));
			"capacity" in data && (item.capacity = data.capacity === null ? null : +data.capacity);
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
			"property" in viewModel && (model.property.id = viewModel.property ? viewModel.property.id : null);
			"capacity" in viewModel && (model.capacity = viewModel.capacity === null ? null : +viewModel.capacity);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

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
	}
};