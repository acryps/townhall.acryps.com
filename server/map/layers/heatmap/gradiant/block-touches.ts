import { DensityHeatmapTileServer } from "../density";
import { Point } from "../../../../../interface/point";
import { BlockTouchesView, DbContext, Movement, Valuation } from "../../../../managed/database";
import { ManagedServer } from "../../../../managed/server";
import { GradiantHeatmapTileServer } from ".";
import { Logger } from "@acryps/log";

export class BlockTouchesTileServer extends GradiantHeatmapTileServer<BlockTouchesView> {
	values: BlockTouchesView[] = [];

	static readonly range = 1000;

	logger = new Logger('block-touches');

	constructor(
		app: ManagedServer,
		private database: DbContext
	) {
		super(
			app,
			`block-touches`,

			1000,
			10,

			BlockTouchesTileServer.range,

			(topLeft: Point, size: number) => {
				this.logger.log(`load ${topLeft} @ ${size}`);

				return this.values
					.filter(value => value.x >= topLeft.x && value.x <= topLeft.x + size)
					.filter(value => value.y >= topLeft.y && value.y <= topLeft.y + size);
			},

			(target, values, range) => {
				const pixel = this.values.find(pixel => pixel.x == target.x && pixel.y == target.y);

				return pixel?.touches ?? 0;
			}
		);

		this.update();
	}

	// updates only once, updates not constantly necessary
	async update() {
		const smallestPixelDifference = Math.floor(BlockTouchesTileServer.range / 0xff);

		this.logger.log(`load values`);

		this.values = await this.database.views.blockTouches
			.where(block => block.touches.valueOf() >= smallestPixelDifference)
			.toArray();

		this.logger.log(`indexed ${this.values.length} block touches > ${smallestPixelDifference}`);
	}
}
