CREATE TABLE building (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	created TIMESTAMP,
	archived TIMESTAMP,

	boundary TEXT,
	name TEXT,
	property_id UUID CONSTRAINT property__buildings REFERENCES property (id)
);

CREATE TABLE plot_boundary (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,

	shape TEXT,
	change_comment TEXT,

	property_id UUID CONSTRAINT property__plot_boundaries REFERENCES property (id)
);

ALTER TABLE property ADD active_plot_boundary_id UUID CONSTRAINT active_plot_boundary__ REFERENCES plot_boundary (id);


ALTER TABLE property ADD review_plot BOOLEAN;
UPDATE property SET review_plot = FALSE;
