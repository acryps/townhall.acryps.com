CREATE TABLE resident_assessment_parameter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,

	prompt TEXT,
	low TEXT,
	high TEXT
);

CREATE TABLE resident_assessment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	assessed TIMESTAMP,

	resident_id UUID CONSTRAINT resident__assessments REFERENCES resident (id),
	parameter_id UUID CONSTRAINT parameter__assessments REFERENCES resident_assessment_parameter (id),

	value REAL,
	confidence REAL
);

ALTER TABLE resident ADD assessed TIMESTAMP;

CREATE VIEW resident_assessment_match AS
	SELECT
		source_resident.id AS source_resident_id,
		source_resident.tag AS source_resident_tag,
		source_resident.given_name AS source_resident_given_name,
		source_resident.family_name AS source_resident_family_name,

		target_resident.id AS target_resident_id,
		target_resident.tag AS target_resident_tag,
		target_resident.given_name AS target_resident_given_name,
		target_resident.family_name AS target_resident_family_name,

		COUNT(*)::INTEGER AS shared_parameters,
		SUM(SQRT(POWER(source_assessment.value - target_assessment.value, 2))) / COUNT(*) AS distance
	FROM resident_assessment source_assessment
		JOIN resident_assessment target_assessment
			ON source_assessment.parameter_id = target_assessment.parameter_id
			AND source_assessment.resident_id < target_assessment.resident_id
		INNER JOIN resident AS source_resident ON source_resident.id = source_assessment.resident_id
		INNER JOIN resident AS target_resident ON target_resident.id = target_assessment.resident_id
	GROUP BY source_resident.id, target_resident.id
	ORDER BY distance ASC;

CREATE OR REPLACE VIEW resident_assessment_parameter_distribution AS
WITH parameters AS (
	SELECT 0.1::NUMERIC AS step
),
bucket AS (
	SELECT
		series AS bucket_index,
		series * parameters.step as bucket_start,
		CASE
			WHEN (series + 1) * parameters.step > 1.0 THEN 1.0
			ELSE (series + 1) * parameters.step
		END AS bucket_end
	FROM parameters
	CROSS JOIN generate_series(
		0,
		ceil(1.0 / parameters.step)::INT - 1
	) as series
),
bucket_counts AS (
	SELECT
		assessment_parameter.id AS parameter_id,
		bucket.bucket_index,
		count(assessment.value) AS value_count
	FROM resident_assessment_parameter assessment_parameter
	CROSS JOIN bucket
	LEFT JOIN resident_assessment assessment
		ON assessment.parameter_id = assessment_parameter.id
		AND assessment.value IS NOT NULL
		AND (
			(assessment.value >= bucket.bucket_start and assessment.value < bucket.bucket_end)
			OR (bucket.bucket_end = 1.0 and assessment.value = 1.0)
		)
	GROUP BY assessment_parameter.id, bucket.bucket_index
),
assessment_counts AS (
	SELECT
		resident_assessment.parameter_id AS parameter_id,
		count(resident_assessment.value) AS assessment_count
	FROM resident_assessment
	WHERE resident_assessment.value IS NOT NULL
	GROUP BY resident_assessment.parameter_id
)
SELECT
	assessment_parameter.*,
	COALESCE(counts.assessment_count, 0)::INT AS assessment_count,
	COALESCE(
		(
			SELECT jsonb_agg(bucket_counts.value_count ORDER BY bucket_counts.bucket_index)
			FROM bucket_counts
			WHERE bucket_counts.parameter_id = assessment_parameter.id
		),
		'[]'::JSONB
	)::TEXT AS ranges
FROM resident_assessment_parameter assessment_parameter
	LEFT JOIN assessment_counts counts ON counts.parameter_id = assessment_parameter.id;
