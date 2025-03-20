DROP TABLE work_offer;
DROP TABLE work_contract;

CREATE TABLE office_capacity (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	issued TIMESTAMP,

	size INTEGER,
	office_id UUID CONSTRAINT office__work_offers REFERENCES office (id)
);

INSERT INTO office_capacity (office_id, size, issued)
SELECT id, capacity, NOW()
FROM office;

ALTER TABLE office DROP capacity;

CREATE TABLE work_offer (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	title TEXT,
	task TEXT,
	count INTEGER,

	offered TIMESTAMP,
	closed TIMESTAMP,

	office_id UUID CONSTRAINT office__work_offers REFERENCES office (id)
);

CREATE TABLE work_contract (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	signed TIMESTAMP,
	canceled TIMESTAMP,
	match TEXT,

	worker_id UUID CONSTRAINT worker__work_contracts REFERENCES resident (id),
	offer_id UUID CONSTRAINT offer__work_contracts REFERENCES work_offer (id)
);
