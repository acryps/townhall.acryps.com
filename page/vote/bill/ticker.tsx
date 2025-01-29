import { Component } from "@acryps/page";
import { BillViewModel, VoteService, VoteTickerViewModel, VoteViewModel } from "../../managed/services";
import { tickerContra, tickerPending, tickerPro } from "./index.style";

export class VoteTickerComponent extends Component {
	ticker: VoteTickerViewModel[];

	proImpression: VoteViewModel;
	contraImpression: VoteViewModel;

	constructor(
		private bill: BillViewModel
	) {
		super();
	}

	async onload() {
		const updateCount = async () => {
			this.ticker = await new VoteService().getTicker(this.bill.id);
			this.update();

			// as fast as possible!
			if (!this.bill.certified && this.loaded) {
				setTimeout(() => updateCount(), 100);
			}
		};

		let pro = false;

		const nextReason = async () => {
			if (pro) {
				this.proImpression = await new VoteService().getImpression(this.bill.id, true);

				pro = false;
			} else {
				this.contraImpression = await new VoteService().getImpression(this.bill.id, false);

				pro = true;
			}

			this.update();
		}

		const reasonUpdater = setInterval(() => {
			if (!this.loaded) {
				clearTimeout(reasonUpdater);
			}

			nextReason();
		}, 2500);

		await updateCount();

		await nextReason();
		await nextReason();
	}

	render() {
		const pending = this.ticker.filter(vote => !vote.submitted).length;

		const pro = this.ticker.filter(vote => vote.pro && vote.submitted).length;
		const contra = this.ticker.filter(vote => !vote.pro && vote.submitted).length;

		return <ui-ticker>
			<ui-count ui-contra>
				{contra}
			</ui-count>

			<ui-bar style={[tickerPending.provide(pending), tickerPro.provide(pro), tickerContra.provide(contra)].join(';')}>
				<ui-pro />
				<ui-contra />
			</ui-bar>

			<ui-count ui-pro>
				{pro}
			</ui-count>

			<ui-reasons>
				{this.renderReason(true)}
				{this.renderReason(false)}
			</ui-reasons>
		</ui-ticker>;
	}

	renderReason(pro: boolean) {
		const impression = pro ? this.proImpression : this.contraImpression;

		if (!impression) {
			return <ui-void></ui-void>;
		}

		return <ui-reason>
			{impression.reason}
		</ui-reason>;
	}
}
