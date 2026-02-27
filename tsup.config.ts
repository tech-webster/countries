import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      data: "src/data/countries.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    external: ["react"],
    treeshake: true,
    clean: true,
    sourcemap: true,
    outExtension({ format }) {
      return { js: format === "esm" ? ".mjs" : ".js" };
    },
  },
  {
    entry: {
      react: "src/react.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    external: ["react"],
    treeshake: true,
    sourcemap: true,
    outExtension({ format }) {
      return { js: format === "esm" ? ".mjs" : ".js" };
    },
  },
]);
