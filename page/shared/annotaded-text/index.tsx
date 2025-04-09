import { Component } from "@acryps/page";
import { FlatAnnotatedText } from "../../../interface/annotate";

export class AnnotatedTextComponent extends Component {
	constructor(
		private packed: FlatAnnotatedText
	) {
		super();
	}

	render() {
		const content: Node[] = [];
		const unpacked = JSON.parse(this.packed);

		for (let part of unpacked) {
			if (typeof part == 'string') {
				content.push(document.createTextNode(part));
			} else {
				const type = part[0];
				const label = part[1];
				const link = part[2];

				content.push(<ui-annotation ui-type={type} ui-href={link}>
					{label}
				</ui-annotation>);
			}
		}

		return <ui-annotated-text>
			{content}
		</ui-annotated-text>;
	}
}
