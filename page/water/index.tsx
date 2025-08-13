import { Component } from "@acryps/page";

export class WaterPage extends Component {
	render(child) {
		if (child) {
			return <ui-water>
				{child}
			</ui-water>;
		}

		return <ui-water>
		</ui-water>
	}
}
