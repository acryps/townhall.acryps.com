CREATE TABLE item_context (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	context TEXT,
	summary TEXT,
	tagline TEXT,

	updated TIMESTAMP,
	dependency_complete BOOLEAN,

	item_id UUID UNIQUE
);

CREATE TYPE item_context_link_rank AS ENUM ('primary', 'near', 'far');

CREATE TABLE item_context_link (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	rank item_context_link_rank,
	connection TEXT,

	source_id UUID CONSTRAINT source__links REFERENCES item_context (id),
	target_id UUID CONSTRAINT target__ REFERENCES item_context (id)
);

CREATE TABLE item_context_fragment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	item_id UUID CONSTRAINT item__fragments REFERENCES item_context (id),

	order_index INTEGER,
	rank item_context_link_rank,

	title TEXT,
	content TEXT
);
