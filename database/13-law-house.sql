CREATE TABLE law_house_session (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	started TIMESTAMP,
	ended TIMESTAMP,

	scope_id UUID CONSTRAINT scope__law_house_sessions REFERENCES district (id),

	protocol TEXT
);

CREATE TABLE law_house_sessionary (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	session_id UUID CONSTRAINT session__sessionaries REFERENCES law_house_session (id),
	resident_id UUID CONSTRAINT resident__appointed_law_house_sessions REFERENCES resident (id)
);
