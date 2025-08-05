import { Component } from "@acryps/page";
import { LegalEntityService, LegalEntityViewModel } from "../../../managed/services";
import { LegalEntityComponent } from "..";

export class LegalEntitySelectorComponent extends Component {
	static featured: LegalEntityViewModel[];
	declare rootNode: HTMLElement;

	requestLock = setTimeout(() => {});

	list = new ListComponent();

	constructor(
		public selection: LegalEntityViewModel = null
	) {
		super();
	}

	onSelect(handler: (entity: LegalEntityViewModel) => void) {
		this.list.onSelect = handler;

		return this;
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
		clearTimeout(this.requestLock);

		const requestDebounce = setTimeout(() => {
			if (search.trim()) {
				new LegalEntityService().find(search).then(results => {
					if (this.requestLock == requestDebounce) {
						this.list.updateList(results, this.selection);
					}
				});
			} else {
				this.list.updateList(LegalEntitySelectorComponent.featured, this.selection);
			}
		}, 100);

		this.requestLock = requestDebounce;
	}

	render() {
		const input: HTMLInputElement = <input
			type='search'
		/>;

		if (this.selection) {
			if (this.selection.state) {
				input.placeholder = 'State';
			} else {
				input.placeholder = this.selection.borough?.name ?? this.selection.company?.name ?? `${this.selection.resident?.givenName} ${this.selection.resident?.familyName}`;
			}
		} else {
			input.placeholder = '';
		}

		requestAnimationFrame(() => {
			input.onkeyup = () => this.updateSearchResults(input.value);

			input.onfocus = () => this.rootNode.setAttribute('ui-focus', '');
			input.onblur = () => setTimeout(() => this.rootNode.removeAttribute('ui-focus'), 250);
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

	onSelect: (entity: LegalEntityViewModel) => void

	updateList(list: LegalEntityViewModel[], selection: LegalEntityViewModel) {
		this.list = list;
		this.selection = selection;

		this.update();
	}

	renderItem(entity: LegalEntityViewModel) {
		return <ui-entity>
			{new LegalEntityComponent(entity, () => this.onSelect(entity))}

			<ui-count>
				{entity.referenceCount ?? 0}
			</ui-count>
		</ui-entity>
	}

	render() {
		return <ui-list>
			{this.selection && this.renderItem(this.selection)}

			{this.list.map(entity => this.renderItem(entity))}
		</ui-list>
	}
}
