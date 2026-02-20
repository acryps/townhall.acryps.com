import { Component } from "@acryps/page";
import { CommoditySummaryModel, LiveCommodityTickerResponseModel, MarketService } from "../managed/services";
import { marketIcon } from "../assets/icons/managed";
import { CommodityTickerComponent } from "./ticker";

export class MarketPage extends Component {
	commodities: CommoditySummaryModel[];

	tickers: CommodityTickerComponent[];

	search: HTMLInputElement;

	sorters = [
		new Sorter('Name', (a, b) => 0), // name is always applied first
		new Sorter('Demand', (a, b) => (b.ticker?.askVolume ?? 0) - (a.ticker?.askVolume ?? 0)),
		new Sorter('Supply', (a, b) => (b.ticker?.bidVolume ?? 0) - (a.ticker?.bidVolume ?? 0)),
		new Sorter('Spread', (a, b) => Math.abs((b.ticker?.askVolume ?? 0) - (b.ticker?.bidVolume ?? 0)) - Math.abs((a.ticker?.askVolume ?? 0) - (a.ticker?.bidVolume ?? 0))),
	];

	activeSorterStorageKey = 'market-sort';
	activeSorter: Sorter;

	async onload() {
		this.commodities = await new MarketService().getCommodities();

		this.tickers = this.commodities.map(commodity => new CommodityTickerComponent(commodity))
		await this.updateTicker();

		const storedSorter = localStorage.getItem(this.activeSorterStorageKey);

		if (storedSorter) {
			this.activeSorter = this.sorters.find(sorter => sorter.name == storedSorter);
		}

		if (!this.activeSorter) {
			this.activeSorter = this.sorters[1];
		}

		this.activeSorter.apply(this.tickers);

		requestAnimationFrame(() => this.updateTicker());
	}

	async updateTicker() {
		const update = await new MarketService().getTickers();

		for (let ticker of update) {
			const component = this.tickers.find(component => component.commodity.id == ticker.commodityId);

			component?.tick(ticker);
		}

		if (document.contains(this.rootNode)) {
			setTimeout(() => this.updateTicker(), 5000);
		}
	}

	updateSearch() {
		const normalise = (name: string) => name.toLowerCase().replace(/[^0-9a-z]/g, '');
		const query = normalise(this.search.value);

		if (!query) {
			for (let ticker of this.tickers) {
				ticker.show();
			}
		}

		for (let ticker of this.tickers) {
			if (normalise(ticker.commodity.name).includes(query)) {
				ticker.show();
			} else {
				ticker.hide();
			}
		}
	}

	render() {
		this.search = <input
			type='search'
			placeholder='Search...'
			value={this.search?.value ?? ''}
		/>;

		requestAnimationFrame(() => {
			this.updateSearch();

			this.search.onkeyup = () => this.updateSearch();
		})

		return <ui-market>
			<ui-header ui-href='/law-house'>
				{marketIcon()} Market
			</ui-header>

			<ui-title>
				Market
			</ui-title>

			<ui-description>
				Watch how the market develops based on demand and supply, new innovations emerge and shifts in public perception shape markets.
			</ui-description>

			<ui-search>
				{this.search}
			</ui-search>

			<ui-sort>
				{this.sorters.map(sorter => <ui-sorter ui-active={this.activeSorter == sorter} ui-click={() => {
					sorter.apply(this.tickers);

					this.activeSorter = sorter;
					localStorage.setItem(this.activeSorterStorageKey, sorter.name);

					this.update();
				}}>
					{sorter.name}
				</ui-sorter>)}
			</ui-sort>

			<ui-commodities>
				{this.tickers}
			</ui-commodities>
		</ui-market>
	}
}

class Sorter {
	constructor(
		public name: string,
		public rank: (a: CommodityTickerComponent, b: CommodityTickerComponent) => number
	) {}

	apply(tickers: CommodityTickerComponent[]) {
		// sort by name as base
		tickers.sort((a, b) => a.commodity.name.localeCompare(b.commodity.name));

		tickers.sort((a, b) => this.rank(a, b));
	}
}
