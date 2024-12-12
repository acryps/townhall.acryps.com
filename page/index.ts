import { PageComponent } from "./page";
import { PropertiesComponent } from "./properties/index";
import { PropertyPage } from "./properties/property/index";
import { BoroughService, BoroughSummaryModel, BoroughViewModel, GameService, PlayerViewModel, Service } from "./managed/services";
import { PathRouter, Router } from "@acryps/page/built/router";
import { Component } from "@acryps/page/built/component";
import { registerDirectives } from "@acryps/page-default-directives/built/index";
import { HomePage } from "./home";
import { pageStyle } from "./page.style";
import { GameBridge } from "./bridge";
import { BoroughPage } from "./borough";
import { CreateBannerComponent } from "./banner/create";
import './shared/polyfills';
import { NewsPage } from "./news";
import { ArticePage } from "./news/article";
import { ResidentsPage } from "./residents";
import { ResidentPage } from "./resident";
import { PublicationPage } from "./news/publication";
import { MapPage } from "./map";
import { Point } from "./../interface/point";

export class Application {
	static router: Router;

	static players: PlayerViewModel[];
	static boroughs: BoroughSummaryModel[];

	static center = new Point(23, 183);

	static bridge = new GameBridge();

	static async main() {
		Service.baseUrl = '/';

		this.players = await new GameService().getPlayers();
		this.boroughs = await new BoroughService().list();

		this.router = new PathRouter(
			PageComponent
				.route('/map/:x/:y/:zoom', MapPage)

				.route('/properties', PropertiesComponent)
				.route('/property/:id', PropertyPage)

				.route('/borough/:tag', BoroughPage)

				.route('/news/article/:id', ArticePage)
				.route('/news/publication/:tag', PublicationPage)
				.route('/news', NewsPage)

				.route('/resident/:tag', ResidentPage)
				.route('/residents', ResidentsPage)

				.route('/create-banner', CreateBannerComponent)
				.route('/create-banner/:code', CreateBannerComponent)

				.route('/', HomePage)
		);

		registerDirectives(Component, this.router);

		pageStyle().apply();
		this.router.host(document.body);
	}

	static serverTime() {
		const date = +new Date() - (150 * 365.4 * 24 * 60 * 60);

		return new Date(date);
	}
}

Application.main();
