import { Component } from "@acryps/page";
import { LoreService, LoreViewModel } from "../managed/services";
import { LoreTimelineComponent } from "./timeline";
import { goIcon } from "../assets/icons/managed";

export class LorePage extends Component {
	render(child) {
		if (child) {
			return <ui-lore>
				{child}
			</ui-lore>
		}

		const query: HTMLTextAreaElement = <textarea
			placeholder='Ask about anything happening...'
			rows='5'
		/>;

		const next = async () => {
			await new LoreService().prepareNext();

			requestAnimationFrame(() => next());
		};

		return <ui-lore>
			<ui-prompt>
				{query}

				<ui-action ui-click={async () => {
					this.navigate(`query/${await new LoreService().answer(query.value)}`);
				}}>
					{goIcon()}
				</ui-action>
			</ui-prompt>

			<ui-actions>
				<ui-action ui-href='proposal/write'>
					Extend Lore...
				</ui-action>
			</ui-actions>

			{new LoreTimelineComponent()}

			<ui-action ui-click={() => next()}>
				Prepare Next
			</ui-action>
		</ui-lore>
	}
}
