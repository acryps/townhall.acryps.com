ALTER TABLE train_route ADD code TEXT UNIQUE;
ALTER TABLE train_route ADD text_color TEXT;

ALTER TABLE train_route ADD description TEXT;
ALTER TABLE train_route ADD opened TIMESTAMP;
ALTER TABLE train_route ADD closed TIMESTAMP;

ALTER TABLE train_route ADD operator_id UUID CONSTRAINT operator__operated_train_routes REFERENCES legal_entity (id);

CREATE TABLE train_route_path (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	train_route_id UUID CONSTRAINT train_route__paths REFERENCES train_route (id),

	path TEXT,
	created TIMESTAMP
);

ALTER TABLE train_route ADD active_path_id UUID CONSTRAINT active_path__ REFERENCES train_route_path (id);

INSERT INTO train_route_path (id, train_route_id, path)
SELECT
	id,
	id,
	path,
	NOW()
FROM train_route;

UPDATE train_route SET active_path_id = id;

ALTER TABLE train_station ADD property_id UUID CONSTRAINT property__train_stations REFERENCES property (id);
ALTER TABLE train_stop ADD up_platform TEXT;
ALTER TABLE train_stop ADD down_platform TEXT;

ALTER TABLE train_stop ADD opened TIMESTAMP;
UPDATE train_stop SET opened = NOW();

ALTER TABLE train_stop ADD closed TIMESTAMP;

ALTER TABLE train_route DROP path;
DROP TABLE trian_station_exit;
ALTER TABLE train_stop DROP track_position;
ALTER TABLE train_stop DROP name;
