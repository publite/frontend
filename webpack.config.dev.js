const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config.common");

module.exports = {
  ...webpackConfig,
  mode: "development",
  watchOptions: { ignored: /node_modules/ },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8080,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    ...webpackConfig.plugins,
  ],
};
