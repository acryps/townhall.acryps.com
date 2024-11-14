import { Component } from "@acryps/page";
import { Application } from "..";
import { OnlinePlayerComponent } from "./online";
import { BoroughService, BoroughSummaryModel } from "../managed/services";
import { boroughColor } from "./index.style";
import { border, hex } from "@acryps/style";
import { BannerComponent } from "../banner";
import { Point } from "../map/point";
import { buildingCodeIcon, companyOfficeIcon, electionIcon, lawIcon, mapIcon, propertyRegisterIcon, publicationIcon } from "../assets/icons/managed";

export class HomePage extends Component {
	render() {
		return <ui-home>
			{new BannerComponent('#ff0000')
				.addRoundel('#00ff00')
				.addLozenge('black')
				.addGuster('orange')}

			<ui-title>
				City of Pilegron
			</ui-title>

			<ui-description>
				Welcome to our minecraft server
			</ui-description>

			{new OnlinePlayerComponent()}

			<ui-topics>
				<ui-topic ui-href={`map/${Application.center.x}/${Application.center.y}/3`}>
					{mapIcon()}

					<ui-name>
						Map
					</ui-name>

					<ui-description>
						Explore our world from above
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='publications'>
					{publicationIcon()}

					<ui-name>
						Publications (News)
					</ui-name>

					<ui-description>
						Read up on what is going on in the city
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='properties'>
					{propertyRegisterIcon()}

					<ui-name>
						Property Register
					</ui-name>

					<ui-description>
						Register, view or aquire plots of land
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='vote'>
					{electionIcon()}

					<ui-name>
						Elections
					</ui-name>

					<ui-description>
						View bills and watch residents vote live
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='company-office'>
					{companyOfficeIcon()}

					<ui-name>
						Company Office
					</ui-name>

					<ui-description>
						Register and view a company
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='building-code'>
					{buildingCodeIcon()}

					<ui-name>
						Building Code
					</ui-name>

					<ui-description>
						Read up on the rules of what can be built
					</ui-description>
				</ui-topic>

				<ui-topic ui-href='laws'>
					{lawIcon()}

					<ui-name>
						Laws
					</ui-name>

					<ui-description>
						Legal information released by Law House
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
						{borough.banner && BannerComponent.unpack(borough.banner)}

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
		</ui-home>
	}
}
