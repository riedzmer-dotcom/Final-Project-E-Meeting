import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Konfigurasi Vite for React + Tailwind v4
export default defineConfig({
  base: "/Final-Project-E-Meeting/", // Name Repo
  plugins: [react()],
  server: {
    fs: {
      strict: true, // path case-sensitive
    },
  },
  optimizeDeps: {
    force: true, // rebuild cache
  },
});
