CREATE TABLE water_body_area (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,
	archived TIMESTAMP,

	shape TEXT,

	water_body_id UUID CONSTRAINT water_body__areas REFERENCES water_body (id)
);

ALTER TABLE water_body DROP name_path;

INSERT INTO water_body_area (created, shape, water_body_id)
SELECT
	NOW(),
	bounds,
	id
FROM water_body;

ALTER TABLE water_body DROP bounds;

ALTER TABLE water_body ADD tag TEXT UNIQUE;
UPDATE water_body SET tag = LOWER(REPLACE(' ', '-', name));
