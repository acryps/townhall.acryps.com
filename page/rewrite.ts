import { Component } from "@acryps/page";
import { select, Style, StyleGroup } from "@acryps/style";

// elements which should not be altered
// an <img> will stay an <img>
export const nativeElements = ['img', 'canvas', 'body', 'textarea', 'select', 'option', 'optgroup', 'input'];

// elements which should be replaced
// an <ui-title> will become a <h1>
// css ui-title will become .title
export const namedElements = {
	'ui-title': 'h1',
	'ui-name': 'h2',
	'ui-description': 'p',
	'ui-section': 'section',
	'ui-navigation': 'nav'
};

// elements where css declarations should be made for the native and named version
// [ui-icon] will become :is()
// ui-icon will become :is(ui-icon, .icon)
export const doubleElements = ['ui-icon'];

// replaces attributes
// if a tag value is provided, the tag is replaced too
export const attributeRewrites = {
	'ui-href': {
		tag: 'a',
		attribute: 'href',
		value: (value: string, component: Component) => {
			const destination = component.router.absolute(value, this);

			// return the link as provided if not a route within the application
			// - this works for routes handled by the server (for example PDF exports)
			// - external links
			if (!component.router.getRoute(destination)) {
				return value;
			}

			return destination;
		}
	}
};

// the element to use for all elements that are not part of any of the lists above
export const defaultElement = 'div';

export const rewrite = () => {
	const resetStyle = document.createElement('style');
	resetStyle.textContent = `${[defaultElement, Object.values(namedElements),Object.keys(attributeRewrites).map(rewrite => attributeRewrites[rewrite].tag).filter(tag => tag)]}{all:unset}`;

	document.head.appendChild(resetStyle);

	const createElement = Component.prototype.createElement;

	Component.prototype.createElement = function (tag, attributes, ...children) {
		const source = tag;

		if (nativeElements.includes(tag) || doubleElements.includes(tag)) {
			tag = tag;
		} else if (tag in namedElements) {
			tag = namedElements[tag];
		} else {
			tag = defaultElement;
		}

		for (let attribute in { ...attributes }) {
			if (attribute in attributeRewrites) {
				const rewrite = attributeRewrites[attribute];
				let value = attributes[attribute];

				if (rewrite.value) {
					value = rewrite.value(value, this);
				}

				attributes[rewrite.attribute] = value;
				delete attributes[attribute];

				if (rewrite.tag) {
					tag = rewrite.tag;
				}
			}
		}

		const element = createElement.bind(this)(tag, attributes, ...children);
		element.classList.add(source.replace('ui-', ''));

		return element;
	};

	StyleGroup.prototype.wrapSelector = selector => {
		const modified = selector.replace(/(?<![:"[-])\b[a-z0-9][a-z0-9-]*\b/g, match => {
			if (nativeElements.includes(match)) {
				return match;
			}

			const classedSelector = `.${match.replace('ui-', '')}`;

			if (match in namedElements) {
				return classedSelector;
			}

			if (doubleElements.includes(match)) {
				return `:is(${match}, ${classedSelector})`;
			}

			return classedSelector;
		});

		return modified;
	};
};
