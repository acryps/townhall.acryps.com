import { toSimulatedTime } from "../interface/time";
import { Application } from "./index";
import { Component } from "@acryps/page";

export class PageComponent extends Component {
	render(child?: Node) {
		const date: HTMLElement = <ui-date></ui-date>;
		const time: HTMLElement = <ui-time></ui-time>;

		const updateTime = () => {
			const simulated = toSimulatedTime(new Date());
			date.textContent = simulated.toLocaleDateString();
			time.textContent = simulated.toLocaleTimeString();

			requestAnimationFrame(() => updateTime());
		}

		updateTime();

		return <ui-page>
			<ui-navigation>
				<ui-logo ui-href='/'>
					townhall
				</ui-logo>

				<ui-timer>
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
