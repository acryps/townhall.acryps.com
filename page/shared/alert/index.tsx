import { Component, ComponentContent } from "@acryps/page";

type AlertAction = {
	name: string;
	click?: (alert: Alert) => void;
};

export class Alert extends Component {
	private primaryAction: AlertAction;
	private secondaryActions: AlertAction[] = [];

	private constructor(
		private alertTitle: ComponentContent,
		private content: ComponentContent
	) {
		super();
	}

	// invoke from anywhere, eg. Alert.show('title', 'content').addPrimaryAction('Okay', alert => alert.close()).show();
	static show(title: ComponentContent, content: ComponentContent) {
		return new Alert(title, content);
	}

	addPrimaryAction(name: string, click?: (alert: Alert) => void) {
		return this.addAction(name, click, true);
	}

	addSecondaryAction(name: string, click?: (alert: Alert) => void) {
		return this.addAction(name, click, false);
	}

	private addAction(name: string, click: ((alert: Alert) => void) | undefined, primary: boolean) {
		if (primary) {
			this.primaryAction = { name, click };
		} else {
			this.secondaryActions.push({ name, click });
		}

		return this;
	}

	show() {
		this.host(document.body);

		return this;
	}

	close() {
		this.remove();
	}

	render() {
		return <ui-alert-overlay>
			<ui-alert-sheet>
				<ui-title>
					{this.alertTitle}
				</ui-title>

				<ui-content>
					{this.content}
				</ui-content>

				<ui-actions>
					{this.secondaryActions.map(action => <ui-action ui-click={() => action.click?.(this)}>
						{action.name}
					</ui-action>)}

					{this.primaryAction && <ui-action ui-primary ui-click={() => this.primaryAction.click?.(this)}>
						{this.primaryAction.name}
					</ui-action>}
				</ui-actions>
			</ui-alert-sheet>
		</ui-alert-overlay>;
	}
}
