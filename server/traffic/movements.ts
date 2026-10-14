import { DbContext } from "../managed/database";
import { TrafficConfiguration } from "./configuration";
import { PropertyPointResolver } from "./property-point";

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
	const [residents, tenancies, workContracts, workOffers, offices, dwellings, relationships] = await Promise.all([
		database.resident.toArray(),
		database.tenancy.where(tenancy => tenancy.end == null).toArray(),
		database.workContract.where(contract => contract.canceled == null).toArray(),
		database.workOffer.toArray(),
		database.office.toArray(),
		database.dwelling.toArray(),
		database.residentRelationship.where(relationship => relationship.ended == null).toArray()
	]);

	const officesById = new Map(offices.map(office => [office.id, office]));
	const workOffersById = new Map(workOffers.map(offer => [offer.id, offer]));
	const dwellingsById = new Map(dwellings.map(dwelling => [dwelling.id, dwelling]));

	const tenanciesByResident = new Map<string, typeof tenancies>();

	for (let tenancy of tenancies) {
		if (!tenanciesByResident.has(tenancy.inhabitantId)) {
			tenanciesByResident.set(tenancy.inhabitantId, []);
		}

		tenanciesByResident.get(tenancy.inhabitantId).push(tenancy);
	}

	const workContractsByResident = new Map<string, typeof workContracts>();

	for (let contract of workContracts) {
		if (!workContractsByResident.has(contract.workerId)) {
			workContractsByResident.set(contract.workerId, []);
		}

		workContractsByResident.get(contract.workerId).push(contract);
	}

	const homePropertyByResident = new Map<string, string>();

	for (let resident of residents) {
		const candidates = tenanciesByResident.get(resident.id);

		if (!candidates?.length) {
			continue;
		}

		const chosen = candidates.find(tenancy => tenancy.id == resident.mainTenancyId) ?? candidates[0];
		const dwelling = dwellingsById.get(chosen.dwellingId);

		if (dwelling?.propertyId && await points.resolve(dwelling.propertyId)) {
			homePropertyByResident.set(resident.id, dwelling.propertyId);
		}
	}

	const workPropertyByResident = new Map<string, string>();

	for (let resident of residents) {
		const candidates = workContractsByResident.get(resident.id);

		if (!candidates?.length) {
			continue;
		}

		const offer = workOffersById.get(candidates[0].offerId);
		const office = offer ? officesById.get(offer.officeId) : null;

		if (office?.propertyId && await points.resolve(office.propertyId)) {
			workPropertyByResident.set(resident.id, office.propertyId);
		}
	}

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
