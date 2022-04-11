export class BoroughSummaryModel {
	id: string;
	name: string;
	propertyPrefix: string;

	private static $build(raw) {
		const item = new BoroughSummaryModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.propertyPrefix = raw.propertyPrefix === null ? null : `${raw.propertyPrefix}`
		
		return item;
	}
}

export class BoroughViewModel {
	id: string;
	name: string;
	color: string;
	bounds: string;

	private static $build(raw) {
		const item = new BoroughViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.color = raw.color === null ? null : `${raw.color}`
		item.bounds = raw.bounds === null ? null : `${raw.bounds}`
		
		return item;
	}
}

export class HistoryEntryViewModel {
	name: string;
	date: Date;

	private static $build(raw) {
		const item = new HistoryEntryViewModel();
		item.name = raw.name === null ? null : `${raw.name}`
		item.date = raw.date ? new Date(raw.date) : null
		
		return item;
	}
}

export class PlayerViewModel {
	id: string;
	username: string;

	private static $build(raw) {
		const item = new PlayerViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.username = raw.username === null ? null : `${raw.username}`
		
		return item;
	}
}

export class PropertyTypeViewModel {
	id: string;
	name: string;
	color: string;
	code: string;

	private static $build(raw) {
		const item = new PropertyTypeViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.color = raw.color === null ? null : `${raw.color}`
		item.code = raw.code === null ? null : `${raw.code}`
		
		return item;
	}
}

export class PropertySummaryModel {
	borough: BoroughSummaryModel;
	type: PropertyTypeViewModel;
	id: string;
	name: string;
	bounds: string;

	private static $build(raw) {
		const item = new PropertySummaryModel();
		item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null
		item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.bounds = raw.bounds === null ? null : `${raw.bounds}`
		
		return item;
	}
}

export class PropertyViewModel {
	borough: BoroughSummaryModel;
	owner: PlayerViewModel;
	type: PropertyTypeViewModel;
	id: string;
	name: string;
	code: string;
	bounds: string;

	private static $build(raw) {
		const item = new PropertyViewModel();
		item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null
		item.owner = raw.owner ? PlayerViewModel["$build"](raw.owner) : null
		item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.code = raw.code === null ? null : `${raw.code}`
		item.bounds = raw.bounds === null ? null : `${raw.bounds}`
		
		return item;
	}
}

export class SquareViewModel {
	borough: BoroughSummaryModel;
	id: string;
	name: string;
	bounds: string;

	private static $build(raw) {
		const item = new SquareViewModel();
		item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.bounds = raw.bounds === null ? null : `${raw.bounds}`
		
		return item;
	}
}

export class StreetViewModel {
	id: string;
	name: string;
	shortName: string;
	size: number;
	path: string;

	private static $build(raw) {
		const item = new StreetViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.shortName = raw.shortName === null ? null : `${raw.shortName}`
		item.size = raw.size === null ? null : +raw.size
		item.path = raw.path === null ? null : `${raw.path}`
		
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
		item.station = raw.station ? TrainStationViewModel["$build"](raw.station) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.inbound = !!raw.inbound
		item.position = raw.position === null ? null : `${raw.position}`
		
		return item;
	}
}

export class TrainRouteViewModel {
	stops: TrainStopViewModel[];
	id: string;
	name: string;
	path: string;
	color: string;

	private static $build(raw) {
		const item = new TrainRouteViewModel();
		item.stops = raw.stops ? raw.stops.map(i => TrainStopViewModel["$build"](i)) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.path = raw.path === null ? null : `${raw.path}`
		item.color = raw.color === null ? null : `${raw.color}`
		
		return item;
	}
}

export class TrainStationViewModel {
	id: string;
	name: string;
	position: string;

	private static $build(raw) {
		const item = new TrainStationViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.position = raw.position === null ? null : `${raw.position}`
		
		return item;
	}
}

export class TrainStopViewModel {
	id: string;
	name: string;
	trackPosition: string;
	stationId: string;

	private static $build(raw) {
		const item = new TrainStopViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.trackPosition = raw.trackPosition === null ? null : `${raw.trackPosition}`
		item.stationId = raw.stationId === null ? null : `${raw.stationId}`
		
		return item;
	}
}

export class WaterBodyViewModel {
	id: string;
	name: string;
	bounds: string;
	namePath: string;

	private static $build(raw) {
		const item = new WaterBodyViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.bounds = raw.bounds === null ? null : `${raw.bounds}`
		item.namePath = raw.namePath === null ? null : `${raw.namePath}`
		
		return item;
	}
}

export class Service {
	static baseUrl = "";

	static toURL(request) {
		return `${this.baseUrl}${request}`;
	}
}

export class MapService {
	async getBoroughs(): Promise<Array<BoroughViewModel>> {
		const data = new FormData();
		

		return await fetch(Service.toURL("R2M2Z2Yjx4aGM4MzR1ZzcxdjI5Zzprbm"), {
			method: "post",
			credentials: "include",
			body: data
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

	async getProperties(): Promise<Array<PropertySummaryModel>> {
		const data = new FormData();
		

		return await fetch(Service.toURL("VwdXVpOHpwcTVrYXE3NXF3MT9wenU5eH"), {
			method: "post",
			credentials: "include",
			body: data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : PropertySummaryModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getStreets(): Promise<Array<StreetViewModel>> {
		const data = new FormData();
		

		return await fetch(Service.toURL("k1M2B2amlvbmR4OGRvcnJ2Zn55OGcybG"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		

		return await fetch(Service.toURL("hpejphODJldWo2b2NxaWVxdzx3c2V3bm"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		

		return await fetch(Service.toURL("luMjgwbmc0MDFmNGEzZDNkbDcxOH04NG"), {
			method: "post",
			credentials: "include",
			body: data
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

	async getHistory(): Promise<Array<HistoryEntryViewModel>> {
		const data = new FormData();
		

		return await fetch(Service.toURL("oyOTdvb2V4aXw3eHhsNXdyZnp4aGk1bD"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		

		return await fetch(Service.toURL("MwNT15bTI5ZDNubmZ5dW96Nj9qeGVwd3"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		

		return await fetch(Service.toURL("U2eWZwcW41MGJxZGVndzdjNnhmZXFhMT"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		data.append("VjYnVwc3k5aToyb3FtcDN4c3pnM2RlMW", JSON.stringify(id))

		return await fetch(Service.toURL("d1NTdqcWBiMWE5ZHg3ZndyM2UzNnMwNm"), {
			method: "post",
			credentials: "include",
			body: data
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

	async createProperty(propertyViewModel: PropertyViewModel): Promise<void> {
		const data = new FormData();
		data.append("F6Mml1d2dxdX0xamxpcDFyaXRuaXZ5NW", JSON.stringify(propertyViewModel))

		return await fetch(Service.toURL("VxbjByZmgxb3NvNDlvcTp0ODc0OW4zaz"), {
			method: "post",
			credentials: "include",
			body: data
		}).then(res => res.json()).then(r => {
			if ("error" in r) {
				throw new Error(r.error);
			}

			if ("aborted" in r) {
				throw new Error("request aborted by server");
			}
		});
	}

	async createBorough(boroughViewModel: BoroughViewModel): Promise<void> {
		const data = new FormData();
		data.append("Mya2ltZGltbjcyeHdjdGcydGVpZDgyNT", JSON.stringify(boroughViewModel))

		return await fetch(Service.toURL("J2c3hyNDQwNTdjeDs4c3htbWh2MWVnaG"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		data.append("FwZXk2OGVmcWRxeHdiZW9ucjhxcGE5cG", JSON.stringify(squareViewModel))

		return await fetch(Service.toURL("RhZGo0ejpmdnJhZ3lla3I4bzB2M2F5cn"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		data.append("hnMjgxamVveGk2czR6YjQ2aHdxaGJsaG", JSON.stringify(waterBodyViewModel))

		return await fetch(Service.toURL("A1bX53enB1cHV0cmQzNTYxdDgzaH10an"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		data.append("NycXNhenFjaGhvZDhsdWtlYzNtd2x4d3", JSON.stringify(propertyViewModel))

		return await fetch(Service.toURL("dzb2prZ3QwYT8xZ2ZicXc5ZnN1cGFwZj"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		

		return await fetch(Service.toURL("hsZXxsa2h0eG50MnVjazg1eHMyY3NiNW"), {
			method: "post",
			credentials: "include",
			body: data
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
		const data = new FormData();
		

		return await fetch(Service.toURL("N2YnloZWZwdGJ3M2pjZ3JidnM2eDE1d2"), {
			method: "post",
			credentials: "include",
			body: data
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