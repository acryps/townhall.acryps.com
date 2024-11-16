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

export class PropertyViewModel {
	borough: BoroughSummaryModel;
	historicListingGrade: HistoricListingGradeViewModel;
	owner: PlayerViewModel;
	historicListingModifiers: PropertyHistoricListingModifierViewModel[];
	type: PropertyTypeViewModel;
	bounds: string;
	code: string;
	historicListingRegisteredAt: Date;
	id: string;
	name: string;

	private static $build(raw) {
		const item = new PropertyViewModel();
		raw.borough === undefined || (item.borough = raw.borough ? BoroughSummaryModel["$build"](raw.borough) : null)
		raw.historicListingGrade === undefined || (item.historicListingGrade = raw.historicListingGrade ? HistoricListingGradeViewModel["$build"](raw.historicListingGrade) : null)
		raw.owner === undefined || (item.owner = raw.owner ? PlayerViewModel["$build"](raw.owner) : null)
		raw.historicListingModifiers === undefined || (item.historicListingModifiers = raw.historicListingModifiers ? raw.historicListingModifiers.map(i => PropertyHistoricListingModifierViewModel["$build"](i)) : null)
		raw.type === undefined || (item.type = raw.type ? PropertyTypeViewModel["$build"](raw.type) : null)
		raw.bounds === undefined || (item.bounds = raw.bounds === null ? null : `${raw.bounds}`)
		raw.code === undefined || (item.code = raw.code === null ? null : `${raw.code}`)
		raw.historicListingRegisteredAt === undefined || (item.historicListingRegisteredAt = raw.historicListingRegisteredAt ? new Date(raw.historicListingRegisteredAt) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		
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
	bridges: BridgeViewModel[];
	id: string;
	name: string;
	path: string;
	shortName: string;
	size: number;

	private static $build(raw) {
		const item = new StreetViewModel();
		raw.bridges === undefined || (item.bridges = raw.bridges ? raw.bridges.map(i => BridgeViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.path === undefined || (item.path = raw.path === null ? null : `${raw.path}`)
		raw.shortName === undefined || (item.shortName = raw.shortName === null ? null : `${raw.shortName}`)
		raw.size === undefined || (item.size = raw.size === null ? null : +raw.size)
		
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
	id: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PublicationSummaryModel();
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
		return item;
	}
}

export class PublicationViewModel {
	articles: ArticleViewModel[];
	id: string;
	incorporation: Date;
	legalName: string;
	mainOfficeId: string;
	name: string;
	tag: string;

	private static $build(raw) {
		const item = new PublicationViewModel();
		raw.articles === undefined || (item.articles = raw.articles ? raw.articles.map(i => ArticleViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.incorporation === undefined || (item.incorporation = raw.incorporation ? new Date(raw.incorporation) : null)
		raw.legalName === undefined || (item.legalName = raw.legalName === null ? null : `${raw.legalName}`)
		raw.mainOfficeId === undefined || (item.mainOfficeId = raw.mainOfficeId === null ? null : `${raw.mainOfficeId}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.tag === undefined || (item.tag = raw.tag === null ? null : `${raw.tag}`)
		
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

	async getProperties(): Promise<Array<PropertySummaryModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("VwdXVpOHpwcTVrYXE3NXF3MT9wenU5eH"), {
			method: "post",
			credentials: "include",
			body: $data
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

	async createProperty(propertyViewModel: PropertyViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("F6Mml1d2dxdX0xamxpcDFyaXRuaXZ5NW", Service.stringify(propertyViewModel))

		return await fetch(Service.toURL("VxbjByZmgxb3NvNDlvcTp0ODc0OW4zaz"), {
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

	async deleteProperty(propertyViewModel: PropertyViewModel): Promise<void> {
		const $data = new FormData();
		$data.append("ExMWt6cHEwZTJ0Y3N2cDs3ajYybXd0Zz", Service.stringify(propertyViewModel))

		return await fetch(Service.toURL("1nbWp4M21wOG1naTNoM3B1bWJvbTx1ej"), {
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

	async listNewestArticles(): Promise<Array<ArticleViewModel>> {
		const $data = new FormData();
		

		return await fetch(Service.toURL("F1aXFpZz05eX01dmR2cXd6dGZwdzR2dD"), {
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