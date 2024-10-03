CREATE TYPE company_type AS ENUM ('company', 'government-company');
ALTER TABLE company ADD created TIMESTAMP;
