import { Component } from "@acryps/page";
import { ImpressionService, ImpressionViewModel } from "../managed/services";

export class ImpressionsComponent extends Component {
	index: number;
	impressions: ImpressionViewModel[];

	async onload() {
		if (!this.impressions) {
			this.impressions = await new ImpressionService().list();
			this.index = Math.floor(this.impressions.length * Math.random());
		}

		this.index++;

		if (this.index == this.impressions.length) {
			this.index = 0;
		}

		setTimeout(() => {
			if (this.loaded) {
				this.reload();
			}
		}, 3000);
	}

	render() {
		const last = this.impressions[this.index - 1] ?? this.impressions.at(-1);
		const current = this.impressions[this.index];
		const next = this.impressions[this.index + 1] ?? this.impressions[0];

		return <ui-impression>
			<img ui-next src={`/impression/image/${next.id}`} />
			<img ui-last src={`/impression/image/${last.id}`} />
			<img ui-current src={`/impression/image/${current.id}`} />

			{current.title && <ui-name>
				{current.title}
			</ui-name>}
		</ui-impression>;
	}
}
