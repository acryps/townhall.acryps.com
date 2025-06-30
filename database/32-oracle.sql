CREATE TABLE oracle_proposal (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	proposed TIMESTAMP,

	lore TEXT,

	reviewed TIMESTAMP,
	realistic BOOLEAN,

	entity_id UUID CONSTRAINT entity__oracle_proposals REFERENCES legal_entity (id)
);

ALTER TABLE article ADD generated_summary TEXT;
ALTER TABLE article ADD oracle_proposal_id UUID CONSTRAINT oracle_proposal__articles REFERENCES oracle_proposal (id);

CREATE TABLE article_opinion (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	comment TEXT,
	commented TIMESTAMP,

	article_id UUID CONSTRAINT article__opinions REFERENCES article (id),
	author_id UUID CONSTRAINT author__article_opinions REFERENCES resident (id)
);
