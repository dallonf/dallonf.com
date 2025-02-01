import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [
        "open-props",
        "@fontsource/clear-sans",
        "@fontsource/dm-sans",
      ],
    },
  },
  scopedStyleStrategy: "where",
});
