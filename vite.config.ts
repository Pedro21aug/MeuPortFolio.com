import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração mínima: Vite + React + alias "@" para src/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
  },
});
