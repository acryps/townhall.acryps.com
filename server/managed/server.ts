import { BaseServer, ViewModel, Inject } from "vlserver";

import { DbContext } from "././database";
import { BoroughViewModel } from "././../areas/borough.view";
import { PropertyViewModel } from "././../areas/property.view";
import { MapService } from "././../areas/map.service";
import { BoroughSummaryModel } from "./../areas/borough.summary";
import { PlayerViewModel } from "./../areas/player.view";
import { Borough } from "./../managed/database";
import { Player } from "./../managed/database";
import { Property } from "./../managed/database";

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
	}
};