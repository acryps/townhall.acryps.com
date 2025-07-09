import { Component } from "@acryps/page";
import { compassEconomic, compassSocial } from "./index.style";

export class PoliticalCompassComponent extends Component {
	constructor(
		public social: number,
		public economic: number
	) {
		super();
	}

	render() {
		return <ui-political-compass style={[
			compassSocial.provide(this.social),
			compassEconomic.provide(this.economic)
		].join(';')}>
			<ui-row>
				<ui-quadrant ui-authoritarian-left></ui-quadrant>
				<ui-quadrant ui-authoritarian-right></ui-quadrant>
			</ui-row>

			<ui-row>
				<ui-quadrant ui-liberal-left></ui-quadrant>
				<ui-quadrant ui-liberal-right></ui-quadrant>
			</ui-row>

			<ui-cursor></ui-cursor>

			<ui-label ui-authoritarian>Authoritarian</ui-label>
			<ui-label ui-liberal>Liberal</ui-label>
			<ui-label ui-left>Left</ui-label>
			<ui-label ui-right>Right</ui-label>
		</ui-political-compass>
	}
}
