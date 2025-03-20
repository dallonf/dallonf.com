import postCssGlobalData from "@csstools/postcss-global-data";
import postCssCustomMedia from "postcss-custom-media";

export default {
  plugins: [
    postCssGlobalData({
      files: ["node_modules/open-props/media.min.css"],
    }),
    postCssCustomMedia(),
  ],
};
