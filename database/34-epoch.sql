CREATE TABLE epoch (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	"start" TIMESTAMP,
	"end" TIMESTAMP,

	"offset" REAL,
	rate REAL,

	name TEXT,
	description TEXT
);
