const path = require("path");

module.exports = {
  plugins: [
    require("postcss-custom-media")({
      importFrom: [
        path.join(__dirname, "node_modules/open-props/media.min.css"),
      ],
    }),
  ],
};
