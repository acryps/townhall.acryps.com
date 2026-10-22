CREATE VIEW commodity_symbol_ticker AS
WITH rated AS (
	SELECT
		commodity_rating.commodity_id,
		commodity_rating.price,
		market_cycle.opened,
		ROW_NUMBER() OVER (
			PARTITION BY commodity_rating.commodity_id
			ORDER BY market_cycle.opened DESC
		) AS rank
	FROM commodity_rating
	INNER JOIN market_cycle ON market_cycle.id = commodity_rating.cycle_id
),
last_rating AS (
	SELECT commodity_id, price, opened
	FROM rated
	WHERE rank = 1
),
-- most recent rating that is at least a day older than the last one, so the ticker
-- moves relative to where the price was ~a day ago, not the immediately preceding cycle
-- (most cycles barely move the price, which would make the direction flicker meaninglessly)
previous_rating AS (
	SELECT DISTINCT ON (rated.commodity_id)
		rated.commodity_id,
		rated.price
	FROM rated
	INNER JOIN last_rating ON last_rating.commodity_id = rated.commodity_id
	WHERE rated.opened <= last_rating.opened - INTERVAL '1 day'
	ORDER BY rated.commodity_id, rated.opened DESC
)
SELECT
	commodity.id AS commodity_id,
	commodity.symbol AS symbol,
	last_rating.price AS price,
	CASE
		WHEN previous_rating.price IS NULL THEN NULL
		WHEN last_rating.price > previous_rating.price THEN 'up'
		WHEN last_rating.price < previous_rating.price THEN 'down'
	END AS direction
FROM commodity
	INNER JOIN last_rating ON last_rating.commodity_id = commodity.id
	LEFT JOIN previous_rating ON previous_rating.commodity_id = commodity.id
WHERE commodity.symbol IS NOT NULL
	AND last_rating.price IS NOT NULL;
