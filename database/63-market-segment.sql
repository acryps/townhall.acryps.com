-- splits the market into independently run segments (eg. steel, apples, furniture)
-- each segment is run separately on every market cycle: it reads its commodities' prices,
-- the recent news and its own running context, then decides on price movements
CREATE TABLE market_segment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT UNIQUE,

	name TEXT,
	description TEXT,

	-- the segment's own running memory, carried forward and rewritten every cycle
	-- any reasoning behind price movements belongs here, not on the rating
	context TEXT
);

ALTER TABLE commodity_category ADD segment_id UUID CONSTRAINT segment__commodity_categories REFERENCES market_segment (id);

-- one row per segment per market cycle run
CREATE TABLE market_segment_cycle (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	segment_id UUID CONSTRAINT segment__cycles REFERENCES market_segment (id),
	cycle_id UUID CONSTRAINT cycle__segment_cycles REFERENCES market_cycle (id),

	opened TIMESTAMP,
	closed TIMESTAMP,

	-- context snapshot produced by this run, becomes market_segment.context once closed
	context TEXT,

	-- three sentence summary of the current state / movements
	summary TEXT
);

-- price set by the owning segment, alongside the existing stock/demand metrics
ALTER TABLE commodity_rating ADD price REAL;
