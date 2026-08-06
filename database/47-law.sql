CREATE TABLE law_book (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	identifier TEXT,
	title TEXT,

	parent_id UUID CONSTRAINT parent_book__child_books REFERENCES law_book (id),

	jurisdiction_id UUID CONSTRAINT jurisdiction__root_law_books REFERENCES district (id)
);

CREATE TABLE law (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	codified TIMESTAMP,

	identifier TEXT,
	text TEXT,

	book_id UUID CONSTRAINT book__root_laws REFERENCES law_book (id),
	parent_id UUID CONSTRAINT parent__children REFERENCES law (id)
);

CREATE TABLE legal_definition (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	defined TIMESTAMP,

	name TEXT UNIQUE,
	definition TEXT
);

CREATE TABLE court_case (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	filed TIMESTAMP,

	identifier TEXT,

	jurisdiction_id UUID CONSTRAINT jurisdiction__court_cases REFERENCES district (id),

	claimant_id UUID CONSTRAINT claimant__ REFERENCES legal_entity (id),
	submitted_claim TEXT,

	defendant_id UUID CONSTRAINT defendant__ REFERENCES legal_entity (id),
	submitted_defense TEXT,

	judged TIMESTAMP
);

CREATE TABLE court_case_claim (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	court_case_id UUID CONSTRAINT court_case__claims REFERENCES court_case (id),

	content TEXT
);

CREATE TABLE court_case_defense (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	court_case_id UUID CONSTRAINT court_case__defenses REFERENCES court_case (id),

	content TEXT
);

CREATE TABLE court_case_reference_law (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	court_case_id UUID CONSTRAINT court_case__referenced_laws REFERENCES court_case (id),

	law_id UUID CONSTRAINT law__court_case_references REFERENCES law (id)
);

CREATE TABLE court_case_reference_definition (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	court_case_id UUID CONSTRAINT court_case__referenced_definitions REFERENCES court_case (id),

	definition_id UUID CONSTRAINT definition__court_case_references REFERENCES legal_definition (id)
);

CREATE TABLE juror (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	court_case_id UUID CONSTRAINT court_case__jury REFERENCES court_case (id),

	resident_id UUID CONSTRAINT resident__jury_summons REFERENCES resident (id)
);

CREATE TABLE juror_thought (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	timestamp TIMESTAMP,

	juror_id UUID CONSTRAINT juror__thoughts REFERENCES juror (id),
	content TEXT
);

ALTER TABLE district
ADD jury_size INTEGER CHECK (jury_size % 2 = 1);

ALTER TABLE district
ADD maximum_juror_opinion_submissions INTEGER;

ALTER TABLE district
ADD court_case_format TEXT;

ALTER TABLE district
ADD law_book_format TEXT;

CREATE TABLE jury_opinion (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	submitted TIMESTAMP,
	submitter_id UUID CONSTRAINT submitter__submitted_opinions REFERENCES juror (id),

	content TEXT
);

CREATE TABLE jury_opinion_vote (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	voted TIMESTAMP,

	voter_id UUID CONSTRAINT voter__opinion_votes REFERENCES juror (id),
	opinion_id UUID CONSTRAINT opinion__votes REFERENCES jury_opinion (id),

	accept BOOLEAN,
	comment TEXT
);

CREATE TABLE jury_verdict (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	proposed TIMESTAMP,
	proposer_id UUID CONSTRAINT submitter__submitted_verdicts REFERENCES juror (id),

	verdict TEXT
);

CREATE TABLE jury_verdict_vote (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	voted TIMESTAMP,

	voter_id UUID CONSTRAINT voter__verdict_votes REFERENCES juror (id),
	verdict_id UUID CONSTRAINT verdict__votes REFERENCES jury_verdict (id),

	accept BOOLEAN,
	comment TEXT
);

ALTER TABLE court_case
ADD verdict_id UUID CONSTRAINT verdict__ REFERENCES jury_verdict (id);

ALTER TABLE law
ADD source_opinion_id UUID CONSTRAINT source_opinion__ REFERENCES jury_opinion (id);
