import { Component } from "@acryps/page";
import { LegalEntityService, LegalEntityViewModel } from "../../../managed/services";
import { LegalEntityComponent } from "..";
import { select } from "@acryps/style";

export class LegalEntitySelectorComponent extends Component {
	static featured: LegalEntityViewModel[];
	declare rootNode: HTMLElement;

	requestLock: any;

	list = new ListComponent();

	constructor(
		public selection: LegalEntityViewModel = null
	) {
		super();
	}

	onload() {
		if (LegalEntitySelectorComponent.featured) {
			this.list.updateList(LegalEntitySelectorComponent.featured, this.selection);
		} else {
			new LegalEntityService().listFeatured().then(featured => {
				LegalEntitySelectorComponent.featured = featured;

				this.list.updateList(LegalEntitySelectorComponent.featured, this.selection);
			});
		}
	}

	updateSearchResults(search: string) {
		const requestLock = Math.random();
		this.requestLock = requestLock;

		if (search.trim()) {
			new LegalEntityService().find(search).then(results => {
				if (this.requestLock == requestLock) {
					this.list.updateList(results, this.selection);
				}
			});
		} else {
			this.list.updateList(LegalEntitySelectorComponent.featured, this.selection);
		}
	}

	render() {
		const input: HTMLInputElement = <input
			type='search'
		/>;

		requestAnimationFrame(() => {
			input.onkeyup = () => this.updateSearchResults(input.value);

			input.onfocus = () => this.rootNode.setAttribute('ui-focus', '');
			input.onblur = () => requestAnimationFrame(() => this.rootNode.removeAttribute('ui-focus'));
		});

		return <ui-legal-entity-selector>
			{input}

			{this.list}
		</ui-legal-entity-selector>
	}
}

class ListComponent extends Component {
	list: LegalEntityViewModel[] = [];
	selection: LegalEntityViewModel;

	updateList(list: LegalEntityViewModel[], selection: LegalEntityViewModel) {
		this.list = list;
		this.selection = selection;

		this.update();
	}

	renderItem(entity: LegalEntityViewModel) {
		return <ui-entity>
			{new LegalEntityComponent(entity)}
		</ui-entity>
	}

	render() {
		return <ui-list>
			{this.selection && this.renderItem(this.selection)}

			{this.list.map(entity => this.renderItem(entity))}
		</ui-list>
	}
}
