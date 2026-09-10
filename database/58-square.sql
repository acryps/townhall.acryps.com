DROP TABLE square;

CREATE TABLE square (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	tag TEXT UNIQUE,

	deactivated TIMESTAMP
);

CREATE TABLE square_boundary (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,

	shape TEXT,
	change_comment TEXT,

	square_id UUID CONSTRAINT square__boundaries REFERENCES square (id)
);

ALTER TABLE square ADD active_boundary_id UUID CONSTRAINT active_boundary__ REFERENCES square_boundary (id);
