import { defineConfig } from "astro/config";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["open-props", "@fontsource/clear-sans", "@fontsource/dm-sans"]
    }
  },
  integrations: [image()]
});