import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@scripts": fileURLToPath(new URL("./src/scripts", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      },
    },
  },
});
