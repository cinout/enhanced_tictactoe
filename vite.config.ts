import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // enables JSX and React Fast Refresh
// import eslint from "vite-plugin-eslint"; // fix this

// TODO:
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint({
    //   include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
    //   emitWarning: true, // Shows warnings in terminal
    //   emitError: true, // Shows errors in terminal
    // }),
  ],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    postcss: "./postcss.config.js", // pointing to the postcss config file (optional, because Vite automatically detects postcss.config.js)
    devSourcemap: true, // enable sourcemap in development
  },
});
