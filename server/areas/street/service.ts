import { Service } from "vlserver";
import { DbContext, PlotBoundary, Street, StreetRoute } from "../../managed/database";
import { StreetViewModel } from "../street.view";
import { Point } from "../../../interface/point";
import { PlotBoundaryShapeModel } from "../property/plot";

export class StreetService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getStreet(id: string) {
		return new StreetViewModel(
			await this.database.street.find(id)
		);
	}

	async getPeerPlots(id: string) {
		const street = await this.database.street.find(id);
		const activeRoute = await street.activeRoute.fetch();
		const path = Point.unpack(activeRoute.path);
		const bounds = Point.bounds(path, street.size);

		const properties = await this.database.property
			.where(property => property.activePlotBoundaryId != null)
			.where(property => property.deactivated == null)
			.include(property => property.activePlotBoundary)
			.toArray();

		const peers: PlotBoundary[] = [];

		const topLeft = new Point(bounds.x.min, bounds.y.min);
		const size = new Point(bounds.width, bounds.height);

		for (let property of properties) {
			const plot = await property.activePlotBoundary.fetch();
			const shape = Point.unpack(plot.shape);

			if (Point.touches(topLeft, size, shape)) {
				peers.push(plot);
			}
		}

		return PlotBoundaryShapeModel.from(peers);
	}

	async createStreet(path: string) {
		const street = new Street();
		await street.create();

		const route = new StreetRoute();
		route.path = Point.pack(Point.unpack(path));
		route.created = new Date();
		route.street = street;

		await route.create();

		street.activeRoute = route;
		await street.update();

		return street.id;
	}

	async rename(id: string, name: string) {
		const street = await this.database.street.find(id);
		street.name = name;

		if (!street.tag) {
			let tag = name.toLowerCase().replace(/[^a-z]/g, '-');

			while (tag.includes('--')) {
				tag = tag.replace('--', '-');
			}

			let index = 0;
			street.tag = tag;

			while (await this.database.street.first(peer => street.tag == peer.tag.valueOf())) {
				index++;

				street.tag = `${tag}-${index}`;
			}
		}

		await street.update();
	}

	async setWidth(id: string, width: number) {
		const street = await this.database.street.find(id);
		street.size = width;

		await street.update();
	}

	async editRoute(id: string, path: string) {
		const street = await this.database.street.find(id);

		const route = new StreetRoute();
		route.path = Point.pack(Point.unpack(path));
		route.created = new Date();
		route.street = street;

		await route.create();

		street.activeRoute = route;
		await street.update();
	}

	async archive(id: string) {
		const street = await this.database.street.find(id);
		street.deactivated = new Date();

		await street.update();
	}
}
