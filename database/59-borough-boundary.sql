CREATE TABLE borough_boundary (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,

	shape TEXT,
	change_comment TEXT,

	borough_id UUID CONSTRAINT borough__boundaries REFERENCES borough (id)
);

ALTER TABLE borough ADD active_boundary_id UUID CONSTRAINT active_boundary__ REFERENCES borough_boundary (id);

INSERT INTO borough_boundary (created, shape, borough_id)
SELECT COALESCE(incorporation, NOW()), bounds, id
FROM borough;

UPDATE borough SET active_boundary_id = (
	SELECT id
	FROM borough_boundary
	WHERE borough_id = borough.id
);

ALTER TABLE borough DROP COLUMN bounds;
