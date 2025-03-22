import { Router, PathRouter, Component } from "@acryps/page";
import { PageComponent } from "./page";
import { PropertiesComponent } from "./properties/index";
import { PropertyPage } from "./properties/property/index";
import { BoroughService, BoroughSummaryModel, BoroughViewModel, GameService, PlayerViewModel, Service } from "./managed/services";
import { registerDirectives } from "@acryps/page-default-directives";
import { HomePage } from "./home";
import { pageStyle } from "./page.style";
import { GameBridge } from "./bridge";
import { BoroughPage } from "./borough";
import { CreateBannerComponent } from "./banner/create";
import './shared/polyfills';
import { NewsPage } from "./news";
import { ArticePage } from "./news/article";
import { PopulationPage } from "./population";
import { ResidentPage } from "./resident";
import { PublicationPage } from "./news/publication";
import { MapPage } from "./map";
import { Point } from "./../interface/point";
import { ChatPage } from "./resident/chat";
import { RelationsPage } from "./resident/relations";
import { VotePage } from "./vote";
import { ProposeBillPage } from "./vote/propose";
import { HonestiumPage } from "./vote/honestium";
import { BillPage } from "./vote/bill";
import { LawHousePage } from "./law-house";
import { LawHouseSessionPage } from "./law-house/session";
import { CompanyOfficePage } from "./company-office";
import { RegisterCompanyPage } from "./company-office/register";
import { CompanyPage } from "./company-office/company";
import { CreateFeaturePage } from "./map/create";
import { Rewrite } from '@acryps/rewrite';
import { OfficePage } from "./company-office/office";
import { WorkOfferPage } from "./company-office/work-offer";
import { CreateOfficePage } from "./company-office/office/create";

export class Application {
	static router: Router;

	static players: PlayerViewModel[];
	static boroughs: BoroughSummaryModel[];

	static center = new Point(23, 183);

	static bridge = new GameBridge();

	static async main() {
		new Rewrite().activate();
		Service.baseUrl = '/';

		if (location.pathname == '/') {
			location.pathname = '/home';
		}

		this.players = await new GameService().getPlayers();
		this.boroughs = await new BoroughService().list();

		this.router = new PathRouter(
			PageComponent
				.route('/map/:x/:y/:zoom', MapPage
					.route('/create/:shape', CreateFeaturePage)
				)

				.route('/properties', PropertiesComponent)
				.route('/property/:id', PropertyPage)

				.route('/borough/:tag', BoroughPage)

				.route('/news/article/:id', ArticePage)
				.route('/news/publication/:tag', PublicationPage)
				.route('/news', NewsPage)

				.route('/resident/:tag', ResidentPage
					.route('/chat/:chat', ChatPage)
					.route('/relations', RelationsPage)
				)

				.route('/population', PopulationPage)

				.route('/vote', VotePage
					.route('/propose', ProposeBillPage)
					.route('/honestium', HonestiumPage)

					.route('/bill/:tag', BillPage)
				)

				.route('/law-house', LawHousePage
					.route('/session/:id', LawHouseSessionPage)
				)

				.route('/company-office', CompanyOfficePage
					.route('/register/:firstOfficeId', RegisterCompanyPage)
					.route('/company/:tag', CompanyPage)
					.route('/office/create/:id', CreateOfficePage)
					.route('/office/:id', OfficePage)
					.route('/work-offer/:id', WorkOfferPage)
				)

				.route('/create-banner', CreateBannerComponent)
				.route('/create-banner/:code', CreateBannerComponent)

				.route('/home', HomePage)
		);

		registerDirectives(Component, this.router);

		pageStyle().apply();
		this.router.host(document.body);
	}
}

Application.main();
