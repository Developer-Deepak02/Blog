/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				"slide-in": {
					"0%": { transform: "translateX(100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				"slide-out": {
					"0%": { transform: "translateX(0)", opacity: "1" },
					"100%": { transform: "translateX(100%)", opacity: "0" },
				},
			},
			animation: {
				"slide-in": "slide-in 0.5s ease-out",
				"slide-out": "slide-out 0.5s ease-in",
			},
		},
	},

	plugins: [flowbite, tailwindScrollbar],
};
