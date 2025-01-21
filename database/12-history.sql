CREATE OR REPLACE VIEW resident_event AS
	SELECT
		vote.id AS id,
		vote.submitted AS timestamp,
		'Voted ' || CASE WHEN vote.pro THEN 'Yes' ELSE 'No' END || ' in bill ' || bill.tag || ' for ' || bill.title AS action,
		vote.reason AS detail,
		vote.resident_id AS primary_resident_id,
		NULL AS secondary_resident_id
	FROM
		vote
		INNER JOIN bill ON vote.bill_id = bill.id

	UNION ALL

	SELECT
		resident_relationship.id AS id,
		resident_relationship.bonded AS timestamp,
		initiator.given_name || ' ' || initiator.family_name || ' connected with ' || peer.given_name || ' ' || peer.family_name AS action,
		resident_relationship.connection AS detail,
		resident_relationship.initiator_id AS primary_resident_id,
		resident_relationship.peer_id AS secondary_resident_id
	FROM
		resident_relationship
		INNER JOIN resident AS initiator ON resident_relationship.initiator_id = initiator.id
		LEFT JOIN resident AS peer ON resident_relationship.peer_id = peer.id;
