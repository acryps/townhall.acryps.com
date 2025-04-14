CREATE TABLE street_route (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created TIMESTAMP,

	path TEXT,
	change_comment TEXT,

	street_id UUID CONSTRAINT street__routes REFERENCES street (id)
);

ALTER TABLE street ADD deactivated TIMESTAMP;
ALTER TABLE street ADD active_route_id UUID CONSTRAINT active_route__ REFERENCES street_route (id);
ALTER TABLE street ADD tag TEXT UNIQUE;

INSERT INTO street_route (created, path, street_id)
SELECT NOW(), path, id
FROM street;

UPDATE street SET active_route_id = (
	SELECT id
	FROM street_route
	WHERE street_id = street.id
);
