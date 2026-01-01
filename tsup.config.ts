import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  target: "node20",
  clean: true,
  minify: true,
  noExternal: [
    "@modelcontextprotocol/sdk",
    "@svgr/core",
    "@svgr/plugin-jsx",
    "@svgr/plugin-svgo",
    "@svgr/plugin-prettier",
    "zod",
  ],
});
