import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference } from "vlquery";

export class PlayerQueryProxy extends QueryProxy {
	get username(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Player extends Entity<PlayerQueryProxy> {
	companies: PrimaryReference<Company, CompanyQueryProxy>;
		properties: PrimaryReference<Property, PropertyQueryProxy>;
		id: string;
	username: string;
	

	$$meta = {
		tableName: "player",

		columns: {
			id: { type: "uuid", name: "id" },
			username: { type: "text", name: "username" }
		},

		get set(): DbSet<Player, PlayerQueryProxy> { return new DbSet<Player, PlayerQueryProxy>(Player, null) }
	};
	
	constructor() {
		super();
		
		this.companies = new PrimaryReference<Company, CompanyQueryProxy>(this, "ownerId", Company);
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "ownerId", Property);
	}
}
			
export class SquareQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Square extends Entity<SquareQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	id: string;
	name: string;
	bounds: string;
	boroughId: string;
	

	$$meta = {
		tableName: "square",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			bounds: { type: "text", name: "bounds" },
			boroughId: { type: "uuid", name: "borough_id" }
		},

		get set(): DbSet<Square, SquareQueryProxy> { return new DbSet<Square, SquareQueryProxy>(Square, null) }
	};
	
	constructor() {
		super();
		
		this.$borough = new ForeignReference<Borough>(this, "boroughId", Borough);
	}
	
	
	private $borough: ForeignReference<Borough>;

	set borough(value: Partial<ForeignReference<Borough>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.boroughId = value.id as string;
		} else {
			this.boroughId = null;
		}
	}
					
}
			
export class TrainRouteQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainRoute extends Entity<TrainRouteQueryProxy> {
	stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		id: string;
	name: string;
	path: string;
	color: string;
	

	$$meta = {
		tableName: "train_route",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			color: { type: "text", name: "color" }
		},

		get set(): DbSet<TrainRoute, TrainRouteQueryProxy> { return new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, null) }
	};
	
	constructor() {
		super();
		
		this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "routeId", TrainStop);
	}
}
			
export class TrainStopQueryProxy extends QueryProxy {
	get route(): Partial<TrainRouteQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get station(): Partial<TrainStationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get trackPosition(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get stationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get routeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStop extends Entity<TrainStopQueryProxy> {
	get route(): Partial<ForeignReference<TrainRoute>> { return this.$route; }
	get station(): Partial<ForeignReference<TrainStation>> { return this.$station; }
	id: string;
	name: string;
	trackPosition: string;
	stationId: string;
	routeId: string;
	

	$$meta = {
		tableName: "train_stop",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			trackPosition: { type: "text", name: "track_position" },
			stationId: { type: "uuid", name: "station_id" },
			routeId: { type: "uuid", name: "route_id" }
		},

		get set(): DbSet<TrainStop, TrainStopQueryProxy> { return new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, null) }
	};
	
	constructor() {
		super();
		
		this.$route = new ForeignReference<TrainRoute>(this, "routeId", TrainRoute);
		this.$station = new ForeignReference<TrainStation>(this, "stationId", TrainStation);
	}
	
	
	private $route: ForeignReference<TrainRoute>;

	set route(value: Partial<ForeignReference<TrainRoute>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.routeId = value.id as string;
		} else {
			this.routeId = null;
		}
	}
					
	private $station: ForeignReference<TrainStation>;

	set station(value: Partial<ForeignReference<TrainStation>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.stationId = value.id as string;
		} else {
			this.stationId = null;
		}
	}
					
}
			
export class CompanyQueryProxy extends QueryProxy {
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Company extends Entity<CompanyQueryProxy> {
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	id: string;
	name: string;
	ownerId: string;
	

	$$meta = {
		tableName: "company",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			ownerId: { type: "uuid", name: "owner_id" }
		},

		get set(): DbSet<Company, CompanyQueryProxy> { return new DbSet<Company, CompanyQueryProxy>(Company, null) }
	};
	
	constructor() {
		super();
		
		this.$owner = new ForeignReference<Player>(this, "ownerId", Player);
	}
	
	
	private $owner: ForeignReference<Player>;

	set owner(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}
					
}
			
export class StreetQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get size(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Street extends Entity<StreetQueryProxy> {
	bridges: PrimaryReference<Bridge, BridgeQueryProxy>;
		id: string;
	name: string;
	shortName: string;
	size: number;
	path: string;
	

	$$meta = {
		tableName: "street",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			shortName: { type: "text", name: "short_name" },
			size: { type: "float4", name: "size" },
			path: { type: "text", name: "path" }
		},

		get set(): DbSet<Street, StreetQueryProxy> { return new DbSet<Street, StreetQueryProxy>(Street, null) }
	};
	
	constructor() {
		super();
		
		this.bridges = new PrimaryReference<Bridge, BridgeQueryProxy>(this, "streetId", Bridge);
	}
}
			
export class PropertyTypeQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyType extends Entity<PropertyTypeQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		id: string;
	name: string;
	color: string;
	code: string;
	

	$$meta = {
		tableName: "property_type",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			color: { type: "text", name: "color" },
			code: { type: "text", name: "code" }
		},

		get set(): DbSet<PropertyType, PropertyTypeQueryProxy> { return new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, null) }
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "typeId", Property);
	}
}
			
export class TrainStationQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get position(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStation extends Entity<TrainStationQueryProxy> {
	exits: PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>;
		stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		id: string;
	name: string;
	position: string;
	

	$$meta = {
		tableName: "train_station",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			position: { type: "text", name: "position" }
		},

		get set(): DbSet<TrainStation, TrainStationQueryProxy> { return new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, null) }
	};
	
	constructor() {
		super();
		
		this.exits = new PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>(this, "stationId", TrainStationExit);
		this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "stationId", TrainStop);
	}
}
			
export class TrainStationExitQueryProxy extends QueryProxy {
	get station(): Partial<TrainStationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get inbound(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get position(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get stationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStationExit extends Entity<TrainStationExitQueryProxy> {
	get station(): Partial<ForeignReference<TrainStation>> { return this.$station; }
	id: string;
	inbound: boolean;
	position: string;
	stationId: string;
	

	$$meta = {
		tableName: "train_station_exit",

		columns: {
			id: { type: "uuid", name: "id" },
			inbound: { type: "bool", name: "inbound" },
			position: { type: "text", name: "position" },
			stationId: { type: "uuid", name: "station_id" }
		},

		get set(): DbSet<TrainStationExit, TrainStationExitQueryProxy> { return new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, null) }
	};
	
	constructor() {
		super();
		
		this.$station = new ForeignReference<TrainStation>(this, "stationId", TrainStation);
	}
	
	
	private $station: ForeignReference<TrainStation>;

	set station(value: Partial<ForeignReference<TrainStation>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.stationId = value.id as string;
		} else {
			this.stationId = null;
		}
	}
					
}
			
export class WaterBodyQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get namePath(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class WaterBody extends Entity<WaterBodyQueryProxy> {
	id: string;
	name: string;
	bounds: string;
	namePath: string;
	

	$$meta = {
		tableName: "water_body",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			bounds: { type: "text", name: "bounds" },
			namePath: { type: "text", name: "name_path" }
		},

		get set(): DbSet<WaterBody, WaterBodyQueryProxy> { return new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, null) }
	};
}
			
export class BoroughQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyPrefix(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Borough extends Entity<BoroughQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		squares: PrimaryReference<Square, SquareQueryProxy>;
		id: string;
	name: string;
	shortName: string;
	propertyPrefix: string;
	color: string;
	bounds: string;
	

	$$meta = {
		tableName: "borough",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			shortName: { type: "text", name: "short_name" },
			propertyPrefix: { type: "text", name: "property_prefix" },
			color: { type: "text", name: "color" },
			bounds: { type: "text", name: "bounds" }
		},

		get set(): DbSet<Borough, BoroughQueryProxy> { return new DbSet<Borough, BoroughQueryProxy>(Borough, null) }
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "boroughId", Property);
		this.squares = new PrimaryReference<Square, SquareQueryProxy>(this, "boroughId", Square);
	}
}
			
export class PropertyQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGrade(): Partial<HistoricListingGradeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): Partial<PropertyTypeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get typeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGradeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingRegisteredAt(): Partial<QueryDate> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Property extends Entity<PropertyQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	get historicListingGrade(): Partial<ForeignReference<HistoricListingGrade>> { return this.$historicListingGrade; }
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	historicListingModifiers: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		get type(): Partial<ForeignReference<PropertyType>> { return this.$type; }
	id: string;
	name: string;
	code: string;
	bounds: string;
	ownerId: string;
	boroughId: string;
	typeId: string;
	historicListingGradeId: string;
	historicListingRegisteredAt: Date;
	

	$$meta = {
		tableName: "property",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			code: { type: "text", name: "code" },
			bounds: { type: "text", name: "bounds" },
			ownerId: { type: "uuid", name: "owner_id" },
			boroughId: { type: "uuid", name: "borough_id" },
			typeId: { type: "uuid", name: "type_id" },
			historicListingGradeId: { type: "uuid", name: "historic_listing_grade_id" },
			historicListingRegisteredAt: { type: "date", name: "historic_listing_registered_at" }
		},

		get set(): DbSet<Property, PropertyQueryProxy> { return new DbSet<Property, PropertyQueryProxy>(Property, null) }
	};
	
	constructor() {
		super();
		
		this.$borough = new ForeignReference<Borough>(this, "boroughId", Borough);
		this.$historicListingGrade = new ForeignReference<HistoricListingGrade>(this, "historicListingGradeId", HistoricListingGrade);
		this.$owner = new ForeignReference<Player>(this, "ownerId", Player);
		this.historicListingModifiers = new PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(this, "propertyId", PropertyHistoricListingModifier);
		this.$type = new ForeignReference<PropertyType>(this, "typeId", PropertyType);
	}
	
	
	private $borough: ForeignReference<Borough>;

	set borough(value: Partial<ForeignReference<Borough>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.boroughId = value.id as string;
		} else {
			this.boroughId = null;
		}
	}
					
	private $historicListingGrade: ForeignReference<HistoricListingGrade>;

	set historicListingGrade(value: Partial<ForeignReference<HistoricListingGrade>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.historicListingGradeId = value.id as string;
		} else {
			this.historicListingGradeId = null;
		}
	}
					
	private $owner: ForeignReference<Player>;

	set owner(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}
					
	private $type: ForeignReference<PropertyType>;

	set type(value: Partial<ForeignReference<PropertyType>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.typeId = value.id as string;
		} else {
			this.typeId = null;
		}
	}
					
}
			
export class HistoricListingModifierQueryProxy extends QueryProxy {
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HistoricListingModifier extends Entity<HistoricListingModifierQueryProxy> {
	listedProperties: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		id: string;
	shortName: string;
	name: string;
	description: string;
	

	$$meta = {
		tableName: "historic_listing_modifier",

		columns: {
			id: { type: "uuid", name: "id" },
			shortName: { type: "text", name: "short_name" },
			name: { type: "text", name: "name" },
			description: { type: "text", name: "description" }
		},

		get set(): DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy> { return new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, null) }
	};
	
	constructor() {
		super();
		
		this.listedProperties = new PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(this, "historicListingModifierId", PropertyHistoricListingModifier);
	}
}
			
export class HistoricListingGradeQueryProxy extends QueryProxy {
	get grade(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HistoricListingGrade extends Entity<HistoricListingGradeQueryProxy> {
	listedProperties: PrimaryReference<Property, PropertyQueryProxy>;
		id: string;
	grade: number;
	name: string;
	description: string;
	

	$$meta = {
		tableName: "historic_listing_grade",

		columns: {
			id: { type: "uuid", name: "id" },
			grade: { type: "int4", name: "grade" },
			name: { type: "text", name: "name" },
			description: { type: "text", name: "description" }
		},

		get set(): DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy> { return new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, null) }
	};
	
	constructor() {
		super();
		
		this.listedProperties = new PrimaryReference<Property, PropertyQueryProxy>(this, "historicListingGradeId", Property);
	}
}
			
export class BridgeQueryProxy extends QueryProxy {
	get street(): Partial<StreetQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get streetId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Bridge extends Entity<BridgeQueryProxy> {
	get street(): Partial<ForeignReference<Street>> { return this.$street; }
	id: string;
	name: string;
	path: string;
	streetId: string;
	

	$$meta = {
		tableName: "bridge",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			streetId: { type: "uuid", name: "street_id" }
		},

		get set(): DbSet<Bridge, BridgeQueryProxy> { return new DbSet<Bridge, BridgeQueryProxy>(Bridge, null) }
	};
	
	constructor() {
		super();
		
		this.$street = new ForeignReference<Street>(this, "streetId", Street);
	}
	
	
	private $street: ForeignReference<Street>;

	set street(value: Partial<ForeignReference<Street>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.streetId = value.id as string;
		} else {
			this.streetId = null;
		}
	}
					
}
			
export class PropertyHistoricListingModifierQueryProxy extends QueryProxy {
	get historicListingModifier(): Partial<HistoricListingModifierQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingModifierId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyHistoricListingModifier extends Entity<PropertyHistoricListingModifierQueryProxy> {
	get historicListingModifier(): Partial<ForeignReference<HistoricListingModifier>> { return this.$historicListingModifier; }
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	id: string;
	propertyId: string;
	historicListingModifierId: string;
	

	$$meta = {
		tableName: "property_historic_listing_modifier",

		columns: {
			id: { type: "uuid", name: "id" },
			propertyId: { type: "uuid", name: "property_id" },
			historicListingModifierId: { type: "uuid", name: "historic_listing_modifier_id" }
		},

		get set(): DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy> { return new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, null) }
	};
	
	constructor() {
		super();
		
		this.$historicListingModifier = new ForeignReference<HistoricListingModifier>(this, "historicListingModifierId", HistoricListingModifier);
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
	}
	
	
	private $historicListingModifier: ForeignReference<HistoricListingModifier>;

	set historicListingModifier(value: Partial<ForeignReference<HistoricListingModifier>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.historicListingModifierId = value.id as string;
		} else {
			this.historicListingModifierId = null;
		}
	}
					
	private $property: ForeignReference<Property>;

	set property(value: Partial<ForeignReference<Property>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.propertyId = value.id as string;
		} else {
			this.propertyId = null;
		}
	}
					
}
			

export class DbContext {
	constructor(private runContext: RunContext) {}

	findSet(modelType) {
		for (let key in this) {
			if (this[key] instanceof DbSet) {
				if ((this[key] as any).modelConstructor == modelType) {
					return this[key];
				}
			}
		}
	}

	player: DbSet<Player, PlayerQueryProxy> = new DbSet<Player, PlayerQueryProxy>(Player, this.runContext);
	square: DbSet<Square, SquareQueryProxy> = new DbSet<Square, SquareQueryProxy>(Square, this.runContext);
	trainRoute: DbSet<TrainRoute, TrainRouteQueryProxy> = new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, this.runContext);
	trainStop: DbSet<TrainStop, TrainStopQueryProxy> = new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, this.runContext);
	company: DbSet<Company, CompanyQueryProxy> = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
	street: DbSet<Street, StreetQueryProxy> = new DbSet<Street, StreetQueryProxy>(Street, this.runContext);
	propertyType: DbSet<PropertyType, PropertyTypeQueryProxy> = new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, this.runContext);
	trainStation: DbSet<TrainStation, TrainStationQueryProxy> = new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, this.runContext);
	trainStationExit: DbSet<TrainStationExit, TrainStationExitQueryProxy> = new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, this.runContext);
	waterBody: DbSet<WaterBody, WaterBodyQueryProxy> = new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, this.runContext);
	borough: DbSet<Borough, BoroughQueryProxy> = new DbSet<Borough, BoroughQueryProxy>(Borough, this.runContext);
	property: DbSet<Property, PropertyQueryProxy> = new DbSet<Property, PropertyQueryProxy>(Property, this.runContext);
	historicListingModifier: DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy> = new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, this.runContext);
	historicListingGrade: DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy> = new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, this.runContext);
	bridge: DbSet<Bridge, BridgeQueryProxy> = new DbSet<Bridge, BridgeQueryProxy>(Bridge, this.runContext);
	propertyHistoricListingModifier: DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy> = new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, this.runContext);
};