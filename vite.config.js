import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "fsevents",
      "@nomicfoundation/solidity-analyzer-darwin-arm64",
      "@nomicfoundation/edr-darwin-arm64",
    ],
  },
  // assetsInclude: ["**/*.node"],
});
