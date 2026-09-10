import { Service } from "vlserver";
import { DbContext, Square, SquareBoundary } from "../../managed/database";
import { Point } from "../../../interface/point";
import { SquareViewModel } from "../square.view";

export class SquareService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getSquare(tag: string) {
		return new SquareViewModel(
			await this.database.square.first(square => square.tag.valueOf() == tag)
		);
	}

	async createSquare(shape: string, name: string) {
		const square = new Square();
		square.name = name;

		square.tag = name.toLowerCase().replace(/[^0-9a-z]/g, '-');

		while (square.tag.includes('--')) {
			square.tag = square.tag.replace('--', '-');
		}

		const tag = square.tag;
		let index = 1;

		while (await this.database.square.first(peer => peer.tag.valueOf() == square.tag)) {
			square.tag = `${tag}-${index}`;

			index++;
		}

		await square.create();

		const boundary = new SquareBoundary();
		boundary.shape = Point.pack(Point.unpack(shape));
		boundary.created = new Date();
		boundary.square = square;

		await boundary.create();

		square.activeBoundary = boundary;
		await square.update();

		return square.tag;
	}

	async rename(id: string, name: string) {
		const square = await this.database.square.find(id);
		square.name = name;

		await square.update();
	}

	async editBoundary(id: string, shape: string) {
		const square = await this.database.square.find(id);

		const boundary = new SquareBoundary();
		boundary.shape = Point.pack(Point.unpack(shape));
		boundary.created = new Date();
		boundary.square = square;

		await boundary.create();

		square.activeBoundary = boundary;
		await square.update();
	}

	async archive(id: string) {
		const square = await this.database.square.find(id);
		square.deactivated = new Date();

		await square.update();
	}
}
