import { writeFileSync } from "fs";
import { RailGraph } from "./graph";
import { SegmentStats, TrafficReport } from "./aggregate";
import { TrafficConfiguration } from "./configuration";

const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// renders the full rail network as Graphviz DOT source: every station the graph knows about as a
// node, every ride edge the graph knows about as an edge - not just the ones some movement
// actually got routed through, so routes (and stations) with no ridership still show up. ridership
// stats from the report are used purely as labels, defaulting to 0 where the report has nothing.
export function buildTrafficGraphviz(graph: RailGraph, report: TrafficReport): string {
	const lines: string[] = [
		'digraph traffic {',
		// node positions below are starting hints taken from each station's real map location, not
		// fixed placements - neato's force-directed layout still moves them to avoid overlaps and
		// route edges cleanly. render with e.g. `neato -Tsvg traffic.dot -o traffic.svg`
		'\tlayout=neato;',
		'\toverlap=false;',
		'\tsplines=true;',
		'\tnode [shape=box, fontname="Helvetica", style=filled, fillcolor="#ffffff"];',
		'\tedge [fontname="Helvetica", dir=none];'
	];

	// every ride edge in the graph, deduped per route+station pair (both directions collapse into
	// a single undirected line), independent of whether any movement was actually routed through it
	const segments = new Map<string, SegmentStats>();

	for (let edges of graph.adjacency.values()) {
		for (let edge of edges) {
			if (edge.kind != 'ride') {
				continue;
			}

			const stationPair = [edge.fromStationId, edge.toStationId].sort();
			const key = `${edge.routeId}:${stationPair[0]}:${stationPair[1]}`;

			if (!segments.has(key)) {
				segments.set(key, {
					routeId: edge.routeId,
					fromStationId: stationPair[0],
					toStationId: stationPair[1],
					weeklyTrips: report.segments.get(key)?.weeklyTrips ?? 0
				});
			}
		}
	}

	const maxWeeklyTrips = Math.max(1, ...[...segments.values()].map(segment => segment.weeklyTrips));

	for (let [stationId, station] of graph.stationsById) {
		const stats = report.stations.get(stationId);

		// escape only the dynamic name - the join separator below is a literal `\n`, which
		// graphviz renders as a line break inside a label, so it must not get escaped itself
		const label = [
			escape(station.name),
			`boarded: ${Math.round(stats?.boarded ?? 0)}`,
			`alighted: ${Math.round(stats?.alighted ?? 0)}`,
			`passed through: ${Math.round(stats?.passed ?? 0)}`,
			`transfers: ${Math.round(stats?.transfers ?? 0)}`
		].join('\\n');

		// graphviz points increase upwards, map positions increase downwards - flip y to match -
		// and scale down, since map distances are far larger than a comfortable node layout.
		// no trailing `!` - this is a starting hint for neato, not a fixed placement
		const pos = `, pos="${(station.position.x * TrafficConfiguration.graphvizPositionScale).toFixed(1)},${(-station.position.y * TrafficConfiguration.graphvizPositionScale).toFixed(1)}"`;

		lines.push(`\t"${stationId}" [label="${label}"${pos}];`);
	}

	for (let segment of segments.values()) {
		const routeName = graph.routeNamesById.get(segment.routeId) ?? segment.routeId;
		const routeColor = graph.routeColorsById.get(segment.routeId) ?? '#333333';

		// thickest line = busiest segment, scaled between 1 and 12
		const penwidth = 1 + 11 * (segment.weeklyTrips / maxWeeklyTrips);
		const label = `${routeName}: ${Math.round(segment.weeklyTrips)}/wk`;

		lines.push(`\t"${segment.fromStationId}" -> "${segment.toStationId}" [label="${escape(label)}", penwidth=${penwidth.toFixed(2)}, color="${escape(routeColor)}"];`);
	}

	lines.push('}');

	return lines.join('\n');
}

export function writeTrafficGraphviz(path: string, graph: RailGraph, report: TrafficReport) {
	writeFileSync(path, buildTrafficGraphviz(graph, report));
}
