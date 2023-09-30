import { Application } from "./index";
import { Component } from "@acryps/page/built/component";

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