import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
	server:{
		proxy:{
			'/api':{
				target:"http://localhost:3000",
				secure:false,
			}
		}
	},
	plugins: [tailwindcss(), flowbiteReact()],
});