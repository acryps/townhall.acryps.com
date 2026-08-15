import { Component } from "@acryps/page";
import { CommoditySummaryModel, LiveCommodityTickerResponseModel, MarketCycleViewModel, MarketService } from "../managed/services";
import { marketIcon } from "../assets/icons/managed";
import { CommodityTickerComponent } from "./ticker";
import { MarketSymbolsComponent } from "./symbols";
import { Time } from "../../interface/time";

export class MarketPage extends Component {
	commodities: CommoditySummaryModel[];

	tickers: CommodityTickerComponent[];

	cycle: MarketCycleViewModel;

	search: HTMLInputElement;

	symbols = new MarketSymbolsComponent(this);

	sorters = [
		new Sorter('Name', (a, b) => 0), // name is always applied first
		new Sorter('Stock Size', (a, b) => (b.ticker?.estimatedStockSize ?? 0) - (a.ticker?.estimatedStockSize ?? 0)),
		new Sorter('Demand', (a, b) => (b.ticker?.estimatedDemandTarget ?? 0) - (a.ticker?.estimatedDemandTarget ?? 0)),
		new Sorter('Spread', (a, b) => {
			if (!a.ticker?.estimatedDemandTarget || !b.ticker?.estimatedDemandTarget) {
				return -Infinity;
			}

			if (!a.ticker?.estimatedStockSize || !b.ticker?.estimatedStockSize) {
				return -Infinity;
			}

			const spreadA = Math.abs(a.ticker?.estimatedStockSize / a.ticker?.estimatedDemandTarget);
			const spreadB = Math.abs(b.ticker?.estimatedStockSize / b.ticker?.estimatedDemandTarget);

			return spreadA > spreadB ? 1 : -1;
		}),
	];

	activeSorterStorageKey = 'market-sort';
	activeSorter: Sorter;

	async onload() {
		this.cycle = await new MarketService().getCycle();
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

		this.symbols.updateTicker(update);

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

	render(child) {
		if (child) {
			return <ui-market>
				<ui-header ui-href='/market'>
					{marketIcon()} Market
				</ui-header>

				{this.symbols}

				{child}
			</ui-market>
		}

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
			<ui-header ui-href='/market'>
				{marketIcon()} Market
			</ui-header>

			{this.symbols}

			<ui-title>
				Market
			</ui-title>

			<ui-cycle>
				<ui-state>
					{this.cycle.closed ? 'Closed' : 'Open'}
				</ui-state>

				<ui-detail>
					<ui-identifier>
						Cycle #{this.cycle.id.split('-')[0]}
					</ui-identifier>

					<ui-opened>
						Opened {new Time(this.cycle.opened).toString()}
					</ui-opened>

					{this.cycle.closed && <ui-closed>
						Opened {new Time(this.cycle.closed).toString()}
					</ui-closed>}
				</ui-detail>

				<ui-fear-and-greed>
					<ui-value>
						{Math.floor(this.cycle.riskAppetite * 100)}
					</ui-value>

					<ui-name>
						{['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed'][Math.floor(this.cycle.riskAppetite * 5)]}
					</ui-name>
				</ui-fear-and-greed>
			</ui-cycle>

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
