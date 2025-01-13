import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // Ensure jsdom is used as the test environment
    setupFiles: "./test/setup.ts", // Load the setup file
  },
});