import { Service } from "vlserver";
import { DbContext, WaterBody, WaterBodyArea } from "../../managed/database";
import { Point } from "../../../interface/point";
import { WaterBodyViewModel } from "../water-body.view";

export class WaterBodyService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getWaterBody(tag: string) {
		return new WaterBodyViewModel(
			await this.database.waterBody.first(water => water.tag.valueOf() == tag)
		);
	}

	async createWaterBody(shape: string, name: string) {
		const water = new WaterBody();
		water.name = name;

		water.tag = name.toLowerCase().replace(/[^0-9a-z]/g, '-');

		while (water.tag.includes('--')) {
			water.tag = water.tag.replace('--', '-');
		}

		const tag = water.tag;
		let index = 1;

		while (await this.database.waterBody.first(peer => peer.tag.valueOf() == water.tag)) {
			water.tag = `${tag}-${index}`;

			index++;
		}

		await water.create();

		const area = new WaterBodyArea();
		area.shape = Point.pack(Point.unpack(shape));
		area.waterBody = water;

		await area.create();

		return water.tag;
	}

	async rename(id: string, name: string) {
		const waterBody = await this.database.waterBody.find(id);
		waterBody.name = name;

		await waterBody.update();
	}

	async archive(id: string) {
		const area = await this.database.waterBodyArea.find(id);
		area.archived = new Date();

		await area.update();
	}

	async unarchive(id: string) {
		const area = await this.database.waterBodyArea.find(id);
		area.archived = null;

		await area.update();
	}
}
