/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				background: "#1d1d1d",
				color: "#fff",
				primary: "#00DFFC",
				hover_btn: "#00dffcbf",
				secondary: "#909096",
				tertiary: "#181818",
				fourth: "#2a2a2a",
				cursor: "rgba(255, 255, 255, 0.8)"
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			}
		},
	},
	plugins: [],
});