import { Router, PathRouter, Component } from "@acryps/page";
import { PageComponent } from "./page";
import { PropertiesComponent } from "./properties/index";
import { PropertyPage } from "./properties/property/index";
import { BoroughService, BoroughSummaryModel, BoroughViewModel, EpochService, GameService, PlayerViewModel, Service } from "./managed/services";
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
import { RegisterBoroughPage } from "./borough/register";
import { WriteArticlePage } from "./news/write";
import { EditPlotAction } from "./map/edit-plot";
import { CreateBuildingAction } from "./map/create-building";
import { Metadata } from "@acryps/metadata";
import { StreetPage } from "./street";
import { EditRouteAction } from "./map/edit-route";
import { BuildingPage } from "./properties/property/building";
import { ValuationPage } from "./trade/valuation";
import { PropertyOwnershipPage } from "./properties/property/ownership";
import { QuickValueationAction } from "./map/quick-valueation";
import { MapStartPage } from "./map/start";
import { RevaluePropertyPage } from "./properties/property/ownership/revalue";
import { EntityAssetsPage } from "./trade/assets";
import { MetricsPage } from "./metrics";
import { TrainsPage } from "./train";
import { TrainRoutePage } from "./train/route";
import { RegisterTrainRoutePage } from "./train/register";
import { InsertTrainRouteStopAction } from "./map/train-route/insert-stop";
import { EditTrainRouteAction } from "./map/train-route/edit-route";
import { ResidentNamesPage } from "./population/names";
import { PlansPage } from "./plans";
import { PlanPage } from "./plans/plan";
import { CreatePlanPage } from "./plans/create";
import { PlanShapeAction } from "./map/plan-shape";
import { PlanShapePage } from "./plans/plan/shape";
import { PlanViewAction } from "./map/plans";
import { OraclePage } from "./oracle";
import { ScheduledEpoch } from "../interface/time/epoch";
import { TimePage } from "./time";
import { ItemContextPage } from "./item-context";

export class Application {
	static router: Router;

	static boroughs: BoroughSummaryModel[];
	static bridge = new GameBridge();

	static center = new Point(23, 183);

	static async main() {
		const rewrite = new Rewrite();
		rewrite.nativeElements.push('svg', 'path', 'rect', 'g');
		rewrite.activate();

		Service.baseUrl = '/';

		if (location.pathname == '/') {
			location.pathname = '/home';
		}

		ScheduledEpoch.import(await new EpochService().timeline());
		this.boroughs = await new BoroughService().list();

		this.router = new PathRouter(
			PageComponent
				.route('/map/:x/:y/:zoom', MapPage
					.route('/create-building/:id', CreateBuildingAction)
					.route('/edit-plot/:id', EditPlotAction)
					.route('/edit-route/:id', EditRouteAction)
					.route('/quick-valueation', QuickValueationAction)

					.route('/train-route/insert-stop/:code/:segmentIndex', InsertTrainRouteStopAction)
					.route('/train-route/edit-route/:code/:segmentIndex', EditTrainRouteAction)

					.route('/plans/:tags', PlanViewAction)
					.route('/plan-shape/:tag', PlanShapeAction)

					.route('/create/:shape', CreateFeaturePage)
				)
				.route('/map', MapStartPage)

				.route('/properties', PropertiesComponent)
				.route('/property/:id', PropertyPage
					.route('/building/:id', BuildingPage)
					.route('/ownership', PropertyOwnershipPage
						.route('/revalue/:ownerId', RevaluePropertyPage)
					)
				)

				.route('/item-context/:id', ItemContextPage)

				.route('/borough/register/:bounds', RegisterBoroughPage)
				.route('/borough/:tag', BoroughPage)

				.route('/street/:id', StreetPage)

				.route('/time', TimePage)

				.route('/train', TrainsPage
					.route('/register/:path', RegisterTrainRoutePage)
					.route('/route/:code', TrainRoutePage)
				)

				.route('/news/write/:id', WriteArticlePage)
				.route('/news/article/:id', ArticePage)
				.route('/news/publication/:tag', PublicationPage)
				.route('/news', NewsPage)

				.route('/oracle', OraclePage)

				.route('/metrics', MetricsPage)

				.route('/resident/:tag', ResidentPage
					.route('/chat/:chat', ChatPage)
					.route('/relations', RelationsPage)
				)

				.route('/trade/assets/:id', EntityAssetsPage)
				.route('/trade/valuation/:id', ValuationPage)

				.route('/population', PopulationPage
					.route('/names', ResidentNamesPage)
				)

				.route('/vote', VotePage
					.route('/propose', ProposeBillPage)
					.route('/honestium', HonestiumPage)

					.route('/bill/:tag', BillPage)
				)

				.route('/plan', PlansPage
					.route('/create', CreatePlanPage)
					.route('/:tag', PlanPage
						.route('/:id', PlanShapePage)
					)
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

				.route('/create-banner/:code', CreateBannerComponent)
				.route('/create-banner', CreateBannerComponent)

				.route('/home', HomePage)
		);

		registerDirectives(Component, this.router);

		const applyMetadata = Metadata.prototype.apply;

		Metadata.prototype.apply = function (this) {
			console.log(this);

			if ('name' in this) {
				Application.setTitle(this.name);
			}

			applyMetadata.bind(this)();
		};

		pageStyle().apply();
		this.router.host(document.body);
	}

	static setTitle(...parts: string[]) {
		document.title = [...parts, 'Townhall'].filter(item => item).join(' | ');
	}

	// only works with 6-letter hex
	static contrastColor(source: string) {
		source = source.replace('#', '').trim();

		const red = parseInt(source.substring(0, 2), 16);
		const green = parseInt(source.substring(2, 4), 16);
		const blue = parseInt(source.substring(4, 6), 16);

		return (red * 0.3 + green * 0.5 + blue * 0.2) > 0x8f ? 'black' : 'white';
	}
}

Application.main();
