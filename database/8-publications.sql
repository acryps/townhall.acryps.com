CREATE TABLE publication (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT,

	name TEXT,
	legal_name TEXT,
	description TEXT,

	main_office_id UUID CONSTRAINT main_office__ REFERENCES property (id),

	incorporation TIMESTAMP
);

CREATE TABLE article (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	title TEXT,
	body TEXT,

	published TIMESTAMP,
	publication_id UUID CONSTRAINT publication__articles REFERENCES publication (id)
);

CREATE TABLE article_image (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	caption TEXT,
	data BYTEA,

	article_id UUID CONSTRAINT article__images REFERENCES article (id)
);
