CREATE TABLE train_route (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,
    path TEXT,
    color TEXT
);

CREATE TABLE train_station (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,
    position TEXT
);

CREATE TABLE train_station_exit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    inbound BOOLEAN,
    position TEXT,

    station_id UUID CONSTRAINT station__stops REFERENCES train_station (id)
);

CREATE TABLE train_stop (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name TEXT,

    track_position TEXT,

    station_id UUID CONSTRAINT station__stops REFERENCES train_station (id),
    route_id UUID CONSTRAINT route__stops REFERENCES train_route (id)
);