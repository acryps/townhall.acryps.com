CREATE TABLE plan (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,
	created TIMESTAMP,
	updated TIMESTAMP,

	name TEXT,
	description TEXT,

	author_id UUID CONSTRAINT author__ REFERENCES legal_entity (id)
);

CREATE TABLE plan_shape (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	plan_id UUID CONSTRAINT plan__shapes REFERENCES plan (id),

	created TIMESTAMP,
	archived TIMESTAMP,

	path TEXT,
	closed BOOLEAN,
	stroke TEXT,
	fill TEXT,

	label TEXT
);
