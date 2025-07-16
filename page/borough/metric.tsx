import { Component } from "@acryps/page";

export class BoroughMetric extends Component {
	value: string;

	constructor(
		private name: string,
		private fetch: () => Promise<string> | string
	) {
		super();
	}

	async onload() {
		this.value = await this.fetch();
	}

	renderLoader() {
		return this.render();
	}

	render() {
		return <ui-metric>
			<ui-name>
				{this.name}
			</ui-name>

			<ui-value ui-loading={!!this.value}>
				{this.value ?? '...'}
			</ui-value>
		</ui-metric>;
	}
}
