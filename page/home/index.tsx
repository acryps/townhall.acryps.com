import { Component } from "@acryps/page";
import { Application } from "..";
import { OnlinePlayerComponent } from "./online";

export class HomePage extends Component {
	render() {
		return <ui-home>
			<ui-title>
				City of Pilegron
			</ui-title>
			
			<ui-description>
				Welcome to our minecraft server
			</ui-description>
			
			{new OnlinePlayerComponent()}
			
			<ui-connection>
				Join at <ui-host>townhall.acryps.com</ui-host> on <ui-platform>Java</ui-platform> or <ui-platform>Bedrock</ui-platform>*
				
				<ui-hint>
					* You must be whitelisted. Contact ME if you would like to join.
				</ui-hint>
			</ui-connection>
			
			<ui-actions>
				<ui-action ui-href={`map/${Application.center.x}/${Application.center.y}/3`}>
					View Map
				</ui-action>
				
				<ui-action ui-href='properties'>
					View Property Register
				</ui-action>
			</ui-actions>
		</ui-home>
	}
}
