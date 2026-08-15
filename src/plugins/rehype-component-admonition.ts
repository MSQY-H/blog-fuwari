import { h } from "hastscript";

/**
 * Creates an admonition component.
 *
 * @param properties - The properties of the component.
 * @param properties.title - An optional title.
 * @param type - The admonition type.
 * @param children - The children elements of the component.
 * @returns The created admonition component.
 */
export function AdmonitionComponent(
	properties: Record<string, any> | undefined,
	children: any[],
	type: "tip" | "note" | "important" | "caution" | "warning",
): any {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
		);

	let label: any = null;
	if (properties?.["has-directive-label"]) {
		label = children[0]; // The first child is the label
		// biome-ignore lint/style/noParameterAssign: <check later>
		children = children.slice(1);
		label.tagName = "div"; // Change the tag <p> to <div>
	}

	return h("blockquote", { class: `admonition bdm-${type}` }, [
		h("span", { class: "bdm-title" }, label ? label : type.toUpperCase()),
		...children,
	]);
}