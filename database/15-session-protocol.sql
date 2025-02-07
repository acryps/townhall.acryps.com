CREATE TABLE law_house_session_protocol (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	said TIMESTAMP,
	message TEXT,
	person_id UUID CONSTRAINT person__ REFERENCES resident (id),

	session_id UUID CONSTRAINT session__protocol REFERENCES law_house_session (id)
);

INSERT INTO law_house_session_protocol (id, said, message, person_id, session_id)
SELECT
	uuid_generate_v4(),
	started,
	protocol AS message,
	NULL,
	id AS session_id
FROM law_house_session
WHERE protocol IS NOT NULL;

ALTER TABLE law_house_session DROP protocol;
