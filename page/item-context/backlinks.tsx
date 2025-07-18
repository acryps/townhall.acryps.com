import { Component } from "@acryps/page";
import { ItemContextBacklinkViewModel, ItemContextViewModel } from "../../interface/models";
import { ItemContextLinkViewModel, ItemContextService } from "../managed/services";

export class ItemContextBacklinksTab extends Component {
	backlinks: ItemContextBacklinkViewModel[];

	constructor(
		private itemContext: ItemContextViewModel
	) {
		super();
	}

	async onload() {
		this.backlinks = await new ItemContextService().getBacklinks(this.itemContext.id);
	}

	render() {
		return <ui-links>
			{this.backlinks.length == 0 && <ui-empty>
				No items link to {this.itemContext.name}
			</ui-empty>}

			{this.backlinks.map(link => <ui-link ui-href={`../${link.source.itemId}`}>
				<ui-connection>
					{link.connection}
				</ui-connection>

				<ui-target>
					{link.source.name}
				</ui-target>
			</ui-link>)}
		</ui-links>
	}
}
