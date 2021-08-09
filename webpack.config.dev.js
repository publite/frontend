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
    hot: false,
    inline: false,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.PUBLIC_BASE_URL": JSON.stringify("http://localhost:8080"),
      "process.env.PUBLIC_API_URL": JSON.stringify("http://localhost:8081"),
    }),
    ...webpackConfig.plugins,
  ],
};
