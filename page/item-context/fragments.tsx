import { Component } from "@acryps/page";
import { ItemContextFragmentViewModel, ItemContextService, ItemContextViewModel } from "../managed/services";

export class ItemContextFragmentsTab extends Component {
	fragments: ItemContextFragmentViewModel[];

	constructor(
		private itemContext: ItemContextViewModel
	) {
		super();
	}

	async onload() {
		this.fragments = await new ItemContextService().getFragments(this.itemContext.id);
	}

	render() {
		return <ui-fragments>
			{this.fragments.map(fragment => <ui-fragment>
				<ui-header>
					<ui-rank>
						{fragment.rank}
					</ui-rank>

					<ui-title>
						{fragment.title}
					</ui-title>
				</ui-header>

				<ui-content>
					{fragment.content}
				</ui-content>
			</ui-fragment>)}
		</ui-fragments>;
	}
}
