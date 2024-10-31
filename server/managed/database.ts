import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from 'vlquery';

export class CompanyType extends QueryEnum {
	static readonly company = "company";
	static readonly governmentCompany = "government_company";
}

export class BoroughQueryProxy extends QueryProxy {
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyPrefix(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Borough extends Entity<BoroughQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		squares: PrimaryReference<Square, SquareQueryProxy>;
		bounds: string;
	color: string;
	declare id: string;
	name: string;
	propertyPrefix: string;
	shortName: string;
	
	$$meta = {
		source: "borough",
		columns: {
			bounds: { type: "text", name: "bounds" },
			color: { type: "text", name: "color" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			propertyPrefix: { type: "text", name: "property_prefix" },
			shortName: { type: "text", name: "short_name" }
		},
		get set(): DbSet<Borough, BoroughQueryProxy> { 
			return new DbSet<Borough, BoroughQueryProxy>(Borough, null);
		}
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "boroughId", Property);
		this.squares = new PrimaryReference<Square, SquareQueryProxy>(this, "boroughId", Square);
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
	declare id: string;
	name: string;
	path: string;
	streetId: string;
	
	$$meta = {
		source: "bridge",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			streetId: { type: "uuid", name: "street_id" }
		},
		get set(): DbSet<Bridge, BridgeQueryProxy> { 
			return new DbSet<Bridge, BridgeQueryProxy>(Bridge, null);
		}
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
			
export class CompanyQueryProxy extends QueryProxy {
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): "company" | "government_company" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Company extends Entity<CompanyQueryProxy> {
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	created: Date;
	declare id: string;
	name: string;
	ownerId: string;
	type: CompanyType;
	
	$$meta = {
		source: "company",
		columns: {
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			ownerId: { type: "uuid", name: "owner_id" },
			type: { type: "company_type", name: "type" }
		},
		get set(): DbSet<Company, CompanyQueryProxy> { 
			return new DbSet<Company, CompanyQueryProxy>(Company, null);
		}
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
			
export class HistoricListingGradeQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grade(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HistoricListingGrade extends Entity<HistoricListingGradeQueryProxy> {
	listedProperties: PrimaryReference<Property, PropertyQueryProxy>;
		description: string;
	grade: number;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "historic_listing_grade",
		columns: {
			description: { type: "text", name: "description" },
			grade: { type: "int4", name: "grade" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy> { 
			return new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, null);
		}
	};
	
	constructor() {
		super();
		
		this.listedProperties = new PrimaryReference<Property, PropertyQueryProxy>(this, "historicListingGradeId", Property);
	}
}
			
export class HistoricListingModifierQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HistoricListingModifier extends Entity<HistoricListingModifierQueryProxy> {
	listedProperties: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		description: string;
	declare id: string;
	name: string;
	shortName: string;
	
	$$meta = {
		source: "historic_listing_modifier",
		columns: {
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			shortName: { type: "text", name: "short_name" }
		},
		get set(): DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy> { 
			return new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, null);
		}
	};
	
	constructor() {
		super();
		
		this.listedProperties = new PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(this, "historicListingModifierId", PropertyHistoricListingModifier);
	}
}
			
export class MovementQueryProxy extends QueryProxy {
	get player(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get driving(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get playerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get time(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get x(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get y(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Movement extends Entity<MovementQueryProxy> {
	get player(): Partial<ForeignReference<Player>> { return this.$player; }
	driving: boolean;
	declare id: string;
	playerId: string;
	time: Date;
	x: number;
	y: number;
	
	$$meta = {
		source: "movement",
		columns: {
			driving: { type: "bool", name: "driving" },
			id: { type: "uuid", name: "id" },
			playerId: { type: "uuid", name: "player_id" },
			time: { type: "timestamp", name: "time" },
			x: { type: "float4", name: "x" },
			y: { type: "float4", name: "y" }
		},
		get set(): DbSet<Movement, MovementQueryProxy> { 
			return new DbSet<Movement, MovementQueryProxy>(Movement, null);
		}
	};
	
	constructor() {
		super();
		
		this.$player = new ForeignReference<Player>(this, "playerId", Player);
	}
	
	private $player: ForeignReference<Player>;

	set player(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.playerId = value.id as string;
		} else {
			this.playerId = null;
		}
	}

	
}
			
export class PlayerQueryProxy extends QueryProxy {
	get gameUuid(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get online(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get username(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get x(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get y(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Player extends Entity<PlayerQueryProxy> {
	companies: PrimaryReference<Company, CompanyQueryProxy>;
		properties: PrimaryReference<Property, PropertyQueryProxy>;
		movements: PrimaryReference<Movement, MovementQueryProxy>;
		gameUuid: string;
	declare id: string;
	online: boolean;
	username: string;
	x: number;
	y: number;
	
	$$meta = {
		source: "player",
		columns: {
			gameUuid: { type: "text", name: "game_uuid" },
			id: { type: "uuid", name: "id" },
			online: { type: "bool", name: "online" },
			username: { type: "text", name: "username" },
			x: { type: "float4", name: "x" },
			y: { type: "float4", name: "y" }
		},
		get set(): DbSet<Player, PlayerQueryProxy> { 
			return new DbSet<Player, PlayerQueryProxy>(Player, null);
		}
	};
	
	constructor() {
		super();
		
		this.companies = new PrimaryReference<Company, CompanyQueryProxy>(this, "ownerId", Company);
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "ownerId", Property);
		this.movements = new PrimaryReference<Movement, MovementQueryProxy>(this, "playerId", Movement);
	}
}
			
export class PropertyQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGrade(): Partial<HistoricListingGradeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): Partial<PropertyTypeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGradeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingRegisteredAt(): Partial<QueryDate> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get typeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Property extends Entity<PropertyQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	get historicListingGrade(): Partial<ForeignReference<HistoricListingGrade>> { return this.$historicListingGrade; }
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	historicListingModifiers: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		get type(): Partial<ForeignReference<PropertyType>> { return this.$type; }
	boroughId: string;
	bounds: string;
	code: string;
	historicListingGradeId: string;
	historicListingRegisteredAt: Date;
	declare id: string;
	name: string;
	ownerId: string;
	typeId: string;
	
	$$meta = {
		source: "property",
		columns: {
			boroughId: { type: "uuid", name: "borough_id" },
			bounds: { type: "text", name: "bounds" },
			code: { type: "text", name: "code" },
			historicListingGradeId: { type: "uuid", name: "historic_listing_grade_id" },
			historicListingRegisteredAt: { type: "date", name: "historic_listing_registered_at" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			ownerId: { type: "uuid", name: "owner_id" },
			typeId: { type: "uuid", name: "type_id" }
		},
		get set(): DbSet<Property, PropertyQueryProxy> { 
			return new DbSet<Property, PropertyQueryProxy>(Property, null);
		}
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
			
export class PropertyHistoricListingModifierQueryProxy extends QueryProxy {
	get historicListingModifier(): Partial<HistoricListingModifierQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingModifierId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyHistoricListingModifier extends Entity<PropertyHistoricListingModifierQueryProxy> {
	get historicListingModifier(): Partial<ForeignReference<HistoricListingModifier>> { return this.$historicListingModifier; }
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	historicListingModifierId: string;
	declare id: string;
	propertyId: string;
	
	$$meta = {
		source: "property_historic_listing_modifier",
		columns: {
			historicListingModifierId: { type: "uuid", name: "historic_listing_modifier_id" },
			id: { type: "uuid", name: "id" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy> { 
			return new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, null);
		}
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
			
export class PropertyTypeQueryProxy extends QueryProxy {
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyType extends Entity<PropertyTypeQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		code: string;
	color: string;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "property_type",
		columns: {
			code: { type: "text", name: "code" },
			color: { type: "text", name: "color" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<PropertyType, PropertyTypeQueryProxy> { 
			return new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, null);
		}
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "typeId", Property);
	}
}
			
export class SquareQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Square extends Entity<SquareQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	boroughId: string;
	bounds: string;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "square",
		columns: {
			boroughId: { type: "uuid", name: "borough_id" },
			bounds: { type: "text", name: "bounds" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<Square, SquareQueryProxy> { 
			return new DbSet<Square, SquareQueryProxy>(Square, null);
		}
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
			
export class StreetQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get size(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Street extends Entity<StreetQueryProxy> {
	bridges: PrimaryReference<Bridge, BridgeQueryProxy>;
		declare id: string;
	name: string;
	path: string;
	shortName: string;
	size: number;
	
	$$meta = {
		source: "street",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			shortName: { type: "text", name: "short_name" },
			size: { type: "float4", name: "size" }
		},
		get set(): DbSet<Street, StreetQueryProxy> { 
			return new DbSet<Street, StreetQueryProxy>(Street, null);
		}
	};
	
	constructor() {
		super();
		
		this.bridges = new PrimaryReference<Bridge, BridgeQueryProxy>(this, "streetId", Bridge);
	}
}
			
export class TrainRouteQueryProxy extends QueryProxy {
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainRoute extends Entity<TrainRouteQueryProxy> {
	stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		color: string;
	declare id: string;
	name: string;
	path: string;
	
	$$meta = {
		source: "train_route",
		columns: {
			color: { type: "text", name: "color" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" }
		},
		get set(): DbSet<TrainRoute, TrainRouteQueryProxy> { 
			return new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, null);
		}
	};
	
	constructor() {
		super();
		
		this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "routeId", TrainStop);
	}
}
			
export class TrainStationQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get position(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStation extends Entity<TrainStationQueryProxy> {
	exits: PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>;
		stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		declare id: string;
	name: string;
	position: string;
	
	$$meta = {
		source: "train_station",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			position: { type: "text", name: "position" }
		},
		get set(): DbSet<TrainStation, TrainStationQueryProxy> { 
			return new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, null);
		}
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
	declare id: string;
	inbound: boolean;
	position: string;
	stationId: string;
	
	$$meta = {
		source: "train_station_exit",
		columns: {
			id: { type: "uuid", name: "id" },
			inbound: { type: "bool", name: "inbound" },
			position: { type: "text", name: "position" },
			stationId: { type: "uuid", name: "station_id" }
		},
		get set(): DbSet<TrainStationExit, TrainStationExitQueryProxy> { 
			return new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, null);
		}
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
			
export class TrainStopQueryProxy extends QueryProxy {
	get route(): Partial<TrainRouteQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get station(): Partial<TrainStationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get routeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get stationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get trackPosition(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStop extends Entity<TrainStopQueryProxy> {
	get route(): Partial<ForeignReference<TrainRoute>> { return this.$route; }
	get station(): Partial<ForeignReference<TrainStation>> { return this.$station; }
	declare id: string;
	name: string;
	routeId: string;
	stationId: string;
	trackPosition: string;
	
	$$meta = {
		source: "train_stop",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			routeId: { type: "uuid", name: "route_id" },
			stationId: { type: "uuid", name: "station_id" },
			trackPosition: { type: "text", name: "track_position" }
		},
		get set(): DbSet<TrainStop, TrainStopQueryProxy> { 
			return new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, null);
		}
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
			
export class WaterBodyQueryProxy extends QueryProxy {
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get namePath(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class WaterBody extends Entity<WaterBodyQueryProxy> {
	bounds: string;
	declare id: string;
	name: string;
	namePath: string;
	
	$$meta = {
		source: "water_body",
		columns: {
			bounds: { type: "text", name: "bounds" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			namePath: { type: "text", name: "name_path" }
		},
		get set(): DbSet<WaterBody, WaterBodyQueryProxy> { 
			return new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, null);
		}
	};
}
			

export class DbContext {
	borough: DbSet<Borough, BoroughQueryProxy>;
	bridge: DbSet<Bridge, BridgeQueryProxy>;
	company: DbSet<Company, CompanyQueryProxy>;
	historicListingGrade: DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>;
	historicListingModifier: DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>;
	movement: DbSet<Movement, MovementQueryProxy>;
	player: DbSet<Player, PlayerQueryProxy>;
	property: DbSet<Property, PropertyQueryProxy>;
	propertyHistoricListingModifier: DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
	propertyType: DbSet<PropertyType, PropertyTypeQueryProxy>;
	square: DbSet<Square, SquareQueryProxy>;
	street: DbSet<Street, StreetQueryProxy>;
	trainRoute: DbSet<TrainRoute, TrainRouteQueryProxy>;
	trainStation: DbSet<TrainStation, TrainStationQueryProxy>;
	trainStationExit: DbSet<TrainStationExit, TrainStationExitQueryProxy>;
	trainStop: DbSet<TrainStop, TrainStopQueryProxy>;
	waterBody: DbSet<WaterBody, WaterBodyQueryProxy>;

	constructor(private runContext: RunContext) {
		this.borough = new DbSet<Borough, BoroughQueryProxy>(Borough, this.runContext);
		this.bridge = new DbSet<Bridge, BridgeQueryProxy>(Bridge, this.runContext);
		this.company = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
		this.historicListingGrade = new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, this.runContext);
		this.historicListingModifier = new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, this.runContext);
		this.movement = new DbSet<Movement, MovementQueryProxy>(Movement, this.runContext);
		this.player = new DbSet<Player, PlayerQueryProxy>(Player, this.runContext);
		this.property = new DbSet<Property, PropertyQueryProxy>(Property, this.runContext);
		this.propertyHistoricListingModifier = new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, this.runContext);
		this.propertyType = new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, this.runContext);
		this.square = new DbSet<Square, SquareQueryProxy>(Square, this.runContext);
		this.street = new DbSet<Street, StreetQueryProxy>(Street, this.runContext);
		this.trainRoute = new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, this.runContext);
		this.trainStation = new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, this.runContext);
		this.trainStationExit = new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, this.runContext);
		this.trainStop = new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, this.runContext);
		this.waterBody = new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, this.runContext);
	}

	findSet(modelType) {
		for (let key in this) {
			if (this[key] instanceof DbSet) {
				if ((this[key] as any).modelConstructor == modelType) {
					return this[key];
				}
			}
		}
	}

	
};