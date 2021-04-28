// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  plugins: ["@snowpack/plugin-typescript"],
  packageOptions: {
    polyfillNode: true,
  },
  mount: {
    public: "/",
    src: "/dist",
  },
  optimize: {
    bundle: true,
  },
  devOptions: {
    open: "none",
  },
  exclude: ["**/node_modules/**/*", "**/*.test.*"],
};
