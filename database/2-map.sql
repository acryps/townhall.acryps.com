CREATE TABLE square (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,
    bounds TEXT,

    borough_id UUID CONSTRAINT borough__squares REFERENCES borough (id)
);

CREATE TABLE water_body (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,
    bounds TEXT,

    name_path TEXT
);

CREATE TABLE property_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,
    color TEXT,
    code TEXT
);

ALTER TABLE property ADD type_id UUID CONSTRAINT type__properties REFERENCES property_type (id);