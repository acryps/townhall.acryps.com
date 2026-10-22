ALTER TABLE article ADD draft TEXT;
ALTER TABLE article ADD interpreted TIMESTAMP;

CREATE TABLE article_reference (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	article_id UUID CONSTRAINT article__references REFERENCES article (id),

	type TEXT,
	item_id UUID
);

CREATE TABLE article_draft_question (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	article_id UUID CONSTRAINT article__draft_questions REFERENCES article (id),

	order_index INTEGER,
	question TEXT,
	detail TEXT
);

CREATE TABLE article_draft_answer (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	question_id UUID CONSTRAINT question__answers REFERENCES article_draft_question (id),

	order_index INTEGER,
	content TEXT
);

ALTER TABLE article_draft_question ADD answer_id UUID CONSTRAINT answer__selected_in_questions REFERENCES article_draft_answer (id);
