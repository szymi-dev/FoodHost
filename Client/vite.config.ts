import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "dashes",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:46566",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
