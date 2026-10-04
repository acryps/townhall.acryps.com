-- tracks a commodit
-- add new fields when trackers expand
CREATE TABLE commodity_rating (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	cycle_id UUID CONSTRAINT cycle__commodity_ratings REFERENCES market_cycle (id),
	commodity_id UUID CONSTRAINT commodity__ratings REFERENCES commodity (id),

	retail_stock_size REAL,
	commercial_stock_size REAL,

	retail_demand REAL,
	commercial_demand REAL
);
