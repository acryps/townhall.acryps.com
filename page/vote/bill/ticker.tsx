import { Component } from "@acryps/page";
import { BillViewModel, VoteService, VoteTickerViewModel, VoteViewModel } from "../../managed/services";
import { tickerContra, tickerPending, tickerPro } from "./index.style";

export class VoteTickerComponent extends Component {
	iteration = 0;
	ticker: VoteTickerViewModel[];

	proImpression: VoteViewModel;
	contraImpression: VoteViewModel;

	constructor(
		private bill: BillViewModel
	) {
		super();
	}

	async onload() {
		try {
			const pro = ++this.iteration % 2;

			if (!this.bill.certified || this.iteration == 1) {
				this.ticker = await new VoteService().getTicker(this.bill.id);
			}

			if (pro) {
				this.proImpression = await new VoteService().getImpression(this.bill.id, true);
			}

			if (!pro || this.iteration == 1) {
				this.contraImpression = await new VoteService().getImpression(this.bill.id, false);
			}
		} catch {}

		setTimeout(() => {
			if (this.loaded) {
				this.reload();
			}
		}, 5000);
	}

	render() {
		const pending = this.ticker.filter(vote => !vote.submitted).length;

		const pro = this.ticker.filter(vote => vote.pro && vote.submitted).length;
		const contra = this.ticker.filter(vote => !vote.pro && vote.submitted).length;

		return <ui-ticker>
			<ui-container>
				{this.renderImpression(true)}

				<ui-count>
					{contra}
				</ui-count>
			</ui-container>

			<ui-bar style={[tickerPending.provide(pending), tickerPro.provide(pro), tickerContra.provide(contra)].join(';')}>
				<ui-pro />
				<ui-contra />
			</ui-bar>

			<ui-container>
				<ui-count>
					{pro}
				</ui-count>

				{this.renderImpression(false)}
			</ui-container>
		</ui-ticker>;
	}

	renderImpression(pro: boolean) {
		const impression = pro ? this.proImpression : this.contraImpression;

		if (!impression) {
			return <ui-void></ui-void>;
		}

		return <ui-impression ui-type={pro ? 'pro' : 'contra'}>
			<ui-reason>
				{impression.reason}
			</ui-reason>
		</ui-impression>;
	}
}
