import { PageComponent } from "./page";
import { MapComponent } from "./map/map.component";
import { Point } from "./map/point";
import { HistoryComponent } from "./map/history.component";
import { PropertiesComponent } from "./properties/index";
import { PropertyComponent } from "./property/index";
import { GameService, PlayerViewModel, Service } from "./managed/services";
import { PathRouter, Router } from "@acryps/page/built/router";
import { Component } from "@acryps/page/built/component";
import { registerDirectives } from "@acryps/page-default-directives/built/index";
import { HomePage } from "./home";
import { pageStyle } from "./index.style";
import { GameBridge } from "./bridge";

export class Application {
	static router: Router;

	static players: PlayerViewModel[];

	static center = new Point(101, 183);
	
	static bridge = new GameBridge();

	static async main() {
		Service.baseUrl = '/';

		this.players = await new GameService().getPlayers();

		this.router = new PathRouter(
			PageComponent
				.route('/map/:x/:y/:zoom', MapComponent
					.route('/history', HistoryComponent)
				)

				.route('/properties', PropertiesComponent)
				.route('/property/:id', PropertyComponent)
			
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
