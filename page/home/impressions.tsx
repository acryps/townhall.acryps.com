import { Component } from "@acryps/page";

export class ImpressionsComponent extends Component {
	items = [
		{
			title: 'Town Square, Inverporshire',
			image: 'inverportshire'
		},
		{
			title: 'Law House, Hornaby',
			image: 'law-house'
		},
		{
			title: 'Market and Town Square, Calderstone',
			image: 'calderstone'
		}
	];

	index = -1;

	async onload() {
		this.index++;

		if (this.index == this.items.length) {
			this.index = 0;
		}

		setTimeout(() => {
			if (this.loaded) {
				this.reload();
			}
		}, 3000);
	}

	render() {
		const item = this.items[this.index];

		return <ui-impression>
			<img src={`/assets/impressions/${item.image}.jpg`} />

			<ui-name>
				{item.title}
			</ui-name>
		</ui-impression>;
	}
}
