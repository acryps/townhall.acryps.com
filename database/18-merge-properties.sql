INSERT INTO property_type (name, color, code) VALUES ('Square', '#eeeeee', 'SQ');

INSERT INTO property (name, bounds, created, type_id)
SELECT
	name,
	bounds,
	NOW(),
	(SELECT id FROM property_type WHERE name = 'Square')
FROM square;

-- DROP TABLE square;
