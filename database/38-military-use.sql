CREATE TABLE military_unit (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,
	disbanded TIMESTAMP,

	name TEXT,
	code TEXT,
	banner TEXT,
	description TEXT,

	parent_id UUID CONSTRAINT parent__subunits REFERENCES military_unit (id)
);

CREATE TABLE military_facility (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	opened TIMESTAMP,
	closed TIMESTAMP,

	unit_id UUID CONSTRAINT unit__facilities REFERENCES military_unit (id)
);
