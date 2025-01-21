import { Service } from "vlserver";
import { Bill, DbContext } from "../../managed/database";
import { DistrictViewModel } from "./district";
import { OpenHonestiumViewModel } from "./honestium";
import { BillViewModel } from "./bill";
import { VoteTickerViewModel, VoteViewModel } from "./vote";

export class VoteService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async propse(title: string, description: string, scopeId: string) {
		const scope = await this.database.district.find(scopeId);

		const bill = new Bill();
		bill.created = new Date();
		bill.tag = `${scope.billPrefix}-${(await scope.bills.count()) + 1}`;

		bill.title = title;
		bill.description = description;
		bill.scope = scope;

		await bill.create();
	}

	getScopes() {
		return DistrictViewModel.from(this.database.district.orderByAscending(district => district.name));
	}

	getBills() {
		return BillViewModel.from(this.database.bill.orderByAscending(bill => bill.tag));
	}

	async getBill(tag: string) {
		return new BillViewModel(await this.database.bill.first(bill => bill.tag.valueOf() == tag));
	}

	getTicker(id: string) {
		return VoteTickerViewModel.from(this.database.vote.where(vote => vote.billId == id));
	}

	async getImpression(id: string, pro: boolean) {
		const query = () => this.database.vote.where(vote => vote.billId == id && vote.pro == pro);
		const length = await query().count();

		return new VoteViewModel(await query().skip(Math.floor(length * Math.random())).first());
	}

	async getOpenHonestium() {
		return new OpenHonestiumViewModel(
			await this.database.billHonestium
				.orderByAscending(honestium => honestium.id)
				.first(honestium => honestium.answered == null)
		);
	}

	async saveHonestium(id: string, answer: string) {
		const honestium = await this.database.billHonestium.find(id);

		if (honestium.answered) {
			throw new Error('Honestium already answered');
		}

		honestium.answer = answer;

		await honestium.update();
	}

	async submitHonestium(id: string) {
		const honestium = await this.database.billHonestium.find(id);

		if (honestium.answered) {
			throw new Error('Honestium already answered');
		}

		honestium.answered = new Date();

		await honestium.update();
	}
}
