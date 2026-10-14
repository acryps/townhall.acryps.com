CREATE TABLE train_route_class (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,

	train_speed_units_per_second REAL,
	stop_dwell_time_seconds REAL
);

ALTER TABLE train_route ADD class_id UUID CONSTRAINT class__routes REFERENCES train_route_class (id);
