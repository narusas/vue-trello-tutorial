import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/tasks': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
    }
  },
  plugins: [vue()],
});
