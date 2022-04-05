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

export class PropertySummaryModel {
	id: string;
	name: string;
	bounds: string;

	private static $build(raw) {
		const item = new PropertySummaryModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.bounds = raw.bounds === null ? null : `${raw.bounds}`
		
		return item;
	}
}

export class PropertyViewModel {
	borough: BoroughSummaryModel;
	owner: PlayerViewModel;
	id: string;
	name: string;
	code: string;
	bounds: string;

	private static $build(raw) {
		const item = new PropertyViewModel();
		item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null
		item.owner = raw.owner ? PlayerViewModel["$build"](raw.owner) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.code = raw.code === null ? null : `${raw.code}`
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
}