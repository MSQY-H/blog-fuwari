import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Blueaka", "Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [typography],
};