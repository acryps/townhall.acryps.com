import { FilledTileServer } from ".";
import { PackedPoint } from "../../../../interface/point";
import { Square, Street } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { StreetFiller } from "../../fill/street";
import { SquareFiller } from "../../fill/square";

type StreetOrSquare = Street | Square;

export class StreetTileServer extends FilledTileServer<StreetOrSquare> {
	constructor(
		app: ManagedServer
	) {
		// squares are drawn as part of the street layer, so it stays a single resource

		let sourceStreetMap: Map<PackedPoint, Street>;
		let sourceSquareMap: Map<PackedPoint, Square>;
		let mergedMap: Map<PackedPoint, StreetOrSquare>;

		const fetchFilled = () => {
			const streetMap = StreetFiller.active.cached.filled;
			const squareMap = SquareFiller.active.cached.filled;

			if (streetMap !== sourceStreetMap || squareMap !== sourceSquareMap) {
				sourceStreetMap = streetMap;
				sourceSquareMap = squareMap;

				mergedMap = new Map(streetMap);

				for (let [point, square] of squareMap) {
					mergedMap.set(point, square);
				}
			}

			return mergedMap;
		};

		super(
			app,
			'street',

			fetchFilled,
			() => StreetFiller.active.cached.boundaries,

			item => item instanceof Square ? ({
				fill: [0x8c, 0x8c, 0x8c, 0xff],
				stroke: [0x5c, 0x5c, 0x5c, 0xff]
			}) : ({
				fill: [0xbc, 0xbc, 0xbc, 0xff],
				stroke: [0x7c, 0x7c, 0x7c, 0xff]
			}),

			[0xbc, 0xbc, 0xbc, 0x88]
		);
	}
}
