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

			() => StreetFiller.active.cached,
			item => ({
				fill: [0xd3, 0x45, 0x64, 0xff],
				stroke: [0x00, 0x00, 0x00, 0xff]
			})
		);
	}
}
