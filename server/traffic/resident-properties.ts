import { DbContext, Resident } from "../managed/database";
import { PropertyPointResolver } from "./property-point";

export interface ResidentProperties {
	residents: Resident[];
	homePropertyByResident: Map<string, string>;
	workPropertyByResident: Map<string, string>;
	officeByResident: Map<string, string>;
}

// resolves, per resident, their home property (from their main or first active tenancy) and their
// workplace property + office (from their first active work contract) - shared between the weekly
// movement model and the residential graphviz overlay, so both agree on who lives/works where.
export async function resolveResidentProperties(database: DbContext, points: PropertyPointResolver): Promise<ResidentProperties> {
	const [residents, tenancies, workContracts, workOffers, offices, dwellings] = await Promise.all([
		database.resident.toArray(),
		database.tenancy.where(tenancy => tenancy.end == null).toArray(),
		database.workContract.where(contract => contract.canceled == null).toArray(),
		database.workOffer.toArray(),
		database.office.toArray(),
		database.dwelling.toArray()
	]);

	const workOffersById = new Map(workOffers.map(offer => [offer.id, offer]));
	const officesById = new Map(offices.map(office => [office.id, office]));
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
	const officeByResident = new Map<string, string>();

	for (let resident of residents) {
		const candidates = workContractsByResident.get(resident.id);

		if (!candidates?.length) {
			continue;
		}

		const offer = workOffersById.get(candidates[0].offerId);
		const office = offer ? officesById.get(offer.officeId) : null;

		if (office?.propertyId && await points.resolve(office.propertyId)) {
			workPropertyByResident.set(resident.id, office.propertyId);
			officeByResident.set(resident.id, office.id);
		}
	}

	return { residents, homePropertyByResident, workPropertyByResident, officeByResident };
}
