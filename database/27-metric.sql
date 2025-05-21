-- as a parent to track values by id
CREATE TABLE metric (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT
);

CREATE TABLE metric_value (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	value REAL,
	formatted TEXT,

	updated TIMESTAMP,
	elapsed INT,
	host TEXT,

	metric_id UUID CONSTRAINT metric__values REFERENCES metric (id)
);
