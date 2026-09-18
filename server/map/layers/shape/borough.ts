import { ShapeTileServer } from ".";
import { Point } from "../../../../interface/point";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class BoroughTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'borough',

			async () => {
				const boroughs = await database.borough
					.include(borough => borough.activeBoundary)
					.toArray();

				const shapes = [];

				for (let borough of boroughs) {
					const activeBoundary = await borough.activeBoundary.fetch();

					shapes.push({
						id: borough.id,
						stroke: borough.color ?? 'transparent',
						fill: (borough.color ?? '#000000') + '66',
						bounds: activeBoundary.shape,
						name: borough.name
					});
				}

				return shapes;
			}
		);
	}
}
