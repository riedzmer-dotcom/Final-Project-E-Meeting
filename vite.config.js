import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Konfigurasi Vite standar dan stabil untuk React + Tailwind v4
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: true, // tetap biar path case-sensitive
    },
  },
  optimizeDeps: {
    force: true, // tetap berguna untuk rebuild cache
  },
});
