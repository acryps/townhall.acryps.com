import { FilledTileServer } from ".";
import { Street } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";
import { StreetFiller } from "../../fill/street";

export class StreetTileServer extends FilledTileServer<Street> {
	constructor(
		app: ManagedServer
	) {
		super(
			app,
			'street',

			() => StreetFiller.active.cached.filled,
			() => StreetFiller.active.cached.boundaries,

			item => ({
				fill: [0xbc, 0xbc, 0xbc, 0xff],
				stroke: [0x7c, 0x7c, 0x7c, 0x7c]
			}),

			[0xbc, 0xbc, 0xbc, 0x88]
		);
	}
}
