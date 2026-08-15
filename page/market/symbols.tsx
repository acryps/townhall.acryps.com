import { Component } from "@acryps/page";
import { MarketPage } from ".";
import { LiveCommodityTickerResponseModel } from "../managed/services";
import { formatTradingUnit } from "../../interface/trading-unit";

export class MarketSymbolsComponent extends Component {
	declare rootNode: HTMLElement;

	symbols: Symbol[] = [];

	scroller = new OffscreenCanvas(1, 1);
	scrollerContext = this.scroller.getContext('2d');

	margin = 20;

	constructor(
		public market: MarketPage
	) {
		super();
	}

	updateTicker(tickers: LiveCommodityTickerResponseModel[]) {
		if (!(this.rootNode instanceof HTMLElement)) {
			return;
		}

		const style = getComputedStyle(this.rootNode);
		const bounds = this.rootNode.getBoundingClientRect();

		this.scrollerContext.font = style.font;

		const segments: { text: string, width: number }[] = [];
		let width = 0;

		let textMetrics: TextMetrics;

		for (let ticker of tickers) {
			const commodity = this.market.commodities.find(commodity => commodity.id == ticker.commodityId);

			if (commodity && commodity.symbol && commodity.tradingUnit) {
				const text = `${commodity.symbol} ${formatTradingUnit(commodity.tradingUnit, ticker.estimatedStockSize)}`
				textMetrics = this.scrollerContext.measureText(text);

				width += textMetrics.width;
				width += this.margin;

				segments.push({
					text,
					width: textMetrics.width
				});
			}
		}

		segments.sort((a, b) => a.text.localeCompare(b.text));

		this.scroller.width = width;
		this.scroller.height = bounds.height;

		this.scrollerContext.font = style.font;
		this.scrollerContext.textBaseline = 'top';
		this.scrollerContext.fillStyle = style.color;

		let x = 0;

		for (let segment of segments) {
			this.scrollerContext.fillText(segment.text, x, 0);
			x += segment.width + this.margin;
		}
	}

	render() {
		const canvas = document.createElement('canvas');
		let scrollPosition = 0;

		requestAnimationFrame(() => {
			const bounds = this.rootNode.getBoundingClientRect();
			canvas.width = bounds.width;
			canvas.height = bounds.height;

			const context = canvas.getContext('2d');
			context.imageSmoothingEnabled = false;

			// unsmooth the motion
			const nextFrame = () => {
				scrollPosition = (scrollPosition + 2) % this.scroller.width;

				context.clearRect(0, 0, bounds.width, bounds.height);
				context.drawImage(this.scroller, -scrollPosition, 0);
				context.drawImage(this.scroller, -scrollPosition + this.scroller.width, 0);

				if (document.contains(canvas)) {
					setTimeout(() => nextFrame(), 100);
				}
			};

			nextFrame();
		});

		return <ui-symbols>
			{canvas}
		</ui-symbols>
	}
}
