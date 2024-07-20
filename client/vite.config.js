import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(),
		vitePluginRequire.default()
	],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});
