import { ShapeTileServer } from ".";
import { Shape } from "../../../../interface/shape";
import { DbContext } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class PlanTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		super(
			app,
			'plan/:tag',

			async (parameters) => {
				const plan = await database.plan
					.include(plan => plan.shapes)
					.first(plan => plan.tag.valueOf() == parameters.tag);

				const shapes = [];

				for (let shape of await plan.shapes.toArray()) {
					if (!shape.archived) {
						shapes.push({
							fill: shape.fill,
							stroke: shape.stroke,
							bounds: shape.path,
							open: !shape.closed,
							name: shape.label
						});
					}
				}

				return shapes;
			}
		);
	}
}
