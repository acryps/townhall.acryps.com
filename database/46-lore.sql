CREATE TABLE lore (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	timestamp TIMESTAMP,
	source UUID,
	,

	title TEXT,
	facts TEXT,

	context TEXT
);

CREATE TABLE lore_proposal (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	base_lore_id UUID CONSTRAINT base_lore__expansion_proposals REFERENCES lore (id),
	submitted TIMESTAMP,

	title TEXT,
	context TEXT,

	valid BOOLEAN,
	validation TEXT
);

ALTER TABLE lore ADD proposal_id UUID CONSTRAINT proposal__ REFERENCES lore_proposal (id);

CREATE TABLE lore_query (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	asked TIMESTAMP,

	question TEXT,
	answer TEXT
);

CREATE TABLE lore_query_source (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	query_id UUID CONSTRAINT query__sources REFERENCES lore_query (id),

	relation TEXT,
	source_id UUID CONSTRAINT lore__query_references REFERENCES lore (id)
);

INSERT INTO lore (timestamp, source, title, context)
SELECT
	article.published,
	article.id,
	'Article ' || article.title || ' published in ' || publication.name,
	body
FROM article
	INNER JOIN publication ON publication.id = article.publication_id
WHERE published IS NOT NULL;

INSERT INTO lore (timestamp, source, title, context)
SELECT
	incorporation,
	id,
	'Borough ' || name || ' incorporated',
	description
FROM borough
