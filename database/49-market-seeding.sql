ALTER TABLE commodity ADD seed_rules_created TIMESTAMP;

CREATE TYPE stock_seed_rule_property AS ENUM ('quantity', 'quality');
CREATE TYPE stock_seed_rule_operation AS ENUM ('apply', 'add', 'subtract');

CREATE TABLE stock_seed_rule (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	commodity_id UUID CONSTRAINT commodity__stock_seed_rules REFERENCES commodity (id),

	parameter_id UUID CONSTRAINT parameter__ REFERENCES resident_assessment_parameter (id),
	parameter_minimum REAL,
	parameter_maximum REAL,

	property stock_seed_rule_property,
	operation stock_seed_rule_operation,

	value_minimum REAL,
	value_maximum REAL
);

ALTER TABLE stock_seed ADD quality INTEGER;
