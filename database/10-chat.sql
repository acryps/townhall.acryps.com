CREATE TABLE chat (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,

	started TIMESTAMP,

	resident_id UUID CONSTRAINT resident__chats REFERENCES resident (id)
);

CREATE TABLE chat_interaction (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	question TEXT,
	sent TIMESTAMP,

	response TEXT,
	responded TIMESTAMP,
	contains_information_request BOOLEAN,

	chat_id UUID CONSTRAINT chat__interactions REFERENCES chat (id)
);
