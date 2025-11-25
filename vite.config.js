import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",   // FIX untuk Vercel — jangan pakai nama repo!
  plugins: [react()],
});
