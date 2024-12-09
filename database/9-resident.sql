CREATE TABLE resident (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,

	given_name TEXT,
	family_name TEXT,
	birthday TIMESTAMP,

	biography TEXT
);

CREATE TABLE resident_relationship (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	initiator_id UUID CONSTRAINT initiator__ REFERENCES resident (id),
	peer_id UUID CONSTRAINT peer__ REFERENCES resident (id),

	purpose TEXT,
	summary TEXT,

	connection TEXT,
	bonded TIMESTAMP,

	conflict TEXT,
	ended TIMESTAMP
);

CREATE TABLE dwelling (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	property_id UUID CONSTRAINT property__dwellings REFERENCES property (id)
);

CREATE TABLE tenancy (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	"start" TIMESTAMP,
	"end" TIMESTAMP,

	dwelling_id UUID CONSTRAINT dwelling__tenants REFERENCES dwelling (id),
	inhabitant_id UUID CONSTRAINT inhabitant__tenancies REFERENCES resident (id)
);

ALTER TABLE resident ADD main_tenancy_id UUID CONSTRAINT main_tenancy__ REFERENCES tenancy (id);

CREATE TABLE resident_figure (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	source_biome TEXT,
	source_job TEXT,

	outfit TEXT,

	image BYTEA
);

ALTER TABLE resident ADD figure_id UUID CONSTRAINT figure__ REFERENCES resident_figure (id);
