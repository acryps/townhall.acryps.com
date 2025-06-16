import { Service } from "vlserver";
import { DbContext, Plan, PlanShape } from "../../managed/database";
import { PlanViewModel } from "./plan";
import { Point } from "../../../interface/point";

export class PlanService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async list() {
		return PlanViewModel.from(
			this.database.plan
				.orderByDescending(plan => plan.updated)
		);
	}

	async getPlan(tag: string) {
		return new PlanViewModel(
			await this.database.plan
				.first(plan => plan.tag.valueOf() == tag)
		);
	}

	async create(name: string, description: string, authorId: string) {
		const plan = new Plan();
		plan.created = new Date();
		plan.name = name;
		plan.description = description;
		plan.authorId = authorId;

		const flattenTag = (input: string, index = 0) => {
			if (index) {
				input += `-${index}`;
			}

			input = input.toLowerCase().replace(/[^a-z0-9]/g, '-');

			while (input.includes('--')) {
				input = input.replace('--', '-');
			}

			return input;
		}

		let index = 0;

		do {
			plan.tag = flattenTag(name, index);

			index++;
		} while (await this.database.plan.where(peer => peer.tag.valueOf() == plan.tag).count())

		await plan.create();

		return plan.tag;
	}

	async save(id: string, name: string, description: string) {
		const plan = await this.database.plan.find(id);
		plan.updated = new Date();
		plan.name = name;
		plan.description = description;

		await plan.update();
	}

	async setAuthor(id: string, authorId: string) {
		const plan = await this.database.plan.find(id);
		plan.authorId = authorId;
		plan.updated = new Date();

		await plan.update();
	}

	async addShape(tag: string, path: string) {
		const plan = await this.database.plan.first(plan => plan.tag.valueOf() == tag);

		const shape = new PlanShape();
		shape.path = Point.pack(Point.unpack(path));
		shape.created = new Date();
		shape.stroke = '#000';
		shape.fill = '#fff';
		shape.plan = plan;

		await shape.create();

		plan.updated = new Date();
		plan.update();
	}

	async saveShape(id: string, label: string, stroke: string, fill: string, close: boolean) {
		const shape = await this.database.planShape.find(id);
		shape.label = label;
		shape.stroke = stroke;
		shape.fill = fill;
		shape.closed = close;

		await shape.update();

		const plan = await shape.plan.fetch();
		plan.updated = new Date();
		plan.update();
	}

	async archiveShape(id: string) {
		const shape = await this.database.planShape.find(id);
		shape.archived = new Date();

		await shape.update();
	}

	async unarchiveShape(id: string) {
		const shape = await this.database.planShape.find(id);
		shape.archived = null;

		await shape.update();
	}
}
