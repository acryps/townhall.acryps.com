import { Application } from ".";

export const linkText = (source: string) => {
	let text = [source];
	const links = new Map<string, string>();

	const createLink = (name: string) => {
		const link = document.createElement('a');
		link.href = links.get(name);
		link.textContent = name;

		requestAnimationFrame(() => {
			if (new URL(link.href).toString() == new URL(location.href).toString()) {
				link.replaceWith(document.createTextNode(name));
			}
		});

		return link;
	};

	for (let borough of Application.boroughs) {
		links.set(borough.name, `/borough/${borough.tag}`);
	}

	for (let search of [...links.keys()].toSorted((a, b) => a.length - b.length)) {
		const components = [];

		for (let component of text) {
			if (typeof component == 'string') {
				components.push(...component
					.split(search)
					.flatMap(part => [part, createLink(search)])
					.slice(0, -1)
				);
			} else {
				components.push(component);
			}
		}

		text = components;
	}

	return text;
};
