import { FilledTileServer } from ".";
import { WaterBody } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { WaterBodyFiller } from "../../fill/water";

export class WaterBodyTileServer extends FilledTileServer<WaterBody> {
	constructor(
		app: ManagedServer
	) {
		super(
			app,
			'water-body',

			() => WaterBodyFiller.active.cached.filled,
			() => WaterBodyFiller.active.cached.boundaries,

			item => ({
				fill: [0x9b, 0x92, 0xf4, 0xff],
				stroke: [0x34, 0x25, 0xdb, 0xff]
			}),

			[0x9b, 0x92, 0xf4, 0x88]
		);
	}
}
