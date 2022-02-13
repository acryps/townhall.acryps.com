import { Component } from "node_modules/vldom/component";

export class PageComponent extends Component {
	render(child?: Node) {
		return <ui-page ui-menu-detail>
			<ui-menu>
				<ui-logo>
					townhall
				</ui-logo>

				<ui-menu-item ui-href="/home">
					Home
				</ui-menu-item>

				<ui-menu-item ui-href="/map">
					Map
				</ui-menu-item>
			</ui-menu>

			<ui-detail>
				{child}
			</ui-detail>
		</ui-page>;
    }
}