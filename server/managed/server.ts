import { BaseServer, ViewModel, Inject } from "vlserver";

import { Borough } from "././database";
import { DbContext } from "././database";
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
import { MapService } from "././../areas/map.service";
import { BoroughSummaryModel } from "././../areas/borough.summary";
import { BoroughService } from "././../areas/borough/service";
import { PlayerViewModel } from "././../areas/player.view";
import { GameService } from "././../areas/game/game.service";
import { PropertyHistoricListingModifier } from "././database";
import { HistoricListingGradeViewModel } from "././../areas/history-listing/grade.view";
import { PropertyHistoricListingModifierViewModel } from "././../areas/history-listing/link.view";
import { HistoricListingModifierViewModel } from "././../areas/history-listing/modifier.view";
import { HistoricListingService } from "././../areas/history-listing/listing.service";
import { ArticleViewModel } from "././../areas/publication/article";
import { PublicationViewModel } from "././../areas/publication/publication";
import { PublicationService } from "././../areas/publication/service";
import { TrainRouteViewModel } from "././../areas/train/route.view";
import { TrainStationViewModel } from "././../areas/train/station.view";
import { TrainService } from "././../areas/train/train.service";
import { ArticleImageViewModel } from "./../areas/publication/article";
import { PublicationSummaryModel } from "./../areas/publication/publication";
import { TrainStationExitViewModel } from "./../areas/train/exit.view";
import { TrainStopViewModel } from "./../areas/train/stop.view";
import { Bridge } from "./../managed/database";
import { HistoryEntry } from "./../history";
import { Player } from "./../managed/database";
import { PropertyType } from "./../managed/database";
import { Property } from "./../managed/database";
import { Square } from "./../managed/database";
import { Street } from "./../managed/database";
import { WaterBody } from "./../managed/database";
import { HistoricListingGrade } from "./../managed/database";
import { HistoricListingModifier } from "./../managed/database";
import { Article } from "./../managed/database";
import { ArticleImage } from "./../managed/database";
import { Publication } from "./../managed/database";
import { TrainStationExit } from "./../managed/database";
import { TrainRoute } from "./../managed/database";
import { TrainStation } from "./../managed/database";
import { TrainStop } from "./../managed/database";

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
	"GameService": {
		objectConstructor: GameService,
		parameters: ["DbContext"]
	},
	"HistoricListingService": {
		objectConstructor: HistoricListingService,
		parameters: ["DbContext"]
	},
	"PublicationService": {
		objectConstructor: PublicationService,
		parameters: ["DbContext"]
	},
	"TrainService": {
		objectConstructor: TrainService,
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
			"VwdXVpOHpwcTVrYXE3NXF3MT9wenU5eH",
			{},
			inject => inject.construct(MapService),
			(controller, params) => controller.getProperties(
				
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
			"VxbjByZmgxb3NvNDlvcTp0ODc0OW4zaz",
			{
			"F6Mml1d2dxdX0xamxpcDFyaXRuaXZ5NW": { type: PropertyViewModel, isArray: false, isOptional: false }
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createProperty(
				params["F6Mml1d2dxdX0xamxpcDFyaXRuaXZ5NW"]
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
				historicListingModifiers: (await this.$$model.historicListingModifiers.includeTree(ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].items).toArray()).map(item => new PropertyHistoricListingModifierViewModel(item)),
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
				get historicListingModifiers() {
					return ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].getPrefetchingProperties(
						level,
						[...parents, "historicListingModifiers-PropertyViewModel"]
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
			"historicListingModifiers" in data && (item.historicListingModifiers = data.historicListingModifiers && [...data.historicListingModifiers].map(i => ViewModel.mappings[PropertyHistoricListingModifierViewModel.name].toViewModel(i)));
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
			"historicListingModifiers" in viewModel && (null);
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"historicListingRegisteredAt" in viewModel && (model.historicListingRegisteredAt = viewModel.historicListingRegisteredAt === null ? null : new Date(viewModel.historicListingRegisteredAt));
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);

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
				id: true,
				name: true,
				tag: true
			};
		};

		static toViewModel(data) {
			const item = new PublicationSummaryModel(null);
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
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"incorporation" in viewModel && (model.incorporation = viewModel.incorporation === null ? null : new Date(viewModel.incorporation));
			"legalName" in viewModel && (model.legalName = viewModel.legalName === null ? null : `${viewModel.legalName}`);
			"mainOfficeId" in viewModel && (model.mainOfficeId = viewModel.mainOfficeId === null ? null : `${viewModel.mainOfficeId}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"tag" in viewModel && (model.tag = viewModel.tag === null ? null : `${viewModel.tag}`);

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
	}
};