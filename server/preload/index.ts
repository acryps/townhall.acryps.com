import { Browser, launch } from "puppeteer-core";
import { PreloadRoute, RouteParameterValue } from "./route";
import { port, updatePreloadedPages } from "..";
import { DbContext, PreloadedPage } from "../managed/database";
import { readFileSync } from "fs";

export class Preload {
	static browser: Browser;

	static readonly userAgent = 'Preload Indexer';

	routes: PreloadRoute<any>[] = [];
	indexed: PreloadedPage[] = [];

	constructor(
		private database: DbContext
	) {}

	route<ItemType>(
		link: string | ((...parameters: RouteParameterValue[]) => string),
		source?: Promise<ItemType[]> | ItemType[] | (() => Promise<ItemType[]> | ItemType[]),
		extract?: (item: ItemType) => Promise<RouteParameterValue[]> | RouteParameterValue[]
	) {
		this.routes.push(new PreloadRoute<ItemType>(link, source, extract));
	}

	async executeTask() {
		if (updatePreloadedPages) {
			this.update();
		}
	}

	apply(app, indexPagePath: string, defaultTitle: string) {
		const indexPage = readFileSync(indexPagePath).toString();

		app.use('*', async (request, response) => {
			let page = indexPage;
			let preloaded: PreloadedPage;

			if (request.header('user-agent') != Preload.userAgent) {
				preloaded = await this.database.preloadedPage.first(page => page.link == request.baseUrl);
			}

			const title = preloaded?.title ?? defaultTitle;
			const metadata = preloaded?.metadata;
			const content = preloaded?.content ?? '';

			if (metadata) {
				page = page.replace('{metadata}', `<script type="application/ld+json">${metadata}</script>`);
			} else {
				page = page.replace('{metadata}', '');
			}

			page = page.replace('{title}', title);

			// do not insert .page wrapper, navigation, ... (page will not be visible anyways)
			page = page.replace('{content}', content);

			response.contentType('text/html');
			response.end(page);
		});
	}

	async update() {
		console.log(`fetching preloaded pages...`);
		this.indexed = await this.database.preloadedPage.toArray();
		console.log(`${this.indexed.length} pages already preloaded`);

		console.log(`indexing preloading pages...`);

		const addedLinks: string[] = [];
		const existingLinks: PreloadedPage[] = [];

		for (let route of this.routes) {
			for (let link of await route.list()) {
				const indexed = this.indexed.find(indexed => indexed.link == link);

				if (indexed) {
					existingLinks.push(indexed);
				} else {
					addedLinks.push(link);
				}
			}
		}

		// shuffle new links to even loading
		addedLinks.sort(() => Math.random() - 0.5);

		const updateCutoff = +new Date() - 1000 * 60 * 60 * 24;

		const links: string[] = [
			// index news pages first
			...addedLinks,

			// reindex the oldest pages first
			...existingLinks
				.filter(page => +page.updated < updateCutoff)
				.sort((a, b) => +a.updated - +b.updated)
				.map(page => page.link)
		];

		console.log(`found ${links.length} updateable preloading pages (${addedLinks.length} new pages), launching browser`);

		if (!Preload.browser) {
			Preload.browser = await launch({
				executablePath: process.env.PRELOAD_BROWSER_APPLICATION_PATH,
				args: ['--no-sandbox', '--disable-setuid-sandbox']
			});
		}

		const page = await Preload.browser.newPage();
		await page.setUserAgent(Preload.userAgent);

		for (let link of links) {
			try {
				let entry = this.indexed.find(page => page.link == link);

				if (!entry) {
					entry = new PreloadedPage();
					entry.link = link;

					await entry.create();
				}

				console.log(`updating ${link}...`);

				await page.goto(`http://localhost:${port}${link}`);

				// ensure page load
				await page.waitForSelector('.page');
				await page.waitForNetworkIdle();

				entry.title = await page.title();
				entry.metadata = await page.evaluate(() => document.querySelector('script[type="application/ld+json"]')?.textContent);
				entry.content = (await page.evaluate(() => document.querySelector('.content').innerHTML)).trim();

				entry.updated = new Date();
				await entry.update();
			} catch (error) {
				console.error(`preload of ${link} failed`, error);
			}
		}

		await page.close();
	}
}
