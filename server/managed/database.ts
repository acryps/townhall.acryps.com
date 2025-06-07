import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from 'vlquery';

export class MapType extends QueryEnum {
	static readonly night = "night";
	static readonly overworld = "overworld";
}

export class CompanyType extends QueryEnum {
	static readonly company = "company";
	static readonly department = "department";
	static readonly governmentCompany = "government_company";
	static readonly guild = "guild";
	static readonly nonProfit = "non_profit";
}

export class ArticleQueryProxy extends QueryProxy {
	get publication(): Partial<PublicationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get body(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get publicationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get published(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get title(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Article extends Entity<ArticleQueryProxy> {
	images: PrimaryReference<ArticleImage, ArticleImageQueryProxy>;
		get publication(): Partial<ForeignReference<Publication>> { return this.$publication; }
	body: string;
	declare id: string;
	publicationId: string;
	published: Date;
	title: string;
	
	$$meta = {
		source: "article",
		columns: {
			body: { type: "text", name: "body" },
			id: { type: "uuid", name: "id" },
			publicationId: { type: "uuid", name: "publication_id" },
			published: { type: "timestamp", name: "published" },
			title: { type: "text", name: "title" }
		},
		get set(): DbSet<Article, ArticleQueryProxy> { 
			return new DbSet<Article, ArticleQueryProxy>(Article, null);
		}
	};
	
	constructor() {
		super();
		
		this.images = new PrimaryReference<ArticleImage, ArticleImageQueryProxy>(this, "articleId", ArticleImage);
		this.$publication = new ForeignReference<Publication>(this, "publicationId", Publication);
	}
	
	private $publication: ForeignReference<Publication>;

	set publication(value: Partial<ForeignReference<Publication>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.publicationId = value.id as string;
		} else {
			this.publicationId = null;
		}
	}

	
}
			
export class ArticleImageQueryProxy extends QueryProxy {
	get article(): Partial<ArticleQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get articleId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get caption(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ArticleImage extends Entity<ArticleImageQueryProxy> {
	get article(): Partial<ForeignReference<Article>> { return this.$article; }
	articleId: string;
	caption: string;
	data: Buffer;
	declare id: string;
	
	$$meta = {
		source: "article_image",
		columns: {
			articleId: { type: "uuid", name: "article_id" },
			caption: { type: "text", name: "caption" },
			data: { type: "bytea", name: "data" },
			id: { type: "uuid", name: "id" }
		},
		get set(): DbSet<ArticleImage, ArticleImageQueryProxy> { 
			return new DbSet<ArticleImage, ArticleImageQueryProxy>(ArticleImage, null);
		}
	};
	
	constructor() {
		super();
		
		this.$article = new ForeignReference<Article>(this, "articleId", Article);
	}
	
	private $article: ForeignReference<Article>;

	set article(value: Partial<ForeignReference<Article>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.articleId = value.id as string;
		} else {
			this.articleId = null;
		}
	}

	
}
			
export class BillQueryProxy extends QueryProxy {
	get scope(): Partial<DistrictQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get certified(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mailed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get pro(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get scopeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get summary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get title(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Bill extends Entity<BillQueryProxy> {
	honestiums: PrimaryReference<BillHonestium, BillHonestiumQueryProxy>;
		votes: PrimaryReference<Vote, VoteQueryProxy>;
		get scope(): Partial<ForeignReference<District>> { return this.$scope; }
	certified: Date;
	created: Date;
	description: string;
	declare id: string;
	mailed: Date;
	pro: boolean;
	scopeId: string;
	summary: string;
	tag: string;
	title: string;
	
	$$meta = {
		source: "bill",
		columns: {
			certified: { type: "timestamp", name: "certified" },
			created: { type: "timestamp", name: "created" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			mailed: { type: "timestamp", name: "mailed" },
			pro: { type: "bool", name: "pro" },
			scopeId: { type: "uuid", name: "scope_id" },
			summary: { type: "text", name: "summary" },
			tag: { type: "text", name: "tag" },
			title: { type: "text", name: "title" }
		},
		get set(): DbSet<Bill, BillQueryProxy> { 
			return new DbSet<Bill, BillQueryProxy>(Bill, null);
		}
	};
	
	constructor() {
		super();
		
		this.honestiums = new PrimaryReference<BillHonestium, BillHonestiumQueryProxy>(this, "billId", BillHonestium);
		this.votes = new PrimaryReference<Vote, VoteQueryProxy>(this, "billId", Vote);
		this.$scope = new ForeignReference<District>(this, "scopeId", District);
	}
	
	private $scope: ForeignReference<District>;

	set scope(value: Partial<ForeignReference<District>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.scopeId = value.id as string;
		} else {
			this.scopeId = null;
		}
	}

	
}
			
export class BillHonestiumQueryProxy extends QueryProxy {
	get bill(): Partial<BillQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get answer(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get answered(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get billId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get pro(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get question(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class BillHonestium extends Entity<BillHonestiumQueryProxy> {
	get bill(): Partial<ForeignReference<Bill>> { return this.$bill; }
	answer: string;
	answered: Date;
	billId: string;
	declare id: string;
	pro: boolean;
	question: string;
	
	$$meta = {
		source: "bill_honestium",
		columns: {
			answer: { type: "text", name: "answer" },
			answered: { type: "timestamp", name: "answered" },
			billId: { type: "uuid", name: "bill_id" },
			id: { type: "uuid", name: "id" },
			pro: { type: "bool", name: "pro" },
			question: { type: "text", name: "question" }
		},
		get set(): DbSet<BillHonestium, BillHonestiumQueryProxy> { 
			return new DbSet<BillHonestium, BillHonestiumQueryProxy>(BillHonestium, null);
		}
	};
	
	constructor() {
		super();
		
		this.$bill = new ForeignReference<Bill>(this, "billId", Bill);
	}
	
	private $bill: ForeignReference<Bill>;

	set bill(value: Partial<ForeignReference<Bill>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.billId = value.id as string;
		} else {
			this.billId = null;
		}
	}

	
}
			
export class BoroughQueryProxy extends QueryProxy {
	get district(): Partial<DistrictQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aiDescription(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aiSummary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get banner(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get districtId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporation(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyPrefix(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get survey(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ttsDescription(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Borough extends Entity<BoroughQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		squares: PrimaryReference<Square, SquareQueryProxy>;
		get district(): Partial<ForeignReference<District>> { return this.$district; }
	aiDescription: string;
	aiSummary: string;
	banner: string;
	bounds: string;
	color: string;
	description: string;
	districtId: string;
	declare id: string;
	incorporation: Date;
	name: string;
	propertyPrefix: string;
	shortName: string;
	survey: boolean;
	tag: string;
	ttsDescription: string;
	
	$$meta = {
		source: "borough",
		columns: {
			aiDescription: { type: "text", name: "ai_description" },
			aiSummary: { type: "text", name: "ai_summary" },
			banner: { type: "text", name: "banner" },
			bounds: { type: "text", name: "bounds" },
			color: { type: "text", name: "color" },
			description: { type: "text", name: "description" },
			districtId: { type: "uuid", name: "district_id" },
			id: { type: "uuid", name: "id" },
			incorporation: { type: "timestamp", name: "incorporation" },
			name: { type: "text", name: "name" },
			propertyPrefix: { type: "text", name: "property_prefix" },
			shortName: { type: "text", name: "short_name" },
			survey: { type: "bool", name: "survey" },
			tag: { type: "text", name: "tag" },
			ttsDescription: { type: "text", name: "tts_description" }
		},
		get set(): DbSet<Borough, BoroughQueryProxy> { 
			return new DbSet<Borough, BoroughQueryProxy>(Borough, null);
		}
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "boroughId", Property);
		this.squares = new PrimaryReference<Square, SquareQueryProxy>(this, "boroughId", Square);
		this.$district = new ForeignReference<District>(this, "districtId", District);
	}
	
	private $district: ForeignReference<District>;

	set district(value: Partial<ForeignReference<District>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.districtId = value.id as string;
		} else {
			this.districtId = null;
		}
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
			
export class BuildingQueryProxy extends QueryProxy {
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get archived(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boundary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Building extends Entity<BuildingQueryProxy> {
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	archived: Date;
	boundary: string;
	created: Date;
	declare id: string;
	name: string;
	propertyId: string;
	
	$$meta = {
		source: "building",
		columns: {
			archived: { type: "timestamp", name: "archived" },
			boundary: { type: "text", name: "boundary" },
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<Building, BuildingQueryProxy> { 
			return new DbSet<Building, BuildingQueryProxy>(Building, null);
		}
	};
	
	constructor() {
		super();
		
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
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
			
export class ChatQueryProxy extends QueryProxy {
	get resident(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get residentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get started(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Chat extends Entity<ChatQueryProxy> {
	interactions: PrimaryReference<ChatInteraction, ChatInteractionQueryProxy>;
		get resident(): Partial<ForeignReference<Resident>> { return this.$resident; }
	declare id: string;
	residentId: string;
	started: Date;
	tag: string;
	
	$$meta = {
		source: "chat",
		columns: {
			id: { type: "uuid", name: "id" },
			residentId: { type: "uuid", name: "resident_id" },
			started: { type: "timestamp", name: "started" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Chat, ChatQueryProxy> { 
			return new DbSet<Chat, ChatQueryProxy>(Chat, null);
		}
	};
	
	constructor() {
		super();
		
		this.interactions = new PrimaryReference<ChatInteraction, ChatInteractionQueryProxy>(this, "chatId", ChatInteraction);
		this.$resident = new ForeignReference<Resident>(this, "residentId", Resident);
	}
	
	private $resident: ForeignReference<Resident>;

	set resident(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.residentId = value.id as string;
		} else {
			this.residentId = null;
		}
	}

	
}
			
export class ChatInteractionQueryProxy extends QueryProxy {
	get chat(): Partial<ChatQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get chatId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get containsInformationRequest(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get question(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get responded(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get response(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sent(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ChatInteraction extends Entity<ChatInteractionQueryProxy> {
	get chat(): Partial<ForeignReference<Chat>> { return this.$chat; }
	chatId: string;
	containsInformationRequest: boolean;
	declare id: string;
	question: string;
	responded: Date;
	response: string;
	sent: Date;
	
	$$meta = {
		source: "chat_interaction",
		columns: {
			chatId: { type: "uuid", name: "chat_id" },
			containsInformationRequest: { type: "bool", name: "contains_information_request" },
			id: { type: "uuid", name: "id" },
			question: { type: "text", name: "question" },
			responded: { type: "timestamp", name: "responded" },
			response: { type: "text", name: "response" },
			sent: { type: "timestamp", name: "sent" }
		},
		get set(): DbSet<ChatInteraction, ChatInteractionQueryProxy> { 
			return new DbSet<ChatInteraction, ChatInteractionQueryProxy>(ChatInteraction, null);
		}
	};
	
	constructor() {
		super();
		
		this.$chat = new ForeignReference<Chat>(this, "chatId", Chat);
	}
	
	private $chat: ForeignReference<Chat>;

	set chat(value: Partial<ForeignReference<Chat>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.chatId = value.id as string;
		} else {
			this.chatId = null;
		}
	}

	
}
			
export class CityQueryProxy extends QueryProxy {
	get mainImpression(): Partial<ImpressionQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get centerX(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get centerY(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mainImpressionId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get orderIndex(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class City extends Entity<CityQueryProxy> {
	get mainImpression(): Partial<ForeignReference<Impression>> { return this.$mainImpression; }
	centerX: number;
	centerY: number;
	declare id: string;
	incorporated: Date;
	mainImpressionId: string;
	name: string;
	orderIndex: number;
	
	$$meta = {
		source: "city",
		columns: {
			centerX: { type: "float4", name: "center_x" },
			centerY: { type: "float4", name: "center_y" },
			id: { type: "uuid", name: "id" },
			incorporated: { type: "timestamp", name: "incorporated" },
			mainImpressionId: { type: "uuid", name: "main_impression_id" },
			name: { type: "text", name: "name" },
			orderIndex: { type: "int4", name: "order_index" }
		},
		get set(): DbSet<City, CityQueryProxy> { 
			return new DbSet<City, CityQueryProxy>(City, null);
		}
	};
	
	constructor() {
		super();
		
		this.$mainImpression = new ForeignReference<Impression>(this, "mainImpressionId", Impression);
	}
	
	private $mainImpression: ForeignReference<Impression>;

	set mainImpression(value: Partial<ForeignReference<Impression>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.mainImpressionId = value.id as string;
		} else {
			this.mainImpressionId = null;
		}
	}

	
}
			
export class CompanyQueryProxy extends QueryProxy {
	get banner(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get purpose(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): "company" | "department" | "government_company" | "guild" | "non_profit" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Company extends Entity<CompanyQueryProxy> {
	offices: PrimaryReference<Office, OfficeQueryProxy>;
		banner: string;
	created: Date;
	description: string;
	declare id: string;
	incorporated: Date;
	name: string;
	purpose: string;
	tag: string;
	type: CompanyType;
	
	$$meta = {
		source: "company",
		columns: {
			banner: { type: "text", name: "banner" },
			created: { type: "timestamp", name: "created" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			incorporated: { type: "timestamp", name: "incorporated" },
			name: { type: "text", name: "name" },
			purpose: { type: "text", name: "purpose" },
			tag: { type: "text", name: "tag" },
			type: { type: "company_type", name: "type" }
		},
		get set(): DbSet<Company, CompanyQueryProxy> { 
			return new DbSet<Company, CompanyQueryProxy>(Company, null);
		}
	};
	
	constructor() {
		super();
		
		this.offices = new PrimaryReference<Office, OfficeQueryProxy>(this, "companyId", Office);
	}
}
			
export class DistrictQueryProxy extends QueryProxy {
	get parent(): Partial<DistrictQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get billPrefix(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporation(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get parentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class District extends Entity<DistrictQueryProxy> {
	boroughs: PrimaryReference<Borough, BoroughQueryProxy>;
		get parent(): Partial<ForeignReference<District>> { return this.$parent; }
	children: PrimaryReference<District, DistrictQueryProxy>;
		bills: PrimaryReference<Bill, BillQueryProxy>;
		lawHouseSessions: PrimaryReference<LawHouseSession, LawHouseSessionQueryProxy>;
		billPrefix: string;
	declare id: string;
	incorporation: Date;
	name: string;
	parentId: string;
	
	$$meta = {
		source: "district",
		columns: {
			billPrefix: { type: "text", name: "bill_prefix" },
			id: { type: "uuid", name: "id" },
			incorporation: { type: "timestamp", name: "incorporation" },
			name: { type: "text", name: "name" },
			parentId: { type: "uuid", name: "parent_id" }
		},
		get set(): DbSet<District, DistrictQueryProxy> { 
			return new DbSet<District, DistrictQueryProxy>(District, null);
		}
	};
	
	constructor() {
		super();
		
		this.boroughs = new PrimaryReference<Borough, BoroughQueryProxy>(this, "districtId", Borough);
		this.$parent = new ForeignReference<District>(this, "parentId", District);
	this.children = new PrimaryReference<District, DistrictQueryProxy>(this, "parentId", District);
		this.bills = new PrimaryReference<Bill, BillQueryProxy>(this, "scopeId", Bill);
		this.lawHouseSessions = new PrimaryReference<LawHouseSession, LawHouseSessionQueryProxy>(this, "scopeId", LawHouseSession);
	}
	
	private $parent: ForeignReference<District>;

	set parent(value: Partial<ForeignReference<District>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.parentId = value.id as string;
		} else {
			this.parentId = null;
		}
	}

	
}
			
export class DwellingQueryProxy extends QueryProxy {
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Dwelling extends Entity<DwellingQueryProxy> {
	tenants: PrimaryReference<Tenancy, TenancyQueryProxy>;
		get property(): Partial<ForeignReference<Property>> { return this.$property; }
	created: Date;
	declare id: string;
	propertyId: string;
	
	$$meta = {
		source: "dwelling",
		columns: {
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<Dwelling, DwellingQueryProxy> { 
			return new DbSet<Dwelling, DwellingQueryProxy>(Dwelling, null);
		}
	};
	
	constructor() {
		super();
		
		this.tenants = new PrimaryReference<Tenancy, TenancyQueryProxy>(this, "dwellingId", Tenancy);
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
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
			
export class ImpressionQueryProxy extends QueryProxy {
	get captured(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get image(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get locationX(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get locationY(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mimeType(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get title(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Impression extends Entity<ImpressionQueryProxy> {
	captured: Date;
	declare id: string;
	image: Buffer;
	locationX: number;
	locationY: number;
	mimeType: string;
	title: string;
	
	$$meta = {
		source: "impression",
		columns: {
			captured: { type: "timestamp", name: "captured" },
			id: { type: "uuid", name: "id" },
			image: { type: "bytea", name: "image" },
			locationX: { type: "float4", name: "location_x" },
			locationY: { type: "float4", name: "location_y" },
			mimeType: { type: "text", name: "mime_type" },
			title: { type: "text", name: "title" }
		},
		get set(): DbSet<Impression, ImpressionQueryProxy> { 
			return new DbSet<Impression, ImpressionQueryProxy>(Impression, null);
		}
	};
}
			
export class LawHouseSessionQueryProxy extends QueryProxy {
	get scope(): Partial<DistrictQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ended(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get scopeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get started(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class LawHouseSession extends Entity<LawHouseSessionQueryProxy> {
	get scope(): Partial<ForeignReference<District>> { return this.$scope; }
	protocol: PrimaryReference<LawHouseSessionProtocol, LawHouseSessionProtocolQueryProxy>;
		sessionaries: PrimaryReference<LawHouseSessionary, LawHouseSessionaryQueryProxy>;
		ended: Date;
	declare id: string;
	scopeId: string;
	started: Date;
	
	$$meta = {
		source: "law_house_session",
		columns: {
			ended: { type: "timestamp", name: "ended" },
			id: { type: "uuid", name: "id" },
			scopeId: { type: "uuid", name: "scope_id" },
			started: { type: "timestamp", name: "started" }
		},
		get set(): DbSet<LawHouseSession, LawHouseSessionQueryProxy> { 
			return new DbSet<LawHouseSession, LawHouseSessionQueryProxy>(LawHouseSession, null);
		}
	};
	
	constructor() {
		super();
		
		this.$scope = new ForeignReference<District>(this, "scopeId", District);
	this.protocol = new PrimaryReference<LawHouseSessionProtocol, LawHouseSessionProtocolQueryProxy>(this, "sessionId", LawHouseSessionProtocol);
		this.sessionaries = new PrimaryReference<LawHouseSessionary, LawHouseSessionaryQueryProxy>(this, "sessionId", LawHouseSessionary);
	}
	
	private $scope: ForeignReference<District>;

	set scope(value: Partial<ForeignReference<District>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.scopeId = value.id as string;
		} else {
			this.scopeId = null;
		}
	}

	
}
			
export class LawHouseSessionProtocolQueryProxy extends QueryProxy {
	get person(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get session(): Partial<LawHouseSessionQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get message(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get personId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get said(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sessionId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class LawHouseSessionProtocol extends Entity<LawHouseSessionProtocolQueryProxy> {
	get person(): Partial<ForeignReference<Resident>> { return this.$person; }
	get session(): Partial<ForeignReference<LawHouseSession>> { return this.$session; }
	declare id: string;
	message: string;
	personId: string;
	said: Date;
	sessionId: string;
	
	$$meta = {
		source: "law_house_session_protocol",
		columns: {
			id: { type: "uuid", name: "id" },
			message: { type: "text", name: "message" },
			personId: { type: "uuid", name: "person_id" },
			said: { type: "timestamp", name: "said" },
			sessionId: { type: "uuid", name: "session_id" }
		},
		get set(): DbSet<LawHouseSessionProtocol, LawHouseSessionProtocolQueryProxy> { 
			return new DbSet<LawHouseSessionProtocol, LawHouseSessionProtocolQueryProxy>(LawHouseSessionProtocol, null);
		}
	};
	
	constructor() {
		super();
		
		this.$person = new ForeignReference<Resident>(this, "personId", Resident);
	this.$session = new ForeignReference<LawHouseSession>(this, "sessionId", LawHouseSession);
	}
	
	private $person: ForeignReference<Resident>;

	set person(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.personId = value.id as string;
		} else {
			this.personId = null;
		}
	}

	private $session: ForeignReference<LawHouseSession>;

	set session(value: Partial<ForeignReference<LawHouseSession>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.sessionId = value.id as string;
		} else {
			this.sessionId = null;
		}
	}

	
}
			
export class LawHouseSessionaryQueryProxy extends QueryProxy {
	get resident(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get session(): Partial<LawHouseSessionQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get residentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sessionId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class LawHouseSessionary extends Entity<LawHouseSessionaryQueryProxy> {
	get resident(): Partial<ForeignReference<Resident>> { return this.$resident; }
	get session(): Partial<ForeignReference<LawHouseSession>> { return this.$session; }
	declare id: string;
	residentId: string;
	sessionId: string;
	
	$$meta = {
		source: "law_house_sessionary",
		columns: {
			id: { type: "uuid", name: "id" },
			residentId: { type: "uuid", name: "resident_id" },
			sessionId: { type: "uuid", name: "session_id" }
		},
		get set(): DbSet<LawHouseSessionary, LawHouseSessionaryQueryProxy> { 
			return new DbSet<LawHouseSessionary, LawHouseSessionaryQueryProxy>(LawHouseSessionary, null);
		}
	};
	
	constructor() {
		super();
		
		this.$resident = new ForeignReference<Resident>(this, "residentId", Resident);
	this.$session = new ForeignReference<LawHouseSession>(this, "sessionId", LawHouseSession);
	}
	
	private $resident: ForeignReference<Resident>;

	set resident(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.residentId = value.id as string;
		} else {
			this.residentId = null;
		}
	}

	private $session: ForeignReference<LawHouseSession>;

	set session(value: Partial<ForeignReference<LawHouseSession>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.sessionId = value.id as string;
		} else {
			this.sessionId = null;
		}
	}

	
}
			
export class LegalEntityQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get company(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get resident(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get companyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get residentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get state(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class LegalEntity extends Entity<LegalEntityQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	get company(): Partial<ForeignReference<Company>> { return this.$company; }
	operatedTrainRoutes: PrimaryReference<TrainRoute, TrainRouteQueryProxy>;
		get resident(): Partial<ForeignReference<Resident>> { return this.$resident; }
	boroughId: string;
	companyId: string;
	declare id: string;
	residentId: string;
	state: boolean;
	
	$$meta = {
		source: "legal_entity",
		columns: {
			boroughId: { type: "uuid", name: "borough_id" },
			companyId: { type: "uuid", name: "company_id" },
			id: { type: "uuid", name: "id" },
			residentId: { type: "uuid", name: "resident_id" },
			state: { type: "bool", name: "state" }
		},
		get set(): DbSet<LegalEntity, LegalEntityQueryProxy> { 
			return new DbSet<LegalEntity, LegalEntityQueryProxy>(LegalEntity, null);
		}
	};
	
	constructor() {
		super();
		
		this.$borough = new ForeignReference<Borough>(this, "boroughId", Borough);
	this.$company = new ForeignReference<Company>(this, "companyId", Company);
	this.operatedTrainRoutes = new PrimaryReference<TrainRoute, TrainRouteQueryProxy>(this, "operatorId", TrainRoute);
		this.$resident = new ForeignReference<Resident>(this, "residentId", Resident);
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

	private $company: ForeignReference<Company>;

	set company(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.companyId = value.id as string;
		} else {
			this.companyId = null;
		}
	}

	private $resident: ForeignReference<Resident>;

	set resident(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.residentId = value.id as string;
		} else {
			this.residentId = null;
		}
	}

	
}
			
export class MapTileQueryProxy extends QueryProxy {
	get captured(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get complete(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get hash(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get image(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get regionX(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get regionY(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): "night" | "overworld" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class MapTile extends Entity<MapTileQueryProxy> {
	captured: Date;
	complete: boolean;
	hash: string;
	declare id: string;
	image: Buffer;
	regionX: number;
	regionY: number;
	type: MapType;
	
	$$meta = {
		source: "map_tile",
		columns: {
			captured: { type: "timestamp", name: "captured" },
			complete: { type: "bool", name: "complete" },
			hash: { type: "text", name: "hash" },
			id: { type: "uuid", name: "id" },
			image: { type: "bytea", name: "image" },
			regionX: { type: "int4", name: "region_x" },
			regionY: { type: "int4", name: "region_y" },
			type: { type: "map_type", name: "type" }
		},
		get set(): DbSet<MapTile, MapTileQueryProxy> { 
			return new DbSet<MapTile, MapTileQueryProxy>(MapTile, null);
		}
	};
}
			
export class MetricQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Metric extends Entity<MetricQueryProxy> {
	values: PrimaryReference<MetricValue, MetricValueQueryProxy>;
		description: string;
	declare id: string;
	name: string;
	tag: string;
	
	$$meta = {
		source: "metric",
		columns: {
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Metric, MetricQueryProxy> { 
			return new DbSet<Metric, MetricQueryProxy>(Metric, null);
		}
	};
	
	constructor() {
		super();
		
		this.values = new PrimaryReference<MetricValue, MetricValueQueryProxy>(this, "metricId", MetricValue);
	}
}
			
export class MetricValueQueryProxy extends QueryProxy {
	get metric(): Partial<MetricQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get elapsed(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get formatted(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get host(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get metricId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get updated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get value(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class MetricValue extends Entity<MetricValueQueryProxy> {
	get metric(): Partial<ForeignReference<Metric>> { return this.$metric; }
	elapsed: number;
	formatted: string;
	host: string;
	declare id: string;
	metricId: string;
	updated: Date;
	value: number;
	
	$$meta = {
		source: "metric_value",
		columns: {
			elapsed: { type: "int4", name: "elapsed" },
			formatted: { type: "text", name: "formatted" },
			host: { type: "text", name: "host" },
			id: { type: "uuid", name: "id" },
			metricId: { type: "uuid", name: "metric_id" },
			updated: { type: "timestamp", name: "updated" },
			value: { type: "float4", name: "value" }
		},
		get set(): DbSet<MetricValue, MetricValueQueryProxy> { 
			return new DbSet<MetricValue, MetricValueQueryProxy>(MetricValue, null);
		}
	};
	
	constructor() {
		super();
		
		this.$metric = new ForeignReference<Metric>(this, "metricId", Metric);
	}
	
	private $metric: ForeignReference<Metric>;

	set metric(value: Partial<ForeignReference<Metric>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.metricId = value.id as string;
		} else {
			this.metricId = null;
		}
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
			
export class OfficeQueryProxy extends QueryProxy {
	get company(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get closed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get companyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get opened(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Office extends Entity<OfficeQueryProxy> {
	get company(): Partial<ForeignReference<Company>> { return this.$company; }
	capacityGrants: PrimaryReference<OfficeCapacity, OfficeCapacityQueryProxy>;
		workOffers: PrimaryReference<WorkOffer, WorkOfferQueryProxy>;
		get property(): Partial<ForeignReference<Property>> { return this.$property; }
	closed: Date;
	companyId: string;
	declare id: string;
	name: string;
	opened: Date;
	propertyId: string;
	
	$$meta = {
		source: "office",
		columns: {
			closed: { type: "timestamp", name: "closed" },
			companyId: { type: "uuid", name: "company_id" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			opened: { type: "timestamp", name: "opened" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<Office, OfficeQueryProxy> { 
			return new DbSet<Office, OfficeQueryProxy>(Office, null);
		}
	};
	
	constructor() {
		super();
		
		this.$company = new ForeignReference<Company>(this, "companyId", Company);
	this.capacityGrants = new PrimaryReference<OfficeCapacity, OfficeCapacityQueryProxy>(this, "officeId", OfficeCapacity);
		this.workOffers = new PrimaryReference<WorkOffer, WorkOfferQueryProxy>(this, "officeId", WorkOffer);
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
	}
	
	private $company: ForeignReference<Company>;

	set company(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.companyId = value.id as string;
		} else {
			this.companyId = null;
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
			
export class OfficeCapacityQueryProxy extends QueryProxy {
	get office(): Partial<OfficeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get issued(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get officeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get size(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class OfficeCapacity extends Entity<OfficeCapacityQueryProxy> {
	get office(): Partial<ForeignReference<Office>> { return this.$office; }
	declare id: string;
	issued: Date;
	officeId: string;
	size: number;
	
	$$meta = {
		source: "office_capacity",
		columns: {
			id: { type: "uuid", name: "id" },
			issued: { type: "timestamp", name: "issued" },
			officeId: { type: "uuid", name: "office_id" },
			size: { type: "int4", name: "size" }
		},
		get set(): DbSet<OfficeCapacity, OfficeCapacityQueryProxy> { 
			return new DbSet<OfficeCapacity, OfficeCapacityQueryProxy>(OfficeCapacity, null);
		}
	};
	
	constructor() {
		super();
		
		this.$office = new ForeignReference<Office>(this, "officeId", Office);
	}
	
	private $office: ForeignReference<Office>;

	set office(value: Partial<ForeignReference<Office>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.officeId = value.id as string;
		} else {
			this.officeId = null;
		}
	}

	
}
			
export class PlayerQueryProxy extends QueryProxy {
	get legalEntity(): Partial<LegalEntityQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get gameUuid(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get legalEntityId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get online(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get username(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get x(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get y(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Player extends Entity<PlayerQueryProxy> {
	get legalEntity(): Partial<ForeignReference<LegalEntity>> { return this.$legalEntity; }
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		movements: PrimaryReference<Movement, MovementQueryProxy>;
		gameUuid: string;
	declare id: string;
	legalEntityId: string;
	online: boolean;
	username: string;
	x: number;
	y: number;
	
	$$meta = {
		source: "player",
		columns: {
			gameUuid: { type: "text", name: "game_uuid" },
			id: { type: "uuid", name: "id" },
			legalEntityId: { type: "uuid", name: "legal_entity_id" },
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
		
		this.$legalEntity = new ForeignReference<LegalEntity>(this, "legalEntityId", LegalEntity);
	this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "playerOwnerId", Property);
		this.movements = new PrimaryReference<Movement, MovementQueryProxy>(this, "playerId", Movement);
	}
	
	private $legalEntity: ForeignReference<LegalEntity>;

	set legalEntity(value: Partial<ForeignReference<LegalEntity>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.legalEntityId = value.id as string;
		} else {
			this.legalEntityId = null;
		}
	}

	
}
			
export class PlotBoundaryQueryProxy extends QueryProxy {
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get changeComment(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shape(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PlotBoundary extends Entity<PlotBoundaryQueryProxy> {
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	changeComment: string;
	created: Date;
	declare id: string;
	propertyId: string;
	shape: string;
	
	$$meta = {
		source: "plot_boundary",
		columns: {
			changeComment: { type: "text", name: "change_comment" },
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			propertyId: { type: "uuid", name: "property_id" },
			shape: { type: "text", name: "shape" }
		},
		get set(): DbSet<PlotBoundary, PlotBoundaryQueryProxy> { 
			return new DbSet<PlotBoundary, PlotBoundaryQueryProxy>(PlotBoundary, null);
		}
	};
	
	constructor() {
		super();
		
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
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
			
export class PropertyQueryProxy extends QueryProxy {
	get activePlotBoundary(): Partial<PlotBoundaryQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGrade(): Partial<HistoricListingGradeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): Partial<PropertyTypeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get activePlotBoundaryId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get deactivated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGradeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingRegisteredAt(): Partial<QueryDate> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get playerOwnerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get reviewCompany(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get reviewPlot(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get reviewValue(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get typeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Property extends Entity<PropertyQueryProxy> {
	get activePlotBoundary(): Partial<ForeignReference<PlotBoundary>> { return this.$activePlotBoundary; }
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	get historicListingGrade(): Partial<ForeignReference<HistoricListingGrade>> { return this.$historicListingGrade; }
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	buildings: PrimaryReference<Building, BuildingQueryProxy>;
		dwellings: PrimaryReference<Dwelling, DwellingQueryProxy>;
		historicListingModifiers: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		offices: PrimaryReference<Office, OfficeQueryProxy>;
		owners: PrimaryReference<PropertyOwner, PropertyOwnerQueryProxy>;
		plotBoundaries: PrimaryReference<PlotBoundary, PlotBoundaryQueryProxy>;
		trainStations: PrimaryReference<TrainStation, TrainStationQueryProxy>;
		get type(): Partial<ForeignReference<PropertyType>> { return this.$type; }
	activePlotBoundaryId: string;
	boroughId: string;
	bounds: string;
	code: string;
	created: Date;
	deactivated: Date;
	historicListingGradeId: string;
	historicListingRegisteredAt: Date;
	declare id: string;
	name: string;
	playerOwnerId: string;
	reviewCompany: boolean;
	reviewPlot: boolean;
	reviewValue: boolean;
	typeId: string;
	
	$$meta = {
		source: "property",
		columns: {
			activePlotBoundaryId: { type: "uuid", name: "active_plot_boundary_id" },
			boroughId: { type: "uuid", name: "borough_id" },
			bounds: { type: "text", name: "bounds" },
			code: { type: "text", name: "code" },
			created: { type: "timestamp", name: "created" },
			deactivated: { type: "timestamp", name: "deactivated" },
			historicListingGradeId: { type: "uuid", name: "historic_listing_grade_id" },
			historicListingRegisteredAt: { type: "date", name: "historic_listing_registered_at" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			playerOwnerId: { type: "uuid", name: "player_owner_id" },
			reviewCompany: { type: "bool", name: "review_company" },
			reviewPlot: { type: "bool", name: "review_plot" },
			reviewValue: { type: "bool", name: "review_value" },
			typeId: { type: "uuid", name: "type_id" }
		},
		get set(): DbSet<Property, PropertyQueryProxy> { 
			return new DbSet<Property, PropertyQueryProxy>(Property, null);
		}
	};
	
	constructor() {
		super();
		
		this.$activePlotBoundary = new ForeignReference<PlotBoundary>(this, "activePlotBoundaryId", PlotBoundary);
	this.$borough = new ForeignReference<Borough>(this, "boroughId", Borough);
	this.$historicListingGrade = new ForeignReference<HistoricListingGrade>(this, "historicListingGradeId", HistoricListingGrade);
	this.$owner = new ForeignReference<Player>(this, "playerOwnerId", Player);
	this.buildings = new PrimaryReference<Building, BuildingQueryProxy>(this, "propertyId", Building);
		this.dwellings = new PrimaryReference<Dwelling, DwellingQueryProxy>(this, "propertyId", Dwelling);
		this.historicListingModifiers = new PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(this, "propertyId", PropertyHistoricListingModifier);
		this.offices = new PrimaryReference<Office, OfficeQueryProxy>(this, "propertyId", Office);
		this.owners = new PrimaryReference<PropertyOwner, PropertyOwnerQueryProxy>(this, "propertyId", PropertyOwner);
		this.plotBoundaries = new PrimaryReference<PlotBoundary, PlotBoundaryQueryProxy>(this, "propertyId", PlotBoundary);
		this.trainStations = new PrimaryReference<TrainStation, TrainStationQueryProxy>(this, "propertyId", TrainStation);
		this.$type = new ForeignReference<PropertyType>(this, "typeId", PropertyType);
	}
	
	private $activePlotBoundary: ForeignReference<PlotBoundary>;

	set activePlotBoundary(value: Partial<ForeignReference<PlotBoundary>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.activePlotBoundaryId = value.id as string;
		} else {
			this.activePlotBoundaryId = null;
		}
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

			this.playerOwnerId = value.id as string;
		} else {
			this.playerOwnerId = null;
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
			
export class PropertyOwnerQueryProxy extends QueryProxy {
	get aquiredValuation(): Partial<ValuationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<LegalEntityQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aquired(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aquiredValuationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get share(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sold(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyOwner extends Entity<PropertyOwnerQueryProxy> {
	get aquiredValuation(): Partial<ForeignReference<Valuation>> { return this.$aquiredValuation; }
	get owner(): Partial<ForeignReference<LegalEntity>> { return this.$owner; }
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	aquired: Date;
	aquiredValuationId: string;
	declare id: string;
	ownerId: string;
	propertyId: string;
	share: number;
	sold: Date;
	
	$$meta = {
		source: "property_owner",
		columns: {
			aquired: { type: "timestamp", name: "aquired" },
			aquiredValuationId: { type: "uuid", name: "aquired_valuation_id" },
			id: { type: "uuid", name: "id" },
			ownerId: { type: "uuid", name: "owner_id" },
			propertyId: { type: "uuid", name: "property_id" },
			share: { type: "float4", name: "share" },
			sold: { type: "timestamp", name: "sold" }
		},
		get set(): DbSet<PropertyOwner, PropertyOwnerQueryProxy> { 
			return new DbSet<PropertyOwner, PropertyOwnerQueryProxy>(PropertyOwner, null);
		}
	};
	
	constructor() {
		super();
		
		this.$aquiredValuation = new ForeignReference<Valuation>(this, "aquiredValuationId", Valuation);
	this.$owner = new ForeignReference<LegalEntity>(this, "ownerId", LegalEntity);
	this.$property = new ForeignReference<Property>(this, "propertyId", Property);
	}
	
	private $aquiredValuation: ForeignReference<Valuation>;

	set aquiredValuation(value: Partial<ForeignReference<Valuation>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.aquiredValuationId = value.id as string;
		} else {
			this.aquiredValuationId = null;
		}
	}

	private $owner: ForeignReference<LegalEntity>;

	set owner(value: Partial<ForeignReference<LegalEntity>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
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
			
export class PublicationQueryProxy extends QueryProxy {
	get company(): Partial<CompanyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get companyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporation(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Publication extends Entity<PublicationQueryProxy> {
	get company(): Partial<ForeignReference<Company>> { return this.$company; }
	articles: PrimaryReference<Article, ArticleQueryProxy>;
		companyId: string;
	description: string;
	declare id: string;
	incorporation: Date;
	name: string;
	tag: string;
	
	$$meta = {
		source: "publication",
		columns: {
			companyId: { type: "uuid", name: "company_id" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			incorporation: { type: "timestamp", name: "incorporation" },
			name: { type: "text", name: "name" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Publication, PublicationQueryProxy> { 
			return new DbSet<Publication, PublicationQueryProxy>(Publication, null);
		}
	};
	
	constructor() {
		super();
		
		this.$company = new ForeignReference<Company>(this, "companyId", Company);
	this.articles = new PrimaryReference<Article, ArticleQueryProxy>(this, "publicationId", Article);
	}
	
	private $company: ForeignReference<Company>;

	set company(value: Partial<ForeignReference<Company>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.companyId = value.id as string;
		} else {
			this.companyId = null;
		}
	}

	
}
			
export class ResidentQueryProxy extends QueryProxy {
	get figure(): Partial<ResidentFigureQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mainTenancy(): Partial<TenancyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get biography(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get birthday(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get coreValues(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get familyName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get figureId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get generated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get givenName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mainTenancyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get politicalSetting(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Resident extends Entity<ResidentQueryProxy> {
	get figure(): Partial<ForeignReference<ResidentFigure>> { return this.$figure; }
	tenancies: PrimaryReference<Tenancy, TenancyQueryProxy>;
		get mainTenancy(): Partial<ForeignReference<Tenancy>> { return this.$mainTenancy; }
	appointedLawHouseSessions: PrimaryReference<LawHouseSessionary, LawHouseSessionaryQueryProxy>;
		chats: PrimaryReference<Chat, ChatQueryProxy>;
		votes: PrimaryReference<Vote, VoteQueryProxy>;
		workContracts: PrimaryReference<WorkContract, WorkContractQueryProxy>;
		biography: string;
	birthday: Date;
	coreValues: string;
	familyName: string;
	figureId: string;
	generated: Date;
	givenName: string;
	declare id: string;
	mainTenancyId: string;
	politicalSetting: string;
	tag: string;
	
	$$meta = {
		source: "resident",
		columns: {
			biography: { type: "text", name: "biography" },
			birthday: { type: "timestamp", name: "birthday" },
			coreValues: { type: "text", name: "core_values" },
			familyName: { type: "text", name: "family_name" },
			figureId: { type: "uuid", name: "figure_id" },
			generated: { type: "timestamp", name: "generated" },
			givenName: { type: "text", name: "given_name" },
			id: { type: "uuid", name: "id" },
			mainTenancyId: { type: "uuid", name: "main_tenancy_id" },
			politicalSetting: { type: "text", name: "political_setting" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Resident, ResidentQueryProxy> { 
			return new DbSet<Resident, ResidentQueryProxy>(Resident, null);
		}
	};
	
	constructor() {
		super();
		
		this.$figure = new ForeignReference<ResidentFigure>(this, "figureId", ResidentFigure);
	this.tenancies = new PrimaryReference<Tenancy, TenancyQueryProxy>(this, "inhabitantId", Tenancy);
		this.$mainTenancy = new ForeignReference<Tenancy>(this, "mainTenancyId", Tenancy);
	this.appointedLawHouseSessions = new PrimaryReference<LawHouseSessionary, LawHouseSessionaryQueryProxy>(this, "residentId", LawHouseSessionary);
		this.chats = new PrimaryReference<Chat, ChatQueryProxy>(this, "residentId", Chat);
		this.votes = new PrimaryReference<Vote, VoteQueryProxy>(this, "residentId", Vote);
		this.workContracts = new PrimaryReference<WorkContract, WorkContractQueryProxy>(this, "workerId", WorkContract);
	}
	
	private $figure: ForeignReference<ResidentFigure>;

	set figure(value: Partial<ForeignReference<ResidentFigure>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.figureId = value.id as string;
		} else {
			this.figureId = null;
		}
	}

	private $mainTenancy: ForeignReference<Tenancy>;

	set mainTenancy(value: Partial<ForeignReference<Tenancy>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.mainTenancyId = value.id as string;
		} else {
			this.mainTenancyId = null;
		}
	}

	
}
			
export class ResidentFigureQueryProxy extends QueryProxy {
	get image(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get outfit(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sourceBiome(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sourceJob(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ResidentFigure extends Entity<ResidentFigureQueryProxy> {
	declare id: string;
	image: Buffer;
	outfit: string;
	sourceBiome: string;
	sourceJob: string;
	
	$$meta = {
		source: "resident_figure",
		columns: {
			id: { type: "uuid", name: "id" },
			image: { type: "bytea", name: "image" },
			outfit: { type: "text", name: "outfit" },
			sourceBiome: { type: "text", name: "source_biome" },
			sourceJob: { type: "text", name: "source_job" }
		},
		get set(): DbSet<ResidentFigure, ResidentFigureQueryProxy> { 
			return new DbSet<ResidentFigure, ResidentFigureQueryProxy>(ResidentFigure, null);
		}
	};
}
			
export class ResidentRelationshipQueryProxy extends QueryProxy {
	get initiator(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get peer(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bonded(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get conflict(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get connection(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ended(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get initiatorId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get peerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get purpose(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get summary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get unbreakable(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ResidentRelationship extends Entity<ResidentRelationshipQueryProxy> {
	get initiator(): Partial<ForeignReference<Resident>> { return this.$initiator; }
	get peer(): Partial<ForeignReference<Resident>> { return this.$peer; }
	bonded: Date;
	conflict: string;
	connection: string;
	ended: Date;
	declare id: string;
	initiatorId: string;
	peerId: string;
	purpose: string;
	summary: string;
	unbreakable: boolean;
	
	$$meta = {
		source: "resident_relationship",
		columns: {
			bonded: { type: "timestamp", name: "bonded" },
			conflict: { type: "text", name: "conflict" },
			connection: { type: "text", name: "connection" },
			ended: { type: "timestamp", name: "ended" },
			id: { type: "uuid", name: "id" },
			initiatorId: { type: "uuid", name: "initiator_id" },
			peerId: { type: "uuid", name: "peer_id" },
			purpose: { type: "text", name: "purpose" },
			summary: { type: "text", name: "summary" },
			unbreakable: { type: "bool", name: "unbreakable" }
		},
		get set(): DbSet<ResidentRelationship, ResidentRelationshipQueryProxy> { 
			return new DbSet<ResidentRelationship, ResidentRelationshipQueryProxy>(ResidentRelationship, null);
		}
	};
	
	constructor() {
		super();
		
		this.$initiator = new ForeignReference<Resident>(this, "initiatorId", Resident);
	this.$peer = new ForeignReference<Resident>(this, "peerId", Resident);
	}
	
	private $initiator: ForeignReference<Resident>;

	set initiator(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.initiatorId = value.id as string;
		} else {
			this.initiatorId = null;
		}
	}

	private $peer: ForeignReference<Resident>;

	set peer(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.peerId = value.id as string;
		} else {
			this.peerId = null;
		}
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
	get activeRoute(): Partial<StreetRouteQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get activeRouteId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get deactivated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get size(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Street extends Entity<StreetQueryProxy> {
	get activeRoute(): Partial<ForeignReference<StreetRoute>> { return this.$activeRoute; }
	bridges: PrimaryReference<Bridge, BridgeQueryProxy>;
		routes: PrimaryReference<StreetRoute, StreetRouteQueryProxy>;
		activeRouteId: string;
	deactivated: Date;
	declare id: string;
	name: string;
	path: string;
	shortName: string;
	size: number;
	tag: string;
	
	$$meta = {
		source: "street",
		columns: {
			activeRouteId: { type: "uuid", name: "active_route_id" },
			deactivated: { type: "timestamp", name: "deactivated" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			shortName: { type: "text", name: "short_name" },
			size: { type: "float4", name: "size" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Street, StreetQueryProxy> { 
			return new DbSet<Street, StreetQueryProxy>(Street, null);
		}
	};
	
	constructor() {
		super();
		
		this.$activeRoute = new ForeignReference<StreetRoute>(this, "activeRouteId", StreetRoute);
	this.bridges = new PrimaryReference<Bridge, BridgeQueryProxy>(this, "streetId", Bridge);
		this.routes = new PrimaryReference<StreetRoute, StreetRouteQueryProxy>(this, "streetId", StreetRoute);
	}
	
	private $activeRoute: ForeignReference<StreetRoute>;

	set activeRoute(value: Partial<ForeignReference<StreetRoute>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.activeRouteId = value.id as string;
		} else {
			this.activeRouteId = null;
		}
	}

	
}
			
export class StreetRouteQueryProxy extends QueryProxy {
	get street(): Partial<StreetQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get changeComment(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get streetId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class StreetRoute extends Entity<StreetRouteQueryProxy> {
	get street(): Partial<ForeignReference<Street>> { return this.$street; }
	changeComment: string;
	created: Date;
	declare id: string;
	path: string;
	streetId: string;
	
	$$meta = {
		source: "street_route",
		columns: {
			changeComment: { type: "text", name: "change_comment" },
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			path: { type: "text", name: "path" },
			streetId: { type: "uuid", name: "street_id" }
		},
		get set(): DbSet<StreetRoute, StreetRouteQueryProxy> { 
			return new DbSet<StreetRoute, StreetRouteQueryProxy>(StreetRoute, null);
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
			
export class TenancyQueryProxy extends QueryProxy {
	get dwelling(): Partial<DwellingQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get inhabitant(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get dwellingId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get end(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get inhabitantId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get start(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Tenancy extends Entity<TenancyQueryProxy> {
	get dwelling(): Partial<ForeignReference<Dwelling>> { return this.$dwelling; }
	get inhabitant(): Partial<ForeignReference<Resident>> { return this.$inhabitant; }
	dwellingId: string;
	end: Date;
	declare id: string;
	inhabitantId: string;
	start: Date;
	
	$$meta = {
		source: "tenancy",
		columns: {
			dwellingId: { type: "uuid", name: "dwelling_id" },
			end: { type: "timestamp", name: "end" },
			id: { type: "uuid", name: "id" },
			inhabitantId: { type: "uuid", name: "inhabitant_id" },
			start: { type: "timestamp", name: "start" }
		},
		get set(): DbSet<Tenancy, TenancyQueryProxy> { 
			return new DbSet<Tenancy, TenancyQueryProxy>(Tenancy, null);
		}
	};
	
	constructor() {
		super();
		
		this.$dwelling = new ForeignReference<Dwelling>(this, "dwellingId", Dwelling);
	this.$inhabitant = new ForeignReference<Resident>(this, "inhabitantId", Resident);
	}
	
	private $dwelling: ForeignReference<Dwelling>;

	set dwelling(value: Partial<ForeignReference<Dwelling>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.dwellingId = value.id as string;
		} else {
			this.dwellingId = null;
		}
	}

	private $inhabitant: ForeignReference<Resident>;

	set inhabitant(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.inhabitantId = value.id as string;
		} else {
			this.inhabitantId = null;
		}
	}

	
}
			
export class TrainRouteQueryProxy extends QueryProxy {
	get activePath(): Partial<TrainRoutePathQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get operator(): Partial<LegalEntityQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get activePathId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get closed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get looping(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get opened(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get operatorId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get textColor(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainRoute extends Entity<TrainRouteQueryProxy> {
	get activePath(): Partial<ForeignReference<TrainRoutePath>> { return this.$activePath; }
	get operator(): Partial<ForeignReference<LegalEntity>> { return this.$operator; }
	stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		paths: PrimaryReference<TrainRoutePath, TrainRoutePathQueryProxy>;
		activePathId: string;
	closed: Date;
	code: string;
	color: string;
	description: string;
	declare id: string;
	looping: boolean;
	name: string;
	opened: Date;
	operatorId: string;
	path: string;
	textColor: string;
	
	$$meta = {
		source: "train_route",
		columns: {
			activePathId: { type: "uuid", name: "active_path_id" },
			closed: { type: "timestamp", name: "closed" },
			code: { type: "text", name: "code" },
			color: { type: "text", name: "color" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			looping: { type: "bool", name: "looping" },
			name: { type: "text", name: "name" },
			opened: { type: "timestamp", name: "opened" },
			operatorId: { type: "uuid", name: "operator_id" },
			path: { type: "text", name: "path" },
			textColor: { type: "text", name: "text_color" }
		},
		get set(): DbSet<TrainRoute, TrainRouteQueryProxy> { 
			return new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, null);
		}
	};
	
	constructor() {
		super();
		
		this.$activePath = new ForeignReference<TrainRoutePath>(this, "activePathId", TrainRoutePath);
	this.$operator = new ForeignReference<LegalEntity>(this, "operatorId", LegalEntity);
	this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "routeId", TrainStop);
		this.paths = new PrimaryReference<TrainRoutePath, TrainRoutePathQueryProxy>(this, "trainRouteId", TrainRoutePath);
	}
	
	private $activePath: ForeignReference<TrainRoutePath>;

	set activePath(value: Partial<ForeignReference<TrainRoutePath>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.activePathId = value.id as string;
		} else {
			this.activePathId = null;
		}
	}

	private $operator: ForeignReference<LegalEntity>;

	set operator(value: Partial<ForeignReference<LegalEntity>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.operatorId = value.id as string;
		} else {
			this.operatorId = null;
		}
	}

	
}
			
export class TrainRoutePathQueryProxy extends QueryProxy {
	get trainRoute(): Partial<TrainRouteQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get trainRouteId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainRoutePath extends Entity<TrainRoutePathQueryProxy> {
	get trainRoute(): Partial<ForeignReference<TrainRoute>> { return this.$trainRoute; }
	created: Date;
	declare id: string;
	path: string;
	trainRouteId: string;
	
	$$meta = {
		source: "train_route_path",
		columns: {
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			path: { type: "text", name: "path" },
			trainRouteId: { type: "uuid", name: "train_route_id" }
		},
		get set(): DbSet<TrainRoutePath, TrainRoutePathQueryProxy> { 
			return new DbSet<TrainRoutePath, TrainRoutePathQueryProxy>(TrainRoutePath, null);
		}
	};
	
	constructor() {
		super();
		
		this.$trainRoute = new ForeignReference<TrainRoute>(this, "trainRouteId", TrainRoute);
	}
	
	private $trainRoute: ForeignReference<TrainRoute>;

	set trainRoute(value: Partial<ForeignReference<TrainRoute>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.trainRouteId = value.id as string;
		} else {
			this.trainRouteId = null;
		}
	}

	
}
			
export class TrainStationQueryProxy extends QueryProxy {
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get position(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStation extends Entity<TrainStationQueryProxy> {
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	exits: PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>;
		stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		declare id: string;
	name: string;
	position: string;
	propertyId: string;
	
	$$meta = {
		source: "train_station",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			position: { type: "text", name: "position" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<TrainStation, TrainStationQueryProxy> { 
			return new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, null);
		}
	};
	
	constructor() {
		super();
		
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
	this.exits = new PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>(this, "stationId", TrainStationExit);
		this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "stationId", TrainStop);
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
	get closed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get downPlatform(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get opened(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get routeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get stationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get trackPosition(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get upPlatform(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStop extends Entity<TrainStopQueryProxy> {
	get route(): Partial<ForeignReference<TrainRoute>> { return this.$route; }
	get station(): Partial<ForeignReference<TrainStation>> { return this.$station; }
	closed: Date;
	downPlatform: string;
	declare id: string;
	name: string;
	opened: Date;
	routeId: string;
	stationId: string;
	trackPosition: string;
	upPlatform: string;
	
	$$meta = {
		source: "train_stop",
		columns: {
			closed: { type: "timestamp", name: "closed" },
			downPlatform: { type: "text", name: "down_platform" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			opened: { type: "timestamp", name: "opened" },
			routeId: { type: "uuid", name: "route_id" },
			stationId: { type: "uuid", name: "station_id" },
			trackPosition: { type: "text", name: "track_position" },
			upPlatform: { type: "text", name: "up_platform" }
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
			
export class ValuationQueryProxy extends QueryProxy {
	get issuer(): Partial<LegalEntityQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get estimated(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get issuerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get item(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get price(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Valuation extends Entity<ValuationQueryProxy> {
	get issuer(): Partial<ForeignReference<LegalEntity>> { return this.$issuer; }
	description: string;
	estimated: Date;
	declare id: string;
	issuerId: string;
	item: string;
	price: number;
	
	$$meta = {
		source: "valuation",
		columns: {
			description: { type: "text", name: "description" },
			estimated: { type: "timestamp", name: "estimated" },
			id: { type: "uuid", name: "id" },
			issuerId: { type: "uuid", name: "issuer_id" },
			item: { type: "text", name: "item" },
			price: { type: "float4", name: "price" }
		},
		get set(): DbSet<Valuation, ValuationQueryProxy> { 
			return new DbSet<Valuation, ValuationQueryProxy>(Valuation, null);
		}
	};
	
	constructor() {
		super();
		
		this.$issuer = new ForeignReference<LegalEntity>(this, "issuerId", LegalEntity);
	}
	
	private $issuer: ForeignReference<LegalEntity>;

	set issuer(value: Partial<ForeignReference<LegalEntity>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.issuerId = value.id as string;
		} else {
			this.issuerId = null;
		}
	}

	
}
			
export class VoteQueryProxy extends QueryProxy {
	get bill(): Partial<BillQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get resident(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get billId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get pro(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get reason(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get residentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get submitted(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Vote extends Entity<VoteQueryProxy> {
	get bill(): Partial<ForeignReference<Bill>> { return this.$bill; }
	get resident(): Partial<ForeignReference<Resident>> { return this.$resident; }
	billId: string;
	declare id: string;
	pro: boolean;
	reason: string;
	residentId: string;
	submitted: Date;
	
	$$meta = {
		source: "vote",
		columns: {
			billId: { type: "uuid", name: "bill_id" },
			id: { type: "uuid", name: "id" },
			pro: { type: "bool", name: "pro" },
			reason: { type: "text", name: "reason" },
			residentId: { type: "uuid", name: "resident_id" },
			submitted: { type: "timestamp", name: "submitted" }
		},
		get set(): DbSet<Vote, VoteQueryProxy> { 
			return new DbSet<Vote, VoteQueryProxy>(Vote, null);
		}
	};
	
	constructor() {
		super();
		
		this.$bill = new ForeignReference<Bill>(this, "billId", Bill);
	this.$resident = new ForeignReference<Resident>(this, "residentId", Resident);
	}
	
	private $bill: ForeignReference<Bill>;

	set bill(value: Partial<ForeignReference<Bill>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.billId = value.id as string;
		} else {
			this.billId = null;
		}
	}

	private $resident: ForeignReference<Resident>;

	set resident(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.residentId = value.id as string;
		} else {
			this.residentId = null;
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
			
export class WorkContractQueryProxy extends QueryProxy {
	get offer(): Partial<WorkOfferQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get worker(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get canceled(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get match(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get offerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get signed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get workerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class WorkContract extends Entity<WorkContractQueryProxy> {
	get offer(): Partial<ForeignReference<WorkOffer>> { return this.$offer; }
	get worker(): Partial<ForeignReference<Resident>> { return this.$worker; }
	canceled: Date;
	declare id: string;
	match: string;
	offerId: string;
	signed: Date;
	workerId: string;
	
	$$meta = {
		source: "work_contract",
		columns: {
			canceled: { type: "timestamp", name: "canceled" },
			id: { type: "uuid", name: "id" },
			match: { type: "text", name: "match" },
			offerId: { type: "uuid", name: "offer_id" },
			signed: { type: "timestamp", name: "signed" },
			workerId: { type: "uuid", name: "worker_id" }
		},
		get set(): DbSet<WorkContract, WorkContractQueryProxy> { 
			return new DbSet<WorkContract, WorkContractQueryProxy>(WorkContract, null);
		}
	};
	
	constructor() {
		super();
		
		this.$offer = new ForeignReference<WorkOffer>(this, "offerId", WorkOffer);
	this.$worker = new ForeignReference<Resident>(this, "workerId", Resident);
	}
	
	private $offer: ForeignReference<WorkOffer>;

	set offer(value: Partial<ForeignReference<WorkOffer>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.offerId = value.id as string;
		} else {
			this.offerId = null;
		}
	}

	private $worker: ForeignReference<Resident>;

	set worker(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.workerId = value.id as string;
		} else {
			this.workerId = null;
		}
	}

	
}
			
export class WorkOfferQueryProxy extends QueryProxy {
	get office(): Partial<OfficeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get closed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get count(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get offered(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get officeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get task(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get title(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class WorkOffer extends Entity<WorkOfferQueryProxy> {
	workContracts: PrimaryReference<WorkContract, WorkContractQueryProxy>;
		get office(): Partial<ForeignReference<Office>> { return this.$office; }
	closed: Date;
	count: number;
	declare id: string;
	offered: Date;
	officeId: string;
	task: string;
	title: string;
	
	$$meta = {
		source: "work_offer",
		columns: {
			closed: { type: "timestamp", name: "closed" },
			count: { type: "int4", name: "count" },
			id: { type: "uuid", name: "id" },
			offered: { type: "timestamp", name: "offered" },
			officeId: { type: "uuid", name: "office_id" },
			task: { type: "text", name: "task" },
			title: { type: "text", name: "title" }
		},
		get set(): DbSet<WorkOffer, WorkOfferQueryProxy> { 
			return new DbSet<WorkOffer, WorkOfferQueryProxy>(WorkOffer, null);
		}
	};
	
	constructor() {
		super();
		
		this.workContracts = new PrimaryReference<WorkContract, WorkContractQueryProxy>(this, "offerId", WorkContract);
		this.$office = new ForeignReference<Office>(this, "officeId", Office);
	}
	
	private $office: ForeignReference<Office>;

	set office(value: Partial<ForeignReference<Office>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.officeId = value.id as string;
		} else {
			this.officeId = null;
		}
	}

	
}
			
class ResidentEventViewProxy extends QueryProxy {
	get timestamp(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get primaryResidentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get secondaryResidentId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get action(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get detail(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ResidentEventView extends View<ResidentEventViewProxy> {
	$$meta = {
		source: "resident_event",
		get set(): ViewSet<ResidentEventView, ResidentEventViewProxy> { 
			return new ViewSet<ResidentEventView, ResidentEventViewProxy>(ResidentEventView, null);
		},

		columns: {
			id: { type: "uuid", name: "id" },
			timestamp: { type: "timestamp", name: "timestamp" },
			primaryResidentId: { type: "uuid", name: "primary_resident_id" },
			secondaryResidentId: { type: "uuid", name: "secondary_resident_id" },
			action: { type: "text", name: "action" },
			detail: { type: "text", name: "detail" }
		}
	};

	id: string;
	timestamp: Date;
	primaryResidentId: string;
	secondaryResidentId: string;
	action: string;
	detail: string;
}
			

export class DbContext {
	article: DbSet<Article, ArticleQueryProxy>;
	articleImage: DbSet<ArticleImage, ArticleImageQueryProxy>;
	bill: DbSet<Bill, BillQueryProxy>;
	billHonestium: DbSet<BillHonestium, BillHonestiumQueryProxy>;
	borough: DbSet<Borough, BoroughQueryProxy>;
	bridge: DbSet<Bridge, BridgeQueryProxy>;
	building: DbSet<Building, BuildingQueryProxy>;
	chat: DbSet<Chat, ChatQueryProxy>;
	chatInteraction: DbSet<ChatInteraction, ChatInteractionQueryProxy>;
	city: DbSet<City, CityQueryProxy>;
	company: DbSet<Company, CompanyQueryProxy>;
	district: DbSet<District, DistrictQueryProxy>;
	dwelling: DbSet<Dwelling, DwellingQueryProxy>;
	historicListingGrade: DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>;
	historicListingModifier: DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>;
	impression: DbSet<Impression, ImpressionQueryProxy>;
	lawHouseSession: DbSet<LawHouseSession, LawHouseSessionQueryProxy>;
	lawHouseSessionProtocol: DbSet<LawHouseSessionProtocol, LawHouseSessionProtocolQueryProxy>;
	lawHouseSessionary: DbSet<LawHouseSessionary, LawHouseSessionaryQueryProxy>;
	legalEntity: DbSet<LegalEntity, LegalEntityQueryProxy>;
	mapTile: DbSet<MapTile, MapTileQueryProxy>;
	metric: DbSet<Metric, MetricQueryProxy>;
	metricValue: DbSet<MetricValue, MetricValueQueryProxy>;
	movement: DbSet<Movement, MovementQueryProxy>;
	office: DbSet<Office, OfficeQueryProxy>;
	officeCapacity: DbSet<OfficeCapacity, OfficeCapacityQueryProxy>;
	player: DbSet<Player, PlayerQueryProxy>;
	plotBoundary: DbSet<PlotBoundary, PlotBoundaryQueryProxy>;
	property: DbSet<Property, PropertyQueryProxy>;
	propertyHistoricListingModifier: DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
	propertyOwner: DbSet<PropertyOwner, PropertyOwnerQueryProxy>;
	propertyType: DbSet<PropertyType, PropertyTypeQueryProxy>;
	publication: DbSet<Publication, PublicationQueryProxy>;
	resident: DbSet<Resident, ResidentQueryProxy>;
	residentFigure: DbSet<ResidentFigure, ResidentFigureQueryProxy>;
	residentRelationship: DbSet<ResidentRelationship, ResidentRelationshipQueryProxy>;
	square: DbSet<Square, SquareQueryProxy>;
	street: DbSet<Street, StreetQueryProxy>;
	streetRoute: DbSet<StreetRoute, StreetRouteQueryProxy>;
	tenancy: DbSet<Tenancy, TenancyQueryProxy>;
	trainRoute: DbSet<TrainRoute, TrainRouteQueryProxy>;
	trainRoutePath: DbSet<TrainRoutePath, TrainRoutePathQueryProxy>;
	trainStation: DbSet<TrainStation, TrainStationQueryProxy>;
	trainStationExit: DbSet<TrainStationExit, TrainStationExitQueryProxy>;
	trainStop: DbSet<TrainStop, TrainStopQueryProxy>;
	valuation: DbSet<Valuation, ValuationQueryProxy>;
	vote: DbSet<Vote, VoteQueryProxy>;
	waterBody: DbSet<WaterBody, WaterBodyQueryProxy>;
	workContract: DbSet<WorkContract, WorkContractQueryProxy>;
	workOffer: DbSet<WorkOffer, WorkOfferQueryProxy>;

	constructor(private runContext: RunContext) {
		this.article = new DbSet<Article, ArticleQueryProxy>(Article, this.runContext);
		this.articleImage = new DbSet<ArticleImage, ArticleImageQueryProxy>(ArticleImage, this.runContext);
		this.bill = new DbSet<Bill, BillQueryProxy>(Bill, this.runContext);
		this.billHonestium = new DbSet<BillHonestium, BillHonestiumQueryProxy>(BillHonestium, this.runContext);
		this.borough = new DbSet<Borough, BoroughQueryProxy>(Borough, this.runContext);
		this.bridge = new DbSet<Bridge, BridgeQueryProxy>(Bridge, this.runContext);
		this.building = new DbSet<Building, BuildingQueryProxy>(Building, this.runContext);
		this.chat = new DbSet<Chat, ChatQueryProxy>(Chat, this.runContext);
		this.chatInteraction = new DbSet<ChatInteraction, ChatInteractionQueryProxy>(ChatInteraction, this.runContext);
		this.city = new DbSet<City, CityQueryProxy>(City, this.runContext);
		this.company = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
		this.district = new DbSet<District, DistrictQueryProxy>(District, this.runContext);
		this.dwelling = new DbSet<Dwelling, DwellingQueryProxy>(Dwelling, this.runContext);
		this.historicListingGrade = new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, this.runContext);
		this.historicListingModifier = new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, this.runContext);
		this.impression = new DbSet<Impression, ImpressionQueryProxy>(Impression, this.runContext);
		this.lawHouseSession = new DbSet<LawHouseSession, LawHouseSessionQueryProxy>(LawHouseSession, this.runContext);
		this.lawHouseSessionProtocol = new DbSet<LawHouseSessionProtocol, LawHouseSessionProtocolQueryProxy>(LawHouseSessionProtocol, this.runContext);
		this.lawHouseSessionary = new DbSet<LawHouseSessionary, LawHouseSessionaryQueryProxy>(LawHouseSessionary, this.runContext);
		this.legalEntity = new DbSet<LegalEntity, LegalEntityQueryProxy>(LegalEntity, this.runContext);
		this.mapTile = new DbSet<MapTile, MapTileQueryProxy>(MapTile, this.runContext);
		this.metric = new DbSet<Metric, MetricQueryProxy>(Metric, this.runContext);
		this.metricValue = new DbSet<MetricValue, MetricValueQueryProxy>(MetricValue, this.runContext);
		this.movement = new DbSet<Movement, MovementQueryProxy>(Movement, this.runContext);
		this.office = new DbSet<Office, OfficeQueryProxy>(Office, this.runContext);
		this.officeCapacity = new DbSet<OfficeCapacity, OfficeCapacityQueryProxy>(OfficeCapacity, this.runContext);
		this.player = new DbSet<Player, PlayerQueryProxy>(Player, this.runContext);
		this.plotBoundary = new DbSet<PlotBoundary, PlotBoundaryQueryProxy>(PlotBoundary, this.runContext);
		this.property = new DbSet<Property, PropertyQueryProxy>(Property, this.runContext);
		this.propertyHistoricListingModifier = new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, this.runContext);
		this.propertyOwner = new DbSet<PropertyOwner, PropertyOwnerQueryProxy>(PropertyOwner, this.runContext);
		this.propertyType = new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, this.runContext);
		this.publication = new DbSet<Publication, PublicationQueryProxy>(Publication, this.runContext);
		this.resident = new DbSet<Resident, ResidentQueryProxy>(Resident, this.runContext);
		this.residentFigure = new DbSet<ResidentFigure, ResidentFigureQueryProxy>(ResidentFigure, this.runContext);
		this.residentRelationship = new DbSet<ResidentRelationship, ResidentRelationshipQueryProxy>(ResidentRelationship, this.runContext);
		this.square = new DbSet<Square, SquareQueryProxy>(Square, this.runContext);
		this.street = new DbSet<Street, StreetQueryProxy>(Street, this.runContext);
		this.streetRoute = new DbSet<StreetRoute, StreetRouteQueryProxy>(StreetRoute, this.runContext);
		this.tenancy = new DbSet<Tenancy, TenancyQueryProxy>(Tenancy, this.runContext);
		this.trainRoute = new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, this.runContext);
		this.trainRoutePath = new DbSet<TrainRoutePath, TrainRoutePathQueryProxy>(TrainRoutePath, this.runContext);
		this.trainStation = new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, this.runContext);
		this.trainStationExit = new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, this.runContext);
		this.trainStop = new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, this.runContext);
		this.valuation = new DbSet<Valuation, ValuationQueryProxy>(Valuation, this.runContext);
		this.vote = new DbSet<Vote, VoteQueryProxy>(Vote, this.runContext);
		this.waterBody = new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, this.runContext);
		this.workContract = new DbSet<WorkContract, WorkContractQueryProxy>(WorkContract, this.runContext);
		this.workOffer = new DbSet<WorkOffer, WorkOfferQueryProxy>(WorkOffer, this.runContext);
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

	views = {
		residentEvent: new ViewSet<ResidentEventView, ResidentEventViewProxy>(ResidentEventView)
	}
};