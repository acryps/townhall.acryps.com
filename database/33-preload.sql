CREATE TABLE preloaded_page (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	updated TIMESTAMP,

	link TEXT,

	title TEXT,
	content TEXT,
	metadata TEXT,
);
