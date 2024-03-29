import { HistoryEntryViewModel } from "../managed/services";
import { MapComponent } from "./map.component";
import { Component } from "@acryps/page";

export class HistoryComponent extends Component {
	declare parent: MapComponent;

	render() {
		requestAnimationFrame(() => {
			if (active) {
				const box = active.getBoundingClientRect();

				scrollingContainer.scrollTo(box.x - scrollingContainer.clientWidth / 2 + box.width / 2, 0);
			}
		});

		let active: HTMLElement;
		let scrollingContainer: HTMLElement;

		return <ui-panel>
			{scrollingContainer = <ui-history>
				{[null, ...this.parent.history].map(item => {
					let element: HTMLElement;

					if (item) {
						element = <ui-history-item ui-click={() => this.move(item)}>
							<ui-date>
								{item.date.toLocaleDateString()}
							</ui-date>

							<ui-time>
								{item.date.toLocaleTimeString()}
							</ui-time>
						</ui-history-item>;
					} else {
						element = <ui-history-item ui-click={() => this.move()}>
							LATEST
						</ui-history-item>
					}

					if (item?.name == this.parent.selectedHistoryEntry?.name) {
						element.setAttribute('ui-active', '');

						active = element;
					}

					return element;
				})}
			</ui-history>}
		</ui-panel>;
	}

	move(history?: HistoryEntryViewModel) {
		this.parent.selectedHistoryEntry = history;

		this.parent.updateMapImage();
		this.update();
	}
}