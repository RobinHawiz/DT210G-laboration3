import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "src/**/*.{ts,tsx}" --cache',
        dev: {
          logLevel: ["error"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@components": path.resolve(import.meta.dirname, "src/components"),
      "@api": path.resolve(import.meta.dirname, "src/api"),
      "@hooks": path.resolve(import.meta.dirname, "src/hooks"),
      "@types": path.resolve(import.meta.dirname, "src/types"),
      "@utils": path.resolve(import.meta.dirname, "src/types"),
    },
  },
  server: {
    open: true,
  },
});
