import { HistoryEntryViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { MapComponent } from "./map.component";

export class HistoryComponent extends Component {
    parent: MapComponent;

    render() {
        return <ui-panel>
            <ui-history>
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
                            TODAY
                        </ui-history-item>
                    }

                    if (item?.name == this.parent.selectedHistoryEntry?.name) {
                        element.setAttribute('ui-active', '');
                    }

                    return element;
                })}
            </ui-history>
        </ui-panel>;
    }

    move(history?: HistoryEntryViewModel) {
        this.parent.selectedHistoryEntry = history;

        this.parent.updateMapImage();
        this.update();
    }
}