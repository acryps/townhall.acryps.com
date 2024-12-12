import { Application } from "./index";
import { Component } from "@acryps/page";

export class PageComponent extends Component {
	render(child?: Node) {
		return <ui-page>
			<ui-header>
				<ui-logo ui-href='/'>
					townhall
				</ui-logo>
			</ui-header>

			<ui-content>
				{child}
			</ui-content>
		</ui-page>;
	}
}
