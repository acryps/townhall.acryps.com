-- company assessment, mirrors resident_assessment_parameter / resident_assessment
-- parameters are curated manually (same as resident_assessment_parameter), scored by CompanyAssessor
CREATE TABLE company_assessment_parameter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,

	prompt TEXT,
	low TEXT,
	high TEXT
);

CREATE TABLE company_assessment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	assessed TIMESTAMP,

	company_id UUID CONSTRAINT company__assessments REFERENCES company (id),
	parameter_id UUID CONSTRAINT parameter__assessments REFERENCES company_assessment_parameter (id),

	value REAL,
	confidence REAL
);

ALTER TABLE company ADD assessed TIMESTAMP;

-- borough assessment, mirrors resident_assessment_parameter / resident_assessment
CREATE TABLE borough_assessment_parameter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,

	prompt TEXT,
	low TEXT,
	high TEXT
);

CREATE TABLE borough_assessment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	assessed TIMESTAMP,

	borough_id UUID CONSTRAINT borough__assessments REFERENCES borough (id),
	parameter_id UUID CONSTRAINT parameter__assessments REFERENCES borough_assessment_parameter (id),

	value REAL,
	confidence REAL
);

ALTER TABLE borough ADD assessed TIMESTAMP;

-- commercial demand, mirrors residential_demand / residential_demand_rule, scored against company_assessment_parameter
-- kept separate from residential_demand: that stays retail only
CREATE TABLE commercial_demand (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	activates TIMESTAMP,

	likeliness REAL,

	commodity_id UUID CONSTRAINT commodity__commercial_demand REFERENCES commodity (id)
);

ALTER TABLE commodity ADD active_commercial_demand_id UUID CONSTRAINT active_commercial_demand__ REFERENCES commercial_demand (id);

CREATE TABLE commercial_demand_rule (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	demand_id UUID CONSTRAINT demand__rules REFERENCES commercial_demand (id),

	parameter_id UUID CONSTRAINT parameter__ REFERENCES company_assessment_parameter (id),
	parameter_minimum REAL,
	parameter_maximum REAL,

	property residential_demand_rule_property,
	operation residential_demand_rule_operation,

	value_minimum REAL,
	value_maximum REAL
);

-- borough demand, mirrors residential_demand / residential_demand_rule, scored against borough_assessment_parameter
CREATE TABLE borough_demand (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	activates TIMESTAMP,

	likeliness REAL,

	commodity_id UUID CONSTRAINT commodity__borough_demand REFERENCES commodity (id)
);

ALTER TABLE commodity ADD active_borough_demand_id UUID CONSTRAINT active_borough_demand__ REFERENCES borough_demand (id);

CREATE TABLE borough_demand_rule (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	demand_id UUID CONSTRAINT demand__rules REFERENCES borough_demand (id),

	parameter_id UUID CONSTRAINT parameter__ REFERENCES borough_assessment_parameter (id),
	parameter_minimum REAL,
	parameter_maximum REAL,

	property residential_demand_rule_property,
	operation residential_demand_rule_operation,

	value_minimum REAL,
	value_maximum REAL
);
