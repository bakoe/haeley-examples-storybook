import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      //   "haeley-full": "webgl-operate",
    },
  },
});
