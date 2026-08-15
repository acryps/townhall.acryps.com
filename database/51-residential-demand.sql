ALTER TABLE commodity DROP residential_demand_likeliness;

CREATE TYPE residential_demand_rule_property AS ENUM ('quantity', 'quality');
CREATE TYPE residential_demand_rule_operation AS ENUM ('apply', 'add', 'subtract');

CREATE TABLE residential_demand (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	activates TIMESTAMP,

	likeliness REAL,

	commodity_id UUID CONSTRAINT commodity__residential_demand REFERENCES commodity (id)
);

ALTER TABLE commodity ADD active_residential_demand_id UUID CONSTRAINT active_residential_demand__ REFERENCES residential_demand (id);

CREATE TABLE residential_demand_rule (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	demand_id UUID CONSTRAINT demand__rules REFERENCES residential_demand (id),

	parameter_id UUID CONSTRAINT parameter__ REFERENCES resident_assessment_parameter (id),
	parameter_minimum REAL,
	parameter_maximum REAL,

	property residential_demand_rule_property,
	operation residential_demand_rule_operation,

	value_minimum REAL,
	value_maximum REAL
);
