import { DbContext } from "../managed/database";
import { TrafficConfiguration } from "./configuration";
import { PropertyPointResolver } from "./property-point";
import { resolveResidentProperties } from "./resident-properties";

export type MovementKind = 'work' | 'visit';

export interface Movement {
	fromPropertyId: string;
	toPropertyId: string;
	weeklyTrips: number;
	kind: MovementKind;
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

	const movements = new Map<string, Movement>();

	const addMovement = (fromPropertyId: string, toPropertyId: string, kind: MovementKind, weeklyTrips: number) => {
		if (!fromPropertyId || !toPropertyId || fromPropertyId == toPropertyId) {
			return;
		}

		const key = `${fromPropertyId}->${toPropertyId}:${kind}`;
		const existing = movements.get(key);

		if (existing) {
			existing.weeklyTrips += weeklyTrips;
		} else {
			movements.set(key, { fromPropertyId, toPropertyId, kind, weeklyTrips });
		}
	};

	for (let resident of residents) {
		const home = homePropertyByResident.get(resident.id);

		if (!home) {
			continue;
		}

		const work = workPropertyByResident.get(resident.id);

		if (work) {
			addMovement(home, work, 'work', TrafficConfiguration.workTripsPerWeek);
			addMovement(work, home, 'work', TrafficConfiguration.workTripsPerWeek);
		}
	}

	// relationships are symmetric, and are only walked once here (not once per resident), so each
	// active friendship contributes exactly one round trip
	for (let relationship of relationships) {
		const homeA = homePropertyByResident.get(relationship.initiatorId);
		const homeB = homePropertyByResident.get(relationship.peerId);

		if (homeA && homeB) {
			addMovement(homeA, homeB, 'visit', TrafficConfiguration.friendVisitTripsPerWeek);
			addMovement(homeB, homeA, 'visit', TrafficConfiguration.friendVisitTripsPerWeek);
		}
	}

	return [...movements.values()];
}
