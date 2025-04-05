ALTER TABLE publication ADD company_id UUID CONSTRAINT company__ REFERENCES company (id);
ALTER TABLE company ADD banner TEXT;

ALTER TABLE publication DROP main_office_id;
ALTER TABLE publication DROP legal_name;
ALTER TABLE publication DROP banner;
