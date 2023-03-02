import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { resolve } from "path";

const samplesFolder = resolve("src/samples");
const input = {
  "presentation": resolve("index.html"),
};

for (const item of readdirSync(samplesFolder, { withFileTypes: true })) {
  if (item.isDirectory()) {
    input[item.name] = resolve(samplesFolder, item.name, "index.html");
  } else if (item.name.endsWith(".html")) {
    input[item.name] = resolve(samplesFolder, item.name);
  }
}

module.exports = defineConfig(({ command }) => ({
  base: command === "build" ? "https://esridevsummit.github.io/arcgis-js-api-for-javascript-3d-visualization/" : "./",
  build: {
    rollupOptions: { input },
    minify: "esbuild",
  },
}));
