import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime(): any {
	return (tree: any, { data }: { data: any }): void => {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		data.astro.frontmatter.minutes = Math.max(
			1,
			Math.round(readingTime.minutes),
		);
		data.astro.frontmatter.words = readingTime.words;
	};
}