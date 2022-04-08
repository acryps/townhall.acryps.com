import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { Proxy } from "././../proxy";
import { BoroughViewModel } from "././../areas/borough.view";
import { HistoryEntryViewModel } from "././../areas/history.view";
import { PropertyTypeViewModel } from "././../areas/property-type.view";
import { PropertySummaryModel } from "././../areas/property.summary";
import { PropertyViewModel } from "././../areas/property.view";
import { SquareViewModel } from "././../areas/squre.view";
import { StreetViewModel } from "././../areas/street.view";
import { WaterBodyViewModel } from "././../areas/water-body.view";
import { MapService } from "././../areas/map.service";
import { BoroughSummaryModel } from "./../areas/borough.summary";
import { PlayerViewModel } from "./../areas/player.view";
import { Borough } from "./../managed/database";
import { HistoryEntry } from "./../history";
import { Player } from "./../managed/database";
import { PropertyType } from "./../managed/database";
import { Property } from "./../managed/database";
import { Square } from "./../managed/database";
import { Street } from "./../managed/database";
import { WaterBody } from "./../managed/database";

Inject.mappings = {
	"MapService": {
		objectConstructor: MapService,
		parameters: ["DbContext"]
	},
	"DbContext": {
		objectConstructor: DbContext,
		parameters: ["RunContext"]
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
				"VjYnVwc3k5aToyb3FtcDN4c3pnM2RlMW": {
					isArray: false,
					type: "string"
				}
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.getProperty(
				params["VjYnVwc3k5aToyb3FtcDN4c3pnM2RlMW"]
			)
		);

		this.expose(
			"VxbjByZmgxb3NvNDlvcTp0ODc0OW4zaz",
			{
				"F6Mml1d2dxdX0xamxpcDFyaXRuaXZ5NW": {
					isArray: false,
					type: PropertyViewModel
				}
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createProperty(
				params["F6Mml1d2dxdX0xamxpcDFyaXRuaXZ5NW"]
			)
		);

		this.expose(
			"J2c3hyNDQwNTdjeDs4c3htbWh2MWVnaG",
			{
				"Mya2ltZGltbjcyeHdjdGcydGVpZDgyNT": {
					isArray: false,
					type: BoroughViewModel
				}
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createBorough(
				params["Mya2ltZGltbjcyeHdjdGcydGVpZDgyNT"]
			)
		);

		this.expose(
			"RhZGo0ejpmdnJhZ3lla3I4bzB2M2F5cn",
			{
				"FwZXk2OGVmcWRxeHdiZW9ucjhxcGE5cG": {
					isArray: false,
					type: SquareViewModel
				}
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createSquare(
				params["FwZXk2OGVmcWRxeHdiZW9ucjhxcGE5cG"]
			)
		);

		this.expose(
			"A1bX53enB1cHV0cmQzNTYxdDgzaH10an",
			{
				"hnMjgxamVveGk2czR6YjQ2aHdxaGJsaG": {
					isArray: false,
					type: WaterBodyViewModel
				}
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.createWaterBody(
				params["hnMjgxamVveGk2czR6YjQ2aHdxaGJsaG"]
			)
		);

		this.expose(
			"dzb2prZ3QwYT8xZ2ZicXc5ZnN1cGFwZj",
			{
				"NycXNhenFjaGhvZDhsdWtlYzNtd2x4d3": {
					isArray: false,
					type: PropertySummaryModel
				}
			},
			inject => inject.construct(MapService),
			(controller, params) => controller.saveProperty(
				params["NycXNhenFjaGhvZDhsdWtlYzNtd2x4d3"]
			)
		)
	}
}

ViewModel.mappings = {
	BoroughSummaryModel: class ComposedBoroughSummaryModel extends BoroughSummaryModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name,
				propertyPrefix: this.model.propertyPrefix
			}
		};

		static get items() { 
			return {
				id: true,
				name: true,
				propertyPrefix: true
			};
		}

		static toViewModel(data) {
			const item = new BoroughSummaryModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"propertyPrefix" in data && (item.propertyPrefix = data.propertyPrefix === null ? null : `${data.propertyPrefix}`);

			return item;
		}

		static async toModel(viewModel: BoroughSummaryModel) {
			let model: Borough;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Borough).find(viewModel.id)
			} else {
				model = new Borough();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"propertyPrefix" in viewModel && (model.propertyPrefix = viewModel.propertyPrefix === null ? null : `${viewModel.propertyPrefix}`);

			return model;
		}
	},
	BoroughViewModel: class ComposedBoroughViewModel extends BoroughViewModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name,
				color: this.model.color,
				bounds: this.model.bounds
			}
		};

		static get items() { 
			return {
				id: true,
				name: true,
				color: true,
				bounds: true
			};
		}

		static toViewModel(data) {
			const item = new BoroughViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);

			return item;
		}

		static async toModel(viewModel: BoroughViewModel) {
			let model: Borough;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Borough).find(viewModel.id)
			} else {
				model = new Borough();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);

			return model;
		}
	},
	HistoryEntryViewModel: class ComposedHistoryEntryViewModel extends HistoryEntryViewModel {
		async map() {
			return {
				name: this.model.name,
				date: this.model.date
			}
		};

		static get items() { 
			return {
				name: true,
				date: true
			};
		}

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
	PlayerViewModel: class ComposedPlayerViewModel extends PlayerViewModel {
		async map() {
			return {
				id: this.model.id,
				username: this.model.username
			}
		};

		static get items() { 
			return {
				id: true,
				username: true
			};
		}

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
	PropertyTypeViewModel: class ComposedPropertyTypeViewModel extends PropertyTypeViewModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name,
				color: this.model.color,
				code: this.model.code
			}
		};

		static get items() { 
			return {
				id: true,
				name: true,
				color: true,
				code: true
			};
		}

		static toViewModel(data) {
			const item = new PropertyTypeViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"color" in data && (item.color = data.color === null ? null : `${data.color}`);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);

			return item;
		}

		static async toModel(viewModel: PropertyTypeViewModel) {
			let model: PropertyType;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(PropertyType).find(viewModel.id)
			} else {
				model = new PropertyType();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"color" in viewModel && (model.color = viewModel.color === null ? null : `${viewModel.color}`);
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);

			return model;
		}
	},
	PropertySummaryModel: class ComposedPropertySummaryModel extends PropertySummaryModel {
		async map() {
			return {
				type: new PropertyTypeViewModel(await BaseServer.unwrap(this.model.type)),
				id: this.model.id,
				name: this.model.name,
				bounds: this.model.bounds
			}
		};

		static get items() { 
			return {
				get type() { 
					return ViewModel.mappings.PropertyTypeViewModel.items;
				},
				id: true,
				name: true,
				bounds: true
			};
		}

		static toViewModel(data) {
			const item = new PropertySummaryModel(null);
			"type" in data && (item.type = data.type && ViewModel.mappings.PropertyTypeViewModel.toViewModel(data.type));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);

			return item;
		}

		static async toModel(viewModel: PropertySummaryModel) {
			let model: Property;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Property).find(viewModel.id)
			} else {
				model = new Property();
			}
			
			"type" in viewModel && (model.type.id = viewModel.type ? viewModel.type.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);

			return model;
		}
	},
	PropertyViewModel: class ComposedPropertyViewModel extends PropertyViewModel {
		async map() {
			return {
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.model.borough)),
				owner: new PlayerViewModel(await BaseServer.unwrap(this.model.owner)),
				id: this.model.id,
				name: this.model.name,
				code: this.model.code,
				bounds: this.model.bounds
			}
		};

		static get items() { 
			return {
				get borough() { 
					return ViewModel.mappings.BoroughSummaryModel.items;
				},
				get owner() { 
					return ViewModel.mappings.PlayerViewModel.items;
				},
				id: true,
				name: true,
				code: true,
				bounds: true
			};
		}

		static toViewModel(data) {
			const item = new PropertyViewModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings.BoroughSummaryModel.toViewModel(data.borough));
			"owner" in data && (item.owner = data.owner && ViewModel.mappings.PlayerViewModel.toViewModel(data.owner));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"code" in data && (item.code = data.code === null ? null : `${data.code}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);

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
			"owner" in viewModel && (model.owner.id = viewModel.owner ? viewModel.owner.id : null);
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"code" in viewModel && (model.code = viewModel.code === null ? null : `${viewModel.code}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);

			return model;
		}
	},
	SquareViewModel: class ComposedSquareViewModel extends SquareViewModel {
		async map() {
			return {
				borough: new BoroughSummaryModel(await BaseServer.unwrap(this.model.borough)),
				id: this.model.id,
				name: this.model.name,
				bounds: this.model.bounds
			}
		};

		static get items() { 
			return {
				get borough() { 
					return ViewModel.mappings.BoroughSummaryModel.items;
				},
				id: true,
				name: true,
				bounds: true
			};
		}

		static toViewModel(data) {
			const item = new SquareViewModel(null);
			"borough" in data && (item.borough = data.borough && ViewModel.mappings.BoroughSummaryModel.toViewModel(data.borough));
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);

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
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);

			return model;
		}
	},
	StreetViewModel: class ComposedStreetViewModel extends StreetViewModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name,
				shortName: this.model.shortName,
				size: this.model.size,
				path: this.model.path
			}
		};

		static get items() { 
			return {
				id: true,
				name: true,
				shortName: true,
				size: true,
				path: true
			};
		}

		static toViewModel(data) {
			const item = new StreetViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"shortName" in data && (item.shortName = data.shortName === null ? null : `${data.shortName}`);
			"size" in data && (item.size = data.size === null ? null : +data.size);
			"path" in data && (item.path = data.path === null ? null : `${data.path}`);

			return item;
		}

		static async toModel(viewModel: StreetViewModel) {
			let model: Street;
			
			if (viewModel.id) {
				model = await ViewModel.globalFetchingContext.findSet(Street).find(viewModel.id)
			} else {
				model = new Street();
			}
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"shortName" in viewModel && (model.shortName = viewModel.shortName === null ? null : `${viewModel.shortName}`);
			"size" in viewModel && (model.size = viewModel.size === null ? null : +viewModel.size);
			"path" in viewModel && (model.path = viewModel.path === null ? null : `${viewModel.path}`);

			return model;
		}
	},
	WaterBodyViewModel: class ComposedWaterBodyViewModel extends WaterBodyViewModel {
		async map() {
			return {
				id: this.model.id,
				name: this.model.name,
				bounds: this.model.bounds,
				namePath: this.model.namePath
			}
		};

		static get items() { 
			return {
				id: true,
				name: true,
				bounds: true,
				namePath: true
			};
		}

		static toViewModel(data) {
			const item = new WaterBodyViewModel(null);
			"id" in data && (item.id = data.id === null ? null : `${data.id}`);
			"name" in data && (item.name = data.name === null ? null : `${data.name}`);
			"bounds" in data && (item.bounds = data.bounds === null ? null : `${data.bounds}`);
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
			
			"id" in viewModel && (model.id = viewModel.id === null ? null : `${viewModel.id}`);
			"name" in viewModel && (model.name = viewModel.name === null ? null : `${viewModel.name}`);
			"bounds" in viewModel && (model.bounds = viewModel.bounds === null ? null : `${viewModel.bounds}`);
			"namePath" in viewModel && (model.namePath = viewModel.namePath === null ? null : `${viewModel.namePath}`);

			return model;
		}
	}
};