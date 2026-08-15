import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "MSQY's Blog",
	subtitle: "所见所闻，所思所想",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 260, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/banner.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "Unsplash @John Rodenn Castillo", // Credit text to be displayed
			url: "https://unsplash.com/photos/birds-eye-view-of-mountains-eluzJSfkNCk", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 3, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
		   src: '/favicon/favicon.ico',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		  sizes: '128x128',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		}
	],
  expiry: {
  	enable: true, // 是否启用过期提醒
  	days: 30, // 超过多少天视为过期
  },

};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Friends,
		LinkPreset.About,
		LinkPreset.Message,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "MSQY",
	bio: "NVIDIA GeForce RTX 5060 Ti!",
	links: [
		//{
			//name: "Twitter",
			//icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			//url: "https://twitter.com",
		//},
		//{
			//name: "Steam",
			//icon: "fa6-brands:steam",
			//url: "https://store.steampowered.com",
		//},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/MSQY-H",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:Hydroxid_Hualin@outlook.com",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
