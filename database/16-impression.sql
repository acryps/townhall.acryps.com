CREATE TABLE impression (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	title TEXT,
	location_x REAL,
	location_y REAL,
	captured TIMESTAMP,

	image BYTEA,
	mime_type TEXT
);
