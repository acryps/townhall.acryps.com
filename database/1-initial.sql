CREATE TABLE player (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    username TEXT
);

CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,

    owner_id UUID CONSTRAINT owner__companies REFERENCES player (id)
);

CREATE TABLE borough (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
    short_name TEXT,
    property_prefix TEXT,

    color TEXT,

    bounds TEXT
);

CREATE TABLE property (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,
    code TEXT,

    bounds TEXT,

    type 

    owner_id UUID CONSTRAINT owner__properties REFERENCES player (id),
    borough_id UUID CONSTRAINT borough__properties REFERENCES borough (id)
);