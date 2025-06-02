import { Component, ComponentContent } from "@acryps/page";

class Tab {
	content: ComponentContent;

	constructor(
		public header: ComponentContent,
		public contentRenderer: () => ComponentContent
	) {}
}

export class Tabs extends Component {
	active: Tab;
	tabs: Tab[] = [];

	addTab(
		header: ComponentContent,
		content: ComponentContent | (() => ComponentContent),
		condition: any = true
	) {
		if (condition) {
			this.tabs.push(new Tab(
				header,
				typeof content == 'function' ? content : () => content
			));
		}

		return this;
	}

	render() {
		if (!this.active) {
			this.active = this.tabs[0];
		}

		if (!this.active.content) {
			this.active.content = this.active.contentRenderer();
		}

		return <ui-tabs>
			<ui-headers>
				{this.tabs.map(tab => {
					const element: HTMLElement = <ui-header ui-active={tab == this.active} ui-click={() => {
						this.active = tab;

						this.update();
					}}>
						{tab.header}
					</ui-header>;

					if (tab == this.active) {
						requestAnimationFrame(() => {
							element.scrollIntoView();
						});
					}

					return element;
				})}
			</ui-headers>

			<ui-content>
				{this.active.content}
			</ui-content>
		</ui-tabs>;
	}
}
