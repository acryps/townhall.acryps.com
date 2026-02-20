CREATE TABLE commodity_category (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
	description TEXT,

	harmonized_system_code INT
);

ALTER TABLE commodity_category ADD parent_id UUID CONSTRAINT parent__children REFERENCES commodity_category (id);

CREATE TABLE commodity (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,

	name TEXT,
	description TEXT,

	unit TEXT,
	whole BOOLEAN,

	heft REAL,
	depreciation REAL,

	category_id UUID CONSTRAINT category__commodities REFERENCES commodity_category (id)
);

CREATE TABLE trade_bid (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	commodity_id UUID CONSTRAINT commodity__bids REFERENCES commodity (id),
	bidder_id UUID CONSTRAINT bidder__bids REFERENCES legal_entity (id),

	price REAL,
	quantity REAL,

	posted TIMESTAMP,
	expires TIMESTAMP,

	location_x INT,
	location_y INT
);

CREATE TABLE trade_ask (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	commodity_id UUID CONSTRAINT commodity__asks REFERENCES commodity (id),
	asker_id UUID CONSTRAINT asker__asks REFERENCES legal_entity (id),

	price REAL,
	quantity REAL,

	posted TIMESTAMP,
	expires TIMESTAMP,

	location_x INT,
	location_y INT
);

CREATE TABLE trade (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,

	booked TIMESTAMP,
	ask_id UUID CONSTRAINT ask__trades REFERENCES trade_ask (id),

	buyer_id UUID CONSTRAINT buyer__trades REFERENCES legal_entity (id),
	price REAL, -- final sale price might differ from asking price
	amount REAL
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
