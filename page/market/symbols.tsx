import { Component } from "@acryps/page";
import { CommoditySymbolTickerViewModel, MarketService } from "../managed/services";
import { negativeColor, positiveColor } from "../index.style";

const pollInterval = 5000;

export class MarketSymbolsComponent extends Component {
	declare rootNode: HTMLElement;

	items: CommoditySymbolTickerViewModel[] = [];

	scroller = new OffscreenCanvas(1, 1);
	scrollerContext = this.scroller.getContext('2d');

	margin = 20;

	async onload() {
		this.items = await new MarketService().getSymbolTicker();
	}

	private async poll() {
		if (!document.contains(this.rootNode)) {
			return;
		}

		this.items = await new MarketService().getSymbolTicker();
		this.redraw();

		setTimeout(() => this.poll(), pollInterval);
	}

	redraw() {
		if (!(this.rootNode instanceof HTMLElement)) {
			return;
		}

		const style = getComputedStyle(this.rootNode);
		const bounds = this.rootNode.getBoundingClientRect();

		this.scrollerContext.font = style.font;

		const segments: { symbol: string, parts: { text: string, width: number, color: string }[], width: number }[] = [];
		let width = 0;

		for (let item of this.items) {
			// prices are not available until the commodity has been rated at least once
			if (item.price == null) {
				continue;
			}

			const symbolText = `${item.symbol} `;
			const priceText = item.price.toFixed(2);

			const symbolWidth = this.scrollerContext.measureText(symbolText).width;
			const priceWidth = this.scrollerContext.measureText(priceText).width;

			const priceColor = item.direction == 'up' ? positiveColor.toValueString() : item.direction == 'down' ? negativeColor.toValueString() : style.color;

			width += symbolWidth + priceWidth + this.margin;

			segments.push({
				symbol: item.symbol,
				width: symbolWidth + priceWidth,
				parts: [
					{ text: symbolText, width: symbolWidth, color: style.color },
					{ text: priceText, width: priceWidth, color: priceColor }
				]
			});
		}

		segments.sort((a, b) => a.symbol.localeCompare(b.symbol));

		this.scroller.width = Math.max(width, 1);
		this.scroller.height = bounds.height;

		this.scrollerContext.font = style.font;
		this.scrollerContext.textBaseline = 'top';

		let x = 0;

		for (let segment of segments) {
			for (let part of segment.parts) {
				this.scrollerContext.fillStyle = part.color;
				this.scrollerContext.fillText(part.text, x, 0);
				x += part.width;
			}

			x += this.margin;
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

			this.redraw();
			this.poll();

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
