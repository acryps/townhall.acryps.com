import { Component } from "@acryps/page";
import { Application } from "..";
import { OnlinePlayerComponent } from "./online";
import { boroughColor } from "./index.style";
import { hex } from "@acryps/style";
import { BannerComponent } from "../banner";
import { buildingCodeIcon, companyOfficeIcon, electionIcon, lawIcon, mapIcon, metricIcon, militaryIcon, oracleIcon, planIcon, priceIcon, propertyRegisterIcon, publicationIcon, residentIcon, trainIcon } from "../assets/icons/managed";
import { Point } from "../../interface/point";
import { ImpressionsComponent } from "./impressions";
import { ArticleNewstickerModel, ArticlePreviewModel, PublicationService } from "../managed/services";
import { NewstickerComponent } from "./newsticker";
import { Banner } from "../../interface/banner";
import { Time } from "../../interface/time";

export class HomePage extends Component {
	render() {
		const time = <ui-time ui-href='/time'></ui-time>;

		requestAnimationFrame(() => {
			const updateTime = () => {
				time.textContent = Time.now().toString();

				if (this.loaded) {
					requestAnimationFrame(() => updateTime());
				}
			};

			updateTime();
		});

		return <ui-home>
			{new NewstickerComponent()}
			{new ImpressionsComponent()}

			{time}

			<ui-description>
				Welcome to our minecraft server.
				Step into a unique world where civilization is guided by advanced language models.
				Discover the latest updates, browse our meticulously maintained property registry, or simply explore the evolving map and see what surprises await.
			</ui-description>

			<ui-topics>
				<ui-topic ui-href={`/map`}>
					{mapIcon()}

					<ui-name>
						Map
					</ui-name>

					<ui-description>
						Explore our world from above
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/news'>
					{publicationIcon()}

					<ui-name>
						Publications (News)
					</ui-name>

					<ui-description>
						Read up on what is going on in the city
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/properties'>
					{propertyRegisterIcon()}

					<ui-name>
						Property Register
					</ui-name>

					<ui-description>
						Register, view or aquire plots of land
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/metrics'>
					{metricIcon()}

					<ui-name>
						Metrics
					</ui-name>

					<ui-description>
						See key values and trends
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/population'>
					{residentIcon()}

					<ui-name>
						Residents
					</ui-name>

					<ui-description>
						View all residents living in Pilegron
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/vote'>
					{electionIcon()}

					<ui-name>
						Elections
					</ui-name>

					<ui-description>
						View bills and watch residents vote live
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/train'>
					{trainIcon()}

					<ui-name>
						Train Routes
					</ui-name>

					<ui-description>
						View routes in the railnetwork of Pilegron.
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/plan'>
					{planIcon()}

					<ui-name>
						Plans
					</ui-name>

					<ui-description>
						View all kinds of plans for the city.
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/law-house'>
					{lawIcon()}

					<ui-name>
						Law House
					</ui-name>

					<ui-description>
						Everything legal.
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/company-office'>
					{companyOfficeIcon()}

					<ui-name>
						Company Office
					</ui-name>

					<ui-description>
						Come here if you mean business!
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/oracle'>
					{oracleIcon()}

					<ui-name>
						Oracle
					</ui-name>

					<ui-description>
						Lore proposing oracle
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='/military'>
					{militaryIcon()}

					<ui-name>
						Military
					</ui-name>

					<ui-description>
						Everything about defence.
					</ui-description>
				</ui-topic>
			</ui-topics>

			<ui-connection>
				Join at <ui-host>townhall.acryps.com</ui-host> on <ui-platform>Java</ui-platform> or <ui-platform>Bedrock</ui-platform>*

				<ui-hint>
					* You must be whitelisted. Contact ME if you would like to join.
				</ui-hint>
			</ui-connection>

			<ui-section>
				<ui-title>
					Boroughs
				</ui-title>

				<ui-description>
					The city is split into {Application.boroughs.length} administrative districts called boroughs.
					Each borough has its own administration, rules and history.
				</ui-description>

				<ui-boroughs>
					{Application.boroughs.toOrdered(borough => Point.center(Point.unpack(borough.bounds)).distance(Application.center)).map(borough => <ui-borough ui-href={`/borough/${borough.tag}`} style={boroughColor.provide(hex(borough.color))}>
						{borough.banner && new BannerComponent(Banner.unpack(borough.banner))}

						<ui-detail>
							<ui-name>
								{borough.name}
							</ui-name>

							{borough.incorporation ? <ui-incorporation>
								Incorporated: {borough.incorporation.toLocaleDateString()}
							</ui-incorporation> : <ui-incorporation ui-none>
								Not officially incorporated
							</ui-incorporation>}

							<ui-area>
								Area: {Point.area(Point.unpack(borough.bounds)).toLocaleString()} b²
							</ui-area>
						</ui-detail>
					</ui-borough>)}
				</ui-boroughs>
			</ui-section>

			<ui-about>
				This application is a testing bed for large language models (LLM), our own open source libraries and geographic information systems (GIS) at <ui-company ui-href='https://acryps.com'>Acryps AG</ui-company>.
				Acryps Cloud hosts our minecraft server.
			</ui-about>
		</ui-home>
	}
}
