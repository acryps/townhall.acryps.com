CREATE TABLE commodity_category (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	description TEXT,

	harmonized_system_code INT
);

CREATE TABLE resident_assessment_parameter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,

	prompt TEXT,
	low TEXT,
	high TEXT
);

CREATE TABLE resident_assessment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	assessed TIMESTAMP,

	resident_id UUID CONSTRAINT resident__assessments REFERENCES resident (id),
	parameter_id UUID CONSTRAINT parameter__assessments REFERENCES resident_assessment_parameter (id),

	value REAL,
	confidence REAL
);

ALTER TABLE resident ADD assessed TIMESTAMP;

CREATE VIEW resident_assessment_match AS
	SELECT
		source_resident.id AS source_resident_id,
		source_resident.tag AS source_resident_tag,
		source_resident.given_name AS source_resident_given_name,
		source_resident.family_name AS source_resident_family_name,

		target_resident.id AS target_resident_id,
		target_resident.tag AS target_resident_tag,
		target_resident.given_name AS target_resident_given_name,
		target_resident.family_name AS target_resident_family_name,

		COUNT(*)::INTEGER AS shared_parameters,
		SUM(SQRT(POWER(source_assessment.value - target_assessment.value, 2))) / COUNT(*) AS distance
	FROM resident_assessment source_assessment
		JOIN resident_assessment target_assessment
			ON source_assessment.parameter_id = target_assessment.parameter_id
			AND source_assessment.resident_id < target_assessment.resident_id
		INNER JOIN resident AS source_resident ON source_resident.id = source_assessment.resident_id
		INNER JOIN resident AS target_resident ON target_resident.id = target_assessment.resident_id
	GROUP BY source_resident.id, target_resident.id
	ORDER BY distance ASC;

ALTER TABLE commodity_category ADD parent_id UUID CONSTRAINT parent__children REFERENCES commodity_category (id);

CREATE TABLE token_sponsor (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,

	smart_model TEXT,
	fast_model TEXT,
	key TEXT
);

CREATE TABLE market_cycle (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	opened TIMESTAMP,
	closed TIMESTAMP,

	-- all parameters are floating, as they can slightly adjust without having an immediate effect
	-- the iterations will always run in integer counts
	configuration TEXT,

	-- running the market is expensive
	-- someone has to pay
	sponsor_id UUID CONSTRAINT sponsor__market_cycles REFERENCES token_sponsor (id)
);

CREATE TABLE commodity (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,
	innovation_cycle_id UUID CONSTRAINT innovation_cycle__innovations REFERENCES market_cycle (id),

	name TEXT,
	description TEXT,
	innovated TIMESTMAP,

	unit TEXT,
	whole BOOLEAN,

	heft REAL,
	depreciation REAL,

	category_id UUID CONSTRAINT category__commodities REFERENCES commodity_category (id)
);

CREATE TABLE stock_seed (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	seeding_cycle_id UUID CONSTRAINT seeding_cycle__stock_seeds REFERENCES market_cycle (id),

	owner_id UUID CONSTRAINT owner__stock_seeds REFERENCES legal_entity (id),
	indexed TIMESTAMP,

	source_name TEXT,
	source_reason TEXT,
	source_quantity TEXT,

	commodity_id UUID CONSTRAINT commodity__stock_seeds REFERENCES commodity (id),
	quantity REAL,
	match_reason TEXT
);

CREATE TABLE trade_bid (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	trade_cycle_id UUID CONSTRAINT trade_cycle__bids REFERENCES market_cycle (id),

	commodity_id UUID CONSTRAINT commodity__bids REFERENCES commodity (id),
	bidder_id UUID CONSTRAINT bidder__bids REFERENCES legal_entity (id),

	price REAL,
	quantity REAL,

	posted TIMESTAMP,
	expires TIMESTAMP,

	purchase_id UUID CONSTRAINT purchase__bids REFERENCES trade (id),

	location_x INT,
	location_y INT,

	reason TEXT
);

CREATE TABLE trade_ask (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	trade_cycle_id UUID CONSTRAINT trade_cycle__asks REFERENCES market_cycle (id),

	commodity_id UUID CONSTRAINT commodity__asks REFERENCES commodity (id),
	asker_id UUID CONSTRAINT asker__asks REFERENCES legal_entity (id),

	price REAL,
	quantity REAL,

	posted TIMESTAMP,
	expires TIMESTAMP,

	sale_id UUID CONSTRAINT sale__asks REFERENCES trade (id),

	location_x INT,
	location_y INT,

	reason TEXT
);

CREATE TABLE trade (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	trade_cycle_id UUID CONSTRAINT trade_cycle__trades REFERENCES market_cycle (id),

	tag TEXT UNIQUE,

	booked TIMESTAMP,
	ask_id UUID CONSTRAINT ask__trades REFERENCES trade_ask (id),

	buyer_id UUID CONSTRAINT buyer__trades REFERENCES legal_entity (id),
	price REAL, -- final sale price might differ from asking price
	amount REAL,

	reason TEXT
);

CREATE TABLE cargo_route (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	operator_id UUID CONSTRAINT operator__operated_cargo_routes REFERENCES legal_entity (id),

	base_price REAL,

	start_x INT,
	start_y INT,

	end_x INT,
	end_y INT,

	bidirectional BOOL,

	duration INT
);

CREATE TABLE cargo_route_capacity (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	category_id UUID CONSTRAINT category__cargo_capacity REFERENCES commodity_category (id),
	route_id UUID CONSTRAINT route__capacity REFERENCES cargo_route (id),

	price_multiplier REAL
);

CREATE TABLE commodity_transport (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	commodity_id UUID CONSTRAINT commodity__transports REFERENCES commodity (id),
	quantity REAL,

	-- null = foot traffic
	route_id UUID CONSTRAINT route__transports REFERENCES cargo_route (id),
	forward BOOL,

	-- price might differ from normal sale price (discounts, bidding, price changes, ...)
	price REAL,
	customer_id UUID CONSTRAINT customer__bought_transports REFERENCES legal_entity (id),

	started TIMESTAMP,
	duration INT
);

CREATE TABLE production (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	started TIMESTAMP,
	finished TIMESTAMP,

	name TEXT,
	description TEXT,
	skill TEXT,
	worker_days REAL,

	cost REAL,
	producer_id UUID CONSTRAINT producer__productions REFERENCES legal_entity (id)
);

CREATE TABLE production_input (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	production_id UUID CONSTRAINT production__inputs REFERENCES production (id),
	used TIMESTAMP,

	commodity_id UUID CONSTRAINT commodity__production_inputs REFERENCES commodity (id),
	quantity REAL
);

CREATE TABLE production_output (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	production_id UUID CONSTRAINT production__outputs REFERENCES production (id),
	created TIMESTAMP,

	commodity_id UUID CONSTRAINT commodity__production_outputs REFERENCES commodity (id),
	quantity REAL
);

CREATE TABLE work_job (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	production_id UUID CONSTRAINT production__work_jobs REFERENCES production (id),
	worker_id UUID CONSTRAINT worker__work_jobs REFERENCES resident (id),

	started TIMESTAMP,
	ended TIMESTAMP,

	skill TEXT,
	work_days REAL
);

ALTER TABLE publication ADD market_report_standpoint TEXT;
ALTER TABLE article ADD market_cycle_id UUID CONSTRAINT market_cycle__articles REFERENCES market_cycle (id);
