import { Application } from "main";
import { Component } from "node_modules/vldom/component";

export class PageComponent extends Component {
	render(child?: Node) {
		return <ui-page>
			<ui-header>
				townhall
			</ui-header>

			{child}
		</ui-page>;
    }
}