CREATE TABLE city (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	order_index INT,

	name TEXT,
	incorporated TIMESTAMP,

	main_impression_id UUID CONSTRAINT main_impression__ REFERENCES impression (id)

	center_x REAL,
	center_y REAL
);
