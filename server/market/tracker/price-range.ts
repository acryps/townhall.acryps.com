export class MarketPriceRange {
	valid = false;

	high: number;
	low: number;

	median: number;
	spread: number;

	volume: number;
	capitalization: number;

	trades: { unitPrice: number, quantity: number }[] = [];

	push(unitPrice: number, quantity: number) {
		this.trades.push({ unitPrice, quantity });
	}

	calculate() {
		if (this.trades.length == 0) {
			this.valid = false;

			return;
		}

		this.valid = true;

		if (this.trades.length == 1) {
			this.high = this.low = this.median = this.trades[0].unitPrice;
		} else if (this.trades.length == 2) {
			this.high = Math.max(...this.trades.map(price => price.unitPrice));
			this.low = Math.min(...this.trades.map(price => price.unitPrice));

			this.median = (this.low + this.high) / 2;
		} else {
			this.trades.sort();

			this.high = this.trades[0].unitPrice;
			this.low = this.trades.at(-1).unitPrice;
			this.median = this.trades[Math.round(this.trades.length / 2)].unitPrice;
		}

		this.volume = this.trades.reduce((sum, trade) => sum + trade.quantity, 0);
		this.capitalization = this.trades.reduce((sum, trade) => sum + trade.quantity * trade.unitPrice, 0);

		this.spread = this.high - this.low;

		return this;
	}

	toString() {
		if (!this.valid) {
			return '     **.**      **.**       ** ';
		}

		return [
			this.median.toFixed(2).padStart(10, '·'),
			`s=${this.spread.toFixed(2).padStart(8, '·')}`,
			`v=${Math.floor(this.capitalization / 1000).toFixed(0).padStart(6, '·')}k`
			].join(' ');
	}
}
