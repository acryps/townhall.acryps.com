ALTER TABLE market_cycle
	ADD COLUMN outlook REAL,
	ADD COLUMN risk_appetite REAL,
	ADD COLUMN confidence REAL,
	ADD COLUMN uncertainty REAL,
	ADD COLUMN speculation REAL;

UPDATE market_cycle SET
	outlook = 0.5,
	risk_appetite = 0.5,
	confidence = 0.5,
	uncertainty = 0.5,
	speculation = 0.5;

ALTER TABLE market_cycle ADD context TEXT;
