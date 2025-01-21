CREATE TABLE district (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	incorporation TIMESTAMP,

	name TEXT,
	bill_prefix TEXT,

	parent_id UUID CONSTRAINT parent__children REFERENCES district (id)
);

ALTER TABLE borough ADD district_id UUID CONSTRAINT district__boroughs REFERENCES district (id);

CREATE TABLE bill (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,

	tag TEXT,
	title TEXT,
	description TEXT,

	mailed TIMESTAMP,

	certified TIMESTAMP,
	pro BOOLEAN,

	scope_id UUID CONSTRAINT scope__bills REFERENCES district (id)
);

CREATE TABLE bill_honestium (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	answered TIMESTAMP,

	pro BOOLEAN,
	question TEXT,
	answer TEXT,

	bill_id UUID CONSTRAINT bill__honestiums REFERENCES bill (id)
);

CREATE TABLE vote (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	submitted TIMESTAMP,

	pro BOOLEAN,
	reason TEXT,

	resident_id UUID CONSTRAINT resident__votes REFERENCES resident (id),
	bill_id UUID CONSTRAINT bill__votes REFERENCES bill (id)
);
