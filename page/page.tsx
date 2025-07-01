import { Time } from "../interface/time";
import { Component } from "@acryps/page";

export class PageComponent extends Component {
	render(child?: Node) {
		const date: HTMLElement = <ui-date></ui-date>;
		const time: HTMLElement = <ui-time></ui-time>;

		const updateTime = () => {
			const simulated = Time.now();
			date.textContent = simulated.toDateString();
			time.textContent = simulated.toTimeString();

			requestAnimationFrame(() => updateTime());
		}

		updateTime();

		return <ui-page>
			<ui-navigation>
				<ui-logo ui-href='/'>
					townhall
				</ui-logo>

				<ui-timer ui-href='/time'>
					{date}
					{time}
				</ui-timer>
			</ui-navigation>

			<ui-content>
				{child}
			</ui-content>
		</ui-page>;
	}
}
