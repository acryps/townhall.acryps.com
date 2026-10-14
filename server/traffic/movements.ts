import { DbContext } from "../managed/database";
import { TrafficConfiguration } from "./configuration";
import { PropertyPointResolver } from "./property-point";
import { resolveResidentProperties } from "./resident-properties";

export interface Movement {
	fromPropertyId: string;
	toPropertyId: string;
	weeklyTrips: number;
}

// turns residents, their tenancies, their work contracts and their friendships into a weighted list
// of weekly A->B trips: a commute each way to work (if employed), plus a visit each way to every
// active friendship (if the friend also has a home). residents without a current tenancy have no
// home to route from or to, so they're skipped entirely.
export async function buildMovements(database: DbContext, points: PropertyPointResolver): Promise<Movement[]> {
	const [{ residents, homePropertyByResident, workPropertyByResident }, relationships] = await Promise.all([
		resolveResidentProperties(database, points),
		database.residentRelationship.where(relationship => relationship.ended == null).toArray()
	]);

	const movementWeights = new Map<string, number>();

	const addMovement = (fromPropertyId: string, toPropertyId: string, weeklyTrips: number) => {
		if (!fromPropertyId || !toPropertyId || fromPropertyId == toPropertyId) {
			return;
		}

		const key = `${fromPropertyId}->${toPropertyId}`;
		movementWeights.set(key, (movementWeights.get(key) ?? 0) + weeklyTrips);
	};

	for (let resident of residents) {
		const home = homePropertyByResident.get(resident.id);

		if (!home) {
			continue;
		}

		const work = workPropertyByResident.get(resident.id);

		if (work) {
			addMovement(home, work, TrafficConfiguration.workTripsPerWeek);
			addMovement(work, home, TrafficConfiguration.workTripsPerWeek);
		}
	}

	// relationships are symmetric, and are only walked once here (not once per resident), so each
	// active friendship contributes exactly one round trip
	for (let relationship of relationships) {
		const homeA = homePropertyByResident.get(relationship.initiatorId);
		const homeB = homePropertyByResident.get(relationship.peerId);

		if (homeA && homeB) {
			addMovement(homeA, homeB, TrafficConfiguration.friendVisitTripsPerWeek);
			addMovement(homeB, homeA, TrafficConfiguration.friendVisitTripsPerWeek);
		}
	}

	const movements: Movement[] = [];

	for (let [key, weeklyTrips] of movementWeights) {
		const separatorIndex = key.indexOf('->');

		movements.push({
			fromPropertyId: key.slice(0, separatorIndex),
			toPropertyId: key.slice(separatorIndex + 2),
			weeklyTrips
		});
	}

	return movements;
}
