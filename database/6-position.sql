ALTER TABLE player ADD x REAL;
ALTER TABLE player ADD y REAL;
ALTER TABLE player ADD online BOOLEAN;

ALTER TABLE player ADD game_uuid TEXT;

CREATE TABLE movement (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	
	time TIMESTAMP,
	
	x REAL,
	y REAL,
	
	player_id UUID CONSTRAINT player__movements REFERENCES player (id)
);
