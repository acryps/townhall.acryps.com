ALTER TABLE borough ADD tts_description TEXT;
ALTER TABLE borough ADD ai_summary TEXT;
ALTER TABLE borough ADD ai_description TEXT;
ALTER TABLE borough ADD description TEXT;

ALTER TABLE borough ADD tag TEXT UNIQUE;
UPDATE borough SET tag = REPLACE(LOWER(name), ' ', '-');

ALTER TABLE borough ADD banner TEXT;
ALTER TABLE borough ADD incorporation TIMESTAMP;
