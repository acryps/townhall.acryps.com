CREATE TABLE commodity_icon (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag TEXT,

	icon BYTEA
);

ALTER TABLE commodity ADD icon_id UUID CONSTRAINT icon__ REFERENCES commodity_icon (id);
