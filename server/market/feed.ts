import { ManagedServer } from "../managed/server";
import { DbContext } from "../managed/database";

export class MarketFeedInterface {
	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		app.app.get('/market/feed/ticker', async (request, response) => {
			const items = await database.views.commoditySymbolTicker
				.orderByAscending(item => item.symbol)
				.toArray();

			const feed = items.map(item => {
				const arrow = item.direction == 'up' ? '{' : item.direction == 'down' ? '}' : '';

				return `${item.symbol} ${this.formatNumber(item.price)}${arrow}`;
			});

			response.end(feed.join(' ').toUpperCase());
		});
	}

	private formatNumber(value: number) {
		const steps = ['', 'k', 'm', 'g', 't'];

		while (value > 1000 && steps.length > 1) {
			steps.shift();
			value /= 1000;
		}

		return `${Math.round(value)}${steps[0]}`;
	}
}
