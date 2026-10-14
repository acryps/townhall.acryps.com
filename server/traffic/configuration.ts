// Tunable constants for the traffic analysis. All times are in seconds, all distances are in the
// map's position units (the same units as a property's plot boundary shape). Change the numbers
// below to tune the model - nothing else in the analysis needs to change.
export const TrafficConfiguration = {
	// how fast a resident walks when not on a train
	walkingSpeedUnitsPerSecond: 1.1,

	// upper-bound train speed used only as the A* heuristic in route-finder.ts, calculated from the
	// fastest train route class before the analysis starts routing anything (see traffic/index.ts)
	heuristicTrainSpeedUnitsPerSecond: null,

	// extra time penalty for switching from one train service to another at a station
	transferTimeSeconds: 180,

	// one-way trips per week between home and work, in each direction (5 = commuting 5 days a week)
	workTripsPerWeek: 5,

	// one-way trips per week between home and a friend's home, in each direction, per active friendship
	friendVisitTripsPerWeek: 0.5,

	// graphviz points per map position unit, used only for the suggested node placement in
	// traffic.dot - map distances are far larger than a comfortable node layout, so this shrinks
	// them down while keeping stations in the same relative geographic arrangement
	graphvizPositionScale: 50,

	// diameter of the home/office overlay dots in traffic.dot, in map position units - scaled into
	// graphviz inches by graphvizPositionScale the same way node positions are, so the dots stay in
	// proportion to the station layout if that scale changes
	graphvizHomeNodeDiameter: 0.01,
	graphvizOfficeNodeDiameter: 0.01
};
