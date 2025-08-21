import { Component } from "@acryps/page";
import { ItemContextService, ItemContextViewModel } from "../managed/services";
import { AnnotatedTextComponent } from "../shared/annotaded-text";
import { Tabs } from "../shared/tabs";
import { ItemContextFragmentsTab } from "./fragments";
import { ItemContextBacklinksTab } from "./backlinks";

export class ItemContextPage extends Component {
	declare parameters: { id };

	context: ItemContextViewModel;
	annotatedContext: AnnotatedTextComponent;

	async onload() {
		this.context = await new ItemContextService().getContext(this.parameters.id);

		if (this.context.summary) {
			this.annotatedContext = new AnnotatedTextComponent(await new ItemContextService().annotateContext(this.parameters.id));
		}
	}

	renderGuide() {
		return <ui-guide>
			This context is used as a basis for the LLM to generate content.
			The context is composed from multiple sources.
			Data directly attached with the source object ({this.parameters?.id}) lays the fundation.
			Other referenced items are pulled in too, leading to a rich context environment.
			A LLM then combines the data into three tiers: context (a full description including all relevant details), summary (a short version of the description) and a tagline (a single sentence summarizing the whole object).
		</ui-guide>;
	}

	renderLoader() {
		return <ui-item-context>
			{this.renderGuide()}

			<ui-loading>
				Generating context, this might take a couple minutes. You may check back later.
			</ui-loading>
		</ui-item-context>;
	}

	render() {
		if (!this.context) {
			return this.renderLoader();
		}

		return <ui-item-context>
			{this.renderGuide()}

			<ui-id>Context: {this.context.id}</ui-id>
			<ui-id>Item: {this.context.itemId}</ui-id>

			<ui-name>
				{this.context.name}
			</ui-name>

			<ui-updated>
				Updated {this.context.updated?.toLocaleString()}
			</ui-updated>

			{new Tabs()
				.addTab('Context', () => <ui-context-ranks>
					<ui-rank>
						<ui-name>
							Tagline (primary)
						</ui-name>

						<ui-content>
							{this.context.tagline}
						</ui-content>
					</ui-rank>

					<ui-rank>
						<ui-name>
							Summary (primary, near)
						</ui-name>

						<ui-content>
							{this.context.tagline}
						</ui-content>
					</ui-rank>

					<ui-rank>
						<ui-name>
							Context (primary, near, far)
						</ui-name>

						{this.annotatedContext}
					</ui-rank>
				</ui-context-ranks>)
				.addTab('Links', () => <ui-links>
					{this.context.links.length == 0 && <ui-empty>
						No items linked from {this.context.name}
					</ui-empty>}

					{this.context.links.map(link => <ui-link ui-href={`../${link.target.itemId}`}>
						<ui-connection>
							{link.connection}
						</ui-connection>

						<ui-target>
							{link.target.name}
						</ui-target>
					</ui-link>)}
				</ui-links>)
				.addTab('Backlinks', () => new ItemContextBacklinksTab(this.context))
				.addTab('Fragments', () => new ItemContextFragmentsTab(this.context))
			}


		</ui-item-context>;
	}
}
