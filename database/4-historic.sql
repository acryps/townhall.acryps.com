CREATE TABLE historic_listing_grade (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    grade INT,
	name TEXT,

    description TEXT
);

INSERT INTO historic_listing_grade (grade, name, description) VALUES (1, 'Very Significant', 'This item is one of the most historically significant. It is essential to the cities history. The city would have developed entirely differently, if this item were not to exist');
INSERT INTO historic_listing_grade (grade, name, description) VALUES (2, 'Significant', 'This item is important to the history of city, but it did not impact the development of the city significantly.');
INSERT INTO historic_listing_grade (grade, name, description) VALUES (3, 'Important', 'This item is important to the city, but did not impact the development of the city.');

CREATE TABLE historic_listing_modifier (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	short_name TEXT,
	name TEXT,

	description TEXT
);

INSERT INTO historic_listing_modifier (short_name, name, description) VALUES ('L', 'Location', 'The items location may not be changed, thus it cannot be moved.');
INSERT INTO historic_listing_modifier (short_name, name, description) VALUES ('V', 'Vincinity', 'The items location is important to its history, but it may be moved by a few blocks, if absolutely necessary.');

INSERT INTO historic_listing_modifier (short_name, name, description) VALUES ('P', 'Practical Use', 'This building is used (practical), thus minor changes can be performed, as long as they do not change the buildings overall appearance.');

ALTER TABLE property ADD historic_listing_grade_id UUID CONSTRAINT historic_listing_grade__listed_properties REFERENCES historic_listing_grade (id);

CREATE TABLE property_historic_listing_modifier (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	property_id UUID CONSTRAINT property__historic_listing_modifiers REFERENCES property (id),
	historic_listing_modifier_id UUID CONSTRAINT historic_listing_modifier__listed_properties REFERENCES historic_listing_modifier (id)
);

ALTER TABLE property ADD historic_listing_registered_at DATE;