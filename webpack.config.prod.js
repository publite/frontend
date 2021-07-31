const { ESBuildMinifyPlugin } = require("esbuild-loader");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config.common");

module.exports = {
  ...webpackConfig,
  optimization: {
    minimizer: [new ESBuildMinifyPlugin()],
  },
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    ...webpackConfig.plugins,
  ],
};
