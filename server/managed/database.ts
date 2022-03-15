import { 
	Entity,
	DbSet,
	RunContext,
	QueryUUID,
	QueryProxy,
	QueryString,
	QueryJSON,
	QueryTimeStamp,
	QueryNumber,
	QueryTime,
	QueryDate,
	QueryBoolean,
	QueryBuffer,
	QueryEnum,
	ForeignReference,
	PrimaryReference
} from "vlquery";

export class PlayerQueryProxy extends QueryProxy {
	get username(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Player extends Entity<PlayerQueryProxy> {
	$$meta = {
		tableName: "player",
		columns: {"id":{"type":"uuid","name":"id"},"username":{"type":"text","name":"username"}},
		get set(): DbSet<Player, PlayerQueryProxy> {
			// returns unbound dbset
			return new DbSet<Player, PlayerQueryProxy>(Player, null)
		},
		
	};
		
	constructor() {
		super();

		this.companies = new PrimaryReference<Company, CompanyQueryProxy>(
			this,
			"ownerId",
			Company
		);
					
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(
			this,
			"ownerId",
			Property
		);
	}

	companies: PrimaryReference<Company, CompanyQueryProxy>;
					
	properties: PrimaryReference<Property, PropertyQueryProxy>;
					
	id: string;
	username: string;
}
			
export class CompanyQueryProxy extends QueryProxy {
	get owner(): Partial<PlayerQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get ownerId(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Company extends Entity<CompanyQueryProxy> {
	$$meta = {
		tableName: "company",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"},"ownerId":{"type":"uuid","name":"owner_id"}},
		get set(): DbSet<Company, CompanyQueryProxy> {
			// returns unbound dbset
			return new DbSet<Company, CompanyQueryProxy>(Company, null)
		},
		
	};
		
	constructor() {
		super();

		this.$owner = new ForeignReference<Player>(
			this,
			"ownerId",
			Player
		);
	}

	private $owner: ForeignReference<Player>;

	get owner(): Partial<ForeignReference<Player>> {
		return this.$owner;
	}

	set owner(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}
					
	id: string;
	name: string;
	ownerId: string;
}
			
export class PropertyQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get owner(): Partial<PlayerQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get code(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get bounds(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get ownerId(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get boroughId(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Property extends Entity<PropertyQueryProxy> {
	$$meta = {
		tableName: "property",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"},"code":{"type":"text","name":"code"},"bounds":{"type":"text","name":"bounds"},"ownerId":{"type":"uuid","name":"owner_id"},"boroughId":{"type":"uuid","name":"borough_id"}},
		get set(): DbSet<Property, PropertyQueryProxy> {
			// returns unbound dbset
			return new DbSet<Property, PropertyQueryProxy>(Property, null)
		},
		
	};
		
	constructor() {
		super();

		this.$borough = new ForeignReference<Borough>(
			this,
			"boroughId",
			Borough
		);
					
		this.$owner = new ForeignReference<Player>(
			this,
			"ownerId",
			Player
		);
	}

	private $borough: ForeignReference<Borough>;

	get borough(): Partial<ForeignReference<Borough>> {
		return this.$borough;
	}

	set borough(value: Partial<ForeignReference<Borough>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.boroughId = value.id as string;
		} else {
			this.boroughId = null;
		}
	}
					
	private $owner: ForeignReference<Player>;

	get owner(): Partial<ForeignReference<Player>> {
		return this.$owner;
	}

	set owner(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}
					
	id: string;
	name: string;
	code: string;
	bounds: string;
	ownerId: string;
	boroughId: string;
}
			
export class BoroughQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get shortName(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get propertyPrefix(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get color(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get bounds(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Borough extends Entity<BoroughQueryProxy> {
	$$meta = {
		tableName: "borough",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"},"shortName":{"type":"text","name":"short_name"},"propertyPrefix":{"type":"text","name":"property_prefix"},"color":{"type":"text","name":"color"},"bounds":{"type":"text","name":"bounds"}},
		get set(): DbSet<Borough, BoroughQueryProxy> {
			// returns unbound dbset
			return new DbSet<Borough, BoroughQueryProxy>(Borough, null)
		},
		
	};
		
	constructor() {
		super();

		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(
			this,
			"boroughId",
			Property
		);
	}

	properties: PrimaryReference<Property, PropertyQueryProxy>;
					
	id: string;
	name: string;
	shortName: string;
	propertyPrefix: string;
	color: string;
	bounds: string;
}
			
export class StreetQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get shortName(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get size(): Partial<QueryNumber> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get path(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Street extends Entity<StreetQueryProxy> {
	$$meta = {
		tableName: "street",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"},"shortName":{"type":"text","name":"short_name"},"size":{"type":"float4","name":"size"},"path":{"type":"text","name":"path"}},
		get set(): DbSet<Street, StreetQueryProxy> {
			// returns unbound dbset
			return new DbSet<Street, StreetQueryProxy>(Street, null)
		},
		
	};
		
	constructor() {
		super();

		
	}

	id: string;
	name: string;
	shortName: string;
	size: number;
	path: string;
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
	company: DbSet<Company, CompanyQueryProxy> = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
	property: DbSet<Property, PropertyQueryProxy> = new DbSet<Property, PropertyQueryProxy>(Property, this.runContext);
	borough: DbSet<Borough, BoroughQueryProxy> = new DbSet<Borough, BoroughQueryProxy>(Borough, this.runContext);
	street: DbSet<Street, StreetQueryProxy> = new DbSet<Street, StreetQueryProxy>(Street, this.runContext);
};