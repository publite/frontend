const path = require("path");
const webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: {
    "index.js": "./src/index.tsx",
    "sw.js": "./src/serviceWorker/index.ts",
  },
  output: {
    path: path.resolve(__dirname, `./build/`),
    clean: true,
    filename: "[name]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: { "~": path.resolve(__dirname, "src/") },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.PUBLIC_API_URL": JSON.stringify(
        "http://localhost:8081"
      ),
    }),
    new ForkTsCheckerPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./public", to: "." }],
    }),
  ],
};
