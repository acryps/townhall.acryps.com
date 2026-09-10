CREATE INDEX CONCURRENTLY idx_movements_player_time
ON movement (player_id, time DESC);

CREATE OR REPLACE VIEW player_position AS
SELECT
	player.id,
	player.username,
	movement.x,
	movement.y,
	movement.time
	FROM player
	LEFT JOIN LATERAL (
	SELECT
		movement.x,
		movement.y,
		movement.time
	FROM movement
	WHERE movement.player_id = player.id
	ORDER BY movement.time DESC
	LIMIT 1
) AS movement ON true
WHERE movement.time IS NOT NULL;

ALTER TABLE player ADD head BYTEA;
