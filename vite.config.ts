import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// *@ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
// For Tailwind CSS v4, the tailwindcss plugin should be loaded before solid
export default defineConfig(async () => ({
  plugins: [tailwindcss(), solid()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    conditions: ["development", "browser"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tauri-apps/api": path.resolve(__dirname, "node_modules/@tauri-apps/api"),
    },
  },
  optimizeDeps: {
    exclude: ["@tauri-apps/api"],
  },
  // Tailwind v4 with @tailwindcss/vite doesn't require postcss config
  css: {},
}));
