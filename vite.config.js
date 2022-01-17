import { defineConfig } from "vite";

export default defineConfig({
  base: "/haeley-examples-storybook/",
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      //   "haeley-full": "webgl-operate",
    },
  },
});
