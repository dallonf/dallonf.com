import { defineConfig } from "astro/config";
import remarkYearsExperience from "./src/logic/years-experience-remark-plugin";

import svelte from "@astrojs/svelte";

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

  markdown: {
    remarkPlugins: [remarkYearsExperience],
  },

  integrations: [svelte()],

  experimental: {
    contentIntellisense: true,
  },
});
