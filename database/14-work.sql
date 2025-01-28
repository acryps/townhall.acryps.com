CREATE TABLE work_offer (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	job TEXT,
	description TEXT,
	employer_id UUID CONSTRAINT employer__work_offers REFERENCES company (id),

	target_count INTEGER
);

CREATE TABLE work_contract (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	started TIMESTAMP,
	ended TIMESTAMP,

	offer_id UUID CONSTRAINT offer__contracts REFERENCES work_offer (id),
	employee_id UUID CONSTRAINT employee__work_contracts REFERENCES resident (id)
);

ALTER TABLE company ADD tag TEXT;
UPDATE company SET tag = id;

ALTER TABLE company ADD description TEXT;
ALTER TABLE company DROP owner_id;

CREATE TABLE office (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	capacity INTEGER,

	opened TIMESTAMP,
	closed TIMESTAMP,

	company_id UUID CONSTRAINT company__offices REFERENCES company (id),
	property_id UUID CONSTRAINT property__offices REFERENCES property (id)
);

-- legal incorporation
ALTER TABLE company ADD incorporated TIMESTAMP;
ALTER TABLE company ADD purpose TEXT;
