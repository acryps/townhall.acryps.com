CREATE TABLE legal_entity (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	state BOOLEAN UNIQUE,
	resident_id UUID UNIQUE CONSTRAINT resident__ REFERENCES resident (id),
	company_id UUID UNIQUE CONSTRAINT company__ REFERENCES company (id),
	borough_id UUID UNIQUE CONSTRAINT borough__ REFERENCES borough (id),

	-- a legal entity can only represent one type
	CHECK (
		(state)::int +
		(resident_id IS NOT NULL)::int +
		(company_id IS NOT NULL)::int +
		(borough_id IS NOT NULL)::int = 1
	)
);

INSERT INTO legal_entity (state) VALUES (true);

INSERT INTO legal_entity (borough_id)
SELECT id FROM borough;

CREATE TABLE valuation (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	issuer_id UUID CONSTRAINT issuer__ REFERENCES legal_entity (id),
	estimated TIMESTAMP,

	item TEXT,
	description TEXT,

	price REAL
);

CREATE TABLE property_owner (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	owner_id UUID CONSTRAINT owner__ REFERENCES legal_entity (id),
	property_id UUID CONSTRAINT property__owners REFERENCES property (id),

	aquired TIMESTAMP,
	aquired_valuation_id UUID CONSTRAINT aquired_valuation__ REFERENCES street (id),
	sold TIMESTAMP
);

ALTER TABLE property RENAME owner_id TO player_owner_id;
