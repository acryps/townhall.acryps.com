CREATE TABLE law_house_session (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	started TIMESTAMP,
	ended TIMESTAMP,

	protocol TEXT
);
