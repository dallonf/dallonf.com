const path = require("path");

module.exports = {
  plugins: [
    require("@csstools/postcss-global-data")({
      files: [path.join(__dirname, "node_modules/open-props/media.min.css")],
    }),
    require("postcss-custom-media")(),
  ],
};
