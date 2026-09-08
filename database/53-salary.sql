-- base offering
-- salary will change over time
ALTER TABLE work_offer ADD daily_salary REAL;

-- fixed (used for calculations)
ALTER TABLE work_contract ADD daily_salary REAL;
