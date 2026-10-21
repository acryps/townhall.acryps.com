import { DbContext } from "../managed/database";
import { Point } from "../../interface/point";
import { convertToLegalCompanyName } from "../../interface/company";
import { TrafficAnalysisSampleModel } from "../areas/train/analysis.view";
import { RailGraph, stationIdOfNode } from "./graph";
import { RouteFinder } from "./route-finder";
import { PropertyPointResolver } from "./property-point";
import { resolveResidentProperties } from "./resident-properties";

type Candidate = {
	residentId: string;
	homePropertyId: string;
	destinationPropertyId: string;
	purpose: (database: DbContext) => Promise<string>;
};

// picks a handful of individual residents making an actual trip (a commute to work, or a visit to
// a friend) and routes each of them through the rail graph, for the "analyze" page to show off real
// example journeys - as opposed to the aggregated, cityscale traffic report in aggregate.ts.
//
// takes the already-built graph/points resolver instead of building its own, so it rides along with
// the single worker-thread run that already builds them for the main traffic report (see
// traffic/index.ts) - the results are cached there, not recomputed on every page load.
export async function collectTrafficSamples(database: DbContext, graph: RailGraph, points: PropertyPointResolver, count: number): Promise<TrafficAnalysisSampleModel[]> {
	const finder = new RouteFinder(graph);

	const { residents, homePropertyByResident, workPropertyByResident, officeByResident } = await resolveResidentProperties(database, points);
	const residentsById = new Map(residents.map(resident => [resident.id, resident]));

	const relationships = await database.residentRelationship.where(relationship => relationship.ended == null).toArray();

	const candidates: Candidate[] = [];

	for (let resident of residents) {
		const home = homePropertyByResident.get(resident.id);
		const work = workPropertyByResident.get(resident.id);

		if (home && work) {
			candidates.push({
				residentId: resident.id,
				homePropertyId: home,
				destinationPropertyId: work,
				purpose: async database => {
					const office = await database.office.find(officeByResident.get(resident.id));
					const company = office ? await office.company.fetch() : null;

					return `work route to ${company ? convertToLegalCompanyName(company) : office?.name ?? 'work'}`;
				}
			});
		}
	}

	for (let relationship of relationships) {
		const homeInitiator = homePropertyByResident.get(relationship.initiatorId);
		const homePeer = homePropertyByResident.get(relationship.peerId);

		// family members (or any other relationship) sharing the same tenancy aren't a trip anywhere
		if (!homeInitiator || !homePeer || homeInitiator == homePeer) {
			continue;
		}

		const addVisit = (fromResidentId: string, fromHome: string, toResidentId: string, toHome: string) => candidates.push({
			residentId: fromResidentId,
			homePropertyId: fromHome,
			destinationPropertyId: toHome,
			purpose: async () => `visit to ${residentsById.get(toResidentId)?.givenName ?? 'a friend'}'s place`
		});

		addVisit(relationship.initiatorId, homeInitiator, relationship.peerId, homePeer);
		addVisit(relationship.peerId, homePeer, relationship.initiatorId, homeInitiator);
	}

	// shuffle so every page load shows a different slice of the city
	for (let index = candidates.length - 1; index > 0; index--) {
		const swap = Math.floor(Math.random() * (index + 1));

		[candidates[index], candidates[swap]] = [candidates[swap], candidates[index]];
	}

	const samples: TrafficAnalysisSampleModel[] = [];
	const usedResidentIds = new Set<string>();

	for (let candidate of candidates) {
		if (samples.length >= count) {
			break;
		}

		if (usedResidentIds.has(candidate.residentId)) {
			continue;
		}

		const fromPoint = await points.resolve(candidate.homePropertyId);
		const toPoint = await points.resolve(candidate.destinationPropertyId);

		if (!fromPoint || !toPoint) {
			continue;
		}

		const route = finder.findRoute(candidate.homePropertyId, fromPoint, candidate.destinationPropertyId, toPoint);

		if (!route) {
			continue;
		}

		const path: Point[] = [fromPoint];

		for (let edge of route.edges) {
			if (edge.kind == 'walk') {
				path.push(edge.to == 'destination' ? toPoint : graph.stationsById.get(stationIdOfNode(edge.to)).position);
			} else if (edge.kind == 'ride') {
				path.push(...edge.path);
			}
		}

		const resident = residentsById.get(candidate.residentId);

		usedResidentIds.add(candidate.residentId);

		const sample = new TrafficAnalysisSampleModel();
		sample.id = resident.id;
		sample.tag = resident.tag;
		sample.givenName = resident.givenName;
		sample.familyName = resident.familyName;
		sample.purpose = `${resident.givenName}'s ${await candidate.purpose(database)}`;
		sample.path = Point.pack(path);

		samples.push(sample);
	}

	return samples;
}
